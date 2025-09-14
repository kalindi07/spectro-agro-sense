import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { MapPin, Layers, ZoomIn, ZoomOut, Maximize2, Download } from "lucide-react";
import { useState } from "react";

const FieldMap = () => {
  const [selectedLayer, setSelectedLayer] = useState("ndvi");
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const layers = [
    { id: "ndvi", name: "NDVI", description: "Vegetation health index" },
    { id: "moisture", name: "Soil Moisture", description: "Water content levels" },
    { id: "temperature", name: "Temperature", description: "Surface temperature" },
    { id: "pest", name: "Pest Risk", description: "Infestation probability" }
  ];

  const fieldData = {
    "north": { name: "North Field", health: 92, area: "45 acres", crop: "Wheat" },
    "south": { name: "South Field", health: 78, area: "38 acres", crop: "Corn" },
    "east": { name: "East Field", health: 65, area: "52 acres", crop: "Soybeans" },
    "west": { name: "West Field", health: 45, area: "41 acres", crop: "Barley" }
  };

  return (
    <div className="min-h-screen bg-gradient-field">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map Area */}
            <div className="flex-1">
              <Card className="h-[600px] relative overflow-hidden">
                {/* Map Controls */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <Button size="icon" variant="secondary" className="shadow-lg">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="shadow-lg">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="shadow-lg">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Map Placeholder with Grid */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 relative">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-4">
                    {Object.entries(fieldData).map(([key, field]) => (
                      <div
                        key={key}
                        onClick={() => setSelectedField(key)}
                        className={`relative rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                          selectedField === key 
                            ? 'border-primary shadow-glow' 
                            : 'border-border hover:border-primary/50'
                        } ${
                          selectedLayer === 'ndvi' ? 
                            field.health > 80 ? 'bg-health-excellent/30' :
                            field.health > 60 ? 'bg-health-good/30' :
                            field.health > 40 ? 'bg-health-moderate/30' :
                            'bg-health-poor/30'
                          : selectedLayer === 'moisture' ? 'bg-info/20' :
                            selectedLayer === 'temperature' ? 'bg-warning/20' :
                            'bg-destructive/20'
                        }`}
                      >
                        <div className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded">
                          <p className="text-xs font-semibold">{field.name}</p>
                          <p className="text-xs text-muted-foreground">{field.crop}</p>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded">
                          <p className="text-lg font-bold">{field.health}%</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Layer Label */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <p className="text-sm font-medium">Current Layer: {layers.find(l => l.id === selectedLayer)?.name}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-4">
              {/* Layer Selection */}
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Map Layers
                </h2>
                <div className="space-y-2">
                  {layers.map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => setSelectedLayer(layer.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        selectedLayer === layer.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted hover:bg-muted/70'
                      }`}
                    >
                      <p className="font-medium">{layer.name}</p>
                      <p className={`text-xs ${
                        selectedLayer === layer.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {layer.description}
                      </p>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Selected Field Details */}
              {selectedField && (
                <Card className="p-4 animate-slide-up">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Field Details
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Field Name</p>
                      <p className="font-semibold">{fieldData[selectedField as keyof typeof fieldData].name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Crop Type</p>
                      <p className="font-semibold">{fieldData[selectedField as keyof typeof fieldData].crop}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Area</p>
                      <p className="font-semibold">{fieldData[selectedField as keyof typeof fieldData].area}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Health Score</p>
                      <p className="font-semibold text-2xl text-primary">
                        {fieldData[selectedField as keyof typeof fieldData].health}%
                      </p>
                    </div>
                    <Button variant="tech" className="w-full mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download Field Report
                    </Button>
                  </div>
                </Card>
              )}

              {/* Legend */}
              <Card className="p-4">
                <h3 className="text-sm font-semibold mb-3">Health Index Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-health-excellent rounded" />
                    <span className="text-sm">Excellent (80-100)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-health-good rounded" />
                    <span className="text-sm">Good (60-79)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-health-moderate rounded" />
                    <span className="text-sm">Moderate (40-59)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-health-poor rounded" />
                    <span className="text-sm">Poor (20-39)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-health-critical rounded" />
                    <span className="text-sm">Critical (0-19)</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FieldMap;