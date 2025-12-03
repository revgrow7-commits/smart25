import Navbar from "@/components/Navbar";
import SubscriptionHero from "@/components/subscription/SubscriptionHero";
import SubscriptionBenefits from "@/components/subscription/SubscriptionBenefits";
import SubscriptionTimeline from "@/components/subscription/SubscriptionTimeline";
import SubscriptionRental from "@/components/subscription/SubscriptionRental";
import SubscriptionPricing from "@/components/subscription/SubscriptionPricing";
import SubscriptionSegments from "@/components/subscription/SubscriptionSegments";
import SubscriptionTestimonials from "@/components/subscription/SubscriptionTestimonials";
import SubscriptionCTA from "@/components/subscription/SubscriptionCTA";
import SubscriptionFooter from "@/components/subscription/SubscriptionFooter";

const SubscriptionClub = () => {
  return (
    <div className="min-h-screen bg-[#0a0a2e]">
      <Navbar />
      <SubscriptionHero />
      <SubscriptionBenefits />
      <SubscriptionTimeline />
      <SubscriptionRental />
      <SubscriptionPricing />
      <SubscriptionSegments />
      <SubscriptionTestimonials />
      <SubscriptionCTA />
      <SubscriptionFooter />
    </div>
  );
};

export default SubscriptionClub;
