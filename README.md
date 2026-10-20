# Hacking For Ramen blog

Source for [z3v5.github.io](https://z3v5.github.io) — a security-research blog built with Jekyll
and styled as a Windows 98 desktop (draggable windows, a "My Posts" Explorer, Notepad-style post
viewer, taskbar/Start menu). Posts are served from `_posts/` using GitHub Pages.

## Structure

- `_posts/` — blog posts (Markdown, one per Hashnode/telegra.ph article migrated into Jekyll).
- `_layouts/` — `default.html` (desktop shell) and `post.html` (standalone single-post view).
- `assets/css/desktop.css`, `assets/js/desktop.js` — the Win98 desktop/window manager UI.
- `assets/images/` — post images.

## Local preview

GitHub Pages builds this with Jekyll automatically. There is no local build step required for
editing content — push to `main` and Pages rebuilds the site.
