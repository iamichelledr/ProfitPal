import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Calculator from './pages/Calculator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FreeDashboard from './pages/FreeDashboard';
import PremiumDashboard from './pages/PremiumDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Team from './pages/Team';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-pp-light flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard/free" element={<FreeDashboard />} />
              <Route path="/dashboard/premium" element={<PremiumDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
