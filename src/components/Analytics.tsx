import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieIcon,
  Download,
  Calendar,
  Filter,
  MapPin,
  Users,
  Droplets,
  TreePine,
  Tractor,
  AlertTriangle
} from "lucide-react";

export function Analytics() {
  const timeSeriesData = [
    { month: "Jan", claims: 180, processed: 165, approved: 142, rejected: 23 },
    { month: "Feb", claims: 220, processed: 198, approved: 172, rejected: 26 },
    { month: "Mar", claims: 195, processed: 185, approved: 159, rejected: 26 },
    { month: "Apr", claims: 267, processed: 245, approved: 210, rejected: 35 },
    { month: "May", claims: 298, processed: 276, approved: 239, rejected: 37 },
    { month: "Jun", claims: 312, processed: 289, approved: 251, rejected: 38 }
  ];

  const districtData = [
    { district: "Mandla", claims: 456, processed: 398, percentage: 87 },
    { district: "Dindori", claims: 389, processed: 334, percentage: 86 },
    { district: "Balaghat", claims: 234, processed: 189, percentage: 81 },
    { district: "Seoni", claims: 198, processed: 154, percentage: 78 },
    { district: "Chhindwara", claims: 167, processed: 125, percentage: 75 }
  ];

  const assetDistribution = [
    { name: "Water Bodies", value: 324.5, count: 156, color: "#3b82f6" },
    { name: "Forest Cover", value: 1245.2, count: 89, color: "#10b981" },
    { name: "Agricultural Land", value: 892.1, count: 234, color: "#f59e0b" },
    { name: "Settlements", value: 124.8, count: 67, color: "#8b5cf6" }
  ];

  const schemeEnrollment = [
    { scheme: "PM-KISAN", eligible: 892, enrolled: 634, percentage: 71 },
    { scheme: "MGNREGA", eligible: 1245, enrolled: 987, percentage: 79 },
    { scheme: "Jal Jeevan", eligible: 567, enrolled: 234, percentage: 41 },
    { scheme: "Forest Livelihood", eligible: 345, enrolled: 289, percentage: 84 }
  ];

  const interventionImpact = [
    { month: "Jan", waterProjects: 12, beneficiaries: 234, cost: 45.6 },
    { month: "Feb", waterProjects: 15, beneficiaries: 298, cost: 52.3 },
    { month: "Mar", waterProjects: 18, beneficiaries: 356, cost: 68.9 },
    { month: "Apr", waterProjects: 22, beneficiaries: 445, cost: 78.4 },
    { month: "May", waterProjects: 25, beneficiaries: 523, cost: 89.7 },
    { month: "Jun", waterProjects: 28, beneficiaries: 612, cost: 95.2 }
  ];

  const performanceMetrics = [
    {
      title: "Processing Efficiency",
      current: 89,
      target: 95,
      trend: "up",
      change: "+5%"
    },
    {
      title: "Approval Rate", 
      current: 87,
      target: 85,
      trend: "up",
      change: "+2%"
    },
    {
      title: "Asset Detection Accuracy",
      current: 94,
      target: 90,
      trend: "up",
      change: "+8%"
    },
    {
      title: "Scheme Enrollment",
      current: 69,
      target: 80,
      trend: "down",
      change: "-3%"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Analytics & Insights</h2>
          <p className="text-gray-600 mt-1">Comprehensive analysis of FRA claims and asset management</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{metric.title}</h4>
                {metric.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-end space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{metric.current}%</span>
                  <Badge 
                    variant={metric.trend === "up" ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.current >= metric.target ? "bg-green-600" : "bg-orange-600"
                    }`}
                    style={{ width: `${Math.min(metric.current, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">Target: {metric.target}%</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims Processing Trend */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Claims Processing Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="claims" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="processed" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="approved" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Asset Distribution */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieIcon className="w-5 h-5 mr-2" />
              Asset Distribution by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value} ha`}
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} hectares`]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* District Performance */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            District-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {districtData.map((district, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{district.district}</h4>
                    <Badge variant="outline">{district.percentage}% processed</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Total Claims: {district.claims}</span>
                    <span>Processed: {district.processed}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${district.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheme Enrollment Analysis */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Scheme Enrollment Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schemeEnrollment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scheme" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="eligible" fill="#e5e7eb" name="Eligible" />
                <Bar dataKey="enrolled" fill="#3b82f6" name="Enrolled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Intervention Impact */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Intervention Impact Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interventionImpact}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="waterProjects" stroke="#3b82f6" strokeWidth={2} name="Water Projects" />
                <Line type="monotone" dataKey="beneficiaries" stroke="#10b981" strokeWidth={2} name="Beneficiaries" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Asset Detection Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Droplets className="w-5 h-5 mr-2 text-blue-600" />
              Water Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">156</p>
                <p className="text-sm text-gray-600">Water Bodies Detected</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ponds</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wells</span>
                  <span className="font-medium">34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Streams</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tanks</span>
                  <span className="font-medium">10</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TreePine className="w-5 h-5 mr-2 text-green-600" />
              Forest Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">1,245</p>
                <p className="text-sm text-gray-600">Hectares Mapped</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Dense Forest</span>
                  <span className="font-medium">687 ha</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Moderate Forest</span>
                  <span className="font-medium">398 ha</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Open Forest</span>
                  <span className="font-medium">160 ha</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Priority Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-900">High Priority</p>
                <p className="text-xs text-red-700">12 villages need immediate water intervention</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">Medium Priority</p>
                <p className="text-xs text-yellow-700">8 areas require forest conservation</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Low Priority</p>
                <p className="text-xs text-blue-700">5 regions for livelihood programs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}