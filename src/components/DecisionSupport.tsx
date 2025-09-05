import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Lightbulb
} from "lucide-react";

export function DecisionSupport() {
  const [selectedClaim, setSelectedClaim] = useState("FRA-001");
  const [analysisType, setAnalysisType] = useState("eligibility");

  const schemes = [
    {
      id: "pm-kisan",
      name: "PM-KISAN",
      description: "Direct Income Support to Farmers",
      eligibility: 92,
      benefits: "₹6,000 per year",
      status: "eligible",
      requirements: ["Land ownership proof", "Aadhaar card", "Bank account"]
    },
    {
      id: "mgnrega",
      name: "MGNREGA", 
      description: "Mahatma Gandhi National Rural Employment Guarantee Act",
      eligibility: 88,
      benefits: "100 days guaranteed work",
      status: "eligible",
      requirements: ["Job card", "Residence proof", "Bank account"]
    },
    {
      id: "jal-jeevan",
      name: "Jal Jeevan Mission",
      description: "Functional Household Tap Connection",
      eligibility: 76,
      benefits: "Piped water connection",
      status: "partial",
      requirements: ["House ownership", "Water source availability", "Community participation"]
    },
    {
      id: "forest-livelihood",
      name: "Forest Livelihood Program",
      description: "Sustainable Forest Management & Livelihood",
      eligibility: 95,
      benefits: "Training & Equipment",
      status: "eligible",
      requirements: ["FRA title", "Forest proximity", "Community group membership"]
    }
  ];

  const recommendations = [
    {
      priority: "High",
      type: "Immediate Action",
      title: "Water Infrastructure Development",
      description: "Install bore well and water storage tank in Kolhua village due to low water index",
      impact: "234 families",
      timeline: "3 months",
      cost: "₹8.5 Lakhs",
      schemes: ["Jal Jeevan Mission", "MGNREGA"]
    },
    {
      priority: "Medium", 
      type: "Capacity Building",
      title: "Sustainable Forest Management Training",
      description: "Provide training on forest conservation and NTFP collection practices",
      impact: "89 families",
      timeline: "6 months", 
      cost: "₹2.3 Lakhs",
      schemes: ["Forest Livelihood Program"]
    },
    {
      priority: "Low",
      type: "Documentation",
      title: "Digital Land Records Update",
      description: "Update and digitize land records for better claim processing",
      impact: "156 claims",
      timeline: "2 months",
      cost: "₹1.2 Lakhs",
      schemes: ["Digital India Initiative"]
    }
  ];

  const claimAnalysis = {
    "FRA-001": {
      applicant: "Ramesh Kumar",
      village: "Kolhua",
      district: "Mandla",
      landArea: "2.5 acres",
      forestProximity: "Adjacent",
      waterAccess: "Limited",
      eligibilityScore: 87,
      risks: ["Water scarcity", "Seasonal access"],
      opportunities: ["NTFP collection", "Eco-tourism potential"]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "eligible": return "bg-green-100 text-green-800";
      case "partial": return "bg-yellow-100 text-yellow-800";
      case "not-eligible": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "eligible": return <CheckCircle className="w-4 h-4" />;
      case "partial": return <AlertTriangle className="w-4 h-4" />;
      case "not-eligible": return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800"; 
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Decision Support System</h2>
        <p className="text-gray-600 mt-1">AI-powered recommendations and scheme eligibility analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Analysis Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Claim</Label>
                <Select value={selectedClaim} onValueChange={setSelectedClaim}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FRA-001">FRA-001 - Ramesh Kumar</SelectItem>
                    <SelectItem value="FRA-002">FRA-002 - Sita Devi</SelectItem>
                    <SelectItem value="FRA-003">FRA-003 - Incomplete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Analysis Type</Label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eligibility">Scheme Eligibility</SelectItem>
                    <SelectItem value="risk">Risk Assessment</SelectItem>
                    <SelectItem value="intervention">Intervention Priority</SelectItem>
                    <SelectItem value="livelihood">Livelihood Potential</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Target className="w-4 h-4 mr-2" />
                Run Analysis
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Eligibility Score</span>
                <span className="font-medium text-green-600">87%</span>
              </div>
              <Progress value={87} className="h-2" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Eligible Schemes</span>
                  <span className="font-medium">3/4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk Level</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Priority Score</span>
                  <span className="font-medium">8.2/10</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claim Details */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Claim Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {claimAnalysis[selectedClaim] && (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Applicant:</span>
                    <span className="font-medium ml-2">{claimAnalysis[selectedClaim].applicant}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium ml-2">
                      {claimAnalysis[selectedClaim].village}, {claimAnalysis[selectedClaim].district}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Land Area:</span>
                    <span className="font-medium ml-2">{claimAnalysis[selectedClaim].landArea}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Forest Proximity:</span>
                    <span className="font-medium ml-2">{claimAnalysis[selectedClaim].forestProximity}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Water Access:</span>
                    <span className="font-medium ml-2">{claimAnalysis[selectedClaim].waterAccess}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scheme Eligibility */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Scheme Eligibility Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schemes.map((scheme) => (
                  <div key={scheme.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{scheme.name}</h4>
                          <Badge className={getStatusColor(scheme.status)}>
                            {getStatusIcon(scheme.status)}
                            <span className="ml-1 capitalize">{scheme.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                            <span>{scheme.benefits}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-medium text-green-600">{scheme.eligibility}%</div>
                        <Progress value={scheme.eligibility} className="h-2 w-20" />
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Requirements:</p>
                      <div className="flex flex-wrap gap-2">
                        {scheme.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-orange-600" />
                AI-Powered Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority} Priority
                          </Badge>
                          <Badge variant="outline">{rec.type}</Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-blue-600 mr-2" />
                            <span>{rec.impact}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-green-600 mr-2" />
                            <span>{rec.timeline}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-orange-600 mr-2" />
                            <span>{rec.cost}</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-purple-600 mr-2" />
                            <span>High Impact</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Applicable Schemes:</p>
                      <div className="flex flex-wrap gap-2">
                        {rec.schemes.map((scheme, schemeIndex) => (
                          <Badge key={schemeIndex} variant="outline" className="text-xs bg-blue-50">
                            {scheme}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Risk Factors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-red-900">Water Scarcity</span>
                  <Badge className="bg-red-100 text-red-800">High</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm text-yellow-900">Seasonal Access</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-900">Market Distance</span>
                  <Badge className="bg-blue-100 text-blue-800">Low</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-green-900">NTFP Collection</span>
                  <Badge className="bg-green-100 text-green-800">High</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-purple-900">Eco-tourism</span>
                  <Badge className="bg-purple-100 text-purple-800">Medium</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm text-orange-900">Organic Farming</span>
                  <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}