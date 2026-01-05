import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-cric-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cric-green rounded-full flex items-center justify-center">
              <span className="font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight font-serif">CricPulse</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`${isActive('/') ? 'text-cric-green' : 'text-gray-300'} hover:text-white transition-colors font-medium`}>Home</Link>
            <Link to="/about" className={`${isActive('/about') ? 'text-cric-green' : 'text-gray-300'} hover:text-white transition-colors font-medium`}>About Us</Link>
            <Link to="/privacy" className={`${isActive('/privacy') ? 'text-cric-green' : 'text-gray-300'} hover:text-white transition-colors font-medium`}>Privacy Policy</Link>
            
            {user?.isAdmin && (
              <Link to="/admin" className="flex items-center space-x-1 bg-cric-green/20 text-cric-green px-3 py-1 rounded-full hover:bg-cric-green/30 transition-colors">
                <ShieldCheck size={16} />
                <span className="text-sm font-semibold">Admin Panel</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-700">
                <div className="flex items-center space-x-2">
                  <UserIcon size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-200">{user.name}</span>
                </div>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="bg-cric-green hover:bg-emerald-700 text-white px-5 py-2 rounded-md font-medium transition-all shadow-lg shadow-cric-green/20"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cric-dark border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md">Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">About</Link>
            <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">Privacy Policy</Link>
            {user?.isAdmin && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-cric-green hover:bg-gray-700 rounded-md">Admin Dashboard</Link>
            )}
            <div className="pt-4 pb-3 border-t border-gray-700">
              {user ? (
                <div className="flex items-center justify-between px-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400 mt-1">{user.email}</div>
                    </div>
                  </div>
                  <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="text-red-400 font-medium">Logout</button>
                </div>
              ) : (
                <button onClick={() => { onOpenAuth(); setIsMenuOpen(false); }} className="block w-full text-center px-4 py-3 bg-cric-green text-white font-medium rounded-md">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
