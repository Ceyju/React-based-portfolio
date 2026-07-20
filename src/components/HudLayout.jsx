import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

export const pages = [
  { path: '/', label: 'Home', code: 'HM' },
  { path: '/profile', label: 'Profile', code: 'PR' },
  { path: '/experience', label: 'Experience', code: 'EX' },
  { path: '/projects', label: 'Projects', code: 'PX' },
  { path: '/github', label: 'GitHub', code: 'GH' },
  { path: '/resume', label: 'Resume', code: 'CV' },
  { path: '/contact', label: 'Contact', code: 'TX' },
];

export default function HudLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const touchStart = useRef(null);
  const currentIndex = Math.max(0, pages.findIndex((page) => page.path === location.pathname));

  const move = (direction) => {
    const next = Math.min(pages.length - 1, Math.max(0, currentIndex + direction));
    if (next !== currentIndex) navigate(pages[next].path);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = event.target.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || event.target.closest('.captures-arrows')) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown') move(1);
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp') move(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    const mainHeading = contentRef.current?.querySelector('h1');
    if (mainHeading) {
      mainHeading.tabIndex = -1;
      mainHeading.focus({ preventScroll: true });
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && contentRef.current) {
      const animation = gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 28, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' },
      );
      return () => animation.kill();
    }
  }, [location.pathname]);

  const onTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 70) move(delta < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div
      className="hud-app"
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      <a className="skip-link" href="#page-content">Skip to content</a>
      <div className="scanlines" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="hud-header">
        <NavLink className="brand-lockup" to="/" aria-label="Kurt Angelo Mejorada home">
          <span className="brand-diamond"><span>KM</span></span>
          <span className="brand-copy"><strong>KURT.MEJORADA</strong><small>FULL-STACK SYSTEMS // ONLINE</small></span>
        </NavLink>
        <div className="page-status" aria-live="polite">
          <strong>{String(currentIndex + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}</strong>
          <span>{pages[currentIndex].label}</span>
        </div>
      </header>

      <nav className="hud-nav" aria-label="Primary navigation">
        {pages.map((page, index) => (
          <NavLink key={page.path} to={page.path} end={page.path === '/'} aria-label={page.label}>
            <span>{page.code}</span><small>{String(index + 1).padStart(2, '0')}</small>
          </NavLink>
        ))}
      </nav>

      <main id="page-content" className="route-stage" ref={contentRef} key={location.pathname}>
        <Outlet />
      </main>

      <footer className="hud-footer">
        <p>KM SYSTEMS // {new Date().getFullYear()} <span>•</span> PUBLIC NODE</p>
        <div className="page-controls">
          <button type="button" onClick={() => move(-1)} disabled={currentIndex === 0} aria-label="Previous page">← PREV</button>
          <span>ARROW KEYS / SWIPE</span>
          <button type="button" onClick={() => move(1)} disabled={currentIndex === pages.length - 1} aria-label="Next page">NEXT →</button>
        </div>
      </footer>
    </div>
  );
}
