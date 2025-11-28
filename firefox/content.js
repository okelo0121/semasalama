let blockedWordsRegex = new RegExp('a^');
let isObserving = false;

const COMMENT_SELECTORS = [
    '[data-testid="tweetText"]', // Twitter/X
    '[data-ad-preview="message"]', // Facebook
    'div[data-testid="comment"]', // Facebook new UI
    'div[dir="auto"] > span.x193iq5w', // Instagram Comments
    '#content-text', // YouTube
    'p' // General paragraphs
];

const fetchBlockedWords = async () => {
    try {
        const response = await fetch(chrome.runtime.getURL('dataset.json'));
        const dataset = await response.json();
        const storage = await chrome.storage.local.get('customBlocklist');
        const customBlocklist = storage.customBlocklist || [];
        const allBlockedWords = [...new Set([...dataset, ...customBlocklist].map(word => word.toLowerCase().trim()).filter(Boolean))];
        
        if (allBlockedWords.length > 0) {
            // Escape special regex characters from words and join them with '|' for an OR condition.
            const regexString = allBlockedWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
            blockedWordsRegex = new RegExp(`\\b(${regexString})\\b`, 'gi');
        } else {
            blockedWordsRegex = new RegExp('a^'); // A regex that will never match
        }
    } catch (error) {
        console.error('Sema Salama: Error fetching blocked words:', error);
    }
};

const containsBlockedWord = (text) => {
    if (!text) return false;
    // Reset regex state before each test
    blockedWordsRegex.lastIndex = 0;
    return blockedWordsRegex.test(text);
};

const unblurAll = () => {
    document.querySelectorAll('.blurred-text').forEach(element => {
        // Restore original content
        const originalContent = element.dataset.originalContent;
        if (originalContent) {
            element.innerHTML = originalContent;
        }
        element.classList.remove('blurred-text');
        delete element.dataset.originalContent;
        const button = element.querySelector('.reveal-button');
        if (button) button.remove();
    });
};

const applyBlur = (element) => {
    if (element.classList.contains('blurred-text') || element.closest('.blurred-text')) return;

    // Store original content before modifying
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
};

const scanNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
        if (containsBlockedWord(node.textContent)) {
            const parent = node.parentNode;
            // Ensure we are not blurring something already blurred or part of the UI
            if (parent && !parent.classList.contains('blurred-text') && !parent.closest('.reveal-button')) {
                 // We blur the immediate parent of the text node if it's a small element,
                 // or a more specific selector could be used if needed.
                applyBlur(parent);
            }
        }
    }

    // If the node is an element, recursively scan its children
    if (node.nodeType === Node.ELEMENT_NODE) {
        // Avoid scanning scripts, styles, and already blurred content
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || node.classList.contains('blurred-text')) {
            return;
        }
        // Check if the element itself matches one of our high-level selectors
        const selector = COMMENT_SELECTORS.join(',');
        if (node.matches(selector) && containsBlockedWord(node.textContent)) {
            applyBlur(node);
            // Once a parent is blurred, we don't need to scan its children further.
            return;
        }

        // Recursively call scanNode for each child node
        node.childNodes.forEach(scanNode);
    }
};

const scanAndBlur = (rootNode) => {
    scanNode(rootNode);
};

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

const reScanPage = async () => {
    // Clear previous blurs before re-scanning
    unblurAll(); 
    await fetchBlockedWords();
    scanAndBlur(document.body);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 're-scan') {
        reScanPage().then(() => sendResponse({status: 're-scanned'}));
        return true; // Indicates async response
    }
});

const initialize = async () => {
    await fetchBlockedWords();
    scanAndBlur(document.body);
    startObserver();
};

initialize();
