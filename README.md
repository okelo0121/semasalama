# 🛡️ Sema Salama (Speak Safely)

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Active-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/lekjghdbiglnoeffhmbnaahcijehogln?utm_source=item-share-cb)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20|%20Edge%20|%20Firefox-lightgrey?style=for-the-badge)](https://github.com/YourUsername/Sema-Salama)
website: https://semasalama.vercel.app/#

> **"Safety is not a slogan. It’s something we build — together — with courage and code."**

**Sema Salama** is a browser-based digital shield designed to protect African women in public life from Online Gender-Based Violence (OGBV). Unlike standard moderation tools, Sema Salama uses a hyper-local lexicon to detect and blur context-specific hate speech in **Swahili, Sheng, and Pidgin**—language nuances that Silicon Valley algorithms often miss.

---

## 🚨 The Problem
African female leaders, journalists, and activists face severe online harassment. Global platforms rely on AI trained primarily on Western English datasets.
* **The Gap:** Algorithms fail to flag localized slurs (e.g., specific derogatory terms in Sheng or tribal dialects).
* **The Impact:** Women are silenced, traumatized, or forced to leave digital public squares.

## 💡 The Solution
**Sema Salama** is a client-side browser extension that acts as a personal "Digital Bodyguard."
* **Real-time Sanitization:** Scans your social media feed (X/Twitter, Facebook, Instagram) as you scroll.
* **Context-Aware:** Detects hyper-local insults and threats using a community-sourced African lexicon.
* **Agency:** Blurs the violence visually but gives the user the power to "click to reveal" if they need to collect evidence.

---

## ✨ Key Features

* **🛡️ The Local Shield:** Uses `MutationObserver` to instantly detect and blur hate speech in the DOM before it triggers a psychological response.
* **👁️ Peep Mode:** Hover/Click functionality allows users to inspect blocked content safely for legal evidence gathering.
* **🌍 Multi-Platform Support:** Works seamlessly on **X (Twitter)**, **Facebook**, and **Instagram** using stable accessibility selectors.
* **🔒 Privacy-First Architecture:** All processing happens **locally on the device**. No browsing data is ever sent to a cloud server.
* **📝 Custom Blocklist:** Users can add their own specific trigger words to a personalized local blocklist.

---

## 🛠️ Tech Stack & Engineering

This project was built using a "Safety by Design" methodology:

* **Frontend:** HTML5, CSS3, JavaScript (ES6+).
* **Core Logic:** `MutationObserver` API (for handling infinite scroll frameworks like React/Twitter).
* **Manifest:** Chrome Extension Manifest V3.
* **Data Structure:** JSON-based local lexicon optimized for O(1) lookup speeds.
* **Cross-Browser:** Compatible with Chrome, Edge, and Firefox.

### How it Works (Under the Hood)
1.  **Injection:** The `content.js` script injects into the active tab matching social media URLs.
2.  **Observation:** The script sets up a `MutationObserver` to watch the DOM `body` for added nodes (new tweets/comments).
3.  **Filtration:** It extracts text from specific accessibility nodes (e.g., `[data-testid="tweetText"]`).
4.  **Sanitization:** Text is compared against `lexicon.json`. If a match is found, a CSS filter `blur(6px)` is applied to the parent node.

---

## 🚀 Installation

### Option A: Install from Chrome Web Store (Recommended)
The extension is fully reviewed and approved by Google.

[![Download from Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQzWRCzO2/guouRb5B58AntF5eT1F9.png)](https://chromewebstore.google.com/detail/lekjghdbiglnoeffhmbnaahcijehogln?utm_source=item-share-cb)

1.  **[Click here to install Sema Salama](https://chromewebstore.google.com/detail/lekjghdbiglnoeffhmbnaahcijehogln?utm_source=item-share-cb)**.
2.  Click the blue **"Add to Chrome"** button.
3.  Pin the shield icon 🛡️ to your browser toolbar for easy access.

### Option B: Developer Mode (Run from Source)
1.  Clone this repository:
    ```bash
    git clone [https://github.com/YourUsername/Sema-Salama.git](https://github.com/YourUsername/Sema-Salama.git)
    ```
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Toggle **"Developer mode"** in the top right.
4.  Click **"Load unpacked"** and select the folder where you cloned the repo.

---

## 🔮 Future Roadmap (The Big Project)

We are evolving Sema Salama from a browser extension to a full Digital Safety Ecosystem.

* **Phase 1 (Complete):** Browser Extension for Desktop protection.
* **Phase 2 (In Progress):** **Android Accessibility App**. Using Android's `AccessibilityService` API to provide system-wide protection on mobile (WhatsApp, SMS, Twitter App).
* **Phase 3:** **Python API & Cloud Intelligence**. Moving the lexicon to a REST API (FastAPI) to allow for real-time updates of new hate speech trends without app updates.

---

## 🤝 Contributing

We believe safety is a community effort. We welcome contributions, especially to our **Lexicon Data**.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AddHausaTerms`).
3.  Commit your Changes (`git commit -m 'Add 20 new Hausa slur terms'`).
4.  Push to the Branch (`git push origin feature/AddHausaTerms`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <b>Built with ❤️ and 💻 for Power Hacks 2025.</b><br>
  <i>"UNiTE to End Digital Violence Against All Women & Girls."</i>
</p>
