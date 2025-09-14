import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { 
  AlertTriangle, 
  Bug, 
  Droplets, 
  Thermometer, 
  Wind, 
  CheckCircle,
  X,
  Bell,
  Filter
} from "lucide-react";
import { useState } from "react";

const Alerts = () => {
  const [filter, setFilter] = useState("all");

  const alertTypes = {
    pest: { icon: Bug, color: "destructive" },
    moisture: { icon: Droplets, color: "info" },
    temperature: { icon: Thermometer, color: "warning" },
    weather: { icon: Wind, color: "secondary" }
  };

  const alerts = [
    {
      id: 1,
      type: "pest",
      severity: "high",
      title: "Aphid Infestation Detected",
      description: "High concentration of aphids detected in West Field sector B3. Immediate action recommended.",
      field: "West Field",
      time: "30 minutes ago",
      status: "active",
      recommendations: [
        "Apply targeted pesticide treatment",
        "Increase monitoring frequency",
        "Check adjacent sectors for spread"
      ]
    },
    {
      id: 2,
      type: "moisture",
      severity: "medium",
      title: "Low Soil Moisture Alert",
      description: "Soil moisture levels dropping below optimal range in North Field.",
      field: "North Field",
      time: "2 hours ago",
      status: "active",
      recommendations: [
        "Schedule irrigation within 24 hours",
        "Monitor weather forecast for rainfall",
        "Adjust irrigation based on crop stage"
      ]
    },
    {
      id: 3,
      type: "temperature",
      severity: "low",
      title: "Temperature Spike Warning",
      description: "Temperatures expected to exceed 35°C tomorrow. Consider protective measures.",
      field: "All Fields",
      time: "4 hours ago",
      status: "acknowledged",
      recommendations: [
        "Ensure adequate soil moisture",
        "Consider shade nets for sensitive crops",
        "Adjust harvesting schedule if needed"
      ]
    },
    {
      id: 4,
      type: "weather",
      severity: "medium",
      title: "Heavy Rain Forecast",
      description: "70% chance of heavy rainfall in next 48 hours. Prepare drainage systems.",
      field: "All Fields",
      time: "5 hours ago",
      status: "resolved",
      recommendations: [
        "Check and clear drainage channels",
        "Postpone fertilizer application",
        "Prepare for potential flooding"
      ]
    }
  ];

  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.status === filter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-info text-info-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-field">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <Bell className="h-8 w-8 text-primary" />
                Alert Center
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage all farm alerts in real-time
              </p>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All ({alerts.length})
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active ({alerts.filter(a => a.status === "active").length})
              </Button>
              <Button
                variant={filter === "resolved" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("resolved")}
              >
                Resolved ({alerts.filter(a => a.status === "resolved").length})
              </Button>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const AlertIcon = alertTypes[alert.type as keyof typeof alertTypes].icon;
              return (
                <Card 
                  key={alert.id} 
                  className={`p-6 transition-all duration-300 hover:shadow-xl ${
                    alert.status === "resolved" ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Alert Icon and Status */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        alert.status === "resolved" ? "bg-muted" : 
                        alert.type === "pest" ? "bg-destructive/10" :
                        alert.type === "moisture" ? "bg-info/10" :
                        alert.type === "temperature" ? "bg-warning/10" :
                        "bg-secondary/10"
                      }`}>
                        <AlertIcon className={`h-6 w-6 ${
                          alert.status === "resolved" ? "text-muted-foreground" :
                          alert.type === "pest" ? "text-destructive" :
                          alert.type === "moisture" ? "text-info" :
                          alert.type === "temperature" ? "text-warning" :
                          "text-secondary"
                        }`} />
                      </div>
                      
                      {/* Alert Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {alert.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{alert.field}</span>
                              <span>•</span>
                              <span>{alert.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            {alert.status === "resolved" && (
                              <Badge variant="outline" className="border-success text-success">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">
                          {alert.description}
                        </p>
                        
                        {/* Recommendations */}
                        {alert.status === "active" && (
                          <div className="bg-muted/30 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-semibold mb-2">Recommended Actions:</h4>
                            <ul className="space-y-1">
                              {alert.recommendations.map((rec, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Actions */}
                        {alert.status === "active" && (
                          <div className="flex gap-3">
                            <Button variant="success" size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Resolved
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4 mr-1" />
                              Dismiss
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredAlerts.length === 0 && (
            <Card className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No alerts found</h3>
              <p className="text-muted-foreground">
                {filter === "all" 
                  ? "All systems are operating normally"
                  : `No ${filter} alerts at this time`}
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Alerts;