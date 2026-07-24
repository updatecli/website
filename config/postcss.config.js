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
        'id',
        'size',
        'type'
    ],
    safelist: [
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
    ]
});

export default {
  plugins: [
    autoprefixer(),
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
