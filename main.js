// --- Nav: scroll shadow + active section highlighting ---
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// IntersectionObserver for active nav link
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// --- Hamburger / mobile nav ---
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileLinks = mobileNav.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// --- Coffee models toggle ---
function toggleModels() {
  const grid = document.getElementById('models-grid');
  const chevron = document.getElementById('models-chevron');
  const btn = document.getElementById('models-toggle');
  const isOpen = grid.style.display !== 'none';
  grid.style.display = isOpen ? 'none' : 'block';
  chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
  btn.lastChild.textContent = isOpen ? ' View all models & pricing' : ' Hide models';
}

// --- Form submit ---
const form = document.getElementById('enquiry-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation
  const name = form.querySelector('#name').value.trim();
  const contact = form.querySelector('#contact-info').value.trim();
  const service = form.querySelector('#service').value;

  if (!name || !contact || !service) {
    // Highlight empty required fields
    [['#name', name], ['#contact-info', contact], ['#service', service]].forEach(([sel, val]) => {
      const el = form.querySelector(sel);
      if (!val) {
        el.style.borderColor = '#ef4444';
        el.addEventListener('input', () => el.style.borderColor = '', { once: true });
      }
    });
    return;
  }

  // Success state
  const btn = form.querySelector('.btn-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  // Simulate send (replace with actual fetch/action as needed)
  setTimeout(() => {
    form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    btn.style.display = 'none';
    successMsg.style.display = 'block';
  }, 800);
});
