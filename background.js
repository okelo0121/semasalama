chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('customBlocklist', (data) => {
        if (!data.customBlocklist) {
            chrome.storage.local.set({ customBlocklist: [] });
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'blocklistUpdated') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, { type: 're-scan' });
            }
        });
    }
});
