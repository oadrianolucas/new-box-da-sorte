import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthModals } from './AuthModals';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Wallet, Plus, Package } from 'lucide-react';

export function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const handleCloseModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-[#0D1117]/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <img 
                src="https://s3.amazonaws.com/gamecomm/Upload/1/logo/1/1715640080961_Logo%20Box%20da%20Sorte.png" 
                alt="Box da Sorte"
                className="h-24"
              />
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/box" className="text-gray-300 hover:text-white transition-colors font-semibold">
                Exemplo de Box
              </Link>
              {user && (
                <Link 
                  to="/meus-itens"
                  className="text-gray-300 hover:text-white transition-colors font-semibold"
                >
                  Meus Itens
                </Link>
              )}
              <Link to="/como-funciona" className="text-gray-300 hover:text-white transition-colors font-semibold">
                Como Funciona?
              </Link>
              <Link to="/faq" className="text-gray-300 hover:text-white transition-colors font-semibold">
                Faq
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="bg-[#161B22] rounded-lg border border-gray-800 px-4 py-2 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">
                      R$ {user.balance.toFixed(2)}
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg px-3 py-2 transition-all duration-300">
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <User className="w-5 h-5 text-emerald-500" />
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#161B22] rounded-lg shadow-lg border border-gray-800 py-1">
                      <div className="px-4 py-2 border-b border-gray-800">
                        <div className="text-sm font-medium text-white">{user.email}</div>
                        <div className="text-sm text-gray-400">Saldo: R$ {user.balance.toFixed(2)}</div>
                      </div>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Minha Conta
                      </Link>
                      <Link
                        to="/meus-itens"
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          Meus Itens
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={handleOpenLogin}
                  className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors font-semibold"
                >
                  Entrar
                </button>
                <button 
                  onClick={handleOpenRegister}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-semibold"
                >
                  Cadastrar
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModals
        isLoginOpen={isLoginOpen}
        isRegisterOpen={isRegisterOpen}
        onClose={handleCloseModals}
        onSwitchToLogin={() => {
          setIsLoginOpen(true);
          setIsRegisterOpen(false);
        }}
        onSwitchToRegister={() => {
          setIsRegisterOpen(true);
          setIsLoginOpen(false);
        }}
      />
    </>
  );
}