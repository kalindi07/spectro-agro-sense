import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Filter,
  Share2
} from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  const reports = [
    {
      id: 1,
      title: "Weekly Field Health Report",
      type: "Health Analysis",
      date: "Dec 10, 2024",
      size: "2.4 MB",
      icon: TrendingUp,
      color: "success",
      summary: "Overall health improved by 8% this week"
    },
    {
      id: 2,
      title: "Monthly Pest Activity Report",
      type: "Pest Management",
      date: "Dec 1, 2024",
      size: "1.8 MB",
      icon: BarChart3,
      color: "warning",
      summary: "3 pest incidents detected and resolved"
    },
    {
      id: 3,
      title: "Soil Analysis Report",
      type: "Soil Health",
      date: "Nov 28, 2024",
      size: "3.1 MB",
      icon: PieChart,
      color: "info",
      summary: "Nitrogen levels optimal in 85% of fields"
    },
    {
      id: 4,
      title: "Irrigation Efficiency Report",
      type: "Water Management",
      date: "Nov 25, 2024",
      size: "1.5 MB",
      icon: TrendingUp,
      color: "primary",
      summary: "Water usage reduced by 15% this month"
    }
  ];

  const metrics = [
    { label: "Total Reports", value: "124", change: "+12" },
    { label: "This Month", value: "18", change: "+3" },
    { label: "Avg. Health Score", value: "78%", change: "+5%" },
    { label: "Data Processed", value: "2.8TB", change: "+450GB" }
  ];

  return (
    <div className="min-h-screen bg-gradient-field">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                Reports & Analytics
              </h1>
              <p className="text-muted-foreground">
                Comprehensive insights and analysis of your farm operations
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="tech">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <span className="text-sm text-success">{metric.change}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Period Selection */}
          <div className="flex gap-2 mb-6">
            {["daily", "weekly", "monthly", "yearly"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                {period}
              </Button>
            ))}
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${
                      report.color === "success" ? "bg-success/10" :
                      report.color === "warning" ? "bg-warning/10" :
                      report.color === "info" ? "bg-info/10" :
                      "bg-primary/10"
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        report.color === "success" ? "text-success" :
                        report.color === "warning" ? "text-warning" :
                        report.color === "info" ? "text-info" :
                        "text-primary"
                      }`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{report.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {report.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{report.type}</p>
                  
                  <div className="bg-muted/30 rounded-lg p-3 mb-4">
                    <p className="text-sm text-foreground">{report.summary}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{report.size}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Generate Custom Report */}
          <Card className="mt-8 p-8 bg-gradient-primary text-primary-foreground">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">Generate Custom Report</h2>
              <p className="mb-6 text-primary-foreground/90">
                Create detailed reports tailored to your specific needs
              </p>
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Create Custom Report
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reports;