import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../i18n/LocaleProvider';

const ETHEREAL_TRUTH_CHILDREN = [
  { to: '/record-of-soul', labelKey: 'nav.etherealTruth.record' as const, match: (p: string) => p === '/record-of-soul' },
  { to: '/spirit-medicine', labelKey: 'nav.etherealTruth.spiritMedicine' as const, match: (p: string) => p === '/spirit-medicine' },
  {
    to: '/universal-matrix',
    labelKey: 'nav.etherealTruth.universalMatrix' as const,
    match: (p: string) => p === '/universal-matrix' || p === '/universal-matrix-of-meta-awareness',
  },
] as const;

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
  const [etherealTruthOpen, setEtherealTruthOpen] = useState(false);
  const truthWrapRef = useRef<HTMLLIElement>(null);

  const closeMobile = () => setMobileOpen(false);

  const isEtherealTruthSectionActive = ETHEREAL_TRUTH_CHILDREN.some(c => c.match(location.pathname));

  // Close desktop dropdown on outside click. Skip while mobile drawer is open: submenu lives outside `truthWrapRef`
  // (mobile markup is in the overlay), so otherwise every tap would look "outside" and collapse before navigation.
  useEffect(() => {
    if (!etherealTruthOpen) return;
    const onDown = (e: MouseEvent) => {
      if (mobileOpen) return;
      const el = truthWrapRef.current;
      if (el && !el.contains(e.target as Node)) {
        setEtherealTruthOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [etherealTruthOpen, mobileOpen]);

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
          onClick={() => {
            closeMobile();
            setEtherealTruthOpen(false);
          }}
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
            <li ref={truthWrapRef} className="relative">
              <button
                type="button"
                aria-expanded={etherealTruthOpen}
                aria-controls="nav-ethereal-truth-panel"
                id="nav-ethereal-truth-trigger"
                className="inline-flex items-center gap-1 transition-colors uppercase tracking-widest text-left"
                style={{
                  color: isEtherealTruthSectionActive || etherealTruthOpen ? '#C27B20' : 'rgba(31,18,8,0.7)',
                }}
                onClick={() => setEtherealTruthOpen(v => !v)}
                onMouseEnter={e => {
                  if (!isEtherealTruthSectionActive && !etherealTruthOpen) {
                    e.currentTarget.style.color = '#C27B20';
                  }
                }}
                onMouseLeave={e => {
                  const active = isEtherealTruthSectionActive || etherealTruthOpen;
                  e.currentTarget.style.color = active ? '#C27B20' : 'rgba(31,18,8,0.7)';
                }}
              >
                {t('nav.etherealTruth')}
                <ChevronDown
                  aria-hidden
                  className={`w-4 h-4 shrink-0 opacity-80 transition-transform ${etherealTruthOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {etherealTruthOpen ? (
                <div
                  id="nav-ethereal-truth-panel"
                  role="region"
                  aria-labelledby="nav-ethereal-truth-trigger"
                  className="absolute left-0 top-full mt-2 min-w-[16rem] py-2 rounded-lg z-[60] shadow-lg border"
                  style={{
                    background: 'rgba(251,246,238,0.98)',
                    borderColor: 'rgba(31,18,8,0.1)',
                    boxShadow: '0 12px 40px rgba(31,18,8,0.12)',
                  }}
                >
                  <ul className="flex flex-col gap-0.5 py-1">
                    {ETHEREAL_TRUTH_CHILDREN.map(({ to, labelKey, match }) => {
                      const childActive = match(location.pathname);
                      return (
                        <li key={to}>
                          <Link
                            to={to}
                            className="block px-4 py-2.5 text-sm tracking-wide transition-colors normal-case"
                            style={{
                              color: childActive ? '#C27B20' : 'rgba(31,18,8,0.85)',
                              background: childActive ? 'rgba(194,123,32,0.08)' : 'transparent',
                            }}
                            onClick={() => setEtherealTruthOpen(false)}
                            {...subNavLinkHandlers(to, childActive ? to : location.pathname)}
                          >
                            {t(labelKey)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
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
          onClick={() => {
            closeMobile();
            setEtherealTruthOpen(false);
          }}
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
            <div className="w-full border-b" style={{ borderColor: 'rgba(31,18,8,0.1)' }}>
              <button
                type="button"
                aria-expanded={etherealTruthOpen}
                className="w-full flex items-center justify-center gap-2 font-cinzel text-base uppercase tracking-[0.3em] py-4 transition-colors"
                style={{
                  color:
                    isEtherealTruthSectionActive || etherealTruthOpen ? '#C27B20' : '#1F1208',
                }}
                onClick={() => setEtherealTruthOpen(v => !v)}
              >
                {t('nav.etherealTruth')}
                <ChevronDown
                  aria-hidden
                  className={`w-5 h-5 shrink-0 transition-transform ${etherealTruthOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {etherealTruthOpen ? (
                <ul className="pb-3 flex flex-col gap-0">
                  {ETHEREAL_TRUTH_CHILDREN.map(({ to, labelKey, match }) => {
                    const childActive = match(location.pathname);
                    return (
                      <li key={to}>
                        <Link
                          to={to}
                          onClick={() => {
                            closeMobile();
                            setEtherealTruthOpen(false);
                          }}
                          className="block w-full text-center font-cinzel text-sm tracking-[0.2em] py-3 transition-colors"
                          style={{
                            color: childActive ? '#C27B20' : 'rgba(31,18,8,0.75)',
                          }}
                        >
                          {t(labelKey)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
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
