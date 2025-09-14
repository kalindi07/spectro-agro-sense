import { TrendingUp, Users, MapPin, Award } from "lucide-react";
import { useEffect, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      value: "35%",
      label: "Average Yield Increase",
      description: "Farmers using our platform"
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Active Farmers",
      description: "Across 50 countries"
    },
    {
      icon: MapPin,
      value: "2.5M",
      label: "Acres Monitored",
      description: "Real-time tracking"
    },
    {
      icon: Award,
      value: "98%",
      label: "Accuracy Rate",
      description: "In pest detection"
    }
  ];

  return (
    <section className="py-20 bg-gradient-sunrise">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary-foreground">
            Proven Results That Matter
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of farmers who are already transforming their agricultural practices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transform transition-all duration-500 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;