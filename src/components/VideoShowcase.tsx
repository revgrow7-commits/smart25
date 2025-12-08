const VideoShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Veja Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubra como nossos stands modulares podem transformar sua presença em eventos
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/d8KcO9Y_ogU?si=4clD-l3iBOwhgWET&start=1&autoplay=1&mute=1"
              title="Smart Signage - Stands Modulares"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
