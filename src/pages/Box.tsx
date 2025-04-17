import React, { useState, useEffect, useRef } from 'react';
import { Gift, HelpCircle, Zap, Package, Menu, User, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { AuthModals } from '../components/AuthModals';

const PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro Max", price: 9999.90, image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693408521231_1693265466064_3037.png" },
  { id: 2, name: "PlayStation 5", price: 4499.90, image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693328998852_16.png" },
  { id: 3, name: "Nintendo Switch", price: 2299.90, image: "https://s3.amazonaws.com/gamecomm/Upload/1/CaixaItem/1706720949955_b259aefb37c33f7dfa154625a62cafa2.png" },
  { id: 4, name: "MacBook Pro", price: 14999.90, image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693431525059_1693260872257_ARTES%20BOX%20DA%20SORTE.png" },
  { id: 5, name: "Capacete Iron Man", price: 1999.90, image: "https://images.boxdasorte.com/Upload/1/Produto/1726599965011_Capacete%20Eletr%C3%B4nico%20Iron%20Man%20Mark%20V%20Homem%20De%20Ferro%20Voz.png" }
];

const MOBILE_NAV_ITEMS = [
  { icon: HelpCircle, label: "Como funciona?", href: "/como-funciona" },
  { icon: Zap, label: "Todas", href: "/" },
  { 
    icon: Package, 
    label: "Abrir Box", 
    href: "#", 
    primary: true,
    action: 'open-box'
  },
  { icon: Menu, label: "Meus Produtos", href: "/meus-itens" },
  { icon: User, label: "Minha Conta", href: "/perfil" }
];

export function Box() {
  const { user } = useAuth();
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPreparingToSpin, setIsPreparingToSpin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const rouletteRef = useRef<HTMLDivElement>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);
  const spinTimeoutRef = useRef<NodeJS.Timeout>();

  const rouletteItems = Array(20).fill(null).flatMap(() => PRODUCTS);

  useEffect(() => {
    if (!isSpinning) {
      setTranslateX(0);
    }
  }, [isSpinning]);

  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current);
      }
    };
  }, []);

  const startSpinning = async () => {
    if (isSpinning || isPreparingToSpin) return;
    
    setIsPreparingToSpin(true);

    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSpinning(true);
    setSelectedProduct(null);

    const itemWidth = 160;
    const totalWidth = rouletteItems.length * itemWidth;
    const spinDistance = totalWidth * 0.8;

    setTranslateX(-spinDistance);

    spinTimeoutRef.current = setTimeout(() => {
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      setSelectedProduct(randomProduct);
      setIsSpinning(false);
      setIsPreparingToSpin(false);
    }, 5000);
  };

  const handlePaidSpin = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }
    if (!showRoulette) {
      setShowRoulette(true);
      setTimeout(startSpinning, 300);
    } else {
      startSpinning();
    }
  };

  const handleFreeSpin = () => {
    if (isSpinning || isPreparingToSpin) return;
    setShowRoulette(true);
    setTimeout(startSpinning, 300);
  };

  const handleCloseModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleMobileNavAction = (action?: string) => {
    if (action === 'open-box') {
      if (!user) {
        setIsLoginOpen(true);
        return;
      }
      if (!showRoulette) {
        setShowRoulette(true);
        setTimeout(startSpinning, 300);
      } else {
        startSpinning();
      }
    }
  };

  return (
    <div className="page-container pb-16 md:pb-0">
      <div className="container mx-auto px-2 my-8 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#161B22] rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 border border-white/5">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                Box dos Fluxos
              </h1>
              <p className="text-gray-400 mt-2">Abra e ganhe produtos incríveis</p>
            </div>

            <AnimatePresence mode="wait">
              {!showRoulette ? (
                <motion.div
                  key="box-image"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex -mt-16 justify-center"
                >
                  <div className="relative w-full max-w-sm rounded-lg overflow-hidden">
                    <img 
                      src="https://s3.amazonaws.com/gamecomm/Upload/1/Caixa/1706726484822_box%20anjim.webp" 
                      alt="Green Collection Box"
                      className="w-full h-auto object-cover shine-effect"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] to-transparent opacity-50" />
                    <button
                      onClick={handleFreeSpin}
                      disabled={isSpinning || isPreparingToSpin}
                      className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium hover:bg-white/20 transition-all duration-300"
                    >
                      Abrir Grátis
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="roulette"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-[200px] bg-[#0D1117] rounded-lg overflow-hidden border border-white/5 mt-8"
                >
                  <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-emerald-500 z-20">
                    <div className="absolute -top-2 left-1/2 w-4 h-4 bg-emerald-500 transform -translate-x-1/2 rotate-45" />
                    <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-emerald-500 transform -translate-x-1/2 rotate-45" />
                  </div>

                  <div 
                    ref={rouletteRef}
                    className="absolute top-0 left-0 flex h-full transition-all duration-[5000ms] ease-[cubic-bezier(0.1,0.7,0.1,1)]"
                    style={{ transform: `translateX(${translateX}px)` }}
                  >
                    {rouletteItems.map((product, i) => (
                      <div key={i} className="flex-shrink-0 w-[160px] h-full">
                        <div className="w-full h-full bg-[#1C2128] border-r border-white/5 flex items-center justify-center p-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="hidden md:flex flex-col items-center gap-4 my-8">
              <button
                onClick={handlePaidSpin}
                disabled={isSpinning || isPreparingToSpin}
                className={`
                  w-full max-w-md py-4 rounded-xl font-semibold text-lg transition-all duration-300 relative overflow-hidden
                  ${(isSpinning || isPreparingToSpin)
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transform hover:scale-105'}
                `}
              >
                {isPreparingToSpin ? (
                  <span className="flex items-center justify-center">
                    <span className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Preparando...
                  </span>
                ) : isSpinning ? (
                  'Abrindo...'
                ) : user ? (
                  'ABRIR CAIXA - R$ 29,99'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    ENTRAR PARA ABRIR
                  </span>
                )}
              </button>
              
              <button
                onClick={handleFreeSpin}
                disabled={isSpinning || isPreparingToSpin}
                className="w-full max-w-md py-3 rounded-xl font-medium text-base bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                Abrir Grátis
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/10 group-hover:to-green-500/10 rounded-xl transition-all duration-300" />
                  <div className="bg-[#1C2128] rounded-xl overflow-hidden border border-white/5 group-hover:border-emerald-500/50 transition-all duration-300">
                    <div className="aspect-square p-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 border-t border-white/5">
                      <div className="text-sm font-medium text-gray-300 mb-1 truncate">{product.name}</div>
                      <div className="text-sm font-bold text-emerald-500">R$ {product.price.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#161B22] border-t border-white/5 z-50">
        <div className="flex items-center justify-between px-1 sm:px-2">
          {MOBILE_NAV_ITEMS.map((item, index) => (
            item.action ? (
              <button
                key={index}
                onClick={() => handleMobileNavAction(item.action)}
                disabled={isSpinning || isPreparingToSpin}
                className={`flex flex-col items-center p-1 sm:p-2 ${
                  item.primary 
                    ? 'relative -mt-6 mb-1' 
                    : 'py-2 sm:py-3'
                }`}
              >
                {item.primary && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full -z-10 blur-md opacity-50" />
                )}
                <div className={`
                  ${item.primary 
                    ? 'p-3 sm:p-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-lg' 
                    : 'p-1.5 sm:p-2'
                  }
                `}>
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.primary ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <span className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${item.primary ? 'text-white' : 'text-gray-400'}`}>
                  {isSpinning ? 'Abrindo...' : item.label}
                </span>
              </button>
            ) : (
              <Link
                key={index}
                to={item.href}
                className={`flex flex-col items-center p-1 sm:p-2 ${
                  item.primary 
                    ? 'relative -mt-6 mb-1' 
                    : 'py-2 sm:py-3'
                }`}
              >
                <div className={`p-1.5 sm:p-2`}>
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
                <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 text-gray-400">
                  {item.label}
                </span>
              </Link>
            )
          ))}
        </div>
      </div>

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

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#161B22] rounded-xl p-8 max-w-md w-full border border-emerald-500/50 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10" />
              <div className="relative z-10 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 blur-2xl" />
                  <Gift className="w-16 h-16 mx-auto text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                  Parabéns!
                </h2>
                <div className="bg-[#1C2128] rounded-xl p-6 mb-6 border border-white/10">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-[200px] h-[200px] mx-auto object-contain"
                  />
                  <div className="mt-4 text-xl font-semibold text-white">{selectedProduct.name}</div>
                  <div className="text-lg font-bold text-emerald-500 mt-2">R$ {selectedProduct.price.toFixed(2)}</div>
                </div>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setShowRoulette(false);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-xl text-white transition-all duration-300 transform hover:scale-105"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}