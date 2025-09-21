````markdown
# marksuit  
**Low-code, drag-and-drop Markdown file creator** — create polished Markdown files (README, docs, notes, blog drafts) with a visual editor, export to `.md`, and integrate into your Git/GitHub workflow — no heavy Markdown typing required.

---

[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)  
[![issues](https://img.shields.io/github/issues/<user>/marksuit)](https://github.com/<user>/marksuit/issues)  
[![build status](https://img.shields.io/github/actions/workflow/status/<user>/marksuit/ci.yml)](https://github.com/<user>/marksuit/actions)

---

## 🚀 Features
- Drag & drop block-based editor (Headings, Paragraph, Lists, Code, Table, Image, Quote, Frontmatter)
- WYSIWYG preview and split editor/preview modes
- Export to `.md` file (clean Markdown + optional frontmatter)
- Prebuilt templates (README, Blog Post, Project Docs, Changelog)
- Import existing `.md` to edit visually
- Keyboard-friendly: some Markdown keyboard shortcuts
- Lightweight — designed for maintainers, teachers, and technical writers
- Extensible block/plugin architecture (developer-friendly)
- Optional GitHub integration (PR creation / commit) — configurable

---

## 🖼️ Screenshot / Demo
> Add screenshots or a GIF here to show the UI.

```md
![marksuit editor screenshot](docs/screenshots/editor-1.png)
````

Live demo (if available): `https://your-demo-url.example`

---

## 📦 Quick start (developer)

### Prerequisites

* Node.js `>= 16`
* npm or yarn
* (Optional) Docker

### Run locally

```bash
# clone
git clone https://github.com/<your-username>/marksuit.git
cd marksuit

# install deps
npm install
# or
yarn

# start dev server
npm run dev
# or
yarn dev
```

Open `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run preview
```

---

## 🧩 Usage (user-facing)

* Create a new document → choose a template (README, Blog, Docs)
* Add blocks from the block panel: Heading, Paragraph, List, Code, Table, Image, Frontmatter, etc.
* Reorder blocks by dragging
* Edit block content inline; preview pane shows rendered Markdown
* Export → `.md` (download) or Commit → GitHub repo (if configured)
* Import existing `.md` to re-edit (parses file into blocks)

### Example exported Markdown

```markdown
---
title: "Project Marksuit"
author: "Your Name"
---

# Project Marksuit

Marksuit is a low-code editor for Markdown files. It provides drag & drop blocks, templates, and export.
```

---

## ⚙️ Configuration

* `settings.json`: default export filename, frontmatter fields, template folder
* GitHub integration: personal access token
* Plugin folder: `./plugins` — add block plugins with manifest + export

---

## 🧪 Tests

```bash
npm run test
npm run lint
```

---

## 🛠️ Development notes

* Architecture: `src/` → `components/`, `blocks/`, `store/`, `utils/`
* Blocks contain:

  * `block.model.json` — metadata
  * `BlockComponent.jsx` — UI
  * `block.export.js` — Markdown export
* Templates live in `/templates`
* CI: GitHub Actions

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/<name>`
3. Make changes + add tests
4. Open a Pull Request

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

---

## 📜 License

MIT License. See [`LICENSE`](./LICENSE).

---

## 📈 Roadmap

* Template marketplace
* Collaborative editing
* Better GitHub integration
* Plugin ecosystem
* Export to HTML, PDF

---

## 🧾 Changelog & Releases

Semantic versioning: `vMAJOR.MINOR.PATCH`.
See [`CHANGELOG.md`](./CHANGELOG.md).

---

## 🙏 Acknowledgements

* Inspired by block editors & low-code tools
* Libraries: React, Slate/ProseMirror, Remark, rehype, unified

---

## 📬 Contact

Created by **\ Aibal Jose**
GitHub: [@Aibaljose](https://github.com/aibaljose)



