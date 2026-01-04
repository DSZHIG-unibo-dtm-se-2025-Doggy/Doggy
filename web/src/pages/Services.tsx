import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Sparkles, Heart, Scissors, TrendingUp } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Sparkles,
      title: "AI-Powered Breed Identification",
      description: "Upload a photo and instantly discover your dog's breed with our advanced AI technology. Get accurate results in seconds, even for mixed breeds."
    },
    {
      icon: Heart,
      title: "Personalized Care Recommendations",
      description: "Receive tailored advice on nutrition, exercise routines, and daily care based on your dog's specific breed characteristics and needs."
    },
    {
      icon: Scissors,
      title: "Health & Grooming Guidance",
      description: "Learn about breed-specific health considerations and grooming requirements to keep your furry friend happy, healthy, and looking their best."
    },
    {
      icon: TrendingUp,
      title: "Smart Pet Lifestyle Tracking",
      description: "Monitor your dog's wellness journey with personalized insights that help you make informed decisions about their care and lifestyle."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-secondary via-background to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Everything Your Dog Needs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive AI-powered solutions for understanding and caring for your furry companion
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="p-8 bg-card border-2 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-soft flex-shrink-0">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground pt-2">{service.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;