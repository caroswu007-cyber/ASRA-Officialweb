import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageShell from './components/PageShell';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import RecordOfSoulView from './views/RecordOfSoulView';
import WoosSpiritMedicineView from './views/WoosSpiritMedicineView';
import UniversalMatrixView from './views/UniversalMatrixView';
import FounderStoryView from './views/FounderStoryView';
import { LocaleProvider } from './i18n/LocaleProvider';

const OurAchievementsView = lazy(() => import('./views/OurAchievementsView'));

function App() {
  return (
    <LocaleProvider>
      <Router>
        <div className="min-h-screen flex flex-col antialiased overflow-x-hidden">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route element={<PageShell />}>
                <Route path="/" element={<HomeView />} />
                <Route path="/about" element={<AboutView />} />
                <Route path="/founder-story" element={<FounderStoryView />} />
                <Route path="/record-of-soul" element={<RecordOfSoulView />} />
                <Route path="/spirit-medicine" element={<WoosSpiritMedicineView />} />
                <Route path="/universal-matrix" element={<UniversalMatrixView />} />
                <Route path="/universal-matrix-of-meta-awareness" element={<UniversalMatrixView />} />
                <Route
                  path="/our-achievements"
                  element={
                    <Suspense
                      fallback={
                        <div
                          className="min-h-[75vh] flex items-center justify-center ed-vignette"
                          style={{ background: '#F5EDE0' }}
                          aria-busy
                          aria-label="Loading"
                        >
                          <span className="font-cinzel text-sm tracking-[0.2em] uppercase" style={{ color: 'rgba(155,142,128,0.85)' }}>
                            Loading…
                          </span>
                        </div>
                      }
                    >
                      <OurAchievementsView />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LocaleProvider>
  );
}

export default App;
