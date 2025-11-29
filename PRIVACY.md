# Privacy — Sema Salama

Sema Salama is designed to respect user privacy and process data locally wherever possible. This document explains what the extension stores, how it processes content, and how users can control or remove data.

## Privacy principles

- Local-first processing: all content matching and detection is performed in the user's browser. No page content is sent to external servers by default.
- User control: users can add/remove custom blocklist entries and must confirm before revealing blurred content.
- Minimal local storage: data stored locally is limited to user-managed lists and optional local logs.

## What is stored locally

- `customBlocklist` (in `chrome.storage.local`): user-added words.
- `abuseLog` (in `chrome.storage.local`): optional local log entries recorded when abusive words are detected. Each log entry contains:
  - `abuser` (best-effort short string from the DOM or `"unknown"`)
  - `words` (list of matched words)
  - `url` (page URL)
  - `timestamp`
- Demo-only localStorage key: `sema_demo_blocklist` (used by `public/demo/`) — stored in the browser page's localStorage, not in extension storage.

## What is NOT collected or transmitted

- The extension does not upload page content, screenshots, or raw text to external servers.
- The extension does not send personally-identifiable telemetry by default.

## Reveal confirmation & user decisions

- When a user clicks a blurred word, the browser shows a confirmation prompt: the user must explicitly confirm to reveal the word.
- Reveal actions are not recorded by default. If requested, reveal events can be logged (developer-configurable).

## How matching works

- The extension loads a built-in `dataset.json` from the extension package and merges it with the `customBlocklist` to build a matcher.
- Matching uses a regex-based approach with escaped dataset entries and word boundaries. For languages without whitespace, matching may be less accurate and requires a different approach (tokenization).

## Where data lives and how to clear it

- Stored in the browser's extension storage (`chrome.storage.local`) which remains on the user's device.
- To clear data:
  - Open the extension service worker background console from `chrome://extensions/` (Developer mode) and run:
    ```javascript
    chrome.storage.local.clear();
    ```
  - Or uninstall the extension to remove most extension storage depending on the browser.
- To clear the demo's localStorage on `public/demo/` open browser devtools → Application → Local Storage → `http://localhost:8080` and remove `sema_demo_blocklist`.

## Optional settings and opt-out

- Developers can add an opt-out toggle in the popup to disable writing to `abuseLog`. If you want this, the extension UI can be updated to allow explicit opt-out.

## Security considerations

- The matcher constructs a regular expression from user-provided words. Special characters from user input are escaped to reduce regex injection risk.
- Extremely large custom lists can degrade performance; we recommend limiting the size of custom blocklists.

## Third parties & external services

- Sema Salama does not use third-party detection services by default. If third-party services are added in the future (e.g., hosted models or analytics), they will be documented here and require user consent.

## Legal requests

- For legal or takedown requests, please open an issue on the repository or contact a maintainer by email (see `README.md`).

---

If you want, I can add a one-line privacy notice into the extension popup (`popup.html`) such as:

> "Privacy: All text matching is performed locally in your browser; no page content is uploaded."

Tell me if you'd like that notice added to the popup and/or an opt-out toggle for `abuseLog`.