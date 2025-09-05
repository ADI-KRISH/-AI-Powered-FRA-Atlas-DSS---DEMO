import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Upload, 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download,
  Edit3,
  Save,
  AlertTriangle
} from "lucide-react";

export function DocumentProcessor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const mockDocuments = [
    {
      id: "FRA-001",
      filename: "fra_claim_mandla_001.pdf",
      village: "Kolhua",
      district: "Mandla",
      status: "processed",
      confidence: 94,
      uploadDate: "2024-01-15",
      extractedFields: {
        applicantName: "Ramesh Kumar",
        fatherName: "Shankar Kumar",
        village: "Kolhua",
        district: "Mandla",
        landArea: "2.5 acres",
        coordinates: "23.1815°N, 80.6606°E"
      }
    },
    {
      id: "FRA-002", 
      filename: "fra_claim_dindori_002.pdf",
      village: "Samnapur",
      district: "Dindori",
      status: "pending",
      confidence: 87,
      uploadDate: "2024-01-14",
      extractedFields: {
        applicantName: "Sita Devi",
        fatherName: "Ram Singh", 
        village: "Samnapur",
        district: "Dindori",
        landArea: "1.8 acres",
        coordinates: "22.9676°N, 81.0794°E"
      }
    },
    {
      id: "FRA-003",
      filename: "fra_claim_balaghat_003.pdf", 
      village: "Baihar",
      district: "Balaghat",
      status: "rejected",
      confidence: 65,
      uploadDate: "2024-01-13",
      extractedFields: {
        applicantName: "Incomplete Data",
        fatherName: "Not Clear",
        village: "Baihar", 
        district: "Balaghat",
        landArea: "Unknown",
        coordinates: "Not extracted"
      }
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      processDocument(file);
    }
  };

  const processDocument = async (file: File) => {
    setProcessing(true);
    // Simulate OCR processing
    setTimeout(() => {
      setExtractedText(`Extracted text from ${file.name}:\n\nApplicant Name: [Extracted Name]\nFather's Name: [Extracted Father Name]\nVillage: [Extracted Village]\nDistrict: [Extracted District]\nLand Area: [Extracted Area]\nSurvey Number: [Extracted Survey No.]\nCoordinates: [Extracted Coordinates]\n\nAdditional Details:\n[Extracted content from the FRA form...]`);
      setProcessing(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";  
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Document Processing</h2>
        <p className="text-gray-600 mt-1">Upload and process FRA documents using OCR technology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop FRA documents</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
                    Select File
                  </Button>
                </label>
              </div>
              
              {selectedFile && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <Badge variant="outline" className="text-blue-700">
                      {selectedFile.size < 1024 * 1024 
                        ? `${(selectedFile.size / 1024).toFixed(0)}KB`
                        : `${(selectedFile.size / (1024 * 1024)).toFixed(1)}MB`
                      }
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                  {processing && (
                    <div className="mt-3">
                      <Progress value={66} className="h-2" />
                      <p className="text-xs text-blue-700 mt-1">Processing with OCR...</p>
                    </div>
                  )}
                </div>
              )}

              <div className="text-sm text-gray-600">
                <p><strong>Supported formats:</strong> PDF, JPG, PNG</p>
                <p><strong>Max size:</strong> 10MB per file</p>
                <p><strong>Languages:</strong> Hindi, English</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Extracted Text Section */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Extracted Information
                </span>
                {extractedText && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      {isEditing ? "View" : "Edit"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {extractedText ? (
                <div className="space-y-4">
                  {isEditing ? (
                    <Textarea
                      value={extractedText}
                      onChange={(e) => setExtractedText(e.target.value)}
                      className="min-h-[300px] font-mono text-sm"
                      placeholder="Extracted text will appear here..."
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-4 min-h-[300px]">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {extractedText}
                      </pre>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <Label>Confidence Score</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Progress value={91} className="h-2" />
                        <span className="text-sm font-medium text-green-600">91%</span>
                      </div>
                    </div>
                    <div>
                      <Label>Processing Status</Label>
                      <Badge className="mt-1 bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Upload a document to see extracted information</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document History */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Document ID</th>
                  <th className="text-left py-3 px-4">Filename</th>
                  <th className="text-left py-3 px-4">Village/District</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Confidence</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">{doc.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">{doc.filename}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{doc.village}</p>
                        <p className="text-sm text-gray-600">{doc.district}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(doc.status)} border-0`}>
                        {getStatusIcon(doc.status)}
                        <span className="ml-1 capitalize">{doc.status}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={doc.confidence} 
                          className="h-2 w-16" 
                        />
                        <span className="text-sm">{doc.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{doc.uploadDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}