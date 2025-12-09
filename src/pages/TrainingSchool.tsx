import { Helmet } from "react-helmet";
import TrainingHero from "@/components/training/TrainingHero";
import TrainingWhyModular from "@/components/training/TrainingWhyModular";
import TrainingCurriculum from "@/components/training/TrainingCurriculum";
import TrainingComparison from "@/components/training/TrainingComparison";
import TrainingAudience from "@/components/training/TrainingAudience";
import TrainingCertification from "@/components/training/TrainingCertification";
import TrainingTestimonials from "@/components/training/TrainingTestimonials";
import TrainingFAQ from "@/components/training/TrainingFAQ";
import TrainingNav from "@/components/training/TrainingNav";

const TrainingSchool = () => {
  return (
    <>
      <Helmet>
        <title>Escola de Treinamento para Montadores de Stands Modulares | Smart Signage</title>
        <meta 
          name="description" 
          content="Aprenda a montar stands modulares, aumente sua margem de lucro e ofereça soluções modernas para empresas que participam de várias feiras por ano. Inscreva-se na Escola de Treinamento Smart Signage." 
        />
        <meta name="keywords" content="stands modulares, montagem de stands, treinamento montadores, feiras e eventos" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a2e] via-[#0f0a3e] to-[#0a0a2e]">
        <TrainingNav />
        <TrainingHero />
        <TrainingWhyModular />
        <TrainingCurriculum />
        <TrainingComparison />
        <TrainingAudience />
        <TrainingCertification />
        <TrainingTestimonials />
        <TrainingFAQ />
      </div>
    </>
  );
};

export default TrainingSchool;
