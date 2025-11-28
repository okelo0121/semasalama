# Sema Salama Chrome Extension

Sema Salama is a Chrome extension that detects and blurs local-language hate speech on social media platforms, with a focus on privacy and user control.

## Features

*   **Blur Filter:** Automatically blurs detected abusive text directly within comments on social media and other websites.
*   **Reveal Button:** A "👁 Reveal" button appears next to each blurred comment to view the original text.
*   **Personal Blocklist:** Users can add custom words to their blocklist via the extension popup.
*   **Abuse Log:** The extension logs abusive comments with information about the abuser (if detectable), the words used, the URL, and the time. Users can view and clear these logs from the popup.
*   **Expanded Dataset:** Includes abusive words in multiple African languages and English for broader coverage.
*   **All URLs Support:** Works on all websites, not just social media platforms.
*   **Privacy-Focused:** All processing happens locally in your browser. No data is ever sent to a server.


## Using the Extension

1. **Blurred Comments:** Abusive words are automatically blurred when detected.  
2. **Reveal Comments:** Click the "👁 Reveal" button to temporarily view the original comment.  
3. **Manage Blocklist:** Open the extension popup to add or remove custom words from your personal    blocklist.  
4. **View Abuse Logs:** In the popup, scroll to the "Abuse Log" section to see a history of abusive comments. Use the "Clear Abuse Log" button to delete all entries.


## Installation

1.  Download the extension files to a local directory.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the directory where you saved the extension files.
5.  The Sema Salama extension should now be active!

## Icons

The icons for this extension are located in the `images` directory. They are:

*   `images/icon16.png`
*   `images/icon48.png`
*   `images/icon128.png`

You can replace these with your own icons if you wish. The current icons are temporary and generated via AI.

### Deploying to the Chrome Web Store

1. **Prepare Your Extension Files:**
   - Ensure your `manifest.json` file has the correct version number and that all icon paths are correct.
   - Remove any temporary or development-related files that are not needed for the extension to function (e.g., `.git`, `README.md` (optional), development notes).

2. **Package Your Extension:**
   - In your file explorer, select all the extension files (`manifest.json`, `content.js`, `popup.html`, `styles.css`, etc.) and the `images` folder.
   - Right-click and choose "Compress" or "Send to > Compressed (zipped) folder" to create a `.zip` file. This single `.zip` file is what you will upload to the store.

3. **Publish on the Chrome Web Store:**
   - Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
   - Sign in with your Google account. You will need to pay a one-time registration fee if this is your first time.
   - Click "Add new item" and upload the `.zip` file you created.
   - Fill out the required store listing information, including the extension's name, description, icons, and promotional images.
   - Submit the extension for review. The review process can take a few days.

Once approved, your extension will be live on the Chrome Web Store!