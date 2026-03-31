import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../i18n/LocaleProvider';

function subNavLinkHandlers(path: string, pathname: string) {
  const rest = pathname === path ? '#C27B20' : 'rgba(31,18,8,0.7)';
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = '#C27B20';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = rest;
    },
  };
}

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className="font-cinzel fixed w-full z-50 border-b py-4 md:py-5 px-4 sm:px-6 md:px-12 flex flex-wrap gap-y-3 justify-between items-center transition-[box-shadow,background] duration-300"
        style={{
          background: 'rgba(251,246,238,0.94)',
          backdropFilter: 'blur(16px) saturate(1.05)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.05)',
          borderColor: 'rgba(31,18,8,0.08)',
          boxShadow: '0 4px 28px rgba(31,18,8,0.05), 0 1px 0 rgba(255,255,255,0.65) inset',
        }}
      >
        <Link
          to="/"
          onClick={closeMobile}
          className="font-cinzel font-bold tracking-[0.25em] uppercase transition-colors text-base md:text-[1.2rem]"
          style={{ color: '#1F1208' }}
        >
          ASra
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 md:gap-6 flex-1 min-w-0">
          <ul className="hidden md:flex flex-wrap gap-x-4 lg:gap-x-7 text-sm font-medium tracking-widest uppercase items-center font-cinzel">
            <li>
              <Link
                to="/about"
                aria-current={location.pathname === '/about' ? 'page' : undefined}
                className="transition-colors"
                style={{
                  color:
                    location.pathname === '/about' ? '#C27B20' : 'rgba(31,18,8,0.7)',
                }}
                {...subNavLinkHandlers('/about', location.pathname)}
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link
                to="/founder-story"
                aria-current={location.pathname === '/founder-story' ? 'page' : undefined}
                className="transition-colors"
                style={{
                  color:
                    location.pathname === '/founder-story' ? '#C27B20' : 'rgba(31,18,8,0.7)',
                }}
                {...subNavLinkHandlers('/founder-story', location.pathname)}
              >
                {t('nav.founderStory')}
              </Link>
            </li>
            <li>
              <Link
                to="/our-achievements"
                aria-current={location.pathname === '/our-achievements' ? 'page' : undefined}
                className="transition-colors"
                style={{
                  color:
                    location.pathname === '/our-achievements' ? '#C27B20' : 'rgba(31,18,8,0.7)',
                }}
                {...subNavLinkHandlers('/our-achievements', location.pathname)}
              >
                {t('nav.achievements')}
              </Link>
            </li>
            {!isHome && (
              <li>
                <Link
                  to="/"
                  className="transition-colors font-semibold"
                  style={{ color: 'rgba(31,18,8,0.85)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C27B20')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(31,18,8,0.85)')}
                >
                  {t('nav.back')}
                </Link>
              </li>
            )}
          </ul>
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md border transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(v => !v)}
            style={{ borderColor: 'rgba(31,18,8,0.2)', color: '#3D2510' }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          style={{ background: 'rgba(251,246,238,0.98)', paddingTop: '4.5rem' }}
          onClick={closeMobile}
        >
          <nav
            className="flex flex-col items-center gap-1 py-8 px-6 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <Link
              to="/about"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b transition-colors"
              style={{ borderColor: 'rgba(31,18,8,0.1)', color: '#1F1208' }}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/founder-story"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b transition-colors"
              style={{ borderColor: 'rgba(31,18,8,0.1)', color: '#1F1208' }}
            >
              {t('nav.founderStory')}
            </Link>
            <Link
              to="/our-achievements"
              onClick={closeMobile}
              className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 border-b transition-colors"
              style={{ borderColor: 'rgba(31,18,8,0.1)', color: '#1F1208' }}
            >
              {t('nav.achievements')}
            </Link>
            {!isHome && (
              <Link
                to="/"
                onClick={closeMobile}
                className="w-full text-center font-cinzel text-base uppercase tracking-[0.3em] py-4 transition-colors"
                style={{ color: '#C27B20' }}
              >
                {t('nav.back')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
