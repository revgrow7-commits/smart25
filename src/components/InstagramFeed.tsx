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

// IDs dos posts/reels do Instagram
// Para pegar o ID: abra o post, copie a URL, o ID é a parte após /reel/ ou /p/
// Ex: https://www.instagram.com/reel/DFSrAkWuH81/ → ID = DFSrAkWuH81
const instagramPosts = [
  { id: "DFSrAkWuH81", type: "reel" },
  { id: "DFS0tM_O-rj", type: "reel" },
  { id: "DFT-sNJu27j", type: "reel" },
  { id: "DFV3yUeuF0l", type: "reel" },
];

const InstagramFeed = () => {
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
              {instagramPosts.map((post, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardContent className="p-0">
                      <iframe
                        src={`https://www.instagram.com/${post.type}/${post.id}/embed/captioned/`}
                        className="w-full border-0"
                        style={{ minHeight: "500px" }}
                        scrolling="no"
                        allowTransparency
                        title={`Instagram ${post.type} ${index + 1}`}
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
