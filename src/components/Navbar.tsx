import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Team', href: '/team' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user?.type === 'admin') {
      navigate('/admin');
    } else if (user?.type === 'premium') {
      navigate('/dashboard/premium');
    } else {
      navigate('/dashboard/free');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-soft py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="sm" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-pp-blue bg-pp-blue/10'
                    : 'text-pp-slate hover:text-pp-blue hover:bg-pp-blue/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-pp-slate animate-spin" />
            ) : isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDashboardClick}
                  className="text-pp-slate hover:text-pp-blue"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user?.name || 'User'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-pp-slate/20"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-pp-slate hover:text-pp-blue">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm" 
                    className="bg-gradient-brand hover:opacity-90 text-white"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-pp-slate hover:bg-pp-blue/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pp-slate/10 pt-4 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'text-pp-blue bg-pp-blue/10'
                      : 'text-pp-slate hover:text-pp-blue hover:bg-pp-blue/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-pp-slate/10 pt-3 mt-2 flex flex-col gap-2">
                {isLoading ? (
                  <div className="flex items-center justify-center py-3">
                    <Loader2 className="w-5 h-5 text-pp-slate animate-spin" />
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleDashboardClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-brand text-white">
                        <Calculator className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
