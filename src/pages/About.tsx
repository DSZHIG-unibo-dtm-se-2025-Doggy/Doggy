import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-secondary via-background to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Our Mission
            </h1>
          </div>

          <Card className="p-12 bg-card border-2 mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed text-center">
              At Doggy, we're passionate about bringing together cutting-edge AI technology and our love for animals to help pet owners everywhere better understand and care for their furry companions. Whether you've just adopted a new pup or want to learn more about your longtime friend, our mission is simple: empower dog lovers with instant, accurate breed identification and personalized care insights. We believe every dog deserves the best care possible, and every owner deserves the knowledge to provide it. Join us in making pet care smarter, easier, and more enjoyable.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-2 hover:border-primary/30 hover:shadow-soft transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-soft">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Love for Animals</h3>
              <p className="text-muted-foreground">
                Every feature we build starts with our passion for dogs and their wellbeing
              </p>
            </Card>

            <Card className="p-6 bg-card border-2 hover:border-primary/30 hover:shadow-soft transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-soft">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">AI Innovation</h3>
              <p className="text-muted-foreground">
                Cutting-edge technology to deliver accurate, instant breed identification
              </p>
            </Card>

            <Card className="p-6 bg-card border-2 hover:border-primary/30 hover:shadow-soft transition-all duration-300 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-soft">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Simple Mission</h3>
              <p className="text-muted-foreground">
                Empower every pet owner with the knowledge to care for their dog better
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;