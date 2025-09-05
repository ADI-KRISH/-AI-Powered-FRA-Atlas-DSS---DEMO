import { useState } from "react";
import { 
  Home, 
  FileText, 
  Map, 
  BarChart3, 
  Users, 
  Settings, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  TreePine,
  Droplets,
  Target
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", count: null },
    { id: "documents", icon: FileText, label: "FRA Documents", count: 24 },
    { id: "upload", icon: Upload, label: "Upload & Process", count: null },
    { id: "mapping", icon: Map, label: "WebGIS & Assets", count: null },
    { id: "analytics", icon: BarChart3, label: "Analytics", count: null },
    { id: "dss", icon: Target, label: "Decision Support", count: 12 },
    { id: "users", icon: Users, label: "User Management", count: null },
  ];

  const assetCategories = [
    { id: "water", icon: Droplets, label: "Water Bodies", count: 156 },
    { id: "forest", icon: TreePine, label: "Forest Cover", count: 89 },
    { id: "agriculture", icon: CheckCircle, label: "Agricultural Land", count: 234 },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className={`ml-2 ${isActive ? "bg-blue-500 text-white" : ""}`}
                  >
                    {item.count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* Asset Categories */}
        <div className="mt-8">
          <h3 className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
            Asset Categories
          </h3>
          <div className="mt-2 space-y-1">
            {assetCategories.map((item) => {
              const Icon = item.icon;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:bg-gray-100"
                  onClick={() => setActiveSection(`assets-${item.id}`)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <Badge variant="outline" className="ml-2">
                    {item.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Status Indicators */}
      <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-gray-700">Processed</span>
            </div>
            <span className="font-medium">147</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
              <span className="text-gray-700">Pending</span>
            </div>
            <span className="font-medium">23</span>
          </div>
        </div>
      </div>
    </div>
  );
}