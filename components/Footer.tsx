import React from 'react';
import { Facebook, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cric-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-cric-green rounded-full flex items-center justify-center">
                <span className="font-bold text-white">C</span>
              </div>
              <span className="text-xl font-bold font-serif">CricPulse</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for lightning-fast cricket scores, in-depth analysis, and breaking news from around the globe.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-cric-green">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Scores</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Series</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Stats</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-cric-green">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-cric-green">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Mail size={16} />
              <span>contact@cricpulse.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} CricPulse. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-cric-green hover:text-white transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
