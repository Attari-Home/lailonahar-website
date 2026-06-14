/* Fleet category filter — Vanilla JS, no dependencies.
   Attaches to any [data-fleet-grid] with [data-filter] buttons. */
(function () {
    function initFleetFilter() {
        const grid = document.querySelector('[data-fleet-grid]');
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll('[data-category]'));
        const buttons = Array.from(document.querySelectorAll('[data-filter]'));
        if (!buttons.length) return;

        function applyFilter(category) {
            cards.forEach((card) => {
                const cat = card.getAttribute('data-category');
                const avail = card.getAttribute('data-availability');
                let match = category === 'all' || cat === category;
                if (category === 'available') match = avail === 'available';
                card.toggleAttribute('hidden', !match);
                card.classList.toggle('filtered-out', !match);
            });
        }

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => {
                buttons.forEach((b) => {
                    b.classList.remove('is-active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('is-active');
                btn.setAttribute('aria-pressed', 'true');
                applyFilter(btn.getAttribute('data-filter') || 'all');
            });
        });
    }

    document.addEventListener('astro:page-load', initFleetFilter);
})();
