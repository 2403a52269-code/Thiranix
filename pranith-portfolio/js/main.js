/* ============================================================
   Pranith Portfolio — main.js
   ============================================================ */

/* ── Mobile nav toggle ──────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open', !expanded);
  });

  // Close on link click (mobile)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      navToggle.focus();
    }
  });
}

/* ── Project filter (projects page) ────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-full-card');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ── Contact form validation ────────────────────────────────── */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formStatus  = document.getElementById('form-status');

if (form) {
  const fields = {
    name:    { el: document.getElementById('name'),    err: document.getElementById('name-error') },
    email:   { el: document.getElementById('email'),   err: document.getElementById('email-error') },
    message: { el: document.getElementById('message'), err: document.getElementById('message-error') },
  };

  function validateField(key) {
    const { el, err } = fields[key];
    let msg = '';
    if (key === 'name' && !el.value.trim()) msg = 'Please enter your name.';
    if (key === 'email') {
      if (!el.value.trim()) msg = 'Please enter your email.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) msg = 'Please enter a valid email address.';
    }
    if (key === 'message' && el.value.trim().length < 20) msg = 'Message must be at least 20 characters.';

    err.textContent = msg;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.getAttribute('aria-invalid') === 'true') validateField(key);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) {
      const firstErr = Object.values(fields).find(f => f.el.getAttribute('aria-invalid') === 'true');
      if (firstErr) firstErr.el.focus();
      return;
    }

    // Simulate send
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.querySelector('.btn-text').hidden = true;
    submitBtn.querySelector('.btn-loading').hidden = false;
    submitBtn.disabled = true;

    setTimeout(() => {
      form.hidden = true;
      formSuccess.hidden = false;
      formStatus.textContent = 'Your message has been sent successfully.';
    }, 1200);
  });
}
