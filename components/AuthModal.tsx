import React, { useState } from 'react';
import { X, Mail, AlertCircle } from 'lucide-react';
import { ALLOWED_ADMINS } from '../constants';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay for better UX
    setTimeout(() => {
      const normalizedEmail = email.toLowerCase().trim();
      const isAdmin = ALLOWED_ADMINS.includes(normalizedEmail);

      // Strict access control: Only allowed emails can login
      if (isAdmin) {
        onLogin({
          email: normalizedEmail,
          name: normalizedEmail.split('@')[0], // Use part of email as name
          isAdmin: true
        });
        setLoading(false);
        onClose();
      } else {
        setError('Access Denied: This email is not authorized to access the system.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-cric-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-500 mt-2">Enter your authorized email to access the dashboard.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center space-x-2 text-sm mb-4">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cric-green focus:border-cric-green outline-none transition-all"
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-cric-green hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>Only authorized administrators allowed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;