import autoprefixer from 'autoprefixer';
import purgeCSSPlugin from '@fullhuman/postcss-purgecss';

const purgecss = purgeCSSPlugin({
    content: ['./hugo_stats.json'],
    defaultExtractor: (content) => {
        const els = JSON.parse(content).htmlElements;
        return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
    },
    dynamicAttributes: [
        'aria-expanded',
        'data-bs-popper',
        'data-bs-target',
        'data-bs-theme',
        'data-dark-mode',
        'data-global-alert',
        'data-pane',
        'data-popper-placement',
        'data-sizes',
        'data-toggle-tab',
        // Asciidoctor stamps the source language onto the <code> of a listing
        // block. The extractor below only reads the tag/class/id lists out of
        // hugo_stats.json, so it never sees attribute values and would drop the
        // shell-block rules in the "AsciiDoc code blocks" section of
        // assets/scss/common/_custom.scss.
        'data-lang',
        'id',
        'size',
        'type'
    ],
    safelist: {
        standard: [
            'active',
            'btn-clipboard',
            'clipboard',
            'disabled',
            'hidden',
            'modal-backdrop',
            'selected',
            'show',
            'img-fluid',
            'blur-up',
            'lazyload',
            'lazyloaded',
            'alert-link',
            'container-fw',
            'container-lg',
            'container-fluid',
            'offcanvas-backdrop',
            'figcaption',
            'dt',
            'dd',
            'showing',
            'hiding',
            'page-item',
            'page-link',
            'not-content',
            'copy',
            'btn-copy',
            // Updatecli / asciinema embeds and custom shortcodes
            'asciinema-player',
            'table',
            'thead',
            'tbody',
        ],
        // Asciidoctor code blocks (see the "AsciiDoc code blocks" section in
        // assets/scss/common/_custom.scss). `listingblock` and `literalblock` do
        // reach hugo_stats.json, but keep the whole family regardless: those rules
        // only ever apply to asciidoctor output, so there is nothing to gain from
        // purging them piecemeal.
        greedy: [/listingblock/, /literalblock/],
    }
});

export default {
  plugins: [
    autoprefixer(),
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
