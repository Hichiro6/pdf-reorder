# PDF Reorder

> Rotate, reorder, and remove PDF pages in your browser — 100% local, privacy-first

<div align="center">

![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red)
![Platform](https://img.shields.io/badge/Platform-Web-green)
![Tests](https://img.shields.io/badge/Tests-Playwright%20%7C%20Vitest-blue)

**Your files never leave your browser — no uploads, no servers, no tracking**

</div>

---

## 🔒 Privacy-First Design

Pages out of order? A few pages rotated the wrong way? Unwanted pages mixed in?

PDF Reorder lets you **rearrange, rotate, and delete pages** directly in your browser using [pdf-lib](https://pdf-lib.js.org/) and [PDF.js](https://mozilla.github.io/pdf.js/). Your files stay on your device — nothing is uploaded to any server.

---

## ⚡ Key Features

- **🔒 100% Local Processing** — All operations happen in your browser
- **🔀 Drag-and-Drop Reordering** — Move pages to any position visually
- **🔄 Rotate Pages** — Rotate selected pages ±90° and apply in one click
- **🗑️ Remove Pages** — Select and delete unwanted pages before export
- **☑️ Smart Selection** — Select all, deselect all, or pick individual pages
- **👁️ Live Thumbnails** — Preview every page as you work
- **📄 Custom Output Name** — Name the exported PDF before downloading
- **♿ Accessible** — ARIA-compliant, keyboard navigation, screen reader support
- **🌐 Multi-Language** — Supports EN, FR, DE, ES, PT, NL, IT

---

## 🚀 Quick Start

### Local Development
```bash
git clone https://github.com/Hichiro6/pdf-reorder.git
cd pdf-reorder

npm install
npm run dev
```

---

## 📖 Usage Guide

### Step 1: Upload Your PDF
Drag and drop a PDF onto the dropzone (or click to browse). Every page is rendered as a thumbnail card.

### Step 2: Organize the Pages
- **Reorder**: drag page cards into the desired order
- **Rotate**: select pages, then rotate left/right — apply the rotation to all selected pages at once
- **Remove**: deselect (or remove) pages you want to exclude from the export

### Step 3: Export
Choose an output filename and click **Save & Download** to generate the final PDF.

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **[Vite](https://vitejs.dev/)** | Build tool & dev server |
| **[pdf-lib](https://pdf-lib.js.org/)** | PDF manipulation (reorder/rotate/delete) |
| **[PDF.js](https://mozilla.github.io/pdf.js/)** | PDF rendering & page thumbnails |
| **[Biome](https://biomejs.dev/)** | Linting & formatting |
| **[Vitest](https://vitest.dev/)** | Unit testing |
| **[Playwright](https://playwright.dev/)** | E2E testing |

---

## 🧪 Testing

```bash
# Unit tests (i18n, helpers)
npm run test:run

# E2E suite (upload, reorder, rotation, removal, export, edge cases)
npm run test:e2e

# Interactive UI mode
npm run test:ui
```

---

## 📂 Project Structure

```
pdf-reorder/
├── src/
│   ├── main.js           # Application logic
│   └── i18n.js           # Internationalization
├── styles/
│   └── main.css          # Global styles
├── public/
│   ├── manifest.json     # PWA manifest
│   └── favicon.svg
├── tests/
│   ├── unit/             # Unit tests
│   └── e2e/              # Playwright E2E tests + fixtures
├── vite.config.js        # Vite configuration
├── playwright.config.js  # Playwright configuration
└── biome.json            # Biome linting rules
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (HMR enabled) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |
| `npm run test:run` | Run unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |

---

## 📝 Use Cases

- **Scanned documents** — Fix pages that were scanned upside-down or in the wrong order
- **Contracts** — Remove extra/blank pages before sending
- **Reports** — Reorder sections to match a required structure
- **Archives** — Clean up mixed-up PDFs without re-scanning

---

## 🔐 Security & Privacy

- ✅ **No network calls** — All processing is local
- ✅ **No analytics** — No tracking or telemetry
- ✅ **No cookies** — Nothing stored externally
- ✅ **Open source** — Code is auditable
- ✅ **Client-side only** — No backend requirements

---

## 📄 License

Copyright © 2026 Hichiro6

Licensed under **CC BY-NC-ND 4.0** — You are free to share this work for non-commercial purposes, provided you give attribution. No derivative works.

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) — PDF manipulation library
- [PDF.js](https://mozilla.github.io/pdf.js/) — Mozilla's PDF toolkit
- [Vite](https://vitejs.dev/) — Next-generation frontend tooling

---

<div align="center">

**Made with ❤️ for privacy-conscious users**

[Report Bug](https://github.com/Hichiro6/pdf-reorder/issues) · [Request Feature](https://github.com/Hichiro6/pdf-reorder/issues)

</div>
