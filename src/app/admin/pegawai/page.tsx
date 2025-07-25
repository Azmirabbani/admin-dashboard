"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building2,
  Filter
} from "lucide-react"

type Officer = {
  id: string
  name: string
  employeeId: string
  email: string
  phone: string
  department: string
  position: string
  joinDate: string
  location: string
  photo?: string
}

export default function OfficerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null)

  // Sample data officers
  const [officers, setOfficers] = useState<Officer[]>([
    {
      id: "1",
      name: "Ahmad Rizki Pratama",
      employeeId: "EMP001",
      email: "ahmad.rizki@company.com",
      phone: "+62 812-3456-7890",
      department: "Teknologi Informasi",
      position: "Software Engineer",
      joinDate: "2024-01-15",
      location: "Cikampek",
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      employeeId: "EMP002",
      email: "siti.nurhaliza@company.com",
      phone: "+62 813-2345-6789",
      department: "Pemasaran",
      position: "Marketing Specialist",
      joinDate: "2024-02-20",
      location: "Cikampek",
    },
    {
      id: "3",
      name: "Budi Setiawan",
      employeeId: "EMP003",
      email: "budi.setiawan@company.com",
      phone: "+62 814-3456-7890",
      department: "Keuangan",
      position: "Financial Analyst",
      joinDate: "2023-11-10",
      location: "Cikampek",
    },
    {
      id: "4",
      name: "Maya Sari",
      employeeId: "EMP004",
      email: "maya.sari@company.com",
      phone: "+62 815-4567-8901",
      department: "Sumber Daya Manusia",
      position: "HR Generalist",
      joinDate: "2023-08-05",
      location: "Cikampek",
    },
    {
      id: "5",
      name: "Doni Kurniawan",
      employeeId: "EMP005",
      email: "doni.kurniawan@company.com",
      phone: "+62 816-5678-9012",
      department: "Administrasi",
      position: "Administrative Officer",
      joinDate: "2024-03-12",
      location: "Cikampek",
    },
    {
      id: "6",
      name: "Rina Wulandari",
      employeeId: "EMP006",
      email: "rina.wulandari@company.com",
      phone: "+62 817-6789-0123",
      department: "R&D",
      position: "Research Analyst",
      joinDate: "2023-12-18",
      location: "Cikampek",
    },
    {
      id: "7",
      name: "Fajar Hidayat",
      employeeId: "EMP007",
      email: "fajar.hidayat@company.com",
      phone: "+62 818-7890-1234",
      department: "Bisnis",
      position: "Business Analyst",
      joinDate: "2024-01-08",
      location: "Cikampek",
    },
  ])

  const [newOfficer, setNewOfficer] = useState<Partial<Officer>>({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    joinDate: "",
    location: "",
  })

  const departments = [
    "Teknologi Informasi",
    "Pemasaran", 
    "Administrasi",
    "Bisnis",
    "Keuangan",
    "Sumber Daya Manusia",
    "R&D"
  ]

  // Filter officers
  const getFilteredOfficers = () => {
    let filtered = [...officers]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(officer =>
        officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        officer.position.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter(officer => officer.department === departmentFilter)
    }

    return filtered
  }

  const handleAddOfficer = () => {
    if (newOfficer.name && newOfficer.email && newOfficer.employeeId) {
      const officer: Officer = {
        ...newOfficer,
        id: Date.now().toString(),
      } as Officer

      setOfficers([officer, ...officers])
      setNewOfficer({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        joinDate: "",
        location: "",
      })
      setShowAddForm(false)
    }
  }

  const handleEditOfficer = (officer: Officer) => {
    setEditingOfficer(officer)
    setNewOfficer(officer)
    setShowAddForm(true)
  }

  const handleUpdateOfficer = () => {
    if (editingOfficer && newOfficer.name && newOfficer.email) {
      setOfficers(officers.map(officer => 
        officer.id === editingOfficer.id 
          ? { ...newOfficer, id: editingOfficer.id } as Officer
          : officer
      ))
      setEditingOfficer(null)
      setNewOfficer({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        joinDate: "",
        location: "",
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteOfficer = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data officer ini?")) {
      setOfficers(officers.filter(officer => officer.id !== id))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const filteredOfficers = getFilteredOfficers()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#009a44] rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Data Officer</h1>
                <p className="text-gray-600">Kelola informasi pegawai officer</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-[#e6f7ef] text-[#009a44] px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {officers.length} Total Officer
              </Badge>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-[#009a44] hover:bg-[#008239]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Officer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama, ID, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Departemen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Departemen</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              {filteredOfficers.length} dari {officers.length} officer
            </div>
          </div>
        </Card>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="p-6 mb-6 border-[#009a44]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingOfficer ? 'Edit Officer' : 'Tambah Officer Baru'}
              </h3>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false)
                  setEditingOfficer(null)
                  setNewOfficer({
                    name: "",
                    employeeId: "",
                    email: "",
                    phone: "",
                    department: "",
                    position: "",
                    joinDate: "",
                    location: "",
                  })
                }}
              >
                Batal
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
                <Input
                  value={newOfficer.name || ""}
                  onChange={(e) => setNewOfficer({...newOfficer, name: e.target.value})}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Employee ID *</label>
                <Input
                  value={newOfficer.employeeId || ""}
                  onChange={(e) => setNewOfficer({...newOfficer, employeeId: e.target.value})}
                  placeholder="EMP001"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={newOfficer.email || ""}
                  onChange={(e) => setNewOfficer({...newOfficer, email: e.target.value})}
                  placeholder="nama@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">No. Telepon</label>
                <Input
                  value={newOfficer.phone || ""}
                  onChange={(e) => setNewOfficer({...newOfficer, phone: e.target.value})}
                  placeholder="+62 812-3456-7890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Departemen</label>
                <Select value={newOfficer.department || ""} onValueChange={(value) => setNewOfficer({...newOfficer, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Posisi</label>
                <Input
                  value={newOfficer.position || ""}
                  onChange={(e) => setNewOfficer({...newOfficer, position: e.target.value})}
                  placeholder="Software Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tanggal Bergabung</label>
                <Input
                  type="date"
                  value={newOfficer.joinDate || ""}
                  onChange={(e) => setNewOfficer({...newOfficer, joinDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Lokasi</label>
                <Input
                  value={newOfficer.location || ""}
                  onChange={(e) => setNewOfficer({...newOfficer, location: e.target.value})}
                  placeholder="Cikampek"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={editingOfficer ? handleUpdateOfficer : handleAddOfficer}
                className="bg-[#009a44] hover:bg-[#008239]"
              >
                {editingOfficer ? 'Update Officer' : 'Tambah Officer'}
              </Button>
            </div>
          </Card>
        )}

        {/* Officers List */}
        <div className="grid gap-4">
          {filteredOfficers.length === 0 ? (
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Tidak ada data officer
              </h3>
              <p className="text-gray-500">
                {searchQuery || departmentFilter !== "all" 
                  ? "Coba ubah filter pencarian" 
                  : "Belum ada data officer yang ditambahkan"
                }
              </p>
            </Card>
          ) : (
            filteredOfficers.map((officer) => (
              <Card key={officer.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-[#009a44] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-lg">
                      {officer.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>
                  
                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {officer.name}
                      </h3>
                      <Badge className="text-xs px-2 py-1" variant="outline">
                        {officer.employeeId}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {officer.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {officer.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {officer.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {officer.position}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {officer.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(officer.joinDate)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditOfficer(officer)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteOfficer(officer.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}