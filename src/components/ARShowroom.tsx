const ARShowroom = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Showroom em Realidade Aumentada
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossos produtos em 3D e visualize como ficam no seu espaço
          </p>
        </div>
        
        <div className="w-full h-[600px] overflow-hidden rounded-lg border border-border shadow-lg">
          <iframe
            src="https://qr-ar-showroom.lovable.app/view/dabc901e-e602-48c8-b997-e5b03fb73683"
            className="w-full h-full"
            style={{ border: 'none' }}
            title="Showroom AR"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default ARShowroom;
