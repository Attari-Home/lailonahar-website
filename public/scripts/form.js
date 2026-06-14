/* Contact form — client-side validation + Web3Forms async submit.
   Progressive enhancement: the form still POSTs natively if JS fails. */
(function () {
    function initContactForm() {
        const form = document.querySelector('[data-contact-form]');
        if (!form || form.dataset.bound === 'true') return;
        form.dataset.bound = 'true';

        const statusEl = form.querySelector('[data-form-status]');
        const successEl = document.querySelector('[data-form-success]');
        const submitBtn = form.querySelector('[type="submit"]');

        function setError(field, message) {
            const wrapper = field.closest('[data-field]');
            if (!wrapper) return;
            const errEl = wrapper.querySelector('[data-error]');
            field.setAttribute('aria-invalid', 'true');
            if (errEl) errEl.textContent = message;
        }

        function clearError(field) {
            const wrapper = field.closest('[data-field]');
            if (!wrapper) return;
            const errEl = wrapper.querySelector('[data-error]');
            field.removeAttribute('aria-invalid');
            if (errEl) errEl.textContent = '';
        }

        function validate() {
            let valid = true;
            const required = form.querySelectorAll('[required]');
            required.forEach((field) => {
                clearError(field);
                if (!field.value.trim()) {
                    setError(field, 'This field is required.');
                    valid = false;
                } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    setError(field, 'Please enter a valid email address.');
                    valid = false;
                } else if (field.dataset.phone !== undefined && !/^[+()\d\s-]{7,}$/.test(field.value)) {
                    setError(field, 'Please enter a valid phone number.');
                    valid = false;
                }
            });
            return valid;
        }

        form.addEventListener('input', (e) => {
            if (e.target.hasAttribute('required')) clearError(e.target);
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (statusEl) statusEl.textContent = '';
            if (!validate()) {
                if (statusEl) statusEl.textContent = 'Please correct the highlighted fields.';
                return;
            }

            const original = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });
                const data = await res.json().catch(() => ({}));
                if (res.ok && (data.success === undefined || data.success)) {
                    form.hidden = true;
                    if (successEl) {
                        successEl.hidden = false;
                        successEl.focus?.();
                    }
                    if (window.dataLayer) window.dataLayer.push({ event: 'quote_form_submit' });
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (err) {
                if (statusEl)
                    statusEl.textContent =
                        'Sorry, something went wrong. Please call or WhatsApp us instead.';
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = original;
                }
            }
        });
    }

    document.addEventListener('astro:page-load', initContactForm);
})();
