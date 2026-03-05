import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Featured } from './components/Featured';
import { Directory } from './components/Directory';
import { Manifesto } from './components/Manifesto';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { Auth } from './components/Auth';
import { SubmitForm } from './components/SubmitForm';
import { Profile } from './components/Profile';
import { EditListing } from './components/EditListing';

const Home = () => {
  return (
    <main className="min-h-screen bg-obsidian text-ivory selection:bg-champagne selection:text-obsidian relative">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Featured />
      <Directory />
      <HowItWorks />
      <Manifesto />
      <Pricing />
      <Footer />
    </main>
  );
};

const SubmitPage = () => {
  return (
    <main className="min-h-screen bg-ivory text-obsidian selection:bg-champagne selection:text-obsidian relative">
      <div className="noise-overlay" />
      <Navbar />
      <SubmitForm />
      <Footer />
    </main>
  );
};

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-obsidian text-ivory selection:bg-champagne selection:text-obsidian relative">
      <div className="noise-overlay" />
      <Navbar />
      <div className="pt-24">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/callback" element={<Auth />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <SubmitPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <main className="min-h-screen bg-ivory text-obsidian selection:bg-champagne selection:text-obsidian relative">
                  <div className="noise-overlay" />
                  <Navbar />
                  <Profile />
                  <Footer />
                </main>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <main className="min-h-screen bg-ivory text-obsidian selection:bg-champagne selection:text-obsidian relative">
                  <div className="noise-overlay" />
                  <Navbar />
                  <EditListing />
                  <Footer />
                </main>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
