# Support — Sema Salama

If you need help using Sema Salama, reporting a bug, or requesting a feature, follow the guidance below so the team can help quickly.

## Preferred support channel

- Open an issue in the repository: `https://github.com/okelo0121/semasalama`.
- When creating an issue include:
  - Browser (Chrome/Edge/Firefox) and version
  - Operating system and version
  - Steps to reproduce (exact page or a reduced HTML snippet)
  - Expected vs actual behaviour
  - Screenshots or short screen recording (if possible)
  - Any console errors from the extension service worker or content scripts

## Quick troubleshooting

- Manifest not found when loading unpacked:
  - Make sure you selected the folder that directly contains `manifest.json` (project root: `semasalama`).
- Extension looks like it blurred the whole page:
  - Reload the extension in `chrome://extensions/` (Developer mode) and confirm `content.js` is the latest file. Use the service worker console for messages.
- Demo not showing matches:
  - Serve the `public/` folder (e.g. `npx http-server public -p 8080`) and open `http://localhost:8080/demo/index.html`.

## How to gather useful debug info

1. Reproduce the problem and open the extension service worker console:
   - Go to `chrome://extensions/` → enable **Developer mode** → find Sema Salama → click **Service worker** (or **background page**) to open devtools.
2. Check Console and Network for errors and copy relevant messages into your issue.
3. If the problem involves a specific page, provide a minimal HTML snippet or URL and the exact steps you took.

## Repro & test commands (PowerShell)

- Serve demo locally:
```powershell
npx http-server public -p 8080
Start-Process 'http://localhost:8080/demo/index.html'
```
- Force a re-scan from the console:
```javascript
chrome.runtime.sendMessage({ type: 're-scan' });
```
- Inspect stored extension data (service worker console):
```javascript
chrome.storage.local.get(null, items => console.log(items));
```
- Clear stored extension data:
```javascript
chrome.storage.local.clear();
```

## Reporting security issues

If you find a security vulnerability, please open a private issue or contact a maintainer by email (see `README.md`) and mark the issue `security` so the team can prioritize it.

## Want a demo or presentation materials?

- Use `public/demo/` to create a reproducible demo that does not require installing the extension.
- If you need a short recorded demo, list the features you want shown and I can prepare a short script and the exact commands to reproduce them.

---

Thank you for using Sema Salama. Please include as much detail as possible when opening issues — it helps the team fix problems faster.