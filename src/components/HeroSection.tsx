import { Zap, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  const { t } = useTranslation();
  
  const { data: heroImages, isLoading } = useQuery({
    queryKey: ['hero-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });
  
  return <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{
        animationDelay: '700ms'
      }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-6 md:py-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left Column - Content */}
          <div className="space-y-4 md:space-y-5 max-w-2xl">
            {/* Badge */}
            <div className="inline-block">
              <div className="px-6 py-2.5 rounded-full border-2 border-primary/40 bg-primary/10 text-primary font-medium text-sm">
                {t('hero.badge')}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                {t('hero.title1')}
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-primary">
                {t('hero.title2')}
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-xl">
              {t('hero.description')}
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 md:gap-12 py-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-5xl md:text-6xl font-bold text-foreground">90%</span>
                </div>
                <p className="text-sm text-muted-foreground/80">{t('hero.stat1')}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <span className="text-5xl md:text-6xl font-bold text-foreground">5x+</span>
                </div>
                <p className="text-sm text-muted-foreground/80">{t('hero.stat2')}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-5xl md:text-6xl font-bold text-foreground">45%</span>
                </div>
                <p className="text-sm text-muted-foreground/80">{t('hero.stat3')}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-primary via-[hsl(340,100%,60%)] to-primary text-white font-semibold text-base rounded-xl hover:shadow-[0_0_40px_hsl(345,100%,55%,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
                {t('hero.requestDemo')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-primary/40 text-foreground font-semibold text-base rounded-xl hover:bg-primary/5 hover:border-primary/60 transition-all duration-300">
                {t('hero.viewCatalog')}
              </button>
            </div>
          </div>

          {/* Right Column - Visual Card with Carousel */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card/80 to-background/80 backdrop-blur-xl p-8 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : heroImages && heroImages.length > 0 ? (
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    plugins={[
                      Autoplay({
                        delay: 5000,
                      }),
                    ]}
                    className="w-full"
                  >
                    <CarouselContent>
                      {heroImages.map((image) => (
                        <CarouselItem key={image.id}>
                          <div className="space-y-4">
                            {(image.title || image.subtitle) && (
                              <div className="text-center space-y-2">
                                {image.title && (
                                  <h3 className="text-2xl font-bold text-foreground">{image.title}</h3>
                                )}
                                {image.subtitle && (
                                  <p className="text-muted-foreground">{image.subtitle}</p>
                                )}
                              </div>
                            )}
                            <img
                              src={image.image_url}
                              alt={image.title || "Hero Image"}
                              className="w-full max-w-4xl rounded-2xl shadow-[0_0_50px_rgba(255,0,80,0.3)]"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                ) : (
                  <div className="flex items-center justify-center -mt-8">
                    <img alt="Smart Signage Visual" className="w-full max-w-4xl rounded-2xl shadow-[0_0_50px_rgba(255,0,80,0.3)]" src="/lovable-uploads/b7c0f382-37bb-45ca-b717-cdd4387709ed.jpg" />
                  </div>
                )}
                
                {/* Animated lines effect overlay */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
                  <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{
                  animationDelay: '500ms'
                }}></div>
                  <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{
                  animationDelay: '1000ms'
                }}></div>
                  
                  {/* Decorative dots */}
                  <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{
                  animationDelay: '300ms'
                }}></div>
                  <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{
                  animationDelay: '600ms'
                }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;