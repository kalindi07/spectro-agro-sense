import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroFieldImage from "@/assets/hero-field.jpg";

const HeroSection = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "24/7 crop health tracking"
    },
    {
      icon: Shield,
      title: "Pest Detection",
      description: "Early warning system"
    },
    {
      icon: TrendingUp,
      title: "Yield Prediction",
      description: "AI-powered forecasting"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroFieldImage}
          alt="Agricultural field monitoring"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm">
            <span className="animate-pulse w-2 h-2 bg-success rounded-full" />
            <span className="text-sm font-medium text-primary">AI-Powered Precision Agriculture</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Monitor Your Crops
            <br />
            <span className="text-foreground">Maximize Your Yield</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Advanced multispectral imaging and AI analytics to detect crop health issues, 
            soil conditions, and pest risks before they impact your harvest.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="group">
                Start Monitoring
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;