import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { DocumentProcessor } from "./components/DocumentProcessor";
import { WebGISMap } from "./components/WebGISMap";
import { DecisionSupport } from "./components/DecisionSupport";
import { Analytics } from "./components/Analytics";

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "documents":
      case "upload":
        return <DocumentProcessor />;
      case "mapping":
        return <WebGISMap />;
      case "analytics":
        return <Analytics />;
      case "dss":
        return <DecisionSupport />;
      case "users":
        return (
          <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
              <p className="text-gray-600 mt-1">Manage user roles and permissions for the FRA platform</p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-500">User management functionality will be implemented here.</p>
            </div>
          </div>
        );
      case "assets-water":
      case "assets-forest":
      case "assets-agriculture":
        return <WebGISMap />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}