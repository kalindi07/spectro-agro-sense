import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Droplets, 
  Thermometer, 
  Wind,
  Sun,
  Activity,
  TrendingUp,
  TrendingDown,
  Leaf,
  Bug,
  Target,
  Download,
  Share2,
  ChevronRight
} from "lucide-react";

interface ImageAnalysis {
  id: string;
  url: string;
  name: string;
  date: string;
  location: string;
  notes: string;
  status: "pending" | "analyzed" | "flagged";
  tags: string[];
  analysis?: {
    healthScore: number;
    ndvi: number;
    chlorophyll: number;
    moisture: number;
    nitrogenLevel: number;
    pestRisk: number;
    diseaseRisk: number;
    recommendations: string[];
    detectedIssues: {
      type: string;
      severity: "low" | "medium" | "high";
      affectedArea: number;
    }[];
    environmentalData?: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      solarRadiation: number;
    };
  };
}

interface ImageAnalysisModalProps {
  image: ImageAnalysis | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageAnalysisModal({ image, open, onOpenChange }: ImageAnalysisModalProps) {
  if (!image) return null;

  const analysis = image.analysis || {
    healthScore: 85,
    ndvi: 0.72,
    chlorophyll: 65,
    moisture: 42,
    nitrogenLevel: 78,
    pestRisk: 25,
    diseaseRisk: 15,
    recommendations: [
      "Apply nitrogen-based fertilizer in the next 3-5 days",
      "Monitor for early signs of aphid infestation",
      "Increase irrigation frequency by 20%",
      "Consider foliar spray for micronutrient deficiency"
    ],
    detectedIssues: [
      { type: "Nitrogen Deficiency", severity: "medium", affectedArea: 15 },
      { type: "Water Stress", severity: "low", affectedArea: 8 },
      { type: "Pest Activity", severity: "low", affectedArea: 5 }
    ],
    environmentalData: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      solarRadiation: 850
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Field Analysis Report</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Image Preview */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img 
                src={image.url} 
                alt={image.name}
                className="w-full h-full object-cover"
              />
              <Badge 
                className="absolute top-2 left-2"
                variant={image.status === "flagged" ? "destructive" : "default"}
              >
                {image.status}
              </Badge>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{image.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {image.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {image.location}
                </div>
                {image.notes && (
                  <p className="text-sm text-muted-foreground pt-2">{image.notes}</p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="space-y-4">
            {/* Health Score */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  Crop Health Score
                  <span className={`text-3xl font-bold ${getHealthColor(analysis.healthScore)}`}>
                    {analysis.healthScore}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={analysis.healthScore} className="h-3" />
              </CardContent>
            </Card>

            {/* Tabs for Different Analysis */}
            <Tabs defaultValue="indices" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="indices">Indices</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="environment">Environment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="indices" className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">NDVI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{analysis.ndvi}</span>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Chlorophyll</span>
                    </div>
                    <span className="text-sm font-bold">{analysis.chlorophyll}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Moisture</span>
                    </div>
                    <span className="text-sm font-bold">{analysis.moisture}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Nitrogen</span>
                    </div>
                    <span className="text-sm font-bold">{analysis.nitrogenLevel}%</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="issues" className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border-warning/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Bug className="h-4 w-4" />
                        Pest Risk
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-warning">{analysis.pestRisk}%</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-destructive/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Disease Risk
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-destructive">{analysis.diseaseRisk}%</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Detected Issues</h4>
                  {analysis.detectedIssues.map((issue, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <span className="text-sm font-medium">{issue.type}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{issue.affectedArea}% area</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="environment" className="space-y-3">
                {analysis.environmentalData && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <Thermometer className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="text-lg font-semibold">{analysis.environmentalData.temperature}°C</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <Droplets className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Humidity</p>
                        <p className="text-lg font-semibold">{analysis.environmentalData.humidity}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <Wind className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Wind Speed</p>
                        <p className="text-lg font-semibold">{analysis.environmentalData.windSpeed} km/h</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-card">
                      <Sun className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Solar Radiation</p>
                        <p className="text-lg font-semibold">{analysis.environmentalData.solarRadiation} W/m²</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Recommendations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recommendations</CardTitle>
                <CardDescription>Based on spectral analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}