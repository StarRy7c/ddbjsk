import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import AdminDashboard from './pages/AdminDashboard';
import { About, Privacy } from './pages/StaticPages';
import { User } from './types';

// Define AdminRoute outside of App to avoid re-creation on each render
interface AdminRouteProps {
  user: User | null;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ user, children }) => {
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Check for persisted session (simple simulation)
  useEffect(() => {
    const savedUser = localStorage.getItem('cricpulse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('cricpulse_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cricpulse_user');
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Navbar 
          user={user} 
          onOpenAuth={() => setIsAuthOpen(true)} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute user={user}>
                  <AdminDashboard user={user!} />
                </AdminRoute>
              } 
            />
          </Routes>
        </main>

        <Footer />

        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onLogin={handleLogin} 
        />
      </div>
    </HashRouter>
  );
};

export default App;