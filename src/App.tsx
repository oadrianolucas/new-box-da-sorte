import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LiveDrop } from './components/LiveDrop';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Box } from './pages/Box';
import { HowItWorks } from './pages/HowItWorks';
import { Faq } from './pages/Faq';
import { Profile } from './pages/Profile';
import { MyItems } from './pages/MyItems';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Header />
      <LiveDrop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/box" element={<Box />} />
        <Route path="/como-funciona" element={<HowItWorks />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/meus-itens" element={
          <ProtectedRoute>
            <MyItems />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;