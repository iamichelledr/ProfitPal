import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Calculator', href: '/calculator' },
    ],
    company: [
      { name: 'Team', href: '/team' },
      { name: 'About Us', href: '/team' },
      { name: 'Contact', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="bg-white border-t border-pp-slate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="md" showTagline />
            <p className="mt-4 text-pp-slate text-sm max-w-xs">
              Empowering micro-entrepreneurs, student sellers, and freelancers 
              to price with confidence and earn real profit.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-2 rounded-lg bg-pp-blue/10 text-pp-blue hover:bg-pp-blue hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-pp-blue/10 text-pp-blue hover:bg-pp-blue hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-pp-blue/10 text-pp-blue hover:bg-pp-blue hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-pp-blue/10 text-pp-blue hover:bg-pp-blue hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-heading font-semibold text-pp-dark mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-pp-slate text-sm hover:text-pp-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-pp-dark mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-pp-slate text-sm hover:text-pp-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-heading font-semibold text-pp-dark mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-pp-slate text-sm hover:text-pp-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-10 pt-8 border-t border-pp-slate/10">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-pp-slate text-sm">
              <Mail className="w-4 h-4 text-pp-blue" />
              <span>support@profitpal.com</span>
            </div>
            <div className="flex items-center gap-2 text-pp-slate text-sm">
              <Phone className="w-4 h-4 text-pp-blue" />
              <span>+63 (2) 8123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-pp-slate text-sm">
              <MapPin className="w-4 h-4 text-pp-blue" />
              <span>Manila, Philippines</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-pp-slate/10 text-center">
          <p className="text-pp-slate-light text-sm">
            {currentYear} ProfitPal. All rights reserved. Helping you earn, one price at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
