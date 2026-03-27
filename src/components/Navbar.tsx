import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../i18n/LocaleProvider';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className="font-ui fixed w-full z-50 backdrop-blur-md shadow-lg border-b border-amber-900/20 py-4 md:py-5 px-4 sm:px-6 md:px-12 flex flex-wrap gap-y-3 justify-between items-center transition-all"
        style={{ background: 'rgba(28,18,14,0.9)' }}
      >
        <Link
          to="/"
          onClick={closeMobile}
          className="font-cinzel font-bold tracking-[0.25em] uppercase drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] transition-colors hover:text-white text-base md:text-[1.2rem]"
          style={{ color: '#fbbf24' }}
        >
          ASra
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 md:gap-6 flex-1 min-w-0">
          {isHome ? (
            <>
              {/* Desktop links */}
              <ul className="hidden md:flex flex-wrap gap-x-4 lg:gap-x-7 text-sm font-semibold tracking-widest uppercase items-center font-cinzel">
                <li>
                  <a href="#home" className="hover:text-accent transition-colors text-slate-300">
                    {t('nav.home')}
                  </a>
                </li>
                <li>
                  <Link to="/about" className="hover:text-accent transition-colors text-slate-300">
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <a href="#truth" className="hover:text-accent transition-colors text-slate-300">
                    {t('nav.truth')}
                  </a>
                </li>
                <li>
                  <Link to="/record-of-soul" className="hover:text-accent transition-colors text-slate-300">
                    {t('nav.record')}
                  </Link>
                </li>
                <li>
                  <Link to="/spirit-medicine" className="hover:text-accent transition-colors text-slate-300">
                    {t('nav.spirit')}
                  </Link>
                </li>
                <li>
                  <Link to="/our-achievements" className="hover:text-accent transition-colors text-slate-300">
                    {t('nav.achievements')}
                  </Link>
                </li>
                <li>
                  <a href="#join" className="hover:text-accent transition-colors text-slate-300">
                    {t('nav.join')}
                  </a>
                </li>
              </ul>
              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-amber-500/25 text-amber-300/90 hover:text-amber-200 transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                onClick={() => setMobileOpen(v => !v)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          ) : (
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 justify-end">
              {location.pathname !== '/about' && (
                <Link
                  to="/about"
                  className="font-cinzel text-sm tracking-widest uppercase transition-colors hidden md:block"
                  style={{ color: 'rgba(251,191,36,0.6)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fbbf24')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(251,191,36,0.6)')}
                >
                  {t('nav.about')}
                </Link>
              )}
              {location.pathname !== '/founder-story' && (
                <Link
                  to="/founder-story"
                  className="font-cinzel text-sm tracking-widest uppercase transition-colors hidden lg:block"
                  style={{ color: 'rgba(200,200,210,0.75)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e2e8f0')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,210,0.75)')}
                >
                  {t('nav.founderStory')}
                </Link>
              )}
              {location.pathname !== '/our-achievements' && (
                <Link
                  to="/our-achievements"
                  className="font-cinzel text-sm tracking-widest uppercase transition-colors hidden md:block"
                  style={{ color: 'rgba(251,191,136,0.75)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fcd9a8')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(251,191,136,0.75)')}
                >
                  {t('nav.achievements')}
                </Link>
              )}
              <Link
                to="/"
                className="font-cinzel text-sm font-semibold tracking-widest uppercase hover:text-white transition-colors"
                style={{ color: 'rgba(251,191,36,0.7)' }}
              >
                {t('nav.back')}
              </Link>
            </div>
          )}
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Mobile drawer — home page only */}
      {isHome && mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          style={{ background: 'rgba(20,14,10,0.97)', paddingTop: '4.5rem' }}
          onClick={closeMobile}
        >
          <nav
            className="flex flex-col items-center gap-1 py-8 px-6 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <a
              href="#home"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b border-amber-500/10 text-slate-200 hover:text-amber-200 transition-colors"
            >
              {t('nav.home')}
            </a>
            <Link
              to="/about"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b border-amber-500/10 text-slate-200 hover:text-amber-200 transition-colors"
            >
              {t('nav.about')}
            </Link>
            <a
              href="#truth"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b border-amber-500/10 text-slate-200 hover:text-amber-200 transition-colors"
            >
              {t('nav.truth')}
            </a>
            <Link
              to="/record-of-soul"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b border-amber-500/10 text-slate-200 hover:text-amber-200 transition-colors"
            >
              {t('nav.record')}
            </Link>
            <Link
              to="/spirit-medicine"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b border-amber-500/10 text-slate-200 hover:text-amber-200 transition-colors"
            >
              {t('nav.spirit')}
            </Link>
            <Link
              to="/our-achievements"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b border-amber-500/10 text-slate-200 hover:text-amber-200 transition-colors"
            >
              {t('nav.achievements')}
            </Link>
            <a
              href="#join"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 text-amber-200 hover:text-amber-100 transition-colors"
            >
              {t('nav.join')}
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
