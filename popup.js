document.addEventListener('DOMContentLoaded', () => {
    const blocklistForm = document.getElementById('blocklist-form');
    const blocklistInput = document.getElementById('blocklist-input');
    const blocklistEl = document.getElementById('blocklist');

    const abuseLogContainer = document.getElementById('abuse-log-container');
    const clearLogsButton = document.getElementById('clear-logs');
    const optOutCheckbox = document.getElementById('opt-out-abuse-log');

    // Personal Blocklist Functions
    const getBlocklist = async () => {
        const result = await chrome.storage.local.get('customBlocklist');
        return result.customBlocklist || [];
    };

    const renderBlocklist = (items) => {
        blocklistEl.innerHTML = '';
        if (items.length === 0) {
            blocklistEl.innerHTML = '<li style="text-align: center; color: #888; padding: 10px;">Your personal blocklist is empty.</li>';
            return;
        }
        items.forEach(word => {
            const li = document.createElement('li');
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            li.appendChild(wordSpan);

            const removeButton = document.createElement('button');
            removeButton.textContent = '×';
            removeButton.className = 'remove-word';
            removeButton.title = `Remove "${word}"`;
            removeButton.addEventListener('click', () => removeWord(word));

            li.appendChild(removeButton);
            blocklistEl.appendChild(li);
        });
    };

    const addWord = async (word) => {
        const currentBlocklist = await getBlocklist();
        if (word && !currentBlocklist.includes(word)) {
            const newBlocklist = [...currentBlocklist, word];
            await chrome.storage.local.set({ customBlocklist: newBlocklist });
            await notifyContentScript();
            renderBlocklist(newBlocklist);
        }
        blocklistInput.value = '';
    };

    const removeWord = async (word) => {
        let currentBlocklist = await getBlocklist();
        const newBlocklist = currentBlocklist.filter(item => item !== word);
        await chrome.storage.local.set({ customBlocklist: newBlocklist });
        await notifyContentScript();
        renderBlocklist(newBlocklist);
    };

    const notifyContentScript = async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.id) {
            chrome.tabs.sendMessage(tab.id, { type: 're-scan' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.warn('Sema Salama: Could not notify content script:', chrome.runtime.lastError.message);
                }
            });
        }
    };

    blocklistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newWord = blocklistInput.value.trim().toLowerCase();
        if (newWord) addWord(newWord);
    });

    getBlocklist().then(renderBlocklist);

    // Abuse Log Functions 
    const renderAbuseLog = async () => {
        const result = await chrome.storage.local.get('abuseLog');
        const abuseLog = result.abuseLog || [];
        abuseLogContainer.innerHTML = '';

        if (abuseLog.length === 0) {
            abuseLogContainer.innerHTML = '<p style="text-align:center; color:#888;">No abuse logs yet.</p>';
            return;
        }

        abuseLog.forEach(entry => {
            const div = document.createElement('div');
            div.style.borderBottom = '1px solid #ccc';
            div.style.marginBottom = '5px';
            div.style.paddingBottom = '5px';
            div.innerHTML = `
                <strong>Abuser:</strong> ${entry.abuser} <br>
                <strong>Words:</strong> ${entry.words.join(', ')} <br>
                <strong>URL:</strong> ${entry.url} <br>
                <strong>Time:</strong> ${new Date(entry.timestamp).toLocaleString()}
            `;
            abuseLogContainer.appendChild(div);
        });
    };

    // Load opt-out setting and wire checkbox
    const loadOptOut = async () => {
        const res = await chrome.storage.local.get('disableAbuseLog');
        optOutCheckbox.checked = !!res.disableAbuseLog;
    };

    optOutCheckbox.addEventListener('change', async () => {
        const enabled = !!optOutCheckbox.checked;
        await chrome.storage.local.set({ disableAbuseLog: enabled });
        if (enabled) {
            // If user opts out, clear existing abuse logs to respect privacy
            await chrome.storage.local.set({ abuseLog: [] });
        }
        // Re-render log area to reflect opt-out and cleared logs
        renderAbuseLog();
    });

    clearLogsButton.addEventListener('click', async () => {
        await chrome.storage.local.set({ abuseLog: [] });
        renderAbuseLog();
    });

    // Initial render: load opt-out then render logs
    loadOptOut().then(() => renderAbuseLog());
});
