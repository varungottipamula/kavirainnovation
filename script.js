/* ═══════════════════════════════════════════════
   KAVIRA INNOVATION — MAIN JAVASCRIPT
   Multi-Page | Custom Cursor | Animations
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── AOS Init ─── */
  AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 70 });

  /* ─── Preloader ─── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 1100);
    });
  }

  /* ─── Scroll Progress Bar ─── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#C41E26,#ff6b6b);z-index:99999;width:0%;transition:width 0.1s linear;box-shadow:0 0 8px rgba(196,30,38,0.6);`;
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });

  /* ─── Custom Cursor ─── */
  const cursor = document.getElementById('cursor');
  const cursorFollow = document.getElementById('cursorFollower');
  if (cursor && cursorFollow && window.innerWidth > 768) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    (function animCursor() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      cursorFollow.style.left = fx + 'px';
      cursorFollow.style.top = fy + 'px';
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a, button, .service-card, .industry-card, .why-card, .why-big-card, .strength-big-card, .strength-card, .enquiry-card, .value-bubble').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('is-hovering'); cursorFollow.classList.add('is-hovering'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('is-hovering'); cursorFollow.classList.remove('is-hovering'); });
    });
    document.addEventListener('mousedown', () => { cursor.classList.add('is-clicking'); cursorFollow.classList.add('is-clicking'); });
    document.addEventListener('mouseup', () => { cursor.classList.remove('is-clicking'); cursorFollow.classList.remove('is-clicking'); });
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorFollow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorFollow.style.opacity = '0.6'; });
  }

  /* ─── Hero Particles (home page only) ─── */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    function spawnParticle() {
      const p = document.createElement('div');
      p.classList.add('hero-particle');
      const size = Math.random() * 6 + 2;
      const dur = Math.random() * 12 + 8;
      const delay = Math.random() * 4;
      const isRed = Math.random() > 0.5;
      p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:-10px;background:${isRed ? 'rgba(196,30,38,0.6)' : 'rgba(255,255,255,0.15)'};animation-duration:${dur}s;animation-delay:${delay}s;`;
      particlesContainer.appendChild(p);
      setTimeout(() => p.remove(), (dur + delay) * 1000);
    }
    for (let i = 0; i < 18; i++) spawnParticle();
    setInterval(spawnParticle, 700);
  }

  /* ─── Header Scroll ─── */
  const header = document.getElementById('header');
  if (header) {
    // Inner pages start scrolled
    if (!header.classList.contains('scrolled')) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
      }, { passive: true });
    } else {
      // Always scrolled on inner pages — keep it
      window.addEventListener('scroll', () => {
        if (window.scrollY <= 50) header.classList.add('scrolled');
      }, { passive: true });
    }
  }

  /* ─── Mobile Hamburger ─── */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    }));
  }

  /* ─── Smooth Scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ─── Counter Animation ─── */
  function countUp(el, target, dur = 2000) {
    let start = 0;
    const step = target / (dur / 16);
    const timer = setInterval(() => {
      start += step;
      el.textContent = start >= target ? (clearInterval(timer), target) : Math.floor(start);
    }, 16);
  }
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = 'true';
        countUp(e.target, parseInt(e.target.dataset.count));
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  /* ─── Back to Top ─── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 600), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ─── Contact Form ─── */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (form && submitBtn) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      const GOOGLE_FORM_URL = 'https://forms.gle/kxLLCzCXAkMhqmwi7';
      
      submitBtn.innerHTML = '<span>Opening Form...</span>';
      submitBtn.disabled = true;
      
      showToast('🚀 Opening our official Google Form for your request...');
      
      setTimeout(() => {
        window.open(GOOGLE_FORM_URL, '_blank');
        
        submitBtn.innerHTML = '<span>✓ Form Opened</span>';
        submitBtn.style.background = '#16a34a';
        
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  /* ─── Toast ─── */
  function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(80px);background:#111;color:white;padding:16px 28px;border-radius:12px;font-size:14px;font-weight:500;border-left:4px solid #C41E26;z-index:99999;box-shadow:0 16px 48px rgba(0,0,0,0.4);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1),opacity 0.4s ease;opacity:0;white-space:nowrap;`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(0)'; t.style.opacity = '1'; }, 100);
    setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(80px)'; t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 4500);
  }

  /* ─── Ripple on Buttons ─── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;background:rgba(255,255,255,0.25);border-radius:50%;transform:scale(0);animation:rippleAnim 0.6s ease-out forwards;pointer-events:none;`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  /* ─── 3D Tilt on cards ─── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.service-card, .why-big-card, .industry-card, .why-card, .strength-big-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });
  }

  /* ─── Magnetic Buttons ─── */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px) translateY(-2px)`;
      });
      btn.addEventListener('mouseleave', () => btn.style.transform = '');
    });
  }

  /* ─── Process Step Hover ─── */
  document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', () => step.querySelector('.process-num').style.transform = 'scale(1.1)');
    step.addEventListener('mouseleave', () => step.querySelector('.process-num').style.transform = 'scale(1)');
  });

  /* ─── Stagger animation on service-feature-items ─── */
  document.querySelectorAll('.service-features-grid .service-feature-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; obs.unobserve(e.target); } });
    }, { threshold: 0.3 });
    obs.observe(item);
  });

  /* ─── Hero Title Lines Animation ─── */
  document.querySelectorAll('.hero-title-line').forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 0.8s ease ${0.4 + i * 0.15}s, transform 0.8s ease ${0.4 + i * 0.15}s`;
    setTimeout(() => { line.style.opacity = '1'; line.style.transform = 'translateY(0)'; }, 1200 + i * 150);
  });

  /* ─── Industry Cards stagger ─── */
  document.querySelectorAll('.industry-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    obs.observe(card);
  });

  /* ─── Active nav link highlight ─── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ─── Inject global styles (ripple keyframe) ─── */
  const s = document.createElement('style');
  s.textContent = `@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }`;
  document.head.appendChild(s);

  /* ─── Console Signature ─── */
  console.log('%c KAVIRA INNOVATION %c BPO · Digital Marketing · Printing | Mumbai', 'background:#C41E26;color:#fff;font-size:13px;font-weight:bold;padding:8px 14px;border-radius:4px 0 0 4px;', 'background:#111;color:#fff;font-size:13px;padding:8px 14px;border-radius:0 4px 4px 0;');
});
