import { useEffect } from "react";
import { Instagram } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// URLs dos posts do Instagram - adicione as URLs completas aqui
const instagramPosts = [
  "https://www.instagram.com/reel/DFSrAkWuH81/",
  "https://www.instagram.com/reel/DFS0tM_O-rj/",
  "https://www.instagram.com/reel/DFT-sNJu27j/",
  "https://www.instagram.com/reel/DFV3yUeuF0l/",
];

const InstagramFeed = () => {
  useEffect(() => {
    // Carrega o script de embed do Instagram
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Processa os embeds quando o script carregar
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {instagramPosts.map((postUrl, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-0 shadow-lg bg-card">
                    <CardContent className="p-0 flex items-center justify-center min-h-[500px]">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-captioned
                        data-instgrm-permalink={postUrl}
                        data-instgrm-version="14"
                        style={{
                          background: "#FFF",
                          border: 0,
                          borderRadius: "3px",
                          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                          margin: "1px",
                          maxWidth: "540px",
                          minWidth: "326px",
                          padding: 0,
                          width: "calc(100% - 2px)",
                        }}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button
            asChild
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
