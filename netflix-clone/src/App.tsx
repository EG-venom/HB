import type React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TrendingSection from './components/TrendingSection';
import PreviewBanner from './components/PreviewBanner';

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-black">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Home page (landing page)
const Home: React.FC = () => {
  return (
    <div className="bg-netflix-black text-white min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

// Login page
const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/browse" />;
  }

  return (
    <div
      className="min-h-screen bg-netflix-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url(https://ext.same-assets.com/855227852/1044820167.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <div className="w-full max-w-md mt-20">
        <LoginForm />
      </div>
    </div>
  );
};

// Signup page
const Signup: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/browse" />;
  }

  return (
    <div
      className="min-h-screen bg-netflix-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url(https://ext.same-assets.com/855227852/1044820167.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header />
      <div className="w-full max-w-md mt-20">
        <RegisterForm />
      </div>
    </div>
  );
};

// Browse page (after login)
const Browse: React.FC = () => {
  return (
    <div className="bg-netflix-black text-white min-h-screen">
      <Header />
      <main>
        <PreviewBanner />
        <div className="mt-[-150px] relative z-10">
          <TrendingSection />
          {/* Add more CategoryRow components here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
