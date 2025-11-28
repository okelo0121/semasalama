let blockedWordsRegex = new RegExp('a^'); // Regex that never matches initially
let isObserving = false;

// High-level selectors for known social media + generic elements for all URLs
const COMMENT_SELECTORS = [
    '[data-testid="tweetText"]',      // Twitter/X
    '[data-ad-preview="message"]',    // Facebook
    'div[data-testid="comment"]',     // Facebook new UI
    'div[dir="auto"] > span.x193iq5w',// Instagram Comments
    '#content-text',                  // YouTube
    'p',                              // Generic paragraphs
    'span',                           // Generic inline text
    'div'                             // Generic block text
];

// Fetch default dataset + custom blocklist from storage
const fetchBlockedWords = async () => {
    try {
        const response = await fetch(chrome.runtime.getURL('dataset.json'));
        const dataset = await response.json();
        const storage = await chrome.storage.local.get('customBlocklist');
        const customBlocklist = storage.customBlocklist || [];
        const allBlockedWords = [...new Set([...dataset, ...customBlocklist].map(word => word.toLowerCase().trim()).filter(Boolean))];

        if (allBlockedWords.length > 0) {
            // Escape special regex characters and join words with OR operator
            const regexString = allBlockedWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
            blockedWordsRegex = new RegExp(`\\b(${regexString})\\b`, 'gi');
        } else {
            blockedWordsRegex = new RegExp('a^'); // never matches
        }
    } catch (error) {
        console.error('Sema Salama: Error fetching blocked words:', error);
    }
};

// Check if text contains blocked words
const containsBlockedWord = (text) => {
    if (!text) return false;
    blockedWordsRegex.lastIndex = 0; // reset regex state
    return blockedWordsRegex.test(text);
};

// Unblur all elements on the page
const unblurAll = () => {
    document.querySelectorAll('.blurred-text').forEach(element => {
        const originalContent = element.dataset.originalContent;
        if (originalContent) element.innerHTML = originalContent;
        element.classList.remove('blurred-text');
        delete element.dataset.originalContent;
        const button = element.querySelector('.reveal-button');
        if (button) button.remove();
    });
};

// Log abusive comments per abuser
const logAbuse = async (abuser, words) => {
    try {
        const storage = await chrome.storage.local.get('abuseLog');
        const abuseLog = storage.abuseLog || [];

        abuseLog.push({
            abuser: abuser || "unknown",
            url: window.location.href,
            words: words,
            timestamp: new Date().toISOString()
        });

        // Optional: keep only last 100 records
        if (abuseLog.length > 100) abuseLog.splice(0, abuseLog.length - 100);

        await chrome.storage.local.set({ abuseLog });
    } catch (error) {
        console.error("Sema Salama: Error logging abuse:", error);
    }
};

// Blur element and add reveal button
const applyBlur = (element) => {
    if (element.classList.contains('blurred-text') || element.closest('.blurred-text')) return;

    // Store original content
    element.dataset.originalContent = element.innerHTML;

    element.classList.add('blurred-text');
    const revealButton = document.createElement('button');
    revealButton.textContent = '👁 Reveal';
    revealButton.className = 'reveal-button';

    revealButton.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        element.classList.remove('blurred-text');
        revealButton.remove();
    }, { once: true });

    element.prepend(revealButton);

    // Log abusive words
    const text = element.textContent;
    const matchedWords = text.match(blockedWordsRegex);
    if (matchedWords && matchedWords.length > 0) {
        // Try to find abuser in test file or social media selectors
        const userNode = element.closest('.post')?.querySelector('.username') || 
                         element.closest('[data-testid="tweet"] [role="link"]') || 
                         element.closest('[data-ad-preview="message"]');
        const abuser = userNode ? userNode.textContent.trim().slice(0, 50) : "unknown";

        logAbuse(abuser, matchedWords.map(w => w.toLowerCase()));
    }
};

// Optimized node scanning: only scan elements with text content above 2 chars
const scanNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
        if (containsBlockedWord(node.textContent)) {
            const parent = node.parentNode;
            if (parent && !parent.classList.contains('blurred-text') && !parent.closest('.reveal-button')) {
                applyBlur(parent);
            }
        }
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || node.classList.contains('blurred-text')) {
            return;
        }

        if (node.textContent && node.textContent.trim().length > 2) { // avoid empty nodes
            const selector = COMMENT_SELECTORS.join(',');
            if (node.matches(selector) && containsBlockedWord(node.textContent)) {
                applyBlur(node);
                return; // skip scanning children if parent is blurred
            }

            node.childNodes.forEach(scanNode); // recursively scan children
        }
    }
};

const scanAndBlur = (rootNode) => {
    scanNode(rootNode);
};

// Observe DOM changes
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
            for (const node of mutation.addedNodes) {
                scanAndBlur(node);
            }
        }
    }
});

const startObserver = () => {
    if (isObserving) return;
    observer.observe(document.body, { childList: true, subtree: true });
    isObserving = true;
};

// Re-scan page on demand
const reScanPage = async () => {
    unblurAll(); 
    await fetchBlockedWords();
    scanAndBlur(document.body);
};

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 're-scan') {
        reScanPage().then(() => sendResponse({status: 're-scanned'}));
        return true; // async response
    }
});

// Initialize extension
const initialize = async () => {
    await fetchBlockedWords();
    scanAndBlur(document.body);
    startObserver();
};

initialize();
