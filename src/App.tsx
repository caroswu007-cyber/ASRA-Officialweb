import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import RecordOfSoulView from './views/RecordOfSoulView';
import WoosSpiritMedicineView from './views/WoosSpiritMedicineView';
import UniversalMatrixView from './views/UniversalMatrixView';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col antialiased overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/record-of-soul" element={<RecordOfSoulView />} />
            <Route path="/spirit-medicine" element={<WoosSpiritMedicineView />} />
            <Route path="/universal-matrix" element={<UniversalMatrixView />} />
            <Route path="/universal-matrix-of-meta-awareness" element={<UniversalMatrixView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
