import React from 'react';
import { ChevronRight, Star, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const BENEFITS = [
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Todas as transações são protegidas"
  },
  {
    icon: Star,
    title: "Melhores Produtos",
    description: "Qualidade premium garantida"
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Entrega para todo o Brasil"
  }
];

const BOXES = [
  {
    id: 1,
    name: "Box Edy Silva",
    price: 179.90,
    image: "https://images.boxdasorte.com/Upload/1/Caixa/1726515261395_0000_edysilva.webp",
    theme: "blue"
  },
  {
    id: 2,
    name: "Box Corolla",
    price: 199.90,
    image: "https://s3.amazonaws.com/gamecomm/Upload/1/Caixa/1706726686228_caixacorolla.webp",
    theme: "red"
  },
  {
    id: 3,
    name: "Box Copa Mobi",
    price: 299.90,
    image: "https://s3.amazonaws.com/gamecomm/Upload/1/Caixa/1706715889687_caixacopaomobi.webp",
    theme: "green"
  },
  {
    id: 4,
    name: "Box Anjim",
    price: 149.90,
    image: "https://s3.amazonaws.com/gamecomm/Upload/1/Caixa/1706726484822_box%20anjim.webp",
    theme: "purple"
  },
  {
    id: 5,
    name: "Box Nerd",
    price: 249.90,
    image: "https://s3.amazonaws.com/gamecomm/Upload/1/Caixa/1725132961245__0001_nerd.webp",
    theme: "orange"
  },
  {
    id: 6,
    name: "Box Premium",
    price: 499.90,
    image: "https://images.boxdasorte.com/Upload/3/Caixa/1744676417443_3.png",
    theme: "gold"
  }
];

export function Home() {
  return (
    <div className="page-container">
      {/* Banner Section */}
      <section className="relative">
        <picture>
          <source 
            media="(min-width: 768px)" 
            srcSet="https://images.boxdasorte.com/Upload/1/Banner/1726515620173_bannerunicodesk.webp"
          />
          <img 
            src="https://images.boxdasorte.com/Upload/1/Banner/1726515624506_bannerunicomobi.webp"
            alt="Box da Sorte Banner"
            className="w-full h-auto"
          />
        </picture>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-colors">
                <benefit.icon className="w-12 h-12 text-emerald-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boxes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Boxes Disponíveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {BOXES.map((box) => (
              <Link 
                key={box.id}
                to="/box"
                className="group relative bg-[#161B22] rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                {/* Box Preview */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 group-hover:opacity-75 transition-opacity" />
                  <img 
                    src={box.image}
                    alt={box.name}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Box Info */}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                    {box.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Valor Garantido</span>
                    <span className="text-lg font-bold text-emerald-500">R$ {box.price}</span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-medium text-sm">
                    Abrir Box
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}