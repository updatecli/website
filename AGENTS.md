# AGENTS.md

## Repository overview

This repository contains the **Updatecli website**. It is a **Hugo** site using the
**Doks** theme and is deployed on **Netlify**.

- Local development runs through `npm run start`
- Production builds run through `npm run build`
- Netlify publishes the generated `public/` directory

## Key paths

- `content/en/` - English site content
- `content/en/docs/` - product documentation pages
- `content/en/blog/<year>/` - blog posts
- `assets/js/` - custom JavaScript bundled into the site
- `assets/scss/` - SCSS overrides and site styling
- `layouts/` - Hugo layout overrides
- `config/_default/` - shared Hugo configuration
- `config/production/`, `config/next/` - environment-specific Hugo config
- `functions/` - Netlify functions
- `static/` - static assets copied as-is at build time

## Common commands

1. Install dependencies: `npm install`
2. Start local dev server: `npm run start`
3. Build the site: `npm run build`
4. Run all lint checks: `npm run lint`
5. Run repository tests: `npm test`
6. Lint only Markdown: `npm run lint:markdown`
7. Regenerate command docs: `npm run docs`

## Content conventions

- Content files use Hugo front matter at the top of each document.
- Documentation and blog content primarily live under `content/en/`.
- Blog posts are organized by year under `content/en/blog/`.
- The repo includes Markdown content and may also include AsciiDoc content.
- Keep root Markdown files lint-friendly because `*.md` is covered by the
  markdown lint command.

## Frontend conventions

- JavaScript in `assets/js/`, `config/`, and `functions/` is linted with ESLint.
- SCSS changes should follow the structure already used in `assets/scss/common/`,
  `assets/scss/components/`, and `assets/scss/layouts/`.
- Site-specific style overrides belong in the existing custom SCSS files when
  appropriate instead of introducing parallel styling patterns.

## Configuration notes

- Hugo configuration is split across multiple TOML files under `config/_default/`.
- Language configuration currently points English content to `content/en`.
- The site enables Git info, Netlify redirects/headers outputs, and Hugo image
  processing through existing config.
- Netlify development proxies the Hugo server on port `1313` through port `8888`.

## When making changes

- Prefer small, targeted edits that match existing Hugo, Doks, and content
  patterns.
- Update the relevant content, layout, assets, and config together when a change
  spans multiple site surfaces.
- Run the narrowest relevant command first, then broader validation as needed:
  Markdown lint for docs-only changes, full lint for frontend/config changes,
  and a Hugo build for rendering-sensitive changes.
- If updating CLI command reference pages, check whether `npm run docs` should be
  used instead of editing generated command docs manually.
