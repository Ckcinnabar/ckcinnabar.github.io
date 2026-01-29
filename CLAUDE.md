# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Kuan-Chen Chen (Data Scientist/ML Engineer). Static site hosted on GitHub Pages at ckcinnabar.github.io.

## Development

No build process required. Open `index.html` directly in browser or use any local server.

## Architecture

### Core Files
- `index.html` - Main portfolio page
- `style.css` - Main stylesheet (dark theme, CSS variables)
- `script.js` - All JavaScript functionality

### Project Pages
- `projects/*.html` - Individual project detail pages (cauldron, darts, speech-emotion)
- `projects/project-style.css` - Shared styles for all project pages

### Assets
- `photos/` - Images including school logos (NSYSU-Logo.png, uf-university-of-florida.webp) and graduation photo

## Key Patterns

### Bilingual Support
All translatable text uses `data-en` and `data-zh` attributes:
```html
<p data-en="English text" data-zh="中文文字">English text</p>
```
Language toggle stores preference in `localStorage.getItem('language')`.

### JavaScript Classes (script.js)
- `Portfolio` - Main controller, initializes all features
- `TypewriterEffect` - Rotating text animation in hero section
- `EducationModal` - Modal popup for education details
- `ExperienceModal` - Modal popup for experience/timeline items
- `ProjectNavigation` - Click handling for project cards

### CSS Variables (style.css)
Primary theme colors:
- `--primary: #38bdf8` (sky blue)
- `--bg-primary: #050505` (dark background)
- `--text-primary: #ffffff`

### Modal System
Modals use `.modal.active` class for visibility. Created dynamically by `EducationModal` and `ExperienceModal` classes.

### Fonts
- Main site: Syne (headings) + Source Serif 4 (body)
- Project pages: Frank Ruhl Libre (headings) + Lora (body)

## Deployment

Push to `main` branch automatically deploys to GitHub Pages.
