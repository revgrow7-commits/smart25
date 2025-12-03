import { Button } from "@/components/ui/button";
import { 
  Package, 
  Truck, 
  RefreshCw, 
  Shield, 
  Clock, 
  Percent,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import standModularImage from "@/assets/stand-modular-smart-signage.png";
import trainingHeroStand from "@/assets/training-hero-stand.png";
import heroSmartSignage from "@/assets/hero-smart-signage.jpg";

const structureImages = [
  {
    src: standModularImage,
    alt: "Stand Modular Smart Signage",
    title: "Stand Curvo Premium",
    description: "Estrutura curva com tensionado de alta qualidade"
  },
  {
    src: trainingHeroStand,
    alt: "Stand Modular de Treinamento",
    title: "Stand Reto Modular",
    description: "Estrutura versátil para feiras e eventos"
  },
  {
    src: heroSmartSignage,
    alt: "Stand Smart Signage Hero",
    title: "Backdrop Tensionado",
    description: "Ideal para backdrops e divisórias de ambientes"
  }
];

const rentalFeatures = [
  {
    icon: Package,
    title: "Estruturas Premium",
    description: "Acesso a estruturas modulares de alta qualidade sem investimento inicial."
  },
  {
    icon: Truck,
    title: "Logística Completa",
    description: "Entrega, montagem e desmontagem inclusos em todo o território nacional."
  },
  {
    icon: RefreshCw,
    title: "Renovação Constante",
    description: "Estruturas sempre atualizadas e em perfeito estado de conservação."
  },
  {
    icon: Shield,
    title: "Cobertura Total",
    description: "Seguro completo contra danos acidentais durante o evento."
  }
];

const rentalPlans = [
  {
    name: "Locação Avulsa",
    description: "Para quem precisa de estrutura pontual",
    price: "A partir de R$ 2.500",
    period: "/evento",
    features: [
      "Estrutura modular básica",
      "Entrega e retirada",
      "Suporte durante evento"
    ],
    highlight: false,
    badge: null
  },
  {
    name: "Locação Assinante",
    description: "Exclusivo para membros do clube",
    price: "A partir de R$ 1.500",
    period: "/evento",
    features: [
      "Estrutura modular premium",
      "Montagem profissional inclusa",
      "Suporte 24h durante evento",
      "Prioridade de reserva",
      "Desconto progressivo por frequência"
    ],
    highlight: true,
    badge: "Até 40% OFF"
  }
];

const comparisonData = [
  { feature: "Preço base por evento", avulso: "R$ 2.500+", assinante: "R$ 1.500+" },
  { feature: "Montagem profissional", avulso: "R$ 800 extra", assinante: "Incluso" },
  { feature: "Suporte durante evento", avulso: "Horário comercial", assinante: "24h dedicado" },
  { feature: "Prioridade de reserva", avulso: "Não", assinante: "Sim" },
  { feature: "Seguro completo", avulso: "R$ 200 extra", assinante: "Incluso" },
  { feature: "Desconto em skin", avulso: "0%", assinante: "Até 20%" },
  { feature: "Economia estimada/ano*", avulso: "-", assinante: "R$ 8.000+" }
];

const SubscriptionRental = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-[#0a0a2e] to-[#0d0d3a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-6">
            <Package className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">Novo: Sistema de Aluguel</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Alugue sua <span className="bg-gradient-to-r from-cyan-400 to-red-400 bg-clip-text text-transparent">Estrutura Modular</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Como assinante do Clube Smart Signage, você tem acesso exclusivo ao nosso sistema de 
            locação de estruturas com condições especiais e economia de até 40%.
          </p>
        </div>

        {/* Stand Modular Visual Section - Carousel */}
        <div className="mb-20 relative">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-4xl font-bold text-white">
              Stand Modular <span className="bg-gradient-to-r from-cyan-400 to-red-400 bg-clip-text text-transparent">Inteligente</span>
            </h3>
            <p className="text-gray-400 mt-2">Conheça nossas estruturas disponíveis para locação</p>
          </div>
          <div className="relative max-w-5xl mx-auto px-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-red-500/20 rounded-3xl blur-3xl" />
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {structureImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-full">
                    <div className="relative group">
                      <div className="overflow-hidden rounded-2xl bg-white/5 border border-cyan-500/20 p-4">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="relative w-full h-[400px] md:h-[500px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                        <div className="absolute bottom-8 left-8 right-8">
                          <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{image.title}</h4>
                          <p className="text-gray-300 text-sm md:text-base">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-white/10 border-cyan-500/30 text-white hover:bg-cyan-500/20 hover:border-cyan-400" />
              <CarouselNext className="right-0 bg-white/10 border-cyan-500/30 text-white hover:bg-cyan-500/20 hover:border-cyan-400" />
            </Carousel>
            
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {structureImages.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-cyan-500/40" />
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {rentalFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-red-600/30 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                <feature.icon className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Rental Plans Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {rentalPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-3xl backdrop-blur-sm transition-all duration-500 ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-cyan-900/40 to-red-900/40 border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(6,182,212,0.2)]' 
                  : 'bg-white/5 border border-gray-700/50'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 right-8 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-red-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.highlight ? 'text-cyan-400' : 'text-gray-500'}`} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlight 
                    ? 'bg-gradient-to-r from-cyan-500 to-red-500 hover:from-cyan-400 hover:to-red-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-gray-600/50'
                }`}
              >
                {plan.highlight ? 'Quero Ser Assinante' : 'Solicitar Orçamento'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Compare as <span className="text-cyan-400">Vantagens</span>
          </h3>
          
          <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-white/5 backdrop-blur-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-cyan-900/30 to-red-900/30 border-b border-cyan-500/20">
              <div className="text-gray-400 font-medium">Recurso</div>
              <div className="text-center text-gray-400 font-medium">Locação Avulsa</div>
              <div className="text-center text-cyan-300 font-semibold">Assinante Clube</div>
            </div>
            
            {/* Table Body */}
            {comparisonData.map((row, index) => (
              <div 
                key={index}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  index % 2 === 0 ? 'bg-white/[0.02]' : ''
                } ${index !== comparisonData.length - 1 ? 'border-b border-gray-700/30' : ''}`}
              >
                <div className="text-gray-300 text-sm">{row.feature}</div>
                <div className="text-center text-gray-400 text-sm">{row.avulso}</div>
                <div className="text-center text-cyan-300 text-sm font-medium">{row.assinante}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-4 text-xs">
            * Economia estimada considerando 6 eventos/ano com estrutura de 18m².
          </p>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-cyan-900/40 via-purple-900/40 to-red-900/40 border border-cyan-500/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Percent className="w-6 h-6 text-cyan-400" />
            <Clock className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Primeira locação com <span className="text-cyan-400">50% de desconto</span> para novos assinantes
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Assine agora o Clube Smart Signage e ganhe 50% de desconto na sua primeira locação de estrutura modular.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-red-500 hover:from-cyan-400 hover:to-red-400 text-white px-8 py-6 rounded-xl font-semibold shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionRental;
