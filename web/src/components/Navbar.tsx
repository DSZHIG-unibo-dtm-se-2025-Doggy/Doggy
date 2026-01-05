import { Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl">
            <Dog className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Doggy</h1>
            <p className="text-xs text-muted-foreground">Breed Identifier</p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>

        <Link to="/#upload">
          <Button className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 shadow-soft">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};
