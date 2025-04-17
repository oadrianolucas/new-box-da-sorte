import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "O que é o Box da Sorte?",
    answer: "O Box da Sorte é um e-commerce gamificado. Em nosso site você poderá retirar itens ou experiências insanas a um custo inacreditavelmente baixo. Nosso site cataloga caixas online de vários tipos. Cada caixa tem uma probabilidade definida de ter uma mercadoria ou experiência e você poderá consultar essa probabilidade clicando em \"odds\". Toda vez que você abrir uma nova caixa, um botão giratório aleatório determinará qual item você receberá. Depois disso, o item é adicionado ao inventário da sua conta. Esses itens são reais e você pode solicitar que sejam enviados para sua casa a qualquer momento."
  },
  {
    question: "Como adiciono créditos na minha conta?",
    answer: "Por meio de nossos parceiros de pagamento, você poderá adicionar saldo através do PIX. Para fazer sua recarga basta ir até a página do SALDO e adicionar o valor desejado a sua conta."
  },
  {
    question: "Posso escolher meu próprio tamanho de tênis e roupas?",
    answer: "Quando você retirar um item que possui mais de um tamanho e desejar que ele seja enviado para sua casa, nosso time entrará em contato para que você selecione o seu tamanho. Alguns artigos podem ser grandes ou pequenos em tamanho e, portanto, recomendamos fortemente a consulta de informações sobre o dimensionamento."
  },
  {
    question: "Como vejo os produtos que tirei da caixa?",
    answer: "Depois que você abre uma caixa, seus produtos são adicionados automaticamente ao Inventário da Sua Conta (acessível clicando no seu nome de usuário). Lá você poderá ver todos os produtos que possui atualmente. Você pode vendê-los ou enviá-los para sua casa."
  },
  {
    question: "Como faço para enviar itens para minha casa?",
    answer: "Clique no nome do seu perfil, escolha o item e selecione \"SOLICITAR ENTREGA\". A Página endereço permite que você insira seu endereço, onde poderá receber todos os produtos armazenados em seu estoque. Depois disso, o nosso processo de envio fará com que seus itens cheguem à sua porta rapidamente!"
  },
  {
    question: "Preciso pagar o frete dos produtos?",
    answer: "Sim, por se tratar de um e-commerce todos os produtos enviados possuem um valor de frete. Mas não se preocupe, compras acima de R$150,00 tem frete grátis! Aproveite para abrir mais caixas e receber seus itens de forma gratuita em sua casa."
  },
  {
    question: "Como acompanho minhas entregas?",
    answer: "As atualizações de envio são enviadas para o e-mail da sua conta. Você será atualizado para cada etapa do processo de envio."
  },
  {
    question: "Qual é a sua política de reembolso/devolução?",
    answer: "No Box da Sorte tomamos muito cuidado para garantir que todos os nossos compradores fiquem satisfeitos com seus produtos. Se algum produto que você receber for danificado durante a entrega, avise-nos dentro de um dia e cuidaremos disso para você com um reembolso total ou substituição após a devolução."
  },
  {
    question: "Como entro em contato com vocês?",
    answer: "A melhor maneira de entrar em contato conosco é pelo e-mail suporte@boxdasorte.com"
  }
];

export function Faq() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="page-container">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
            Perguntas Frequentes
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre a Box da Sorte
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className="bg-[#161B22] rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-emerald-500/50"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg font-medium">{item.question}</span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openItems.includes(index)
                    ? 'max-h-96 pb-4'
                    : 'max-h-0'
                }`}
              >
                <p className="text-gray-400">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-gray-400 mb-8">
            Entre em contato conosco através do e-mail{' '}
            <a href="mailto:suporte@boxdasorte.com" className="text-emerald-500 hover:text-emerald-400">
              suporte@boxdasorte.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}