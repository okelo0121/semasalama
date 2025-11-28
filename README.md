# Sema Salama Chrome & Firefox Extension

Sema Salama is a browser extension that detects and blurs local-language hate speech on social media platforms, with a focus on privacy and user control. Built with React, TypeScript, and Vite.

## Features

*   **Blur Filter:** Automatically blurs detected abusive text directly within comments on social media and other websites.
*   **Reveal Button:** A "👁 Reveal" button appears next to each blurred comment to view the original text.
*   **Personal Blocklist:** Users can add custom words to their blocklist via the extension popup.
*   **Abuse Log:** The extension logs abusive comments with information about the abuser (if detectable), the words used, the URL, and the time. Users can view and clear these logs from the popup.
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

1. **Blurred Comments:** Abusive words are automatically blurred when detected.  
2. **Reveal Comments:** Click the "👁 Reveal" button to temporarily view the original comment.  
3. **Manage Blocklist:** Open the extension popup to add or remove custom words from your personal    blocklist.  
4. **View Abuse Logs:** In the popup, scroll to the "Abuse Log" section to see a history of abusive comments. Use the "Clear Abuse Log" button to delete all entries.


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

## Deployment

### Chrome Web Store

1.  **Prepare Your Extension:**
    - Ensure `manifest.json` has the correct version number
    - Build the extension: `npm run build`
    - Remove development files

2.  **Package Your Extension:**
    - Create a `.zip` file containing the built extension files and `images/` folder

3.  **Publish:**
    - Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
    - Sign in with your Google account (one-time registration fee required)
    - Click "Add new item" and upload the `.zip` file
    - Fill out store listing information
    - Submit for review (typically 1-3 days)

### Firefox Add-ons

1.  Build the extension for Firefox using files in the `firefox/` directory
2.  Submit to [Firefox Add-ons](https://addons.mozilla.org/)
3.  Follow Mozilla's review guidelines and submission process

## Contributing

Contributions are welcome! Please ensure code passes linting and type checking:

```bash
npm run lint
npm run typecheck
```
