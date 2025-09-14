import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import {
  Droplets,
  Thermometer,
  Wind,
  Sun,
  Activity,
  AlertTriangle,
  TrendingUp,
  MapPin,
  RefreshCw,
  Download
} from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1500);
  };

  const sensorData = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: "24°C",
      trend: "+2°C",
      status: "optimal"
    },
    {
      icon: Droplets,
      label: "Soil Moisture",
      value: "68%",
      trend: "-5%",
      status: "good"
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: "12 km/h",
      trend: "Stable",
      status: "optimal"
    },
    {
      icon: Sun,
      label: "UV Index",
      value: "6",
      trend: "High",
      status: "warning"
    }
  ];

  const fields = [
    {
      name: "North Field",
      area: "45 acres",
      crop: "Wheat",
      health: 92,
      status: "excellent",
      ndvi: 0.82,
      lastScan: "2 hours ago"
    },
    {
      name: "South Field",
      area: "38 acres",
      crop: "Corn",
      health: 78,
      status: "good",
      ndvi: 0.71,
      lastScan: "4 hours ago"
    },
    {
      name: "East Field",
      area: "52 acres",
      crop: "Soybeans",
      health: 65,
      status: "moderate",
      ndvi: 0.58,
      lastScan: "1 hour ago"
    },
    {
      name: "West Field",
      area: "41 acres",
      crop: "Barley",
      health: 45,
      status: "poor",
      ndvi: 0.42,
      lastScan: "30 min ago",
      alert: "Pest activity detected"
    }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-health-excellent";
    if (health >= 60) return "text-health-good";
    if (health >= 40) return "text-health-moderate";
    if (health >= 20) return "text-health-poor";
    return "text-health-critical";
  };

  const getHealthBg = (health: number) => {
    if (health >= 80) return "bg-health-excellent";
    if (health >= 60) return "bg-health-good";
    if (health >= 40) return "bg-health-moderate";
    if (health >= 20) return "bg-health-poor";
    return "bg-health-critical";
  };

  return (
    <div className="min-h-screen bg-gradient-field">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Farm Overview Dashboard
              </h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                className={isRefreshing ? 'animate-spin' : ''}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="tech">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Sensor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {sensorData.map((sensor, index) => {
              const Icon = sensor.icon;
              return (
                <Card key={index} className="p-4 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gradient-tech rounded-lg">
                      <Icon className="h-5 w-5 text-info-foreground" />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      sensor.status === 'optimal' ? 'bg-success/10 text-success' :
                      sensor.status === 'warning' ? 'bg-warning/10 text-warning' :
                      'bg-info/10 text-info'
                    }`}>
                      {sensor.trend}
                    </span>
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-1">{sensor.label}</h3>
                  <p className="text-2xl font-bold text-foreground">{sensor.value}</p>
                </Card>
              );
            })}
          </div>

          {/* Fields Overview */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Field Health Status
              </h2>
              <Button variant="ghost" size="sm">
                View All Fields
              </Button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{field.name}</h3>
                        {field.alert && (
                          <span className="flex items-center gap-1 text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                            <AlertTriangle className="h-3 w-3" />
                            {field.alert}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{field.area}</span>
                        <span>•</span>
                        <span>{field.crop}</span>
                        <span>•</span>
                        <span>NDVI: {field.ndvi}</span>
                        <span>•</span>
                        <span>{field.lastScan}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Health Score</p>
                        <p className={`text-2xl font-bold ${getHealthColor(field.health)}`}>
                          {field.health}%
                        </p>
                      </div>
                      <div className="w-32">
                        <Progress 
                          value={field.health} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Alerts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-warning" />
                Recent Alerts
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Pest Detection - West Field</p>
                    <p className="text-sm text-muted-foreground">Aphid infestation detected in sector B3</p>
                    <p className="text-xs text-muted-foreground mt-1">30 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <Sun className="h-5 w-5 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">High UV Index</p>
                    <p className="text-sm text-muted-foreground">Consider irrigation schedule adjustment</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                AI Predictions
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Optimal Harvest Window</p>
                  <p className="text-sm text-muted-foreground">North Field wheat: 12-15 days</p>
                  <p className="text-xs text-success mt-1">95% confidence</p>
                </div>
                <div className="p-3 bg-info/5 border border-info/20 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Weather Pattern Analysis</p>
                  <p className="text-sm text-muted-foreground">70% chance of rain in next 48 hours</p>
                  <p className="text-xs text-info mt-1">Based on current conditions</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;