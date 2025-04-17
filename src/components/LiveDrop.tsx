import React from 'react';

const PRODUCTS = [
  { id: 1, name: "Playstation 5", image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693328998852_16.png" },
  { id: 2, name: "Nintendo Switch", image: "https://s3.amazonaws.com/gamecomm/Upload/1/CaixaItem/1706720949955_b259aefb37c33f7dfa154625a62cafa2.png" },
  { id: 3, name: "Microfone Profissional", image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693331994024_Microfone%20.png" },
  { id: 4, name: "iPhone 15 Pro", image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693408521231_1693265466064_3037.png" },
  { id: 5, name: "MacBook Pro", image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693431525059_1693260872257_ARTES%20BOX%20DA%20SORTE.png" },
  { id: 6, name: "Capacete Iron Man", image: "https://images.boxdasorte.com/Upload/1/Produto/1726599965011_Capacete%20Eletr%C3%B4nico%20Iron%20Man%20Mark%20V%20Homem%20De%20Ferro%20Voz.png" },
  { id: 7, name: "Manopla do Infinito LEGO", image: "https://images.boxdasorte.com/Upload/1/Produto/1726600005761_Kit%20Marvel%2076191%20Manopla%20Do%20Infinito%20590%20Pe%C3%A7as%20Lego.png" }
];

export function LiveDrop() {
  return (
    <div className="fixed top-16 left-0 right-0 bg-[#1A1D24]/95 backdrop-blur-sm border-b border-[#2D313A] z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 h-16">
          {/* Online Users */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C74D] animate-pulse"></div>
            <span className="text-sm text-gray-400">2637</span>
            <span className="text-xs text-gray-500">On-line</span>
          </div>

          {/* Live Drops */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-scroll">
              {[...Array(3)].map((_, groupIndex) => (
                PRODUCTS.map((product, index) => (
                  <div 
                    key={`${product.id}-${groupIndex}-${index}`}
                    className="relative flex-shrink-0 w-[200px] h-[60px] transform skew-x-[-15deg] mx-1"
                  >
                    <div className="absolute inset-0 bg-[#12151A] border border-[#2D313A] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2D313A]/50 to-[#1A1D24]/50" />
                      <div className="absolute inset-0 border border-[#2D313A] animate-border-flow overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transform skew-x-[15deg]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-[150px] h-[50px] object-contain"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-1 text-center transform skew-x-[15deg]">
                      <div className="text-[10px] text-gray-400 truncate px-2">{product.name}</div>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}