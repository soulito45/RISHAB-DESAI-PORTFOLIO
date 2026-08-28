// ============ NAV: scrolled state + mobile toggle + active link ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = document.querySelectorAll('[data-nav]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navAnchors.forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
}));

// Active section highlighting
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => navObserver.observe(s));

// ============ REVEAL ON SCROLL ============
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ============ PROJECT FILTERS ============
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cats = card.dataset.cat.split(' ');
      const show = filter === 'all' || cats.includes(filter);
      card.classList.toggle('hide', !show);
    });
  });
});

// ============ TERMINAL TYPING EFFECT ============
const typeLines = document.querySelectorAll('.type-line');
const terminal = document.getElementById('terminalBody');

function typeSequence() {
  let delay = 400;
  typeLines.forEach((line) => {
    const text = line.dataset.text;
    setTimeout(() => {
      let i = 0;
      line.textContent = '';
      const iv = setInterval(() => {
        line.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(iv);
      }, 16);
    }, delay);
    delay += text.length * 16 + 260;
  });
}

const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      typeSequence();
      terminalObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
if (terminal) terminalObserver.observe(terminal);

// ============ HERO RING PROGRESS ANIMATION ============
const ringProgress = document.querySelector('.ring-progress');
if (ringProgress) {
  window.requestAnimationFrame(() => {
    ringProgress.style.transition = 'stroke-dashoffset 2.4s cubic-bezier(.22,1,.36,1)';
    ringProgress.style.strokeDashoffset = '260';
  });
}
