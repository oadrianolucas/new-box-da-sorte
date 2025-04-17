import React, { useState } from 'react';
import { Package, ArrowRight, RefreshCcw, Truck } from 'lucide-react';

const MOCK_ITEMS = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693408521231_1693265466064_3037.png",
    value: 9999.90,
    date: "2024-03-15",
    status: "pending"
  },
  {
    id: 2,
    name: "PlayStation 5",
    image: "https://s3.amazonaws.com/gamecomm/Upload/1/Produto/1693328998852_16.png",
    value: 4499.90,
    date: "2024-03-14",
    status: "delivered"
  },
  {
    id: 3,
    name: "Nintendo Switch",
    image: "https://s3.amazonaws.com/gamecomm/Upload/1/CaixaItem/1706720949955_b259aefb37c33f7dfa154625a62cafa2.png",
    value: 2299.90,
    date: "2024-03-13",
    status: "pending"
  }
];

export function MyItems() {
  const [activeTab, setActiveTab] = useState<'pending' | 'delivered'>('pending');

  const filteredItems = MOCK_ITEMS.filter(item => item.status === activeTab);

  const handleRequestDelivery = (itemId: number) => {
    // Implement delivery request logic
    console.log('Requesting delivery for item:', itemId);
  };

  const handleExchangeForCredits = (itemId: number) => {
    // Implement credit exchange logic
    console.log('Exchanging item for credits:', itemId);
  };

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meus Itens</h1>
          <p className="text-gray-400">Gerencie seus itens e solicite entregas</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'pending'
                ? 'bg-emerald-500 text-white'
                : 'bg-[#161B22] text-gray-400 hover:bg-[#1C2128]'
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'delivered'
                ? 'bg-emerald-500 text-white'
                : 'bg-[#161B22] text-gray-400 hover:bg-[#1C2128]'
            }`}
          >
            Entregues
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#161B22] rounded-xl border border-gray-800 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group"
            >
              {/* Item Image */}
              <div className="aspect-square p-6 bg-[#0D1117] flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Item Details */}
              <div className="p-4">
                <h3 className="text-base font-semibold mb-2 truncate">{item.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-400">Valor do item</div>
                  <div className="text-emerald-500 font-semibold">
                    R$ {item.value.toFixed(2)}
                  </div>
                </div>

                {/* Action Buttons */}
                {item.status === 'pending' ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleRequestDelivery(item.id)}
                      className="w-full py-2 px-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Truck className="w-4 h-4" />
                      Solicitar Entrega
                    </button>
                    <button
                      onClick={() => handleExchangeForCredits(item.id)}
                      className="w-full py-2 px-3 bg-[#0D1117] hover:bg-[#1C2128] rounded-lg text-white font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Trocar por Créditos
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-2 bg-emerald-500/10 rounded-lg">
                    <Package className="w-4 h-4 text-emerald-500 mr-2" />
                    <span className="text-sm text-emerald-500">Entregue em {item.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum item encontrado</h3>
            <p className="text-gray-400">
              {activeTab === 'pending'
                ? 'Você não tem itens pendentes de entrega'
                : 'Você não tem itens entregues'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}