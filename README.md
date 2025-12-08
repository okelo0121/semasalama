# Sema Salama Chrome & Firefox Extension

[![CI](https://github.com/okelo0121/semasalama/actions/workflows/ci.yml/badge.svg)](https://github.com/okelo0121/semasalama/actions/workflows/ci.yml)
## Project Website
Check out the live here:  
[Live Extension](https://chrome.google.com/webstore/detail/lekjghdbiglnoeffhmbnaahcijehogln)

Sema Salama is a browser extension that detects and blurs local-language hate speech on social media platforms, with a focus on privacy and user control. Built with React, TypeScript, and Vite.

## Features

*   **Blur Filter:** Automatically blurs detected abusive text directly within comments on social media and other websites.
*   **Abuse Log:** The extension logs abusive comments with information about the abuser (if detectable), the words used, the URL, and the time. Users can view and clear these logs from the popup.
*   **Reveal Button:** A "👁 Reveal" button appears next to each blurred comment to view the original text.
*   **Personal Blocklist:** Users can add custom words to their blocklist via the extension popup.
*   **Expanded Dataset:** Includes abusive words in multiple African languages and English for broader coverage.
*   **All URLs Support:** Works on all websites, not just social media platforms.
*   **Privacy-Focused:** All processing happens locally in your browser. No data is ever sent to a server.
*   **Cross-Browser Support:** Compatible with Chrome and Firefox.
*   **Modern Stack:** Built with React, TypeScript, and Tailwind CSS for a robust and maintainable codebase.

## Project Structure

```
src/
  ├── components/       # React UI components
  │   └── ui/          # Reusable UI components
  ├── hooks/           # Custom React hooks
  ├── lib/             # Utility functions
  ├── App.tsx          # Main application component
  └── main.tsx         # Application entry point
firefox/              # Firefox-specific extension files
manifest.json         # Chrome extension manifest (v3)
package.json          # Dependencies and build scripts
vite.config.ts        # Vite build configuration
```

## Prerequisites

*   Node.js (v16 or higher)
*   npm or bun package manager

## Development Setup

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd semasalama
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Build the extension:
    ```bash
    npm run build
    ```

## Available Scripts

*   `npm run dev` - Start the development server
*   `npm run build` - Build for production
*   `npm run typecheck` - Run TypeScript type checking
*   `npm run lint` - Run ESLint to check code quality
*   `npm run preview` - Preview the production build

## Using the Extension

1. **Automatic Blurring of Abusive Text**  
   The extension scans web pages in real-time and automatically blurs comments or text that contain abusive words from the built-in dataset or your personal blocklist. This works on social media platforms and most other websites.

2. **Reveal Blurred Comments**  
   For blurred text, a "👁 Reveal" button appears. Click it to temporarily view the original content. Once revealed, the text remains visible until you navigate away or refresh the page.

3. **Manage Your Personal Blocklist**  
   Open the extension popup to add new words or remove existing ones from your custom blocklist. Words in your blocklist are automatically blurred across all supported sites.

4. **View and Clear Abuse Logs**  
   The extension keeps a log of abusive comments it detects, including the abuser (if identifiable), the words used, the page URL, and the timestamp. Access this log in the popup under the "Abuse Log" section and clear entries as needed.

5. **Privacy-Focused**  
   All processing happens locally in your browser. No data is ever sent to a server, ensuring that your personal blocklist and abuse logs remain private.

## Installation

### Chrome

1.  Build the extension:
    ```bash
    npm run build
    ```

2.  Open Chrome and navigate to `chrome://extensions`.

3.  Enable "Developer mode" in the top right corner.

4.  Click "Load unpacked" and select the project directory.

5.  The Sema Salama extension should now be active!

### Firefox

1.  Navigate to the `firefox/` directory for Firefox-specific files.

2.  Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.

3.  Click "Load Temporary Add-on" and select the `manifest.json` from the `firefox/` directory.

## Configuration

The extension uses the following configuration files:

*   `manifest.json` - Extension permissions and metadata
*   `vite.config.ts` - Build tool configuration
*   `tsconfig.json` - TypeScript configuration
*   `tailwind.config.ts` - Tailwind CSS configuration

## Icons

The icons for this extension are located in the `images` directory. The manifest uses `images/logo.png` for all icon sizes. You can replace these with your own icons if desired.


## Contributing

Contributions are welcome! Please ensure code passes linting and type checking:

```bash
npm run lint
npm run typecheck
```

## Contributors

| Name               | Role                | Email                       |
|--------------------|---------------------|-----------------------------|
| Viola Chepchirchir | Backend Development | violachepchirchir00@gmail.com     |
| Sunday Mapunda     | Frontend Developer  | sunnyjumapili@gmail.com           |
| Okelo Angelo       | Backend Developer   | okelloulak2004@gmail.com          |
| Sharon Nkatha      | UI/UX Designer      | nkathasharon42@gmail.com           |
| Einstein Dipondo   | UI/UX Designer      | einstenmarto30@gmail.com           |
| Raymond Mbai       | Database Engineer   | Salimr80@yahoo.com                 |
| Nelly Longesele    | Backend Development | nellylongesele@gmail.com                               |
