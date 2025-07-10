"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calculator,
  FileText,
  BarChart3,
  Bell,
  Shield,
  LogOut,
  Download,
  Mail,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Brain,
  Trophy,
} from "lucide-react"
import { glassCard, glassButton, gradientBg, glassInput } from "@/lib/glassmorphism"

interface AdminDashboardProps {
  user: { name: string; role: "admin" }
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showViewDocuments, setShowViewDocuments] = useState(false)
  const [showGenerateReport, setShowGenerateReport] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(0)

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "employees", label: "Employees", icon: <Users className="h-4 w-4" /> },
    { id: "payroll", label: "Payroll", icon: <Calculator className="h-4 w-4" /> },
    { id: "compliance", label: "Compliance", icon: <Shield className="h-4 w-4" /> },
    { id: "reports", label: "Reports", icon: <FileText className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "harmony-ai", label: "Harmony AI", icon: <Brain className="h-4 w-4" /> },
    { id: "gamify", label: "Gamify", icon: <Trophy className="h-4 w-4" /> },
  ]

  // Clean, valid sample data. Feel free to adjust/expand.
  const employees = [
    {
      id: 1,
      name: "Marcus Johnson",
      department: "Electrical",
      position: "Senior Electrician",
      status: "Active",
      photo: "/employees/employee1.jpeg",
      email: "marcus.johnson@harmony.com",
      phone: "+1 (555) 123-4567",
      startDate: "Jan 15, 2022",
      salary: "$65,000",
      leaveBalance: "18 days",
      performance: "Excellent",
    },
    {
      id: 2,
      name: "Aisha Williams",
      department: "Engineering",
      position: "Civil Engineer",
      status: "Active",
      photo: "/employees/employee2.jpeg",
      email: "aisha.williams@harmony.com",
      phone: "+1 (555) 234-5678",
      startDate: "Mar 10, 2021",
      salary: "$78,000",
      leaveBalance: "22 days",
      performance: "Outstanding",
    },
    {
      id: 3,
      name: "Keisha Davis",
      department: "Operations",
      position: "Warehouse Supervisor",
      status: "Active",
      photo: "/employees/employee3.jpeg",
      email: "keisha.davis@harmony.com",
      phone: "+1 (555) 345-6789",
      startDate: "Aug 5, 2020",
      salary: "$58,000",
      leaveBalance: "15 days",
      performance: "Good",
    },
    {
      id: 4,
      name: "Zara Thompson",
      department: "Construction",
      position: "Site Engineer",
      status: "Active",
      photo: "/employees/employee4.jpeg",
      email: "zara.thompson@harmony.com",
      phone: "+1 (555) 456-7890",
      startDate: "Nov 20, 2021",
      salary: "$72,000",
      leaveBalance: "20 days",
      performance: "Excellent",
    },
    {
      id: 5,
      name: "Amara Brown",
      department: "Safety",
      position: "Safety Inspector",
      status: "Active",
      photo: "/employees/employee5.jpeg",
      email: "amara.brown@harmony.com",
      phone: "+1 (555) 567-8901",
      startDate: "Feb 14, 2023",
      salary: "$62,000",
      leaveBalance: "25 days",
      performance: "Good",
    },
    {
      id: 6,
      name: "Francisco Martinez",
      department: "Construction",
      position: "Construction Foreman",
      status: "Active",
      photo: "/employees/employee6.jpeg",
      email: "francisco.martinez@harmony.com",
      phone: "+1 (555) 678-9012",
      startDate: "Jun 8, 2019",
      salary: "$68,000",
      leaveBalance: "12 days",
      performance: "Outstanding",
    },
    {
      id: 7,
      name: "Maya Johnson",
      department: "Construction",
      position: "Site Supervisor",
      status: "Active",
      photo: "/employees/employee7.jpeg",
      email: "maya.johnson@harmony.com",
      phone: "+1 (555) 789-0123",
      startDate: "Apr 12, 2022",
      salary: "$64,000",
      leaveBalance: "19 days",
      performance: "Excellent",
    },
    {
      id: 8,
      name: "Kendra Wilson",
      department: "Agriculture",
      position: "Farm Manager",
      status: "Active",
      photo: "/employees/employee8.jpeg",
      email: "kendra.wilson@harmony.com",
      phone: "+1 (555) 890-1234",
      startDate: "Sep 3, 2021",
      salary: "$56,000",
      leaveBalance: "21 days",
      performance: "Good",
    },
    {
      id: 9,
      name: "Jasmine Carter",
      department: "Safety",
      position: "Safety Engineer",
      status: "Active",
      photo: "/employees/employee9.jpeg",
      email: "jasmine.carter@harmony.com",
      phone: "+1 (555) 901-2345",
      startDate: "Dec 1, 2022",
      salary: "$67,000",
      leaveBalance: "24 days",
      performance: "Outstanding",
    },
    {
      id: 10,
      name: "David Thompson",
      department: "Construction",
      position: "Safety Coordinator",
      status: "Active",
      photo: "/employees/employee10.jpeg",
      email: "david.thompson@harmony.com",
      phone: "+1 (555) 912-3456",
      startDate: "May 18, 2020",
      salary: "$61,000",
      leaveBalance: "16 days",
      performance: "Excellent",
    },
  ]

  const selectedEmployee = employees[selectedEmployeeIndex]

  const handlePrevious = () => {
    setSelectedEmployeeIndex((prev) => (prev > 0 ? prev - 1 : employees.length - 1))
  }

  const handleNext = () => {
    setSelectedEmployeeIndex((prev) => (prev < employees.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className={`min-h-screen ${gradientBg}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className={`${glassCard} m-4 p-4`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">HARMONY Admin</h1>
              <Badge className="bg-pink-500/20 text-pink-200 border-pink-300/30">Administrator</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user.name}</span>
              <Button onClick={onLogout} className={`${glassButton} text-white`}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className={`${glassCard} m-4 p-2`}>
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${tab.id === activeTab ? "bg-white/20" : ""} ${glassButton} text-white whitespace-nowrap`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </Button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="p-4">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "employees" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Employee Management</h2>
                <Button onClick={() => setShowAddEmployee(true)} className={`${glassButton} text-white`}>
                  <Users className="h-4 w-4 mr-2" /> Add Employee
                </Button>
              </div>

              {/* Main Employee Display */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Employee Photo Section */}
                <div className={`${glassCard} lg:col-span-2`}>
                  <div className="w-full h-96">
                    <img
                      src={selectedEmployee.photo || "/placeholder.svg"}
                      alt={selectedEmployee.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Employee Stats Section */}
                <div className={`${glassCard} p-6`}>
                  <h3 className="text-xl font-semibold text-white mb-6">Employee Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/70 text-sm">Name</label>
                      <p className="text-white font-medium">{selectedEmployee.name}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Position</label>
                      <p className="text-white font-medium">{selectedEmployee.position}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Department</label>
                      <p className="text-white font-medium">{selectedEmployee.department}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Email</label>
                      <p className="text-white font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Phone</label>
                      <p className="text-white font-medium">{selectedEmployee.phone}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Start Date</label>
                      <p className="text-white font-medium">{selectedEmployee.startDate}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Salary</label>
                      <p className="text-white font-medium">{selectedEmployee.salary}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Leave Balance</label>
                      <p className="text-white font-medium">{selectedEmployee.leaveBalance}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Performance</label>
                      <Badge
                        className={
                          selectedEmployee.performance === "Outstanding"
                            ? "bg-green-500/20 text-green-200"
                            : selectedEmployee.performance === "Excellent"
                              ? "bg-blue-500/20 text-blue-200"
                              : "bg-yellow-500/20 text-yellow-200"
                        }
                      >
                        {selectedEmployee.performance}
                      </Badge>
                    </div>
                    <div className="pt-4">
                      <Badge
                        className={
                          selectedEmployee.status === "Active"
                            ? "bg-green-500/20 text-green-200"
                            : "bg-red-500/20 text-red-200"
                        }
                      >
                        {selectedEmployee.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Details Section */}
              <div className={`${glassCard} p-6`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Employee Details</h3>
                  <div className="flex space-x-2">
                    <Button onClick={() => setShowEditProfile(true)} className={`${glassButton} text-white`} size="sm">
                      Edit Profile
                    </Button>
                    <Button
                      onClick={() => setShowViewDocuments(true)}
                      className={`${glassButton} text-white`}
                      size="sm"
                    >
                      View Documents
                    </Button>
                    <Button
                      onClick={() => setShowGenerateReport(true)}
                      className={`${glassButton} text-white`}
                      size="sm"
                    >
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Employee Navigation */}
              <div className="flex items-center justify-center space-x-4">
                <Button onClick={handlePrevious} className={`${glassButton} text-white p-3`} size="sm">
                  ←
                </Button>

                <div className="flex space-x-2 overflow-x-auto">
                  {employees.map((employee, index) => (
                    <div
                      key={employee.id}
                      onClick={() => setSelectedEmployeeIndex(index)}
                      className={`${glassCard} p-3 cursor-pointer transition-all duration-300 min-w-[120px] ${
                        index === selectedEmployeeIndex ? "ring-2 ring-pink-400" : ""
                      }`}
                    >
                      <img
                        src={employee.photo || "/placeholder.svg"}
                        alt={employee.name}
                        className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                      />
                      <p className="text-white text-xs text-center font-medium">{employee.name.split(" ")[0]}</p>
                      <p className="text-white/60 text-xs text-center">{employee.department}</p>
                    </div>
                  ))}
                </div>

                <Button onClick={handleNext} className={`${glassButton} text-white p-3`} size="sm">
                  →
                </Button>
              </div>

              {/* Add Employee Modal */}
              {showAddEmployee && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Add New Employee</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Full Name</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="Enter full name" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Email</label>
                        <input className={`${glassInput} w-full p-2`} type="email" placeholder="Enter email" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Department</label>
                        <select className={`${glassInput} w-full p-2`}>
                          <option>Engineering</option>
                          <option>Construction</option>
                          <option>Safety</option>
                          <option>Operations</option>
                          <option>Agriculture</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Position</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="Enter position" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Phone</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="Enter phone number" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Salary</label>
                        <input className={`${glassInput} w-full p-2`} placeholder="Enter salary" />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Profile Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className={`${glassInput} w-full p-2`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        onClick={() => setShowAddEmployee(false)}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Employee added successfully")
                          setShowAddEmployee(false)
                        }}
                        className={`${glassButton} text-white`}
                      >
                        Add Employee
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Profile Modal */}
              {showEditProfile && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Edit Profile - {selectedEmployee.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Full Name</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.name} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Email</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.email} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Phone</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.phone} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Position</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.position} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Salary</label>
                        <input className={`${glassInput} w-full p-2`} defaultValue={selectedEmployee.salary} />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Update Profile Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className={`${glassInput} w-full p-2`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        onClick={() => setShowEditProfile(false)}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Profile updated successfully")
                          setShowEditProfile(false)
                        }}
                        className={`${glassButton} text-white`}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* View Documents Modal */}
              {showViewDocuments && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Documents - {selectedEmployee.name}</h3>
                    <div className="space-y-4">
                      <div className={`${glassCard} p-4 flex justify-between items-center`}>
                        <div>
                          <h4 className="text-white font-medium">ID Card</h4>
                          <p className="text-white/60 text-sm">Expires: Dec 2026</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-500/20 text-green-200">Valid</Badge>
                          <Button
                            onClick={() => alert("Document downloaded")}
                            size="sm"
                            className={`${glassButton} text-white`}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className={`${glassCard} p-4 flex justify-between items-center`}>
                        <div>
                          <h4 className="text-white font-medium">Employment Contract</h4>
                          <p className="text-white/60 text-sm">Expires: Jan 2025</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-500/20 text-green-200">Valid</Badge>
                          <Button
                            onClick={() => alert("Document downloaded")}
                            size="sm"
                            className={`${glassButton} text-white`}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className={`${glassCard} p-4 flex justify-between items-center`}>
                        <div>
                          <h4 className="text-white font-medium">Safety Certificate</h4>
                          <p className="text-white/60 text-sm">Expires: Mar 2024</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-yellow-500/20 text-yellow-200">Expiring Soon</Badge>
                          <Button
                            onClick={() => alert("Document downloaded")}
                            size="sm"
                            className={`${glassButton} text-white`}
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-white/70 text-sm mb-2">Upload New Document</label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className={`${glassInput} w-full p-2 mb-2`}
                        />
                        <Button
                          onClick={() => alert("Document uploaded successfully")}
                          className={`${glassButton} text-white`}
                        >
                          Upload Document
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button onClick={() => setShowViewDocuments(false)} className={`${glassButton} text-white`}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Generate Report Modal */}
              {showGenerateReport && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className={`${glassCard} p-6 max-w-md w-full mx-4`}>
                    <h3 className="text-xl font-semibold text-white mb-4">Generate Report - {selectedEmployee.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Report Type</label>
                        <select className={`${glassInput} w-full p-2`}>
                          <option>Employee Profile Report</option>
                          <option>Performance Report</option>
                          <option>Attendance Report</option>
                          <option>Payroll Report</option>
                          <option>Compliance Report</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Date Range</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="date" className={`${glassInput} p-2`} />
                          <input type="date" className={`${glassInput} p-2`} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Format</label>
                        <select className={`${glassInput} w-full p-2`}>
                          <option>PDF</option>
                          <option>Excel</option>
                          <option>Word</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button
                        onClick={() => setShowGenerateReport(false)}
                        variant="ghost"
                        className="text-white/70 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          alert("Report generated and downloaded")
                          setShowGenerateReport(false)
                        }}
                        className={`${glassButton} text-white`}
                      >
                        Generate & Download
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === "payroll" && <PayrollTab />}
          {activeTab === "compliance" && <ComplianceTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "harmony-ai" && <HarmonyAITab />}
          {activeTab === "gamify" && <GamifyTab />}
        </main>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard title="Total Employees" value="247" icon={<Users className="h-6 w-6" />} color="text-blue-300" />
      <StatsCard title="Pending Payroll" value="12" icon={<Calculator className="h-6 w-6" />} color="text-yellow-300" />
      <StatsCard
        title="Compliance Issues"
        value="3"
        icon={<AlertTriangle className="h-6 w-6" />}
        color="text-red-300"
      />
      <StatsCard title="Leave Requests" value="8" icon={<Clock className="h-6 w-6" />} color="text-green-300" />

      <div className={`${glassCard} p-6 md:col-span-2 lg:col-span-3`}>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <ActivityItem text="Payroll processed for Marketing Department" time="2 hours ago" />
          <ActivityItem text="New employee onboarded: Jane Smith" time="4 hours ago" />
          <ActivityItem text="Compliance document expired for John Doe" time="1 day ago" />
          <ActivityItem text="Leave request approved for Sarah Wilson" time="2 days ago" />
        </div>
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            onClick={() => alert("Payroll processing started")}
            className={`${glassButton} w-full text-white justify-start`}
          >
            <Calculator className="h-4 w-4 mr-2" /> Process Payroll
          </Button>
          <Button
            onClick={() => alert("Add employee form opened")}
            className={`${glassButton} w-full text-white justify-start`}
          >
            <Users className="h-4 w-4 mr-2" /> Add Employee
          </Button>
          <Button
            onClick={() => alert("Report generation started")}
            className={`${glassButton} w-full text-white justify-start`}
          >
            <FileText className="h-4 w-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>
    </div>
  )
}

function PayrollTab() {
  const [selectedPayrollAction, setSelectedPayrollAction] = useState<string | null>(null)

  const handlePayrollActionClick = (actionType: string) => {
    setSelectedPayrollAction(selectedPayrollAction === actionType ? null : actionType)
  }

  const generatePDF = (actionType: string) => {
    // Create a simple PDF content
    const pdfContent = `
    HARMONY HR SYSTEM - ${actionType.toUpperCase()} REPORT
    Generated on: ${new Date().toLocaleDateString()}
    
    ${
      actionType === "calculate"
        ? "SALARY CALCULATION REPORT"
        : actionType === "export"
          ? "PAYSLIP EXPORT REPORT"
          : actionType === "email"
            ? "EMAIL DELIVERY REPORT"
            : actionType === "whatsapp"
              ? "WHATSAPP DELIVERY REPORT"
              : "NET PAY CALCULATOR REPORT"
    }
    
    Total Employees: 247
    Processed: 235
    Pending: 12
    Total Payroll: $124,500
    
    Department Breakdown:
    - Engineering: $45,000
    - Construction: $38,000
    - Safety: $22,000
    - Operations: $19,500
    
    Status: Completed Successfully
    Generated by: Admin User
  `

    // Create a blob and download
    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${actionType}-report-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} report generated and downloaded!`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Payroll Management</h2>
        <Button onClick={() => alert("Payroll processing initiated")} className={`${glassButton} text-white`}>
          <Calculator className="h-4 w-4 mr-2" /> Process Payroll
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Payroll"
          value="$124,500"
          icon={<DollarSign className="h-6 w-6" />}
          color="text-green-300"
        />
        <StatsCard title="Processed" value="235" icon={<CheckCircle className="h-6 w-6" />} color="text-blue-300" />
        <StatsCard title="Pending" value="12" icon={<Clock className="h-6 w-6" />} color="text-yellow-300" />
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Payroll Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PayrollActionCard
            title="Calculate Salaries"
            icon={<Calculator className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("calculate")}
            onGeneratePDF={() => generatePDF("calculate")}
            isSelected={selectedPayrollAction === "calculate"}
          />
          <PayrollActionCard
            title="Export Payslips"
            icon={<Download className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("export")}
            onGeneratePDF={() => generatePDF("export")}
            isSelected={selectedPayrollAction === "export"}
          />
          <PayrollActionCard
            title="Send via Email"
            icon={<Mail className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("email")}
            onGeneratePDF={() => generatePDF("email")}
            isSelected={selectedPayrollAction === "email"}
          />
          <PayrollActionCard
            title="Send via WhatsApp"
            icon={<MessageSquare className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("whatsapp")}
            onGeneratePDF={() => generatePDF("whatsapp")}
            isSelected={selectedPayrollAction === "whatsapp"}
          />
          <PayrollActionCard
            title="NET PAY CALCULATOR 2025"
            icon={<DollarSign className="h-8 w-8 mb-2" />}
            onClick={() => handlePayrollActionClick("netpay-calculator")}
            onGeneratePDF={() => generatePDF("netpay-calculator")}
            isSelected={selectedPayrollAction === "netpay-calculator"}
          />
        </div>
      </div>

      {/* Visual Analytics Section */}
      {selectedPayrollAction && (
        <div className={`${glassCard} p-6`}>
          {selectedPayrollAction === "calculate" && <SalaryCalculationChart />}
          {selectedPayrollAction === "export" && <PayslipExportChart />}
          {selectedPayrollAction === "email" && <EmailDeliveryChart />}
          {selectedPayrollAction === "whatsapp" && <WhatsAppDeliveryChart />}
          {selectedPayrollAction === "netpay-calculator" && <NetPayCalculatorChart />}
        </div>
      )}
    </div>
  )
}

// Payroll Action Card Component
function PayrollActionCard({
  title,
  icon,
  onClick,
  onGeneratePDF,
  isSelected,
}: {
  title: string
  icon: React.ReactNode
  onClick: () => void
  onGeneratePDF: () => void
  isSelected: boolean
}) {
  return (
    <div
      className={`${glassButton} text-white p-4 h-auto flex-col cursor-pointer transition-all duration-300 ${
        isSelected ? "ring-2 ring-pink-400 bg-white/20" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="mb-3">{title}</span>
      {isSelected && (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onGeneratePDF()
          }}
          className={`${glassButton} text-white mt-2`}
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Generate PDF
        </Button>
      )}
      {isSelected && <div className="mt-2 text-pink-300 text-sm">✨ Click to view analytics</div>}
    </div>
  )
}

// Chart Components for Payroll Actions
function SalaryCalculationChart() {
  const calculationData = [
    { department: "Engineering", employees: 45, grossTotal: 3375000, netTotal: 2565000, deductions: 810000 },
    { department: "Construction", employees: 78, grossTotal: 5070000, netTotal: 3852000, deductions: 1218000 },
    { department: "Safety", employees: 32, grossTotal: 1984000, netTotal: 1508000, deductions: 476000 },
    { department: "Operations", employees: 28, grossTotal: 1624000, netTotal: 1234000, deductions: 390000 },
    { department: "Agriculture", employees: 24, grossTotal: 1344000, netTotal: 1021000, deductions: 323000 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">💰 Salary Calculation Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Department Salary Breakdown</h4>
          <div className="space-y-4">
            {calculationData.map((dept, index) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">{dept.department}</span>
                  <div className="text-right">
                    <div className="text-white font-medium">${(dept.grossTotal / 1000).toFixed(0)}K</div>
                    <div className="text-white/60 text-sm">{dept.employees} employees</div>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${
                      index === 0
                        ? "bg-blue-500/80"
                        : index === 1
                          ? "bg-green-500/80"
                          : index === 2
                            ? "bg-yellow-500/80"
                            : index === 3
                              ? "bg-purple-500/80"
                              : "bg-pink-500/80"
                    }`}
                    style={{ width: `${(dept.grossTotal / 5070000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculation Summary */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Calculation Summary</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Total Gross Salary</span>
              <span className="text-green-300 font-bold">
                ${calculationData.reduce((sum, dept) => sum + dept.grossTotal, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Total Net Salary</span>
              <span className="text-blue-300 font-bold">
                ${calculationData.reduce((sum, dept) => sum + dept.netTotal, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Total Deductions</span>
              <span className="text-red-300 font-bold">
                ${calculationData.reduce((sum, dept) => sum + dept.deductions, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Total Employees</span>
              <span className="text-white font-bold">
                {calculationData.reduce((sum, dept) => sum + dept.employees, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Status */}
      <div className={`${glassCard} p-4`}>
        <h4 className="text-white font-medium mb-4">Processing Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">235</div>
            <div className="text-white/60 text-sm">Calculated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-300">12</div>
            <div className="text-white/60 text-sm">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">95.1%</div>
            <div className="text-white/60 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">2.5min</div>
            <div className="text-white/60 text-sm">Avg Time</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PayslipExportChart() {
  const exportData = [
    { format: "PDF", count: 180, size: "45.2MB", status: "Completed" },
    { format: "Excel", count: 45, size: "12.8MB", status: "Completed" },
    { format: "Word", count: 22, size: "8.4MB", status: "In Progress" },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">📄 Payslip Export Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Formats */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Export by Format</h4>
          <div className="h-64 flex items-end justify-center space-x-8">
            {exportData.map((format, index) => (
              <div key={format.format} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-16 transition-all duration-1000 rounded-t ${
                    index === 0 ? "bg-red-500/80" : index === 1 ? "bg-green-500/80" : "bg-blue-500/80"
                  }`}
                  style={{ height: `${(format.count / 180) * 200}px` }}
                  title={`${format.count} files`}
                ></div>
                <span className="text-white/70 text-sm">{format.format}</span>
                <span className="text-white text-sm font-medium">{format.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Details */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Export Details</h4>
          <div className="space-y-4">
            {exportData.map((format, index) => (
              <div key={format.format} className={`${glassCard} p-3`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{format.format}</span>
                  <Badge
                    className={
                      format.status === "Completed"
                        ? "bg-green-500/20 text-green-200"
                        : "bg-yellow-500/20 text-yellow-200"
                    }
                  >
                    {format.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/60">Files Count</div>
                    <div className="text-white font-medium">{format.count}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Total Size</div>
                    <div className="text-white font-medium">{format.size}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Timeline */}
      <div className={`${glassCard} p-4`}>
        <h4 className="text-white font-medium mb-4">Export Timeline</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">PDF Export Completed - 180 files (2:34 PM)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white">Excel Export Completed - 45 files (2:31 PM)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-white">Word Export In Progress - 22 files (2:35 PM)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailDeliveryChart() {
  const emailData = [
    { status: "Delivered", count: 198, percentage: 80.2 },
    { status: "Pending", count: 32, percentage: 13.0 },
    { status: "Failed", count: 12, percentage: 4.9 },
    { status: "Bounced", count: 5, percentage: 2.0 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">📧 Email Delivery Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Status Pie Chart */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Delivery Status</h4>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Delivered - 80.2% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(34 197 94 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="200.6 50.9"
                  strokeDashoffset="0"
                />
                {/* Pending - 13% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(234 179 8 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="32.5 218.9"
                  strokeDashoffset="-200.6"
                />
                {/* Failed - 4.9% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(239 68 68 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="12.3 239.2"
                  strokeDashoffset="-233.1"
                />
                {/* Bounced - 2% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(168 85 247 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="5.0 246.5"
                  strokeDashoffset="-245.4"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold">247</div>
                  <div className="text-white/70 text-sm">Total</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {emailData.map((item, index) => (
              <div key={item.status} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      index === 0
                        ? "bg-green-500"
                        : index === 1
                          ? "bg-yellow-500"
                          : index === 2
                            ? "bg-red-500"
                            : "bg-purple-500"
                    }`}
                  ></div>
                  <span className="text-white/70">{item.status}</span>
                </div>
                <span className="text-white">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Delivery Timeline</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Started</span>
              <span className="text-white">2:30 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">First Delivery</span>
              <span className="text-green-300">2:31 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Peak Delivery</span>
              <span className="text-blue-300">2:33 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Completion</span>
              <span className="text-purple-300">2:38 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Rate */}
      <div className={`${glassCard} p-4`}>
        <h4 className="text-white font-medium mb-4">Delivery Performance</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">80.2%</div>
            <div className="text-white/60 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">8min</div>
            <div className="text-white/60 text-sm">Total Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">31/min</div>
            <div className="text-white/60 text-sm">Delivery Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-300">4.9%</div>
            <div className="text-white/60 text-sm">Error Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatsAppDeliveryChart() {
  const whatsappData = [
    { status: "Delivered", count: 189, percentage: 76.5 },
    { status: "Read", count: 156, percentage: 63.2 },
    { status: "Pending", count: 45, percentage: 18.2 },
    { status: "Failed", count: 13, percentage: 5.3 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">💬 WhatsApp Delivery Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Status */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Message Status</h4>
          <div className="space-y-4">
            {whatsappData.map((item, index) => (
              <div key={item.status} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">{item.status}</span>
                  <div className="text-right">
                    <div className="text-white font-medium">{item.count}</div>
                    <div className="text-white/60 text-sm">{item.percentage}%</div>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${
                      index === 0
                        ? "bg-green-500/80"
                        : index === 1
                          ? "bg-blue-500/80"
                          : index === 2
                            ? "bg-yellow-500/80"
                            : "bg-red-500/80"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Engagement Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Open Rate</span>
              <span className="text-green-300 font-bold">82.6%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Read Rate</span>
              <span className="text-blue-300 font-bold">63.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Response Rate</span>
              <span className="text-purple-300 font-bold">12.4%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white/70">Avg Read Time</span>
              <span className="text-yellow-300 font-bold">2.3min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className={`${glassCard} p-4`}>
        <h4 className="text-white font-medium mb-4">Delivery Progress</h4>
        <div className="h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 300 200">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="40"
                y1={40 + i * 30}
                x2="280"
                y2={40 + i * 30}
                stroke="rgb(255 255 255 / 0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Delivery line */}
            <polyline
              fill="none"
              stroke="rgb(34 197 94 / 0.8)"
              strokeWidth="3"
              points="60,160 100,120 140,80 180,60 220,50 260,45"
            />

            {/* Read line */}
            <polyline
              fill="none"
              stroke="rgb(59 130 246 / 0.8)"
              strokeWidth="3"
              points="60,160 100,140 140,110 180,90 220,75 260,65"
            />

            {/* Data points */}
            <circle cx="60" cy="160" r="4" fill="rgb(34 197 94)" />
            <circle cx="100" cy="120" r="4" fill="rgb(34 197 94)" />
            <circle cx="140" cy="80" r="4" fill="rgb(34 197 94)" />
            <circle cx="180" cy="60" r="4" fill="rgb(34 197 94)" />
            <circle cx="220" cy="50" r="4" fill="rgb(34 197 94)" />
            <circle cx="260" cy="45" r="4" fill="rgb(34 197 94)" />

            <circle cx="60" cy="160" r="4" fill="rgb(59 130 246)" />
            <circle cx="100" cy="140" r="4" fill="rgb(59 130 246)" />
            <circle cx="140" cy="110" r="4" fill="rgb(59 130 246)" />
            <circle cx="180" cy="90" r="4" fill="rgb(59 130 246)" />
            <circle cx="220" cy="75" r="4" fill="rgb(59 130 246)" />
            <circle cx="260" cy="65" r="4" fill="rgb(59 130 246)" />

            {/* Labels */}
            <text x="60" y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
              0min
            </text>
            <text x="100" y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
              2min
            </text>
            <text x="140" y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
              4min
            </text>
            <text x="180" y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
              6min
            </text>
            <text x="220" y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
              8min
            </text>
            <text x="260" y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
              10min
            </text>
          </svg>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-white/70 text-sm">Delivered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-white/70 text-sm">Read</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NetPayCalculatorChart() {
  const [grossPay, setGrossPay] = useState(10000)
  const [nonCashBenefits, setNonCashBenefits] = useState(0)
  const [pensionContribution, setPensionContribution] = useState(0)
  const [otherDeductions, setOtherDeductions] = useState(0)

  // Kenya 2025 tax calculations matching the provided format
  const calculateDeductions = (grossPay: number) => {
    // NSSF calculations (Tier I and Tier II)
    const nssfTierI = Math.min(480, grossPay * 0.06) // 6% capped at 480
    const nssfTierII = Math.min(120, Math.max(0, (grossPay - 7000) * 0.06)) // Additional 6% for amounts above 7,000

    // SHIF (Social Health Insurance Fund) - replaces NHIF
    const shif = Math.min(300, Math.max(150, grossPay * 0.0275)) // 2.75% between 150-300

    // Housing Levy
    const housingLevy = grossPay * 0.015 // 1.5%

    // Calculate allowable deductions for PAYE
    const allowableDeductions = nssfTierI + nssfTierII + pensionContribution

    // Taxable income after allowable deductions
    const taxableIncome = Math.max(0, grossPay + nonCashBenefits - allowableDeductions)

    // PAYE calculation with 2025 rates
    let paye = 0
    const personalRelief = 2400 // Monthly personal relief

    if (taxableIncome <= 24000) {
      paye = Math.max(0, taxableIncome * 0.1 - personalRelief)
    } else if (taxableIncome <= 32333) {
      paye = Math.max(0, 24000 * 0.1 + (taxableIncome - 24000) * 0.25 - personalRelief)
    } else if (taxableIncome <= 500000) {
      paye = Math.max(0, 24000 * 0.1 + 8333 * 0.25 + (taxableIncome - 32333) * 0.3 - personalRelief)
    } else if (taxableIncome <= 800000) {
      paye = Math.max(0, 24000 * 0.1 + 8333 * 0.25 + 467667 * 0.3 + (taxableIncome - 500000) * 0.325 - personalRelief)
    } else {
      paye = Math.max(
        0,
        24000 * 0.1 + 8333 * 0.25 + 467667 * 0.3 + 300000 * 0.325 + (taxableIncome - 800000) * 0.35 - personalRelief,
      )
    }

    const totalStatutoryDeductions = paye + nssfTierI + nssfTierII + shif + housingLevy
    const netPay = grossPay - totalStatutoryDeductions - otherDeductions

    return {
      paye: Math.round(paye),
      nssfTierI: Math.round(nssfTierI),
      nssfTierII: Math.round(nssfTierII),
      shif: Math.round(shif),
      housingLevy: Math.round(housingLevy),
      totalStatutoryDeductions: Math.round(totalStatutoryDeductions),
      netPay: Math.round(netPay),
      allowableDeductions: Math.round(allowableDeductions),
      taxableIncome: Math.round(taxableIncome),
      personalRelief,
    }
  }

  const calculations = calculateDeductions(grossPay)

  const generateNetPayPDF = () => {
    const pdfContent = `
    NET PAY CALCULATOR
    2025
    
    Gross Pay                                    ${grossPay.toLocaleString()}.00
    
    Deductions:
    PAYE                                         ${calculations.paye.toLocaleString()}.00
    NSSF Tier I                                  ${calculations.nssfTierI.toLocaleString()}.00
    NSSF Tier II                                 ${calculations.nssfTierII.toLocaleString()}.00
    SHIF                                         ${calculations.shif.toLocaleString()}.00
    Housing Levy                                 ${calculations.housingLevy.toLocaleString()}.00
    Other Deductions                             ${otherDeductions.toLocaleString()}.00
    
    Total Deductions                             ${(calculations.totalStatutoryDeductions + otherDeductions).toLocaleString()}.00
    Net Pay                                      ${calculations.netPay.toLocaleString()}.00
    
    ________________________________________________
    
    PAYE Information:
    Gross Pay                                    ${grossPay.toLocaleString()}.00
    Non-Cash Benefits                            ${nonCashBenefits.toLocaleString()}.00
    Pension Contribution                         ${pensionContribution.toLocaleString()}.00
    Allowable Deductions                         ${calculations.allowableDeductions.toLocaleString()}.00
    Taxable Pay                                  ${calculations.taxableIncome.toLocaleString()}.00
    Personal Relief                              ${calculations.personalRelief.toLocaleString()}.00
    
    Generated by: HARMONY HR System
    Date: ${new Date().toLocaleDateString()}
    Time: ${new Date().toLocaleTimeString()}
  `

    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `net-pay-calculator-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert("Net Pay Calculator report generated and downloaded!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">💰 NET PAY CALCULATOR 2025</h3>
        <Button onClick={generateNetPayPDF} className={`${glassButton} text-white`}>
          <Download className="h-4 w-4 mr-2" />
          Generate PDF Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className={`${glassCard} p-6`}>
          <h4 className="text-white font-medium mb-4">💼 Salary Input Parameters</h4>
          <div className="space-y-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Gross Pay (KES)</label>
              <input
                type="number"
                value={grossPay}
                onChange={(e) => setGrossPay(Number(e.target.value))}
                className={`${glassInput} w-full p-3 text-lg font-medium`}
                min="0"
              />
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500/80 transition-all duration-500"
                  style={{ width: `${Math.min((grossPay / 100000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Non-Cash Benefits (KES)</label>
              <input
                type="number"
                value={nonCashBenefits}
                onChange={(e) => setNonCashBenefits(Number(e.target.value))}
                className={`${glassInput} w-full p-3`}
                min="0"
              />
              <p className="text-white/50 text-xs mt-1">Car allowance, housing, medical, etc.</p>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Pension Contribution (KES)</label>
              <input
                type="number"
                value={pensionContribution}
                onChange={(e) => setPensionContribution(Number(e.target.value))}
                className={`${glassInput} w-full p-3`}
                min="0"
              />
              <p className="text-white/50 text-xs mt-1">Tax-deductible pension contributions</p>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Other Allowable Deductions (KES)</label>
              <input
                type="number"
                value={otherDeductions}
                onChange={(e) => setOtherDeductions(Number(e.target.value))}
                className={`${glassInput} w-full p-3`}
                min="0"
              />
              <p className="text-white/50 text-xs mt-1">Loans, insurance, union dues, etc.</p>
            </div>
          </div>
        </div>

        {/* Calculator Display - Matching the provided format */}
        <div className={`${glassCard} p-6`}>
          <div className="text-center mb-6">
            <h4 className="text-white font-bold text-xl mb-2">NET PAY CALCULATOR</h4>
            <h5 className="text-white font-bold text-lg">2025</h5>
          </div>

          <div className="space-y-4">
            {/* Gross Pay */}
            <div className="flex justify-between items-center py-2">
              <span className="text-white font-medium">Gross Pay</span>
              <span className="text-white font-bold">{grossPay.toLocaleString()}.00</span>
            </div>

            {/* Deductions Section */}
            <div className="border-t border-white/20 pt-4">
              <div className="text-white font-medium mb-3">Deductions:</div>

              <div className="space-y-2 ml-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">PAYE</span>
                  <span className="text-white">{calculations.paye.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">NSSF Tier I</span>
                  <span className="text-white">{calculations.nssfTierI.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">NSSF Tier II</span>
                  <span className="text-white">{calculations.nssfTierII.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">SHIF</span>
                  <span className="text-white">{calculations.shif.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">Housing Levy</span>
                  <span className="text-white">{calculations.housingLevy.toLocaleString()}.00</span>
                </div>

                {otherDeductions > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Other Deductions</span>
                    <span className="text-white">{otherDeductions.toLocaleString()}.00</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Deductions */}
            <div className="flex justify-between items-center py-2 border-t border-white/20">
              <span className="text-white font-medium">Total Deductions</span>
              <span className="text-white font-bold">
                {(calculations.totalStatutoryDeductions + otherDeductions).toLocaleString()}.00
              </span>
            </div>

            {/* Net Pay */}
            <div className="flex justify-between items-center py-3 border-t border-white/20 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg px-4">
              <span className="text-white font-bold text-lg">Net Pay</span>
              <span className="text-green-300 font-bold text-xl">{calculations.netPay.toLocaleString()}.00</span>
            </div>

            {/* PAYE Information Section */}
            <div className="border-t border-white/20 pt-4 mt-6">
              <div className="text-white font-medium mb-3">PAYE Information:</div>

              <div className="space-y-2 ml-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Gross Pay</span>
                  <span className="text-white">{grossPay.toLocaleString()}.00</span>
                </div>

                {nonCashBenefits > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Non-Cash Benefits</span>
                    <span className="text-white">{nonCashBenefits.toLocaleString()}.00</span>
                  </div>
                )}

                {pensionContribution > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Pension Contribution</span>
                    <span className="text-white">{pensionContribution.toLocaleString()}.00</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-white/80">Allowable Deductions</span>
                  <span className="text-white">{calculations.allowableDeductions.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">Taxable Pay</span>
                  <span className="text-white">{calculations.taxableIncome.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/80">Personal Relief</span>
                  <span className="text-white">{calculations.personalRelief.toLocaleString()}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className={`${glassCard} p-6`}>
        <h4 className="text-white font-medium mb-4">📋 Calculation Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">KES {calculations.netPay.toLocaleString()}</div>
            <div className="text-white/60 text-sm">Monthly Net Pay</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-300">KES {(calculations.netPay * 12).toLocaleString()}</div>
            <div className="text-white/60 text-sm">Annual Net Pay</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-300">
              {calculations.taxableIncome > 0
                ? ((calculations.paye / calculations.taxableIncome) * 100).toFixed(1)
                : "0.0"}
              %
            </div>
            <div className="text-white/60 text-sm">Effective Tax Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">
              {(((calculations.totalStatutoryDeductions + otherDeductions) / grossPay) * 100).toFixed(1)}%
            </div>
            <div className="text-white/60 text-sm">Total Deductions</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComplianceTab() {
  const complianceItems = [
    { employee: "John Doe", document: "ID Card", status: "Expiring Soon", daysLeft: 15 },
    { employee: "Jane Smith", document: "Contract", status: "Valid", daysLeft: 180 },
    { employee: "Mike Johnson", document: "Certificate", status: "Expired", daysLeft: -5 },
    { employee: "Sarah Wilson", document: "License", status: "Valid", daysLeft: 90 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Compliance Management</h2>
        <Button onClick={() => alert("Compliance check completed")} className={`${glassButton} text-white`}>
          <Shield className="h-4 w-4 mr-2" /> Run Compliance Check
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Valid Documents"
          value="89%"
          icon={<CheckCircle className="h-6 w-6" />}
          color="text-green-300"
        />
        <StatsCard
          title="Expiring Soon"
          value="8"
          icon={<AlertTriangle className="h-6 w-6" />}
          color="text-yellow-300"
        />
        <StatsCard title="Expired" value="3" icon={<AlertTriangle className="h-6 w-6" />} color="text-red-300" />
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Document Status</h3>
        <div className="space-y-3">
          {complianceItems.map((item, index) => (
            <div key={index} className={`${glassCard} p-4 flex justify-between items-center`}>
              <div>
                <h4 className="text-white font-semibold">{item.employee}</h4>
                <p className="text-white/70">{item.document}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  className={
                    item.status === "Valid"
                      ? "bg-green-500/20 text-green-200"
                      : item.status === "Expiring Soon"
                        ? "bg-yellow-500/20 text-yellow-200"
                        : "bg-red-500/20 text-red-200"
                  }
                >
                  {item.status}
                </Badge>
                <span className="text-white/70 text-sm">
                  {item.daysLeft > 0 ? `${item.daysLeft} days left` : `${Math.abs(item.daysLeft)} days overdue`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const handleReportClick = (reportType: string) => {
    setSelectedReport(selectedReport === reportType ? null : reportType)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
        <Button onClick={() => alert("All reports exported successfully")} className={`${glassButton} text-white`}>
          <Download className="h-4 w-4 mr-2" /> Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard
          title="Payroll Summary"
          description="Monthly payroll breakdown"
          onClick={() => handleReportClick("payroll")}
          isSelected={selectedReport === "payroll"}
        />
        <ReportCard
          title="Compliance Report"
          description="Document status overview"
          onClick={() => handleReportClick("compliance")}
          isSelected={selectedReport === "compliance"}
        />
        <ReportCard
          title="Leave Analysis"
          description="Leave patterns and trends"
          onClick={() => handleReportClick("leave")}
          isSelected={selectedReport === "leave"}
        />
        <ReportCard
          title="Performance KPIs"
          description="Employee performance metrics"
          onClick={() => handleReportClick("performance")}
          isSelected={selectedReport === "performance"}
        />
        <ReportCard
          title="Department Analysis"
          description="Department-wise statistics"
          onClick={() => handleReportClick("department")}
          isSelected={selectedReport === "department"}
        />
        <ReportCard
          title="Cost Analysis"
          description="HR cost breakdown"
          onClick={() => handleReportClick("cost")}
          isSelected={selectedReport === "cost"}
        />
      </div>

      {/* Visual Graphics Section */}
      {selectedReport && (
        <div className={`${glassCard} p-6`}>
          {selectedReport === "payroll" && <PayrollChart />}
          {selectedReport === "compliance" && <ComplianceChart />}
          {selectedReport === "leave" && <LeaveChart />}
          {selectedReport === "performance" && <PerformanceChart />}
          {selectedReport === "department" && <DepartmentChart />}
          {selectedReport === "cost" && <CostChart />}
        </div>
      )}
    </div>
  )
}

// Chart Components
function PayrollChart() {
  const payrollData = [
    { month: "Jan", gross: 125000, net: 95000, deductions: 30000 },
    { month: "Feb", gross: 128000, net: 97000, deductions: 31000 },
    { month: "Mar", gross: 132000, net: 100000, deductions: 32000 },
    { month: "Apr", gross: 135000, net: 102000, deductions: 33000 },
    { month: "May", gross: 138000, net: 105000, deductions: 33000 },
    { month: "Jun", gross: 142000, net: 108000, deductions: 34000 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">💰 Payroll Summary Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Monthly Payroll Breakdown</h4>
          <div className="h-64 relative">
            {payrollData.map((data, index) => (
              <div
                key={data.month}
                className="flex items-end justify-center h-full"
                style={{ width: `${100 / 6}%`, display: "inline-flex" }}
              >
                <div className="flex flex-col items-center space-y-1 w-full">
                  <div className="flex flex-col items-center space-y-1 h-48">
                    <div
                      className="bg-green-500/60 w-6 rounded-t transition-all duration-500 hover:bg-green-400"
                      style={{ height: `${(data.gross / 150000) * 100}%` }}
                      title={`Gross: $${data.gross.toLocaleString()}`}
                    ></div>
                    <div
                      className="bg-blue-500/60 w-6 transition-all duration-500 hover:bg-blue-400"
                      style={{ height: `${(data.net / 150000) * 100}%` }}
                      title={`Net: $${data.net.toLocaleString()}`}
                    ></div>
                    <div
                      className="bg-red-500/60 w-6 rounded-b transition-all duration-500 hover:bg-red-400"
                      style={{ height: `${(data.deductions / 150000) * 100}%` }}
                      title={`Deductions: $${data.deductions.toLocaleString()}`}
                    ></div>
                  </div>
                  <span className="text-white/70 text-xs">{data.month}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500/60 rounded"></div>
              <span className="text-white/70 text-sm">Gross</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500/60 rounded"></div>
              <span className="text-white/70 text-sm">Net</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500/60 rounded"></div>
              <span className="text-white/70 text-sm">Deductions</span>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Current Month Distribution</h4>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(34 197 94 / 0.6)"
                  strokeWidth="8"
                  strokeDasharray="75.4 25.1"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(59 130 246 / 0.6)"
                  strokeWidth="8"
                  strokeDasharray="18.8 81.7"
                  strokeDashoffset="-75.4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(239 68 68 / 0.6)"
                  strokeWidth="8"
                  strokeDasharray="6.3 94.2"
                  strokeDashoffset="-94.2"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold">$142K</div>
                  <div className="text-white/70 text-sm">Total</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500/60 rounded"></div>
                <span className="text-white/70">Net Pay</span>
              </div>
              <span className="text-white">$108K (76%)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500/60 rounded"></div>
                <span className="text-white/70">PAYE Tax</span>
              </div>
              <span className="text-white">$20K (14%)</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500/60 rounded"></div>
                <span className="text-white/70">Other Deductions</span>
              </div>
              <span className="text-white">$14K (10%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ComplianceChart() {
  const complianceData = [
    { category: "ID Cards", valid: 89, expiring: 8, expired: 3 },
    { category: "Contracts", valid: 92, expiring: 5, expired: 3 },
    { category: "Certificates", valid: 85, expiring: 12, expired: 3 },
    { category: "Licenses", valid: 78, expiring: 15, expired: 7 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">🛡️ Compliance Status Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked Bar Chart */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Document Status by Category</h4>
          <div className="space-y-4">
            {complianceData.map((item, index) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">{item.category}</span>
                  <span className="text-white/70">{item.valid + item.expiring + item.expired}</span>
                </div>
                <div className="flex h-6 rounded-full overflow-hidden bg-white/10">
                  <div
                    className="bg-green-500/80 transition-all duration-500"
                    style={{ width: `${(item.valid / (item.valid + item.expiring + item.expired)) * 100}%` }}
                    title={`Valid: ${item.valid}`}
                  ></div>
                  <div
                    className="bg-yellow-500/80 transition-all duration-500"
                    style={{ width: `${(item.expiring / (item.valid + item.expiring + item.expired)) * 100}%` }}
                    title={`Expiring: ${item.expiring}`}
                  ></div>
                  <div
                    className="bg-red-500/80 transition-all duration-500"
                    style={{ width: `${(item.expired / (item.valid + item.expiring + item.expired)) * 100}%` }}
                    title={`Expired: ${item.expired}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500/80 rounded"></div>
              <span className="text-white/70 text-sm">Valid</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500/80 rounded"></div>
              <span className="text-white/70 text-sm">Expiring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500/80 rounded"></div>
              <span className="text-white/70 text-sm">Expired</span>
            </div>
          </div>
        </div>

        {/* Compliance Score Gauge */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Overall Compliance Score</h4>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(34 197 94 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="188.5"
                  strokeDashoffset="37.7"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">85%</div>
                  <div className="text-white/70">Compliant</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-white/70">Compliance Breakdown:</div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-green-300 font-bold">344</div>
                <div className="text-white/60">Valid</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-300 font-bold">40</div>
                <div className="text-white/60">Expiring</div>
              </div>
              <div className="text-center">
                <div className="text-red-300 font-bold">16</div>
                <div className="text-white/60">Expired</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeaveChart() {
  const leaveData = [
    { month: "Jan", annual: 45, sick: 12, personal: 8, emergency: 3 },
    { month: "Feb", annual: 38, sick: 15, personal: 6, emergency: 2 },
    { month: "Mar", annual: 52, sick: 10, personal: 12, emergency: 4 },
    { month: "Apr", annual: 48, sick: 8, personal: 10, emergency: 2 },
    { month: "May", annual: 55, sick: 18, personal: 14, emergency: 5 },
    { month: "Jun", annual: 62, sick: 14, personal: 16, emergency: 3 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">📅 Leave Analysis Dashboard</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Leave Trends Over Time</h4>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  y1={40 + i * 30}
                  x2="280"
                  y2={40 + i * 30}
                  stroke="rgb(255 255 255 / 0.1)"
                  strokeWidth="1"
                />
              ))}
              {leaveData.map((_, i) => (
                <line
                  key={i}
                  x1={60 + i * 40}
                  y1="40"
                  x2={60 + i * 40}
                  y2="160"
                  stroke="rgb(255 255 255 / 0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Annual Leave Line */}
              <polyline
                fill="none"
                stroke="rgb(34 197 94 / 0.8)"
                strokeWidth="3"
                points={leaveData.map((d, i) => `${60 + i * 40},${160 - (d.annual / 70) * 120}`).join(" ")}
              />

              {/* Sick Leave Line */}
              <polyline
                fill="none"
                stroke="rgb(239 68 68 / 0.8)"
                strokeWidth="3"
                points={leaveData.map((d, i) => `${60 + i * 40},${160 - (d.sick / 70) * 120}`).join(" ")}
              />

              {/* Data points */}
              {leaveData.map((d, i) => (
                <g key={i}>
                  <circle cx={60 + i * 40} cy={160 - (d.annual / 70) * 120} r="4" fill="rgb(34 197 94)" />
                  <circle cx={60 + i * 40} cy={160 - (d.sick / 70) * 120} r="4" fill="rgb(239 68 68)" />
                </g>
              ))}

              {/* Labels */}
              {leaveData.map((d, i) => (
                <text key={i} x={60 + i * 40} y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
                  {d.month}
                </text>
              ))}
            </svg>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-white/70 text-sm">Annual Leave</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-white/70 text-sm">Sick Leave</span>
            </div>
          </div>
        </div>

        {/* Department Leave Distribution */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Leave by Department</h4>
          <div className="space-y-4">
            {[
              { dept: "Engineering", days: 85, color: "bg-blue-500" },
              { dept: "Construction", days: 72, color: "bg-green-500" },
              { dept: "Safety", days: 45, color: "bg-yellow-500" },
              { dept: "Operations", days: 38, color: "bg-purple-500" },
              { dept: "Agriculture", days: 28, color: "bg-pink-500" },
            ].map((item, index) => (
              <div key={item.dept} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">{item.dept}</span>
                  <span className="text-white">{item.days} days</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`${item.color}/80 h-full transition-all duration-1000 rounded-full`}
                    style={{ width: `${(item.days / 85) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PerformanceChart() {
  const performanceData = [
    { name: "Marcus Johnson", score: 95, department: "Electrical" },
    { name: "Aisha Williams", score: 92, department: "Engineering" },
    { name: "Zara Thompson", score: 88, department: "Construction" },
    { name: "Jasmine Carter", score: 90, department: "Safety" },
    { name: "Francisco Martinez", score: 87, department: "Construction" },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">📊 Performance KPIs Dashboard</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Radar Chart */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Top Performers</h4>
          <div className="space-y-4">
            {performanceData.map((emp, index) => (
              <div key={emp.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium">{emp.name}</span>
                    <span className="text-white/60 text-sm ml-2">({emp.department})</span>
                  </div>
                  <span className="text-white font-bold">{emp.score}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${
                      emp.score >= 90 ? "bg-green-500/80" : emp.score >= 80 ? "bg-yellow-500/80" : "bg-red-500/80"
                    }`}
                    style={{ width: `${emp.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Distribution */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Performance Distribution</h4>
          <div className="h-64 flex items-end justify-center space-x-4">
            {[
              { range: "90-100%", count: 45, color: "bg-green-500" },
              { range: "80-89%", count: 78, color: "bg-blue-500" },
              { range: "70-79%", count: 52, color: "bg-yellow-500" },
              { range: "60-69%", count: 28, color: "bg-orange-500" },
              { range: "Below 60%", count: 12, color: "bg-red-500" },
            ].map((item, index) => (
              <div key={item.range} className="flex flex-col items-center space-y-2">
                <div
                  className={`${item.color}/80 w-12 transition-all duration-1000 hover:opacity-100 rounded-t`}
                  style={{ height: `${(item.count / 78) * 200}px` }}
                  title={`${item.count} employees`}
                ></div>
                <span className="text-white/70 text-xs text-center transform -rotate-45 origin-center">
                  {item.range}
                </span>
                <span className="text-white text-sm font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DepartmentChart() {
  const departmentData = [
    { name: "Engineering", employees: 45, avgSalary: 75000, satisfaction: 4.2 },
    { name: "Construction", employees: 78, avgSalary: 65000, satisfaction: 4.0 },
    { name: "Safety", employees: 32, avgSalary: 62000, satisfaction: 4.5 },
    { name: "Operations", employees: 28, avgSalary: 58000, satisfaction: 3.8 },
    { name: "Agriculture", employees: 24, avgSalary: 55000, satisfaction: 4.1 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">🏢 Department Analysis Dashboard</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Distribution Pie Chart */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Employee Distribution</h4>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Engineering - 45/207 = 21.7% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(59 130 246 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="54.4 196.1"
                  strokeDashoffset="0"
                />
                {/* Construction - 78/207 = 37.7% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(34 197 94 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="94.3 156.2"
                  strokeDashoffset="-54.4"
                />
                {/* Safety - 32/207 = 15.5% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(234 179 8 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="38.7 211.8"
                  strokeDashoffset="-148.7"
                />
                {/* Operations - 28/207 = 13.5% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(168 85 247 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="33.8 216.7"
                  strokeDashoffset="-187.4"
                />
                {/* Agriculture - 24/207 = 11.6% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(236 72 153 / 0.8)"
                  strokeWidth="8"
                  strokeDasharray="29.0 221.5"
                  strokeDashoffset="-221.2"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold">207</div>
                  <div className="text-white/70 text-sm">Total</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {departmentData.map((dept, index) => (
              <div key={dept.name} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                          ? "bg-green-500"
                          : index === 2
                            ? "bg-yellow-500"
                            : index === 3
                              ? "bg-purple-500"
                              : "bg-pink-500"
                    }`}
                  ></div>
                  <span className="text-white/70">{dept.name}</span>
                </div>
                <span className="text-white">{dept.employees}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Metrics */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Department Metrics</h4>
          <div className="space-y-6">
            {departmentData.map((dept, index) => (
              <div key={dept.name} className={`${glassCard} p-3`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{dept.name}</span>
                  <span className="text-white/70">{dept.employees} employees</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/60">Avg Salary</div>
                    <div className="text-green-300 font-medium">${dept.avgSalary.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/60">Satisfaction</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-300 font-medium">{dept.satisfaction}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-xs ${star <= dept.satisfaction ? "text-yellow-400" : "text-white/30"}`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CostChart() {
  const costData = [
    { category: "Salaries", amount: 1250000, percentage: 68 },
    { category: "Benefits", amount: 285000, percentage: 15 },
    { category: "Training", amount: 95000, percentage: 5 },
    { category: "Recruitment", amount: 75000, percentage: 4 },
    { category: "Technology", amount: 85000, percentage: 5 },
    { category: "Other", amount: 60000, percentage: 3 },
  ]

  const monthlyTrend = [
    { month: "Jan", cost: 145000 },
    { month: "Feb", cost: 148000 },
    { month: "Mar", cost: 152000 },
    { month: "Apr", cost: 155000 },
    { month: "May", cost: 158000 },
    { month: "Jun", cost: 162000 },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">💰 HR Cost Analysis Dashboard</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Cost Breakdown by Category</h4>
          <div className="space-y-4">
            {costData.map((item, index) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">{item.category}</span>
                  <div className="text-right">
                    <div className="text-white font-medium">${item.amount.toLocaleString()}</div>
                    <div className="text-white/60 text-sm">{item.percentage}%</div>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${
                      index === 0
                        ? "bg-blue-500/80"
                        : index === 1
                          ? "bg-green-500/80"
                          : index === 2
                            ? "bg-yellow-500/80"
                            : index === 3
                              ? "bg-purple-500/80"
                              : index === 4
                                ? "bg-pink-500/80"
                                : "bg-gray-500/80"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Total Annual Cost</span>
              <span className="text-green-300 font-bold text-lg">
                ${costData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className={`${glassCard} p-4`}>
          <h4 className="text-white font-medium mb-4">Monthly Cost Trend</h4>
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  y1={40 + i * 30}
                  x2="280"
                  y2={40 + i * 30}
                  stroke="rgb(255 255 255 / 0.1)"
                  strokeWidth="1"
                />
              ))}
              {monthlyTrend.map((_, i) => (
                <line
                  key={i}
                  x1={60 + i * 40}
                  y1="40"
                  x2={60 + i * 40}
                  y2="160"
                  stroke="rgb(255 255 255 / 0.1)"
                  strokeWidth="1"
                />
              ))}

              {/* Area under curve */}
              <path
                d={`M 60,160 ${monthlyTrend
                  .map((d, i) => `L ${60 + i * 40},${160 - ((d.cost - 140000) / 25000) * 120}`)
                  .join(" ")} L 260,160 Z`}
                fill="url(#costGradient)"
                opacity="0.3"
              />

              {/* Cost line */}
              <polyline
                fill="none"
                stroke="rgb(34 197 94)"
                strokeWidth="3"
                points={monthlyTrend
                  .map((d, i) => `${60 + i * 40},${160 - ((d.cost - 140000) / 25000) * 120}`)
                  .join(" ")}
              />

              {/* Data points */}
              {monthlyTrend.map((d, i) => (
                <circle
                  key={i}
                  cx={60 + i * 40}
                  cy={160 - ((d.cost - 140000) / 25000) * 120}
                  r="4"
                  fill="rgb(34 197 94)"
                />
              ))}

              {/* Labels */}
              {monthlyTrend.map((d, i) => (
                <text key={i} x={60 + i * 40} y="180" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="12">
                  {d.month}
                </text>
              ))}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="costGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="rgb(34 197 94)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-green-300 font-bold">+11.7%</div>
              <div className="text-white/60 text-sm">Growth Rate</div>
            </div>
            <div>
              <div className="text-blue-300 font-bold">$152K</div>
              <div className="text-white/60 text-sm">Avg Monthly</div>
            </div>
            <div>
              <div className="text-purple-300 font-bold">$17K</div>
              <div className="text-white/60 text-sm">Monthly Increase</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Update ReportCard component to accept onClick and isSelected props
function ReportCard({
  title,
  description,
  onClick,
  isSelected,
}: {
  title: string
  description: string
  onClick: () => void
  isSelected: boolean
}) {
  return (
    <div
      className={`${glassCard} p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer ${
        isSelected ? "ring-2 ring-pink-400 bg-white/15" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <FileText className="h-8 w-8 text-pink-300" />
        <Button
          onClick={(e) => {
            e.stopPropagation()
            alert(`${title} downloaded`)
          }}
          className={`${glassButton} text-white`}
          size="sm"
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
      {isSelected && <div className="mt-3 text-pink-300 text-sm">✨ Click to view analytics</div>}
    </div>
  )
}

function NotificationsTab() {
  const notifications = [
    { type: "warning", message: "ID Card expiring for John Doe in 15 days", time: "2 hours ago" },
    { type: "success", message: "Payroll processed successfully for Marketing", time: "4 hours ago" },
    { type: "error", message: "Certificate expired for Mike Johnson", time: "1 day ago" },
    { type: "info", message: "New leave request from Sarah Wilson", time: "2 days ago" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Notifications</h2>
        <Button onClick={() => alert("Bulk notification sent successfully")} className={`${glassButton} text-white`}>
          <Bell className="h-4 w-4 mr-2" /> Send Bulk Notification
        </Button>
      </div>

      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Notifications</h3>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div key={index} className={`${glassCard} p-4 flex items-start space-x-3`}>
              <div
                className={`p-2 rounded-full ${
                  notification.type === "warning"
                    ? "bg-yellow-500/20"
                    : notification.type === "success"
                      ? "bg-green-500/20"
                      : notification.type === "error"
                        ? "bg-red-500/20"
                        : "bg-blue-500/20"
                }`}
              >
                <Bell
                  className={`h-4 w-4 ${
                    notification.type === "warning"
                      ? "text-yellow-300"
                      : notification.type === "success"
                        ? "text-green-300"
                        : notification.type === "error"
                          ? "text-red-300"
                          : "text-blue-300"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-white">{notification.message}</p>
                <p className="text-white/60 text-sm">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  color,
}: { title: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className={`${glassCard} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={color}>{icon}</div>
      </div>
    </div>
  )
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/10">
      <span className="text-white">{text}</span>
      <span className="text-white/60 text-sm">{time}</span>
    </div>
  )
}

function HarmonyAITab() {
const [activeAIFeature, setActiveAIFeature] = useState("document-scanning")
const [isScanning, setIsScanning] = useState(false)
const [scanProgress, setScanProgress] = useState(0)
const [uploadedFile, setUploadedFile] = useState<File | null>(null)

const aiFeatures = [
  { id: "document-scanning", label: "Document Scanning", icon: <FileText className="h-4 w-4" /> },
  { id: "payroll-ai", label: "Payroll AI", icon: <Calculator className="h-4 w-4" /> },
  { id: "cv-parsing", label: "CV Parsing", icon: <Users className="h-4 w-4" /> },
  { id: "attendance-prediction", label: "Attendance AI", icon: <Clock className="h-4 w-4" /> },
  { id: "auto-reminders", label: "Smart Reminders", icon: <Bell className="h-4 w-4" /> },
  { id: "fraud-detection", label: "Fraud Detection", icon: <Shield className="h-4 w-4" /> },
]

const startScanning = () => {
  setIsScanning(true)
  setScanProgress(0)

  const interval = setInterval(() => {
    setScanProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval)
        setIsScanning(false)
        return 100
      }
      return prev + Math.random() * 15
    })
  }, 200)
}

return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">🤖 HARMONY AI</h2>
      <Badge className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-200 border-pink-300/30 animate-pulse">
        AI Powered
      </Badge>
    </div>

    {/* AI Feature Navigation */}
    <div className={`${glassCard} p-4`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {aiFeatures.map((feature) => (
          <Button
            key={feature.id}
            onClick={() => setActiveAIFeature(feature.id)}
            className={`${feature.id === activeAIFeature ? "bg-white/20 ring-2 ring-pink-400" : ""} ${glassButton} text-white p-4 h-auto flex-col space-y-2`}
          >
            {feature.icon}
            <span className="text-xs text-center">{feature.label}</span>
          </Button>
        ))}
      </div>
    </div>

    {/* Document Scanning Feature */}
    {activeAIFeature === "document-scanning" && (
      <div className="space-y-6">
        <div className={`${glassCard} p-6`}>
          <h3 className="text-xl font-semibold text-white mb-4">🤖 1️⃣ AI Document Scanning & Compliance Checks</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className={`${glassCard} p-6`}>
              <h4 className="text-lg font-medium text-white mb-4">Upload Document</h4>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-white/60 mx-auto mb-4" />
                  <p className="text-white/70 mb-4">Drop your document here or click to browse</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.png,.doc,.docx"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload">
                    <Button className={`${glassButton} text-white cursor-pointer`}>Choose File</Button>
                  </label>
                </div>

                {uploadedFile && (
                  <div className={`${glassCard} p-4`}>
                    <p className="text-white">Selected: {uploadedFile.name}</p>
                    <Button onClick={startScanning} className={`${glassButton} text-white mt-2 w-full`}>
                      🔍 Start AI Scan
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Scanning Results */}
            <div className={`${glassCard} p-6`}>
              <h4 className="text-lg font-medium text-white mb-4">AI Analysis Results</h4>

              {isScanning && (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 relative"
                        style={{ width: `${scanProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mt-2">Scanning... {Math.round(scanProgress)}%</p>
                  </div>

                  {/* Scanning Animation */}
                  <div className="relative h-32 bg-black/30 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse transform -skew-x-12"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 animate-pulse"></div>
                    <div className="flex items-center justify-center h-full">
                      <div className="text-cyan-400 animate-pulse">🔍 AI Scanning Document...</div>
                    </div>
                  </div>
                </div>
              )}

              {!isScanning && scanProgress === 100 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <span>Scan Complete!</span>
                  </div>

                  <div className="space-y-3">
                    <div className={`${glassCard} p-3`}>
                      <p className="text-white font-medium">Document Type: ID Card</p>
                      <p className="text-white/70 text-sm">Confidence: 98%</p>
                    </div>
                    <div className={`${glassCard} p-3`}>
                      <p className="text-white font-medium">Expiry Date: 2026-05-15</p>
                      <p className="text-green-300 text-sm">✅ Valid for 2 years</p>
                    </div>
                    <div className={`${glassCard} p-3`}>
                      <p className="text-white font-medium">Face Match: 94%</p>
                      <p className="text-green-300 text-sm">✅ Verified</p>
                    </div>
                    <div className={`${glassCard} p-3`}>
                      <p className="text-white font-medium">Compliance Score: 95%</p>
                      <Badge className="bg-green-500/20 text-green-200">Excellent</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Features List */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${glassCard} p-4`}>
              <h5 className="text-white font-medium mb-2">✨ AI Capabilities</h5>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Auto-extract expiry dates</li>
                <li>• Signature validation</li>
                <li>• Photo ID face matching</li>
                <li>• Document authenticity check</li>
              </ul>
            </div>
            <div className={`${glassCard} p-4`}>
              <h5 className="text-white font-medium mb-2">⚡ Manual Work Saved</h5>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• No manual PDF checking</li>
                <li>• Auto compliance scoring</li>
                <li>• Instant notifications</li>
                <li>• Real-time validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Payroll AI Feature */}
    {activeAIFeature === "payroll-ai" && (
      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">💵 2️⃣ AI Payroll Calculations</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">🧮 Smart Calculations</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• Gross → Net calculations</li>
              <li>• PAYE, NHIF, NSSF auto-apply</li>
              <li>• Overtime anomaly detection</li>
              <li>• Error prediction</li>
            </ul>
          </div>

          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">⚡ Automation Benefits</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• No line-by-line calculations</li>
              <li>• Instant payslip generation</li>
              <li>• Tax compliance guaranteed</li>
              <li>• Bulk processing ready</li>
            </ul>
          </div>

          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">🎯 AI Features</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• Pattern recognition</li>
              <li>• Fraud detection</li>
              <li>• Cost optimization</li>
              <li>• Predictive analytics</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={() => alert("AI Payroll processing started")} className={`${glassButton} text-white`}>
            🚀 Run AI Payroll Analysis
          </Button>
        </div>
      </div>
    )}

    {/* CV Parsing Feature */}
    {activeAIFeature === "cv-parsing" && (
      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">📋 3️⃣ AI CV & Qualification Parsing</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">🎯 AI Analysis</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• Auto-extract education history</li>
              <li>• Experience timeline mapping</li>
              <li>• Skills identification</li>
              <li>• Qualification scoring</li>
              <li>• Job requirement matching</li>
            </ul>
          </div>

          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">💡 Smart Insights</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• Top candidate highlighting</li>
              <li>• Skill gap analysis</li>
              <li>• Training recommendations</li>
              <li>• Career progression paths</li>
              <li>• Automated shortlisting</li>
            </ul>
          </div>
        </div>
      </div>
    )}

    {/* Attendance Prediction Feature */}
    {activeAIFeature === "attendance-prediction" && (
      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">🗓️ 4️⃣ AI Leave & Attendance Prediction</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">🔍 Pattern Detection</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• Unusual leave pattern alerts</li>
              <li>• Friday absence tracking</li>
              <li>• Attrition risk prediction</li>
              <li>• Seasonal trend analysis</li>
            </ul>
          </div>

          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">🤖 Smart Automation</h4>
            <ul className="text-white/70 text-sm space-y-2">
              <li>• Auto-approve standard leave</li>
              <li>• Policy compliance checks</li>
              <li>• Workload redistribution</li>
              <li>• Team impact analysis</li>
            </ul>
          </div>
        </div>
      </div>
    )}

    {/* Smart Reminders Feature */}
    {activeAIFeature === "auto-reminders" && (
      <div className={`${glassCard} p-6`}>
        <h3 className="text-xl font-semibold text-white mb-4">📌 6️⃣ AI Smart Reminders & Scheduling</h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`${glassCard} p-4`}>
            <h4 className="text-white font-medium mb-3">🎯 Predictive</h4>
          </div>
        </div>
        
      </div>)}

  </div>)}