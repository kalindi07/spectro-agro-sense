import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { MapPin, Layers, ZoomIn, ZoomOut, Maximize2, Download, Plus, Navigation, Search, Globe, Settings, Info, TrendingUp, Droplets, Thermometer, Bug, AlertTriangle, Calendar, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const FieldMap = () => {
  const [selectedLayer, setSelectedLayer] = useState("ndvi");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);

  const layers = [
    { id: "ndvi", name: "NDVI", description: "Vegetation health index", icon: TrendingUp },
    { id: "moisture", name: "Soil Moisture", description: "Water content levels", icon: Droplets },
    { id: "temperature", name: "Temperature", description: "Surface temperature", icon: Thermometer },
    { id: "pest", name: "Pest Risk", description: "Infestation probability", icon: Bug }
  ];

  const [fieldData, setFieldData] = useState({
    "north": { 
      name: "North Field", 
      health: 92, 
      area: "45 acres", 
      crop: "Wheat",
      location: { lat: 40.7128, lng: -74.0060 },
      soilMoisture: 65,
      temperature: 22,
      pestRisk: 12,
      lastInspection: "2024-01-15",
      nextInspection: "2024-01-22",
      alerts: 2
    },
    "south": { 
      name: "South Field", 
      health: 78, 
      area: "38 acres", 
      crop: "Corn",
      location: { lat: 40.7028, lng: -74.0060 },
      soilMoisture: 58,
      temperature: 24,
      pestRisk: 28,
      lastInspection: "2024-01-14",
      nextInspection: "2024-01-21",
      alerts: 5
    },
    "east": { 
      name: "East Field", 
      health: 65, 
      area: "52 acres", 
      crop: "Soybeans",
      location: { lat: 40.7128, lng: -74.0160 },
      soilMoisture: 42,
      temperature: 25,
      pestRisk: 45,
      lastInspection: "2024-01-13",
      nextInspection: "2024-01-20",
      alerts: 8
    },
    "west": { 
      name: "West Field", 
      health: 45, 
      area: "41 acres", 
      crop: "Barley",
      location: { lat: 40.7128, lng: -73.9960 },
      soilMoisture: 35,
      temperature: 26,
      pestRisk: 65,
      lastInspection: "2024-01-12",
      nextInspection: "2024-01-19",
      alerts: 12
    }
  });

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 20, 50));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleAddLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newField = {
      name: formData.get('name') as string,
      health: Math.floor(Math.random() * 100),
      area: formData.get('area') as string,
      crop: formData.get('crop') as string,
      location: {
        lat: parseFloat(formData.get('lat') as string),
        lng: parseFloat(formData.get('lng') as string)
      },
      soilMoisture: Math.floor(Math.random() * 100),
      temperature: Math.floor(Math.random() * 10) + 20,
      pestRisk: Math.floor(Math.random() * 100),
      lastInspection: new Date().toISOString().split('T')[0],
      nextInspection: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      alerts: Math.floor(Math.random() * 15)
    };
    
    const fieldId = `field_${Date.now()}`;
    setFieldData(prev => ({
      ...prev,
      [fieldId]: newField
    }));
    
    toast({
      title: "Location Added",
      description: `${newField.name} has been added to your fields.`,
    });
    
    setLocationDialogOpen(false);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Downloading Report",
      description: "Your field report is being generated...",
    });
    
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Report saved to Downloads folder.",
      });
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Searching Fields",
        description: `Searching for "${searchQuery}"...`,
      });
      
      // Filter fields based on search
      const filtered = Object.entries(fieldData).find(([_, field]) => 
        field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.crop.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filtered) {
        setSelectedField(filtered[0]);
        toast({
          title: "Field Found",
          description: `Selected ${filtered[1].name}`,
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-field">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Search Bar and Add Location */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search fields by name or crop type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 pr-4"
                />
              </div>
            </div>
            
            <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="tech" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Farm Location
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Farm Location</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddLocation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Field Name</Label>
                      <Input id="name" name="name" placeholder="e.g., North Field" required />
                    </div>
                    <div>
                      <Label htmlFor="area">Area</Label>
                      <Input id="area" name="area" placeholder="e.g., 45 acres" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select name="crop" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wheat">Wheat</SelectItem>
                        <SelectItem value="Corn">Corn</SelectItem>
                        <SelectItem value="Soybeans">Soybeans</SelectItem>
                        <SelectItem value="Barley">Barley</SelectItem>
                        <SelectItem value="Rice">Rice</SelectItem>
                        <SelectItem value="Cotton">Cotton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lat">Latitude</Label>
                      <Input id="lat" name="lat" type="number" step="any" placeholder="40.7128" required />
                    </div>
                    <div>
                      <Label htmlFor="lng">Longitude</Label>
                      <Input id="lng" name="lng" type="number" step="any" placeholder="-74.0060" required />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setLocationDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button type="submit" variant="tech" className="flex-1">
                      Add Location
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="gap-2" onClick={handleSearch}>
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Map Area */}
            <div className="flex-1">
              <Card className="h-[600px] relative overflow-hidden" ref={mapRef}>
                {/* Map Controls */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <Button size="icon" variant="secondary" className="shadow-lg" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="shadow-lg" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="shadow-lg" onClick={handleFullscreen}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Map with dynamic zoom */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 relative overflow-hidden"
                  style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.3s ease' }}
                >
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
                          : selectedLayer === 'moisture' ? 
                            field.soilMoisture > 60 ? 'bg-info/30' : 'bg-warning/30'
                          : selectedLayer === 'temperature' ? 
                            field.temperature > 25 ? 'bg-destructive/30' : 'bg-health-good/30'
                          : field.pestRisk > 50 ? 'bg-destructive/30' : 'bg-health-good/30'
                        }`}
                      >
                        <div className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded">
                          <p className="text-xs font-semibold">{field.name}</p>
                          <p className="text-xs text-muted-foreground">{field.crop}</p>
                        </div>
                        {field.alerts > 0 && (
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            {field.alerts}
                          </Badge>
                        )}
                        <div className="absolute bottom-2 right-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded">
                          <p className="text-lg font-bold">
                            {selectedLayer === 'ndvi' ? `${field.health}%` :
                             selectedLayer === 'moisture' ? `${field.soilMoisture}%` :
                             selectedLayer === 'temperature' ? `${field.temperature}°C` :
                             `${field.pestRisk}%`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Layer Label */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <p className="text-sm font-medium">Current Layer: {layers.find(l => l.id === selectedLayer)?.name}</p>
                    <p className="text-xs text-muted-foreground">Zoom: {zoomLevel}%</p>
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
                  {layers.map((layer) => {
                    const Icon = layer.icon;
                    return (
                      <button
                        key={layer.id}
                        onClick={() => setSelectedLayer(layer.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          selectedLayer === layer.id
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'bg-muted hover:bg-muted/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${selectedLayer === layer.id ? 'text-primary-foreground' : 'text-primary'}`} />
                          <div>
                            <p className="font-medium">{layer.name}</p>
                            <p className={`text-xs ${
                              selectedLayer === layer.id ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            }`}>
                              {layer.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Selected Field Details */}
              {selectedField && (
                <Card className="p-4 animate-slide-up">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="inspection">Inspection</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-3 mt-4">
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {fieldData[selectedField as keyof typeof fieldData].name}
                      </h2>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Crop Type</p>
                          <p className="font-semibold">{fieldData[selectedField as keyof typeof fieldData].crop}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Area</p>
                          <p className="font-semibold">{fieldData[selectedField as keyof typeof fieldData].area}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-mono text-xs">
                            {fieldData[selectedField as keyof typeof fieldData].location.lat.toFixed(4)}, 
                            {fieldData[selectedField as keyof typeof fieldData].location.lng.toFixed(4)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Health Score</p>
                          <Progress value={fieldData[selectedField as keyof typeof fieldData].health} className="h-3" />
                          <p className="font-semibold text-2xl text-primary mt-2">
                            {fieldData[selectedField as keyof typeof fieldData].health}%
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="inspection" className="space-y-3 mt-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        Inspection Details
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-info" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Soil Moisture</p>
                            <Progress value={fieldData[selectedField as keyof typeof fieldData].soilMoisture} className="h-2 mt-1" />
                            <p className="text-xs font-medium mt-1">{fieldData[selectedField as keyof typeof fieldData].soilMoisture}%</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-warning" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Temperature</p>
                            <p className="font-semibold">{fieldData[selectedField as keyof typeof fieldData].temperature}°C</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Bug className="h-4 w-4 text-destructive" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Pest Risk</p>
                            <Progress value={fieldData[selectedField as keyof typeof fieldData].pestRisk} className="h-2 mt-1" />
                            <p className="text-xs font-medium mt-1">{fieldData[selectedField as keyof typeof fieldData].pestRisk}%</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">Last Inspection</p>
                          </div>
                          <p className="text-xs font-medium">{fieldData[selectedField as keyof typeof fieldData].lastInspection}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm">Next Inspection</p>
                          </div>
                          <p className="text-xs font-medium">{fieldData[selectedField as keyof typeof fieldData].nextInspection}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Button variant="tech" className="w-full mt-4" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Field Report
                  </Button>
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