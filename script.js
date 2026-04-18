const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});

drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

const nav = document.querySelector('.navigation');
let lastScroll = 0;

nav.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current <= 64) { nav.style.transform = 'translateY(0)'; return; }
  if (current > lastScroll) {
    nav.style.transform = 'translateY(-100%)';
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive: true });

const fadeSelectors = [
  '.hero-eyebrow','.hero-title','.hero-description','.hero-button','.hero-browser',
  '.testimonial-social-title','.testimonial-social-description','.testimonial-social-logos',
  '.feature-list-title','.feature-list-description','.feature-list-item','.feature-list-right',
  '.feature-split-right-media-side','.feature-split-right-content',
  '.feature-quote-left-content','.feature-quote-left-boxes',
  '.testimonial-quote-text','.testimonial-quote-person','.testimonial-quote-name',
  '.blog-title','.blog-description','.blog-card',
];

const styleTag = document.createElement('style');
styleTag.textContent = `
  .fade-hidden { opacity:0; transform:translateY(28px); transition:opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1); }
  .fade-visible { opacity:1 !important; transform:translateY(0) !important; }
`;
document.head.appendChild(styleTag);

const fadeEls = [];
fadeSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('fade-hidden');
    el.style.transitionDelay = `${i * 0.08}s`;
    fadeEls.push(el);
  });
});

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('fade-visible'); fadeObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));

const heroBrowser = document.querySelector('.hero-browser');
if (heroBrowser && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    heroBrowser.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.12}px))`;
  }, { passive: true });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  Object.assign(cursor.style, {
    position:'fixed', top:'0', left:'0',
    width:'10px', height:'10px',
    background:'#1a1a1a', borderRadius:'50%',
    pointerEvents:'none', zIndex:'9999',
    transform:'translate(-50%,-50%)',
    transition:'width .2s, height .2s, background .2s, border .2s, opacity .2s',
    opacity:'0',
  });
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top  = `${e.clientY}px`;
    cursor.style.opacity = '1';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      Object.assign(cursor.style, { width:'28px', height:'28px', background:'transparent', border:'1.5px solid #1a1a1a' });
    });
    el.addEventListener('mouseleave', () => {
      Object.assign(cursor.style, { width:'10px', height:'10px', background:'#1a1a1a', border:'none' });
    });
  });
}