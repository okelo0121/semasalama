let blockedWordsRegex = new RegExp('a^'); // Regex that never matches initially
let isObserving = false;

// Ensure styles for blurred words are injected
const ensureStyles = () => {
    if (document.getElementById('sema-syles')) return;
    const style = document.createElement('style');
    style.id = 'sema-syles';
    style.textContent = `
    .sema-blur { filter: blur(6px); -webkit-filter: blur(6px); cursor: pointer; transition: filter .15s; }
    .sema-blur.revealed { filter: none; -webkit-filter: none; }
    .sema-blur[data-sema-word] { padding: 0 2px; border-radius: 2px; }
    `;
    document.head && document.head.appendChild(style);
};
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

// Unblur all processed elements and restore original HTML
const unblurAll = () => {
    document.querySelectorAll('[data-sema-original]').forEach(element => {
        const originalContent = element.dataset.semaOriginal;
        if (originalContent) element.innerHTML = originalContent;
        element.removeAttribute('data-sema-original');
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

// Wrap matched words in the element with blurred spans and add per-word reveal
const blurMatchesInElement = (element) => {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    // Avoid processing interactive or already-processed containers
    if (element.isContentEditable) return;
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.closest('[data-sema-original]')) return;

    // Inject styles once
    ensureStyles();

    const text = element.textContent || '';
    if (!containsBlockedWord(text)) return;

    // Save original HTML so we can restore later
    if (!element.dataset.semaOriginal) element.dataset.semaOriginal = element.innerHTML;

    // Walk text nodes and replace matched words with spans
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            // ignore nodes inside our own spans
            if (node.parentElement && node.parentElement.closest('.sema-blur')) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    const matchedWords = [];

    nodes.forEach(textNode => {
        const val = textNode.nodeValue;
        blockedWordsRegex.lastIndex = 0;
        if (!blockedWordsRegex.test(val)) return;

        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        blockedWordsRegex.lastIndex = 0;
        let m;
        while ((m = blockedWordsRegex.exec(val)) !== null) {
            const idx = m.index;
            const matched = m[0];
            // append text before match
            if (idx > lastIndex) frag.appendChild(document.createTextNode(val.slice(lastIndex, idx)));
            // create blurred span
            const span = document.createElement('span');
            span.className = 'sema-blur';
            span.dataset.semaWord = matched;
            span.textContent = matched;
            span.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const word = span.dataset.semaWord || span.textContent || '';
                const confirmMsg = `This action will reveal potentially abusive content: "${word}". Do you want to continue?`;
                // Use browser confirm to warn the user before revealing
                try {
                    const ok = confirm(confirmMsg);
                    if (ok) {
                        span.classList.add('revealed');
                    }
                } catch (err) {
                    // Fallback: if confirm isn't available, reveal directly
                    span.classList.add('revealed');
                }
            });
            frag.appendChild(span);
            matchedWords.push(matched.toLowerCase());
            lastIndex = idx + matched.length;
        }
        // append remaining text
        if (lastIndex < val.length) frag.appendChild(document.createTextNode(val.slice(lastIndex)));

        // replace text node with fragment
        textNode.parentNode.replaceChild(frag, textNode);
    });

    // Log abusive words for this element
    if (matchedWords.length > 0) {
        const userNode = element.closest('.post')?.querySelector('.username') || 
                         element.closest('[data-testid="tweet"] [role="link"]') || 
                         element.closest('[data-ad-preview="message"]');
        const abuser = userNode ? userNode.textContent.trim().slice(0, 50) : "unknown";
        logAbuse(abuser, Array.from(new Set(matchedWords)));
    }
};

// Optimized node scanning: only scan elements with text content above 2 chars
const scanNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
        if (containsBlockedWord(node.textContent)) {
            const parent = node.parentNode;
            if (parent) {
                blurMatchesInElement(parent);
            }
        }
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || node.hasAttribute('data-sema-original')) {
            return;
        }

        if (node.textContent && node.textContent.trim().length > 2) { // avoid empty nodes
            const selector = COMMENT_SELECTORS.join(',');
            if (node.matches(selector) && containsBlockedWord(node.textContent)) {
                blurMatchesInElement(node);
                return; // skip scanning children if parent is processed
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
