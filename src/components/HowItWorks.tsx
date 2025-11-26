import { FileText, Pencil, Box, Truck, Wrench, Repeat } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      icon: FileText,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc')
    },
    {
      number: "02",
      icon: Pencil,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc')
    },
    {
      number: "03",
      icon: Box,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc')
    },
    {
      number: "04",
      icon: Truck,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc')
    },
    {
      number: "05",
      icon: Wrench,
      title: t('howItWorks.step5Title'),
      description: t('howItWorks.step5Desc')
    },
    {
      number: "06",
      icon: Repeat,
      title: t('howItWorks.step6Title'),
      description: t('howItWorks.step6Desc')
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('howItWorks.title')} <span className="gradient-text">{t('howItWorks.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary transform -translate-y-1/2"></div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Circle with icon */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center z-10 relative shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
