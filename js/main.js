// ===== Candor Digital — site interactions =====
// Vanilla JS, no dependencies. Respects prefers-reduced-motion throughout.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Theme toggle (persists per-visit only, no cross-session storage needed) ---------- */
(function themeToggle(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let current = systemDark ? 'dark' : 'light';

  function apply(theme){
    root.setAttribute('data-theme', theme);
    current = theme;
  }
  apply(current);

  btn && btn.addEventListener('click', () => {
    apply(current === 'dark' ? 'light' : 'dark');
  });
})();

/* ---------- Scroll progress bar ---------- */
(function scrollProgress(){
  const bar = document.getElementById('scrollBar');
  if (!bar) return;
  function update(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ---------- Reveal on scroll ---------- */
(function revealOnScroll(){
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  if (reduceMotion){
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
})();

/* ---------- Timeline scroll-fill ---------- */
(function timelineFill(){
  const wrap = document.getElementById('timeline');
  const fill = document.getElementById('timelineFill');
  if (!wrap || !fill) return;
  function update(){
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const progressed = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
    fill.style.height = (progressed / total * 100) + '%';
  }
  document.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* ---------- Animated stat counters ---------- */
(function countUp(){
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (reduceMotion){ el.textContent = target; io.unobserve(el); return; }
      let start = 0;
      const duration = 900;
      const t0 = performance.now();
      function tick(now){
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(el => io.observe(el));
})();

/* ---------- Magnetic buttons ---------- */
(function magneticButtons(){
  if (reduceMotion || matchMedia('(pointer:coarse)').matches) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* ---------- Tilt cards ---------- */
(function tiltCards(){
  if (reduceMotion || matchMedia('(pointer:coarse)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -8;
      const ry = (px - 0.5) * 10;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      card.style.setProperty('--mx', (px * 100) + '%');
      card.style.setProperty('--my', (py * 100) + '%');
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

/* ---------- Custom cursor ---------- */
(function customCursor(){
  if (reduceMotion || matchMedia('(pointer:coarse)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    document.body.classList.add('cursor-ready');
  });
  function loop(){
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('[data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();
