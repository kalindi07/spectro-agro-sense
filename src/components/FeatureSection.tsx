import { Camera, Cpu, Globe, Smartphone, Cloud, Users } from "lucide-react";
import cropHealthImage from "@/assets/crop-health.jpg";
import sensorsImage from "@/assets/sensors.jpg";
import pestDetectionImage from "@/assets/pest-detection.jpg";

const FeatureSection = () => {
  const mainFeatures = [
    {
      title: "Hyperspectral Imaging",
      description: "Capture invisible crop stress signals with advanced multispectral and hyperspectral imaging technology.",
      image: cropHealthImage,
      stats: "10x more data than RGB cameras"
    },
    {
      title: "IoT Sensor Integration",
      description: "Real-time soil moisture, temperature, humidity, and nutrient monitoring across your fields.",
      image: sensorsImage,
      stats: "500+ sensor types supported"
    },
    {
      title: "AI Pest Detection",
      description: "Early identification of pest infestations and disease outbreaks using deep learning models.",
      image: pestDetectionImage,
      stats: "95% detection accuracy"
    }
  ];

  const capabilities = [
    {
      icon: Camera,
      title: "Spectral Analysis",
      description: "NDVI, EVI, and custom vegetation indices"
    },
    {
      icon: Cpu,
      title: "Deep Learning",
      description: "CNN & LSTM models for pattern recognition"
    },
    {
      icon: Globe,
      title: "Satellite Integration",
      description: "Sentinel-2 and Landsat data fusion"
    },
    {
      icon: Cloud,
      title: "Cloud Processing",
      description: "Scalable analysis of large datasets"
    },
    {
      icon: Smartphone,
      title: "Mobile Alerts",
      description: "Real-time notifications on field conditions"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Agronomist insights and recommendations"
    }
  ];

  return (
    <section className="py-20 bg-gradient-field">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            Advanced Agricultural Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combining cutting-edge imaging technology with AI to transform how you monitor and manage your crops
          </p>
        </div>

        {/* Main Features */}
        <div className="space-y-16 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              <div className="flex-1 animate-fade-in">
                <div className="bg-card rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                  <div className="p-4 bg-gradient-primary">
                    <p className="text-primary-foreground font-semibold text-center">
                      {feature.stats}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {feature.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm text-muted-foreground">Advanced Analytics</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Platform Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg hover:bg-muted transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-gradient-tech rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-info-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {capability.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {capability.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;