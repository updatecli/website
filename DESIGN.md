---
name: Updatecli
description: Continuously update everything
colors:
  updatecli-green-day: "#0b7a55"
  updatecli-green-day-deep: "#095e42"
  updatecli-green-night: "#39ffb6"
  updatecli-green-night-deep: "#20c98c"
  signal-cyan-day: "#0e6e99"
  signal-cyan-night: "#5ad1ff"
  paper-day: "#f4f9ff"
  surface-day: "#ffffff"
  ink-day: "#1d2d35"
  board-night: "#070b12"
  panel-night: "#0f1624"
  ink-night: "#c1c3c8"
  heading-night: "#ffffff"
  error-day: "#be2626"
  error-night: "#ff5d7a"
  info-day: "#1a6fd1"
  info-night: "#7ccbff"
  success-day: "#2a732e"
  success-night: "#3fb27a"
  warning-day: "#915806"
  warning-night: "#ffc857"
typography:
  display:
    fontFamily: "Orbitron, Space Grotesk, sans-serif"
    fontSize: "calc(1.875rem + 1.5vw)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Space Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(1.375rem + 1.5vw)"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Space Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(1.3rem + 0.6vw)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Space Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  lead:
    fontFamily: "Space Grotesk, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
  wordmark:
    fontFamily: "Orbitron, Space Grotesk, sans-serif"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  none: "0"
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "3rem"
components:
  button-primary-day:
    backgroundColor: "{colors.updatecli-green-day}"
    textColor: "{colors.surface-day}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  button-primary-day-hover:
    backgroundColor: "{colors.updatecli-green-day-deep}"
  button-primary-night:
    backgroundColor: "{colors.updatecli-green-night}"
    textColor: "{colors.board-night}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  button-primary-night-hover:
    backgroundColor: "{colors.updatecli-green-night-deep}"
  button-primary-lg:
    rounded: "{rounded.lg}"
    padding: "0.5rem 1rem"
    typography: "{typography.lead}"
  code-frame-night:
    backgroundColor: "{colors.panel-night}"
    textColor: "{colors.ink-night}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1rem"
  alert-banner-day:
    backgroundColor: "{colors.updatecli-green-day}"
    textColor: "{colors.surface-day}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
  alert-banner-night:
    backgroundColor: "{colors.updatecli-green-night}"
    textColor: "{colors.board-night}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "1rem 1.5rem"
---

# Design System: Updatecli

## Overview

**Creative North Star: "The Signal Board"**

The site is a control-room status board. Surfaces are quiet: near-black at night, a cool pale paper by day. The one saturated colour, Updatecli Green, lights up only where the reader can act: a link, the primary button, the active page in the navigation, the tab of the code block they are reading. Everything else stays in ink and panel tones, so the signal stays legible.

The mood is calm, precise, technical and confident. Calm because the practitioner is mid-task and the page must not compete with their manifest. Precise because type, spacing and borders are exact, with nothing decorative. Technical because monospace carries the machine's voice: code, labels, the banner. Confident because when green appears, it appears at full strength, neon at night and deep pine by day, never tinted down.

The system is shared with Udash, the Updatecli dashboard, and Udash is the reference: its Vuetify theme (`udash-front/src/plugins/vuetify.js`) is the source of every colour here. Tokens live in `assets/scss/updatecli/_tokens.scss` and are exposed as `--updatecli-*` custom properties by `assets/scss/updatecli/_theme.scss`, independently of the current Doks theme. The site must never drift toward SaaS marketing gloss, neon overload, or a generic blue docs theme.

**Key Characteristics:**
- Two complete colour modes, light (day) and dark (night), switched by the navbar toggle and defaulting to the system preference.
- One accent, Updatecli Green, used sparingly and at full strength.
- Space Grotesk for reading, JetBrains Mono for anything the machine says, Orbitron only for the wordmark.
- Flat at rest; depth comes from tonal layering, never from shadows.
- Code blocks are square, bordered panels. Interactive controls are softly rounded.

## Colors

A near-monochrome board of ink and panel tones, with one green signal and a cyan secondary, each tuned separately for day and night.

### Primary
- **Updatecli Green, Day** (`updatecli-green-day`): links, primary buttons, the active navigation item, the Star on GitHub banner, and the accent line on code-block tabs in light mode. Carries white text at 5.3:1.
- **Updatecli Green, Day Deep** (`updatecli-green-day-deep`): hover and pressed states of day-green controls, and the strong accent in the code-block chrome.
- **Updatecli Green, Night** (`updatecli-green-night`): the same roles in dark mode. It is a light colour, so it carries dark text (`board-night`), never white.
- **Updatecli Green, Night Deep** (`updatecli-green-night-deep`): hover state and the accent low end in dark mode.

### Secondary
- **Signal Cyan** (`signal-cyan-day`, `signal-cyan-night`): the secondary accent inherited from Udash. It tints the light-mode code panels and hairlines faintly (6% and 18% mixes into `paper-day`) and is available for secondary actions. It never competes with green for the reader's attention.

### Neutral
- **Paper, Day** (`paper-day`): the light-mode page background, a cool off-white.
- **Surface, Day** (`surface-day`): cards, dropdowns and the top of the light-mode tonal stack.
- **Ink, Day** (`ink-day`): light-mode body text.
- **Board, Night** (`board-night`): the dark-mode page background, a blue-black.
- **Panel, Night** (`panel-night`): dark-mode code blocks, sidebar surfaces, borders and subtle fills. One step up from the board.
- **Ink, Night** (`ink-night`): dark-mode body text, a soft grey that keeps long pages easy on the eyes.
- **Heading, Night** (`heading-night`): dark-mode headings, pure white for hierarchy against the softer body ink.

### Status
- **Error, Info, Success, Warning** (`error-*`, `info-*`, `success-*`, `warning-*`): Bootstrap's `danger`, `info`, `success` and `warning` roles, with day and night values from Udash. Use them only for real status (callouts, validation), never as decoration.

### Named Rules
**The One Signal Rule.** Green marks what the reader can act on or where they are. If a green element is neither interactive nor "you are here", it should not be green.

**The Full Strength Rule.** Never tint or fade Updatecli Green to make it quieter. Use less of it instead.

**The Dark Text on Neon Rule.** In dark mode, text on `updatecli-green-night` is `board-night`. White on neon mint fails contrast.

## Typography

**Display Font:** Space Grotesk (with Segoe UI, system-ui, sans-serif)
**Body Font:** Space Grotesk (same stack)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular, Menlo, monospace)
**Wordmark:** Orbitron 700, letter-spacing 0.04em

**Character:** Space Grotesk is a grotesque with engineered quirks (the single-storey `y`, squared terminals). It reads as technical without being monospace, so prose and headings feel like one voice. JetBrains Mono takes over wherever the machine speaks.

All faces are self-hosted from `@fontsource` packages (latin subset, woff2), because the site's CSP only allows fonts from its own origin. Loaded weights: Space Grotesk 400, 500, 600, 700; JetBrains Mono 400, 500; Orbitron 700.

### Hierarchy
- **Display** (Orbitron 700, `calc(1.875rem + 1.5vw)`, 1.2, 0.04em tracking): the home page title only. It is the product name standing as a logo, so it uses the wordmark face.
- **Headline** (700, `calc(1.375rem + 1.5vw)`, 1.2): page titles (`h1`).
- **Title** (700, `calc(1.3rem + 0.6vw)` for `h3`, `calc(1.325rem + 0.9vw)` for `h2`): section headings in docs and posts.
- **Lead** (400, 1.25rem): the tagline and page leads.
- **Body** (400, 1rem, 1.5): prose, navigation and tables. Docs content is capped by the grid column rather than by a character count.
- **Label** (JetBrains Mono 400, 0.875rem): inline code, code blocks, the alert banner, and any value the reader will copy.

### Named Rules
**The Machine Voice Rule.** Anything Updatecli reads or prints (manifest keys, commands, values, log lines) is set in JetBrains Mono. Human explanation is set in Space Grotesk. Never swap them.

**The Wordmark Only Rule.** Orbitron is for the product name standing as a logo (the navbar brand and the home page title), never for other headings or UI text.

## Layout

A 16-column Bootstrap grid with a 3rem gutter and a fluid container. Docs pages use three columns: the section navigation on the left (5 of 16 columns from `lg`), the content in the middle, and a sticky "On this page" table of contents on the right from `xl`. Between 992px and 1199px the content takes 11 columns beside the sidebar and the table of contents is hidden. Below `lg` the sidebar collapses into an offcanvas menu.

The base spacing unit is 1rem, stepping through 0.25, 0.5, 1, 1.5 and 3rem. Headings carry 1.125rem of space below them. Parameter tables scroll horizontally inside their own box on narrow screens (minimum width 34rem), so the page itself never scrolls sideways.

## Elevation & Depth

The system is flat. Depth comes from tonal layering: at night the page is `board-night` and every raised surface (code blocks, sidebar, inline code) is one step up in `panel-night`. By day the page is `paper-day`, cards are `surface-day`, and code panels take a faint cyan tint. Hairline borders separate regions; there are no drop shadows at rest.

### Named Rules
**The Flat at Rest Rule.** Surfaces sit flat. A subtle lift or glow may appear only as a response to state (hover or keyboard focus) on interactive elements, and must stay restrained enough that a page of links never looks like it is floating.

## Shapes

Two corner languages, split by role. Interactive controls (buttons, inputs, dropdowns) are softly rounded: 0.375rem, and 0.5rem for large buttons. Content frames (code blocks, their filename tabs, the terminal title bar, the alert banner) are square with a 1px border. That squareness is what makes a code block read as a panel on the board rather than a card.

Shell blocks get a terminal title bar with three dots. Titled blocks get a filename tab drawn flush on the frame, with a 1px green accent line on top.

## Components

Tactile but restrained: flat at rest, clear on interaction.

### Buttons
- **Shape:** softly rounded (0.375rem; 0.5rem for `btn-lg`).
- **Primary:** Updatecli Green with white text by day, neon green with `board-night` text at night. Padding 0.375rem 0.75rem, or 0.5rem 1rem at 1.25rem type for the large home-page call to action.
- **Hover / Focus:** the colour steps to the deep variant. Keyboard focus on buttons, icon buttons and navigation links is a 2px outline in Updatecli Green, offset by 2px, which follows the colour mode. Never remove it.
- **Outline primary:** a green border and green text, filling on hover. Text flips to `board-night` at night.

### Code blocks
- **Style:** square frame, 1px border, `panel-night` at night and a cyan-tinted paper by day, JetBrains Mono at 0.875rem.
- **Chrome:** a filename tab when the block has a title, a three-dot terminal bar for shell blocks. The copy button appears on hover (always visible on touch) in the top right corner.
- **Inline code:** a small pill in the panel tone. Never green.

### Navigation
- **Top bar:** the brand on the left, then Space Grotesk links at 400 weight in ink. Hover and the active section turn green; on Udash pages the Udash entry is active, not Docs. The icons on the right (search, colour-mode toggle, community, GitHub) use the same ink-to-green behaviour. The header carries no call to action: the only "Get started" button is on the home page, under the title.
- **Section sidebar:** bold collapsible groups, nested links indented with a 1px hairline on the left. The current page is green at 500 weight.
- **Table of contents:** hairline-separated entries; the section in view is green.
- **Top-menu ownership:** a main menu entry can own a URL prefix (`activePath`). On those pages it is the only active entry, so Support (`/docs/help/support/`) and Udash (`/docs/udash/`) light up instead of Docs.
- **Same shell everywhere:** Support is a Help page and uses the docs menu. Changelog pages use the docs shell too, with a release menu built from the release pages (newest first, the current release always listed, then "All releases"). The index is a plain list of releases with dates and a neutral "Latest" label, never a table.

### Alert banner
The dismissable Star on GitHub banner runs the full width in solid Updatecli Green, set in JetBrains Mono at 0.875rem with an underlined link. It is the one place green is used as a fill across a whole region.

### Numbered steps
For a sequence whose order is part of the model (Source, Condition, Target): each item carries a small hairline circle with its number in JetBrains Mono, a bold title, and the description in the secondary ink. Used only where the order matters, never as section numbering.

### Pipeline diagram
The stages of a pipeline (`{{< pipeline-diagram >}}`), drawn in HTML and CSS, never as an image, so it follows the colour mode. Square panels with a 1px border, each naming its manifest key in JetBrains Mono above the stage name and a one-line description, joined by thin grey arrows: a row from `md`, a column below. The optional Action stage has a dashed border and no fill, and the Condition panel carries its "not met" branch under a dashed rule. No green: nothing in it is actionable.

### Link list
The home page's documentation front door: a plain list, each row a green link with a one-line description underneath in the secondary ink, separated by hairlines. At most four rows per group. It replaces cards: there are no card grids on the site.

### Wordmark
The product name as a logo, in Orbitron 700 with 0.04em tracking, matching Udash's app bar. In the navbar it follows the logo (`static/images/updatecli_64.png`, shown at 32px) with a 0.5rem gap, on every page including the home page.

### Menu badge
A main menu entry can carry a small outlined label after its name: 0.6875rem Space Grotesk at 500, a 1px border at half opacity and a 0.25rem radius, in the warning colour. It marks real status, today only "Experimental" on the Udash entry, and is never green. A neutral variant in the ink colour labels the newest release "Latest" on the changelog index.

## Do's and Don'ts

### Do:
- **Do** take every colour from the `--updatecli-*` custom properties or the `$updatecli-*` Sass maps. Never hard-code a hex that already exists as a token.
- **Do** design and check every change in both day and night modes.
- **Do** put text on night green in `board-night`, and text on day green in white.
- **Do** set commands, manifest keys and values in JetBrains Mono.
- **Do** keep code blocks square and bordered, and interactive controls softly rounded.
- **Do** self-host any new font or asset.

### Don't:
- **Don't** add gradients, glassmorphism, stock illustration or other SaaS marketing gloss.
- **Don't** spread green onto decoration, headings or large backgrounds (neon overload). The alert banner is the only full-width green fill.
- **Don't** add glowing text, neon shadows or other cyberpunk effects.
- **Don't** fall back to the default blue docs-theme look. Any leftover Doks blue is a bug.
- **Don't** add drop shadows to resting surfaces.
- **Don't** use Orbitron for anything but the wordmark.
- **Don't** put Doks-specific styling in `assets/scss/updatecli/`. It belongs in the marked Doks adapter.
