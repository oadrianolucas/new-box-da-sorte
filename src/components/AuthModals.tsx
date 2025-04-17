import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalsProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}

export function AuthModals({ isLoginOpen, isRegisterOpen, onClose, onSwitchToLogin, onSwitchToRegister }: AuthModalsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasCoupon, setHasCoupon] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      onClose();
      setError('');
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <>
      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#161B22] rounded-xl w-full max-w-md p-6 relative border border-gray-800">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              Login
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="text-right">
                <button type="button" className="text-sm text-emerald-500 hover:text-emerald-400">
                  Esqueceu a senha?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg text-white font-medium transition-all duration-300"
              >
                Entrar
              </button>

              <p className="text-center text-sm text-gray-400">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-emerald-500 hover:text-emerald-400"
                >
                  Cadastre-se
                </button>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#161B22] rounded-xl w-full max-w-md p-6 relative border border-gray-800">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              Cadastro
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Celular
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-1">
                  <input
                    type="checkbox"
                    checked={hasCoupon}
                    onChange={(e) => setHasCoupon(e.target.checked)}
                    className="rounded border-gray-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Possui Cupom?</span>
                </label>
                {hasCoupon && (
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white mt-2"
                    placeholder="Digite seu cupom"
                  />
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="text-sm text-gray-400">
                Ao clicar em Criar Conta, você concorda com nossos{' '}
                <a href="#" className="text-emerald-500 hover:text-emerald-400">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-emerald-500 hover:text-emerald-400">
                  Política de Privacidade
                </a>
                .
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg text-white font-medium transition-all duration-300"
              >
                Criar Conta
              </button>

              <p className="text-center text-sm text-gray-400">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-emerald-500 hover:text-emerald-400"
                >
                  Entrar
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}