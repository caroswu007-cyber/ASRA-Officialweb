import { useLayoutEffect, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Scrolls to top on every route change and wraps page content in a short enter/exit motion
 * so revisiting a URL always starts at the top with a visible intro animation.
 */
const PageShell = () => {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const hash = location.hash.replace(/^#/, '');

    const scrollToHashTarget = (): boolean => {
      if (!hash) return false;
      const el = document.getElementById(decodeURIComponent(hash));
      if (!el) return false;
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
      return true;
    };

    if (hash) {
      if (!scrollToHashTarget()) {
        requestAnimationFrame(() => {
          if (!scrollToHashTarget()) {
            requestAnimationFrame(() => scrollToHashTarget());
          }
        });
      }
      const t = window.setTimeout(() => {
        if (!scrollToHashTarget()) {
          window.scrollTo(0, 0);
        }
      }, 450);
      return () => window.clearTimeout(t);
    }

    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="flex-grow flex flex-col"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default PageShell;
