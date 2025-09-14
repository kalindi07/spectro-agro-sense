import { useState, useRef } from "react";
import { Upload, Image, X, Camera, Folder, Calendar, MapPin, AlertCircle, Eye, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ImageAnalysisModal } from "@/components/ImageAnalysisModal";

interface FieldImage {
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

const FieldImages = () => {
  const [images, setImages] = useState<FieldImage[]>([
    {
      id: "1",
      url: "/placeholder.svg",
      name: "North Field - Morning",
      date: "2024-01-15",
      location: "North Field, Section A",
      notes: "Slight yellowing observed on wheat leaves",
      status: "analyzed",
      tags: ["wheat", "nitrogen-deficiency"],
      analysis: {
        healthScore: 78,
        ndvi: 0.68,
        chlorophyll: 62,
        moisture: 38,
        nitrogenLevel: 71,
        pestRisk: 15,
        diseaseRisk: 20,
        recommendations: [
          "Apply nitrogen fertilizer within 3 days",
          "Increase irrigation frequency",
          "Monitor for fungal disease development",
          "Consider micronutrient supplementation"
        ],
        detectedIssues: [
          { type: "Nitrogen Deficiency", severity: "medium", affectedArea: 25 },
          { type: "Water Stress", severity: "low", affectedArea: 12 }
        ],
        environmentalData: {
          temperature: 26,
          humidity: 62,
          windSpeed: 8,
          solarRadiation: 780
        }
      }
    },
    {
      id: "2",
      url: "/placeholder.svg",
      name: "East Field - Pest Check",
      date: "2024-01-14",
      location: "East Field, Section C",
      notes: "Possible aphid infestation",
      status: "flagged",
      tags: ["corn", "pest-alert"],
      analysis: {
        healthScore: 62,
        ndvi: 0.58,
        chlorophyll: 55,
        moisture: 45,
        nitrogenLevel: 68,
        pestRisk: 75,
        diseaseRisk: 35,
        recommendations: [
          "Immediate pest control measures required",
          "Apply systemic insecticide",
          "Increase monitoring frequency",
          "Check adjacent fields for pest spread"
        ],
        detectedIssues: [
          { type: "Aphid Infestation", severity: "high", affectedArea: 35 },
          { type: "Leaf Damage", severity: "medium", affectedArea: 28 },
          { type: "Nutrient Stress", severity: "low", affectedArea: 15 }
        ],
        environmentalData: {
          temperature: 29,
          humidity: 70,
          windSpeed: 5,
          solarRadiation: 920
        }
      }
    }
  ]);
  
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<FieldImage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: FieldImage = {
            id: Date.now().toString(),
            url: e.target?.result as string,
            name: file.name,
            date: new Date().toISOString().split('T')[0],
            location: "",
            notes: "",
            status: "pending",
            tags: []
          };
          setImages(prev => [newImage, ...prev]);
          toast.success(`Image "${file.name}" uploaded successfully`);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(`File "${file.name}" is not an image`);
      }
    });
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    toast.success("Image deleted");
  };

  const analyzeImage = (image: FieldImage) => {
    // Simulate AI analysis
    const updatedImage = {
      ...image,
      status: "analyzed" as const,
      analysis: {
        healthScore: Math.floor(Math.random() * 40) + 60,
        ndvi: Math.random() * 0.5 + 0.5,
        chlorophyll: Math.floor(Math.random() * 40) + 50,
        moisture: Math.floor(Math.random() * 60) + 20,
        nitrogenLevel: Math.floor(Math.random() * 40) + 60,
        pestRisk: Math.floor(Math.random() * 60) + 10,
        diseaseRisk: Math.floor(Math.random() * 50) + 5,
        recommendations: [
          "Monitor field conditions closely",
          "Consider soil testing for nutrient levels",
          "Apply preventive fungicide if humidity increases",
          "Optimize irrigation schedule based on weather forecast"
        ],
        detectedIssues: [
          { 
            type: "Minor Stress Detected", 
            severity: Math.random() > 0.5 ? "low" : "medium" as "low" | "medium", 
            affectedArea: Math.floor(Math.random() * 20) + 5 
          }
        ],
        environmentalData: {
          temperature: Math.floor(Math.random() * 15) + 20,
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          solarRadiation: Math.floor(Math.random() * 400) + 600
        }
      }
    };
    
    setImages(prev => prev.map(img => img.id === image.id ? updatedImage : img));
    toast.success(`Analysis complete for ${image.name}`);
    
    // Open modal to show results
    setSelectedImage(updatedImage);
    setModalOpen(true);
  };

  const viewDetails = (image: FieldImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Field Images</h1>
        <p className="text-muted-foreground">Upload and manage field images for AI-powered crop analysis</p>
      </div>

      {/* Upload Section */}
      <Card className="mb-8 border-2 border-dashed border-muted hover:border-primary/50 transition-colors">
        <CardContent className="p-8">
          <form
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            
            <div
              className={`relative flex flex-col items-center justify-center space-y-4 rounded-lg p-12 transition-all ${
                dragActive ? "bg-primary/5 border-2 border-primary" : "bg-background"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-foreground">
                  Drop your field images here
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse from your device
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={onButtonClick} variant="default">
                  <Folder className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
                <Button variant="outline" onClick={() => toast.info("Camera integration coming soon!")}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, HEIC • Max size: 10MB
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video bg-muted">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => deleteImage(image.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Badge
                className="absolute top-2 left-2"
                variant={
                  image.status === "analyzed" ? "default" :
                  image.status === "flagged" ? "destructive" : "secondary"
                }
              >
                {image.status}
              </Badge>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground truncate">{image.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {image.date}
                  </span>
                  {image.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {image.location}
                    </span>
                  )}
                </div>
              </div>

              {image.notes && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {image.notes}
                </p>
              )}

              {image.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {image.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {image.status === "analyzed" ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => viewDetails(image)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View Analysis
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1"
                      onClick={() => viewDetails(image)}
                    >
                      <BarChart className="mr-1 h-3 w-3" />
                      Reports
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image className="mr-1 h-3 w-3" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      className="flex-1"
                      onClick={() => analyzeImage(image)}
                    >
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Analyze
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <div className="rounded-full bg-muted w-20 h-20 mx-auto flex items-center justify-center">
              <Image className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">No images uploaded yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Start by uploading field images for AI-powered analysis
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Analysis Modal */}
      <ImageAnalysisModal 
        image={selectedImage} 
        open={modalOpen} 
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default FieldImages;