import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { 
  Map, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Download,
  Filter,
  Droplets,
  TreePine,
  Tractor,
  Home,
  AlertTriangle
} from "lucide-react";

export function WebGISMap() {
  const [selectedState, setSelectedState] = useState("madhya-pradesh");
  const [selectedDistrict, setSelectedDistrict] = useState("mandla");
  const [activeLayer, setActiveLayer] = useState("satellite");
  const [layers, setLayers] = useState({
    waterBodies: true,
    forestCover: true,
    agriculture: false,
    settlements: false,
    boundaries: true
  });

  const states = [
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "odisha", label: "Odisha" },
    { value: "jharkhand", label: "Jharkhand" }
  ];

  const districts = [
    { value: "mandla", label: "Mandla" },
    { value: "dindori", label: "Dindori" },
    { value: "balaghat", label: "Balaghat" },
    { value: "seoni", label: "Seoni" }
  ];

  const baseLayers = [
    { value: "satellite", label: "Satellite", icon: "🛰️" },
    { value: "terrain", label: "Terrain", icon: "🏔️" },
    { value: "street", label: "Street", icon: "🛣️" },
    { value: "hybrid", label: "Hybrid", icon: "📍" }
  ];

  const assetStats = [
    {
      type: "Water Bodies",
      count: 156,
      area: "324.5 ha",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      type: "Forest Cover", 
      count: 89,
      area: "1,245.2 ha",
      icon: TreePine,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      type: "Agriculture",
      count: 234,
      area: "892.1 ha", 
      icon: Tractor,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      type: "Settlements",
      count: 67,
      area: "124.8 ha",
      icon: Home,
      color: "text-purple-600", 
      bgColor: "bg-purple-100"
    }
  ];

  const recentAlerts = [
    {
      type: "Deforestation Alert",
      location: "Grid 23.1815N, 80.6606E",
      severity: "High",
      date: "2 hours ago",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      type: "Water Body Change",
      location: "Kolhua Village",
      severity: "Medium", 
      date: "5 hours ago",
      icon: Droplets,
      color: "text-blue-600"
    },
    {
      type: "New Settlement",
      location: "Samnapur Region",
      severity: "Low",
      date: "1 day ago",
      icon: Home,
      color: "text-gray-600"
    }
  ];

  const toggleLayer = (layerName: string) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">WebGIS & Asset Visualization</h2>
        <p className="text-gray-600 mt-1">Interactive mapping and asset detection for FRA claims</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Location Selector */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>State</Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>District</Label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Base Layer Selector */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Base Layer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {baseLayers.map((layer) => (
                  <Button
                    key={layer.value}
                    variant={activeLayer === layer.value ? "default" : "outline"}
                    className="h-auto py-3 px-3 text-xs"
                    onClick={() => setActiveLayer(layer.value)}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">{layer.icon}</div>
                      <div>{layer.label}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Layer Controls */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(layers).map(([layerName, isActive]) => (
                <div key={layerName} className="flex items-center justify-between">
                  <Label className="text-sm capitalize">
                    {layerName.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Switch
                    checked={isActive}
                    onCheckedChange={() => toggleLayer(layerName)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Asset Statistics */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Assets Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assetStats.map((asset, index) => {
                const Icon = asset.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${asset.bgColor}`}>
                        <Icon className={`w-4 h-4 ${asset.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{asset.type}</p>
                        <p className="text-xs text-gray-600">{asset.area}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{asset.count}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Map className="w-5 h-5 mr-2" />
                  Interactive Map - {districts.find(d => d.value === selectedDistrict)?.label}
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mock Map Display */}
              <div className="relative bg-gradient-to-br from-green-100 to-blue-100 h-96 rounded-b-lg overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-blue-50 to-green-50 pattern-grid"></div>
                
                {/* Overlay Information */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Water Bodies (156)</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Forest Cover (89)</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Agricultural Land (234)</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Click on map features for detailed information
                    </p>
                  </div>
                </div>

                {/* Coordinates Display */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-mono">
                  23°10'53.4&quot;N 80°39'38.2&quot;E
                </div>

                {/* Scale Bar */}
                <div className="absolute bottom-4 right-4 bg-white rounded px-3 py-1 text-sm">
                  Scale: 1:50,000
                </div>

                {/* Sample Asset Markers */}
                <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="bg-white mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => {
                  const Icon = alert.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${alert.color}`} />
                        <div>
                          <p className="font-medium text-gray-900">{alert.type}</p>
                          <p className="text-sm text-gray-600">{alert.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={alert.severity === "High" ? "destructive" : alert.severity === "Medium" ? "default" : "outline"}
                        >
                          {alert.severity}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}