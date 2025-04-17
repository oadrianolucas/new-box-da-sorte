import React, { useEffect, useRef, useState } from 'react';
import { Package, Gift, Truck, CreditCard, ShieldCheck, ChevronRight, Instagram, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

const STEPS = [
  {
    icon: Package,
    title: "Escolha sua Box",
    description: "Selecione a box que mais combina com você entre as diversas opções disponíveis.",
  },
  {
    icon: CreditCard,
    title: "Faça seu Pagamento",
    description: "Realize o pagamento de forma segura através dos métodos disponíveis.",
  },
  {
    icon: Gift,
    title: "Abra sua Box",
    description: "Descubra qual produto incrível você ganhou ao abrir sua box surpresa.",
  },
  {
    icon: Truck,
    title: "Receba em Casa",
    description: "Receba seu produto em casa com toda segurança e comodidade.",
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Seguro",
    description: "Todas as transações são protegidas e seus dados estão seguros.",
  },
  {
    icon: Package,
    title: "Produtos Originais",
    description: "Todos os produtos são originais e com garantia de fábrica.",
  },
  {
    icon: Truck,
    title: "Entrega Garantida",
    description: "Entregamos em todo o Brasil com rapidez e segurança.",
  },
];

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export function HowItWorks() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const boxRef = useRef(null);
  const isInView = useInView(boxRef, { once: false, margin: "-100px" });
  const boxAnimation = useAnimation();

  useEffect(() => {
    if (isInView) {
      boxAnimation.start({
        scale: [0.9, 1],
        opacity: [0.5, 1],
        transition: { duration: 0.8, ease: "easeOut" },
      });
    }
  }, [isInView, boxAnimation]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-[#0D1117] text-white min-h-screen">
      {/* Hero Section with Background */}
      <div className="relative min-h-[calc(100vh-8rem)] py-48 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-black/80"
          style={{
            backgroundImage: "url(https://boxdasorte.com/img/db-1.ace93d7d.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0D1117]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="mb-6 inline-block" variants={fadeInUp}>
            <span className="px-4 py-1 text-sm font-medium bg-emerald-500/10 text-emerald-400 rounded-full">
              Bem vindo ao novo jeito de você comprar pela internet...
            </span>
          </motion.div>

          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" variants={fadeInUp}>
            Abra um box e receba{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              produtos incríveis
            </span>{" "}
            em casa
          </motion.h1>

          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8" variants={fadeInUp}>
            ou{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              viva experiências inesquecíveis
            </span>
          </motion.h2>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#como-funciona"
              className="px-6 py-3 bg-[#1E262F] hover:bg-[#2A3441] rounded-lg text-white font-medium transition-all duration-300 flex items-center"
            >
              COMO FUNCIONA?
            </a>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/20 flex items-center">
              ABRA UM BOX
              <ChevronRight className="ml-1 w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          ref={boxRef}
          className="relative z-10 w-full max-w-2xl mx-auto mb-12"
          animate={boxAnimation}
          initial={{ scale: 0.9, opacity: 0.5 }}
        >
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="relative mx-auto w-full max-w-md -mt-36"
          >
            <img
              src="https://boxdasorte.com/img/box-como-funciona.f5cc8ddc.webp"
              alt="Box da Sorte com produtos premium"
              className="mx-auto"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto mb-12"
        >
          <p className="text-gray-300 text-lg">
            Visite nosso instagram e descubra o que nossos criadores e clientes falam sobre o boxdasorte.com
          </p>
          <a
            href="https://instagram.com/boxdasorte"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Instagram className="mr-2 h-5 w-5" />
            @boxdasorte
          </a>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D1117] to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        {/* Steps Section */}
        <motion.div
          className="mb-24 pt-16"
          id="como-funciona"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Como Funciona?
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Em apenas quatro passos você pode receber produtos incríveis na sua casa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-[#161B22] to-[#1A2027] p-8 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 group relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-green-500/5 rounded-bl-3xl -mr-10 -mt-10 group-hover:mr-0 group-hover:mt-0 transition-all duration-500" />

                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-emerald-500/30 group-hover:to-green-500/30 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                </div>

                <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-emerald-500/5" />

                <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>

                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#1E262F] border border-gray-700 flex items-center justify-center text-gray-400 font-bold">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            className="bg-gradient-to-br from-[#161B22] to-[#1A2027] rounded-3xl p-12 border border-gray-800 relative overflow-hidden"
            variants={fadeInUp}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mt-32 -mr-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full -mb-32 -ml-32 blur-3xl" />

            <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-16" variants={fadeInUp}>
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Por que escolher a Box da Sorte?
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {FEATURES.map((feature, index) => (
                <motion.div key={index} className="text-center group" variants={fadeInUp} whileHover={{ y: -5 }}>
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-emerald-500/30 group-hover:to-green-500/30 transition-all duration-300 relative">
                    <feature.icon className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-2xl group-hover:border-emerald-500/40 transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Perguntas Frequentes
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tire suas dúvidas sobre a Box da Sorte
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                className="mb-4"
                variants={fadeInUp}
              >
                <div
                  className="bg-[#161B22] rounded-xl border border-gray-800 overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center py-16 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            className="bg-gradient-to-br from-[#161B22] to-[#1A2027] rounded-3xl p-12 border border-gray-800 relative overflow-hidden"
            variants={fadeInUp}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mt-32 -mr-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full -mb-32 -ml-32 blur-3xl" />

            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10" variants={fadeInUp}>
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                Pronto para começar sua aventura?
              </span>
            </motion.h2>

            <motion.p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 relative z-10" variants={fadeInUp}>
              Junte-se a milhares de pessoas que já estão aproveitando a Box da Sorte
            </motion.p>

            <motion.div variants={fadeInUp} className="relative z-10">
              <button className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/20 text-lg">
                Abrir uma Box Agora
                <ChevronRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}