import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { 
  FileText, 
  Map, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Droplets,
  TreePine,
  Tractor
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total FRA Claims",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "bg-blue-600"
    },
    {
      title: "Processed Claims",
      value: "2,156",
      change: "+8%", 
      trend: "up",
      icon: CheckCircle,
      color: "bg-green-600"
    },
    {
      title: "Pending Validation",
      value: "234",
      change: "-15%",
      trend: "down", 
      icon: Clock,
      color: "bg-yellow-600"
    },
    {
      title: "Active Villages",
      value: "456",
      change: "+5%",
      trend: "up",
      icon: Map,
      color: "bg-purple-600"
    }
  ];

  const claimsData = [
    { month: "Jan", processed: 180, pending: 45, rejected: 12 },
    { month: "Feb", processed: 220, pending: 38, rejected: 8 },
    { month: "Mar", processed: 195, pending: 52, rejected: 15 },
    { month: "Apr", processed: 267, pending: 41, rejected: 9 },
    { month: "May", processed: 298, pending: 29, rejected: 6 },
    { month: "Jun", processed: 312, pending: 34, rejected: 11 }
  ];

  const assetData = [
    { name: "Water Bodies", value: 156, color: "#3b82f6" },
    { name: "Forest Cover", value: 234, color: "#10b981" },
    { name: "Agricultural Land", value: 189, color: "#f59e0b" },
    { name: "Settlements", value: 78, color: "#8b5cf6" }
  ];

  const schemeEligibility = [
    { scheme: "PM-KISAN", eligible: 892, enrolled: 634 },
    { scheme: "MGNREGA", eligible: 1245, enrolled: 987 },
    { scheme: "Jal Jeevan Mission", eligible: 567, enrolled: 234 },
    { scheme: "Forest Livelihood", eligible: 345, enrolled: 289 }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">FRA Atlas Dashboard</h2>
        <p className="text-gray-600 mt-1">Monitor Forest Rights Act claims and asset management across regions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <Badge 
                        variant={stat.trend === "up" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-gray-500 ml-2">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claims Processing Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Claims Processing Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={claimsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="processed" fill="#10b981" name="Processed" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Asset Distribution */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Scheme Eligibility Overview */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Scheme Eligibility & Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {schemeEligibility.map((scheme, index) => {
              const enrollmentRate = (scheme.enrolled / scheme.eligible) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{scheme.scheme}</h4>
                    <span className="text-sm text-gray-600">
                      {scheme.enrolled}/{scheme.eligible} enrolled
                    </span>
                  </div>
                  <Progress value={enrollmentRate} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{enrollmentRate.toFixed(1)}% enrollment rate</span>
                    <span>{scheme.eligible - scheme.enrolled} pending</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
              Priority Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">Low Water Index</p>
                  <p className="text-sm text-red-700">Mandla District</p>
                </div>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900">Deforestation Alert</p>
                  <p className="text-sm text-yellow-700">Dindori Region</p>
                </div>
                <Badge className="bg-yellow-600">Medium</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-orange-900">Pending Validation</p>
                  <p className="text-sm text-orange-700">Balaghat Area</p>
                </div>
                <Badge className="bg-orange-600">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Asset Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Water Bodies</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">156 detected</p>
                  <p className="text-sm text-gray-600">23 new this month</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TreePine className="w-5 h-5 text-green-600 mr-3" />
                  <span>Forest Areas</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">234 mapped</p>
                  <p className="text-sm text-gray-600">12 monitored</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tractor className="w-5 h-5 text-orange-600 mr-3" />
                  <span>Agriculture</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">189 plots</p>
                  <p className="text-sm text-gray-600">45 under review</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <p className="text-sm font-medium">Claim Approved</p>
                <p className="text-xs text-gray-600">Village: Kolhua, District: Mandla</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <p className="text-sm font-medium">New Assets Detected</p>
                <p className="text-xs text-gray-600">3 water bodies in Dindori</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-3 py-2">
                <p className="text-sm font-medium">Document Uploaded</p>
                <p className="text-xs text-gray-600">FRA Form - Balaghat region</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}