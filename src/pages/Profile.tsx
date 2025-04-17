import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Wallet, Package, Clock, Settings, Shield, MapPin, ChevronRight, ArrowDownCircle } from 'lucide-react';

interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface DepositHistory {
  id: number;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  transactionId: string;
}

const MOCK_DEPOSIT_HISTORY: DepositHistory[] = [
  {
    id: 1,
    amount: 500.00,
    method: 'PIX',
    status: 'completed',
    date: '2024-03-15 14:30',
    transactionId: 'PIX123456789'
  },
  {
    id: 2,
    amount: 100.00,
    method: 'PIX',
    status: 'completed',
    date: '2024-03-14 10:15',
    transactionId: 'PIX987654321'
  },
  {
    id: 3,
    amount: 250.00,
    method: 'PIX',
    status: 'completed',
    date: '2024-03-13 18:45',
    transactionId: 'PIX456789123'
  }
];

export function Profile() {
  const { user } = useAuth();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState<Address>({
    street: 'Rua Exemplo',
    number: '123',
    complement: 'Apto 101',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01001-000'
  });

  const [newAddress, setNewAddress] = useState<Address>(address);

  if (!user) {
    return (
      <div className="page-container">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
            <p className="text-gray-400">Você precisa estar logado para acessar esta página.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveAddress = () => {
    setAddress(newAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="page-container">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Minha Conta</h1>
          <p className="text-gray-400">Gerencie suas informações e acompanhe seus pedidos</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-[#161B22] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.email}</h2>
                  <p className="text-gray-400">Membro desde 2024</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0D1117] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-sm text-gray-400">Saldo disponível</div>
                      <div className="text-lg font-semibold text-emerald-500">
                        R$ {user.balance.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg text-white text-sm font-medium transition-all duration-300">
                    Depositar
                  </button>
                </div>

                <div className="p-4 bg-[#0D1117] rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <div className="text-sm font-medium">Segurança da Conta</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Verificação em 2 etapas</span>
                      <span className="text-red-500">Desativada</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Último acesso</span>
                      <span className="text-gray-300">Hoje, 15:30</span>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="p-4 bg-[#0D1117] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                      <div className="text-sm font-medium">Endereço de Entrega</div>
                    </div>
                    <button
                      onClick={() => setIsEditingAddress(true)}
                      className="text-emerald-500 hover:text-emerald-400 text-sm font-medium"
                    >
                      Editar
                    </button>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>{address.street}, {address.number}</p>
                    {address.complement && <p>{address.complement}</p>}
                    <p>{address.neighborhood}</p>
                    <p>{address.city} - {address.state}</p>
                    <p>{address.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Deposit History */}
            <div className="bg-[#161B22] rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ArrowDownCircle className="w-6 h-6 text-emerald-500" />
                Histórico de Depósitos
              </h3>
              <div className="space-y-4">
                {MOCK_DEPOSIT_HISTORY.map((deposit) => (
                  <div key={deposit.id} className="bg-[#0D1117] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <div className="font-medium">Depósito via {deposit.method}</div>
                          <div className="text-sm text-gray-400">{deposit.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-emerald-500">
                          R$ {deposit.amount.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {deposit.transactionId}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-emerald-500">Confirmado</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#161B22] rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-6">Atividade Recente</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#0D1117] rounded-lg">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Box Premium Aberta</div>
                      <div className="text-sm text-gray-400">Hoje, 14:30</div>
                    </div>
                    <div className="text-sm text-gray-400">iPhone 15 Pro Max</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#0D1117] rounded-lg">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Depósito Realizado</div>
                      <div className="text-sm text-gray-400">Ontem, 18:45</div>
                    </div>
                    <div className="text-sm text-gray-400">R$ 500,00 via PIX</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-[#161B22] rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-6">Configurações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-[#0D1117] rounded-lg hover:bg-[#1C2128] transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Dados Pessoais</div>
                    <div className="text-sm text-gray-400">Atualize suas informações</div>
                  </div>
                </button>

                <button className="p-4 bg-[#0D1117] rounded-lg hover:bg-[#1C2128] transition-colors flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Preferências</div>
                    <div className="text-sm text-gray-400">Personalize sua experiência</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Edit Modal */}
      {isEditingAddress && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#161B22] rounded-xl w-full max-w-2xl p-6 relative border border-gray-800">
            <h3 className="text-xl font-semibold mb-6">Editar Endereço de Entrega</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  CEP
                </label>
                <input
                  type="text"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="00000-000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Rua
                </label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Número
                </label>
                <input
                  type="text"
                  value={newAddress.number}
                  onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  value={newAddress.complement}
                  onChange={(e) => setNewAddress({ ...newAddress, complement: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="Opcional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Bairro
                </label>
                <input
                  type="text"
                  value={newAddress.neighborhood}
                  onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Estado
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0D1117] border border-gray-800 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
                  placeholder="UF"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsEditingAddress(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg text-white text-sm font-medium transition-all duration-300"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}