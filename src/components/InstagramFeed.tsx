import { useState, useEffect, useCallback } from "react";
import { Instagram, Play, ExternalLink } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Posts do Instagram com thumbnails
// Para adicionar: use imagens dos produtos/stands e link para o post real
const instagramPosts = [
  {
    id: "1",
    imageUrl: "https://vlwwedprsjyxsnhponwd.supabase.co/storage/v1/object/public/product-images/mpa05ckolka-1765912226245.png",
    postUrl: "https://www.instagram.com/stand_smart/",
    isVideo: true,
    caption: "Stand Booth202",
  },
  {
    id: "2",
    imageUrl: "https://vlwwedprsjyxsnhponwd.supabase.co/storage/v1/object/public/product-images/s0w0sdd0xcr-1765814433766.png",
    postUrl: "https://www.instagram.com/stand_smart/",
    isVideo: true,
    caption: "Stand Booth209",
  },
  {
    id: "3",
    imageUrl: "https://vlwwedprsjyxsnhponwd.supabase.co/storage/v1/object/public/product-images/lwivpm9mmo-1764251022604.png",
    postUrl: "https://www.instagram.com/stand_smart/",
    isVideo: true,
    caption: "Stand Booth203",
  },
  {
    id: "4",
    imageUrl: "https://vlwwedprsjyxsnhponwd.supabase.co/storage/v1/object/public/product-images/31o264xknzl-1764257396391.png",
    postUrl: "https://www.instagram.com/stand_smart/",
    isVideo: true,
    caption: "Stand Booth206",
  },
  {
    id: "5",
    imageUrl: "https://vlwwedprsjyxsnhponwd.supabase.co/storage/v1/object/public/product-images/6l67ndtyvzs-1764257453476.png",
    postUrl: "https://www.instagram.com/stand_smart/",
    isVideo: false,
    caption: "Stand Booth210",
  },
  {
    id: "6",
    imageUrl: "https://vlwwedprsjyxsnhponwd.supabase.co/storage/v1/object/public/product-images/cqhnw3o5amk-1765914228487.png",
    postUrl: "https://www.instagram.com/stand_smart/",
    isVideo: false,
    caption: "Stand Booth104",
  },
];

const InstagramFeed = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Instagram className="h-4 w-4" />
            @stand_smart
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Siga-nos no Instagram
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Acompanhe nossos projetos, bastidores e novidades em stands modulares
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Fade(),
              Autoplay({
                delay: 3000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {instagramPosts.map((post) => (
                <CarouselItem key={post.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 transition-opacity duration-500">
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <Card className="overflow-hidden border-0 shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <CardContent className="p-0 relative">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={post.imageUrl}
                            alt={post.caption}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-white font-medium text-sm">{post.caption}</p>
                          <div className="flex items-center gap-1 text-white/80 text-xs mt-1">
                            <ExternalLink className="h-3 w-3" />
                            Ver no Instagram
                          </div>
                        </div>

                        {/* Video indicator */}
                        {post.isVideo && (
                          <div className="absolute top-3 right-3 bg-black/50 rounded-full p-2">
                            <Play className="h-4 w-4 text-white fill-white" />
                          </div>
                        )}

                        {/* Instagram gradient border on hover */}
                        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-orange-500 pointer-events-none" />
                      </CardContent>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-6 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white"
          >
            <a
              href="https://www.instagram.com/stand_smart/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Seguir no Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
