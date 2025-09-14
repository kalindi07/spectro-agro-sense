import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const benefits = [
    "14-day free trial",
    "No credit card required",
    "Full platform access",
    "Expert onboarding support"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary-foreground">
                Ready to Transform Your Farm?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Start monitoring your crops with AI-powered precision agriculture today. 
                See results in your first harvest.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-primary-foreground/90"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 shadow-lg group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Schedule Demo
                </Button>
              </div>

              <p className="text-sm text-primary-foreground/70 mt-6">
                Join 10,000+ farmers already using AgriWatch AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;