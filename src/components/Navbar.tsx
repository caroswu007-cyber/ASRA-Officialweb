import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md shadow-lg border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all"
      style={{ background: 'rgba(5,8,15,0.88)' }}
    >
      <Link
        to="/"
        className="font-cinzel font-bold tracking-[0.25em] uppercase drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] transition-colors hover:text-white"
        style={{ color: '#fbbf24', fontSize: '1.05rem' }}
      >
        ASra
      </Link>

      {isHome ? (
        <>
          <ul className="hidden md:flex space-x-7 text-xs font-semibold tracking-widest uppercase items-center font-cinzel">
            <li><a href="#home" className="hover:text-accent transition-colors text-slate-300">Home</a></li>
            <li><Link to="/about" className="hover:text-accent transition-colors text-slate-300">About ASra</Link></li>
            <li><a href="#truth" className="hover:text-accent transition-colors text-slate-300">The Truth</a></li>
            <li><Link to="/record-of-soul" className="hover:text-accent transition-colors text-slate-300">Record of Soul</Link></li>
            <li><Link to="/spirit-medicine" className="hover:text-accent transition-colors text-slate-300">Spirit Medicine</Link></li>
            <li><a href="#join" className="hover:text-accent transition-colors text-slate-300">Join</a></li>
          </ul>
          <div className="md:hidden text-accent text-xs font-bold tracking-widest font-cinzel">
            MENU
          </div>
        </>
      ) : (
        <div className="flex items-center gap-6">
          {location.pathname !== '/about' && (
            <Link
              to="/about"
              className="font-cinzel text-xs tracking-widest uppercase transition-colors hidden md:block"
              style={{ color: 'rgba(251,191,36,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fbbf24')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(251,191,36,0.6)')}
            >
              About ASra
            </Link>
          )}
          <Link
            to="/"
            className="font-cinzel text-xs font-semibold tracking-widest uppercase hover:text-white transition-colors"
            style={{ color: 'rgba(251,191,36,0.7)' }}
          >
            ← Back to Home
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
