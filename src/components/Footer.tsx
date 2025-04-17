import React from 'react';
import { Facebook, Instagram, Twitter, BookText as TikTok, Github, Send, MonitorPlay, Contact as FileContract, Gift, Target, Users, Activity } from 'lucide-react';

const PAYMENT_METHODS = [
  { name: 'VISA', image: 'https://csgonet.net/public/img/payments/visa.svg?v=3' },
  { name: 'Mastercard', image: 'https://csgonet.net/public/img/payments/mastercard.svg?v=3' },
  { name: 'PIX', image: 'https://gamecomm.s3.amazonaws.com/pix-106.svg' },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: TikTok, href: '#' },
  { icon: Github, href: '#' },
  { icon: Send, href: '#' },
];

const STATS = [
  { icon: MonitorPlay, value: '818 334 689', label: 'Caixas' },
  { icon: FileContract, value: '27 072 980', label: 'Contratos' },
  { icon: Users, value: '6 566 584', label: 'Usuários' },
  { icon: Activity, value: '3 644', label: 'On-line' },
];

export function Footer() {
  return (
    <footer className="bg-[#0D1117] pt-12 pb-6 border-t border-[#21262D]">
      {/* Stats Bar */}
      <div className="bg-[#0D1117] border-y border-[#21262D] py-6 mb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  <stat.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="text-lg font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Payment Methods */}
        <div className="flex flex-wrap gap-8 justify-center mb-12">
          {PAYMENT_METHODS.map((method) => (
            <img
              key={method.name}
              src={method.image}
              alt={method.name}
              className="h-8 opacity-50 grayscale"
            />
          ))}
        </div>

        {/* Links and Info */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Códigos promocionais Box da Sorte
            </div>
            <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Acordo de Usuário
            </div>
            <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Contatos
            </div>
            <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Política de cookies
            </div>
            <div className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Política de Privacidade
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-4">
             <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-400">Patrocinador oficial do:</span>
              <img 
                src="https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png?20250413235109" 
                alt="Vasco da Gama" 
                className="h-16"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:justify-self-end">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://gamecomm.s3.amazonaws.com/logo-gamecomm.png" 
                alt="gamecomm" 
                className="h-12 grayscale"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#21262D]">
          <div className="text-sm text-gray-400">
            Box da Sorte Comercio Digital LTDA<br />
            CNPJ: 51.145.123/0001-51<br />
            Inscrição Estadual MG: 004686877.00-81<br />
          </div>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            ® 2025 Box da Sorte - Todos os direitos reservados | v4.3 
          </div>
        </div>
      </div>
    </footer>
  );
}