import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, CheckCircle, FileText, Compass } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload a Photo",
      description: "Take or upload a clear picture of your dog. Our AI works best with front-facing photos in good lighting.",
      number: "01"
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Our advanced technology analyzes your photo instantly, identifying breed characteristics and unique traits.",
      number: "02"
    },
    {
      icon: CheckCircle,
      title: "Get Breed Results",
      description: "Discover your dog's breed with detailed information about their personality, temperament, and characteristics.",
      number: "03"
    },
    {
      icon: FileText,
      title: "Receive Custom Advice",
      description: "Access personalized recommendations for diet, exercise, grooming, and care tailored specifically to your dog's breed.",
      number: "04"
    },
    {
      icon: Compass,
      title: "Explore & Learn",
      description: "Dive deeper into your dog's needs and become the best pet parent you can be with our expert guidance.",
      number: "05"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-secondary via-background to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Simple Process</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              How It Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From upload to insights in just a few simple steps
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className="p-8 bg-card border-2 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
                        {step.number}
                      </div>
                      <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-soft">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;