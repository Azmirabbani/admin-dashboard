"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Announcement = {
  title: string
  recipient: string
  department: string
  message: string
  date: string
  endDate: string
  author: string
  isPinned?: boolean
  id: string
  documents?: { name: string; url: string; size: string; type: string }[]
}

const recipients = [
  "Seluruh Officer",
  "Officer",
  "Vice President",
  "Senior Vice President",
  "Direksi",
  "Staff",
]

const departments = [
  "Teknologi Informasi",
  "Pemasaran",
  "Administrasi",
  "Bisnis",
  "Keuangan",
  "Sumber Daya Manusia",
  "R&D",
]

export default function AnnouncementPage() {
  const [filter, setFilter] = useState("all")
  
  // Effect untuk membaca URL parameter saat component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const filterParam = urlParams.get('filter')
      
      // Set filter berdasarkan URL parameter
      if (filterParam && ['active', 'latest', 'all'].includes(filterParam)) {
        setFilter(filterParam)
      }
    }
  }, [])
  
  const [form, setForm] = useState<Announcement>({
    title: "",
    recipient: "",
    department: "",
    message: "",
    date: "",
    endDate: "",
    author: "Admin",
    isPinned: false,
    id: "",
    documents: [],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Kebijakan Baru: ID Card",
      recipient: "Seluruh Officer",
      department: "Sumber Daya Manusia",
      message: "Mulai Senin, 28 Juli 2025, semua karyawan diwajibkan untuk tap ID card saat masuk kantor untuk akses area dan absensi. Harap bawa ID card setiap hari. Terima kasih atas kerjasamanya.",
      date: "2025-07-23",
      endDate: "2025-08-30",
      author: "Admin",
      isPinned: true,
      documents: [
        { name: "SOP_ID_Card.pdf", url: "#", size: "245 KB", type: "pdf" },
        { name: "Panduan_Akses_Kantor.docx", url: "#", size: "158 KB", type: "docx" }
      ],
    },
    {
      id: "2",
      title: "Deadline Proposal Q3",
      recipient: "Vice President",
      department: "R&D",
      message: "Proposal untuk quarter 3 harus dikumpulkan paling lambat Sabtu ini. Mohon koordinasi dengan tim masing-masing.",
      date: "2025-07-22",
      endDate: "2025-07-26", // Masih aktif
      author: "Admin",
      isPinned: false,
      documents: [
        { name: "Template_Proposal_Q3.xlsx", url: "#", size: "89 KB", type: "xlsx" }
      ],
    },
    {
      id: "3",
      title: "Evaluasi Sistem Internal",
      recipient: "Officer",
      department: "Teknologi Informasi",
      message: "Evaluasi sistem akan dilakukan minggu depan. Pastikan backup data sudah dilakukan.",
      date: "2025-07-20",
      endDate: "2025-07-28", // Masih aktif
      author: "Admin",
      isPinned: false,
      documents: [],
    },
    {
      id: "4",
      title: "Pengumpulan Laporan Bulanan",
      recipient: "Staff",
      department: "Keuangan",
      message: "Harap kumpulkan laporan bulanan sebelum tanggal 25. Format laporan mengikuti template terbaru.",
      date: "2025-07-19",
      endDate: "2025-07-24", // Sudah kadaluarsa
      author: "Admin",
      isPinned: false,
      documents: [
        { name: "Format_Laporan_Bulanan.pdf", url: "#", size: "123 KB", type: "pdf" }
      ],
    },
    {
      id: "5",
      title: "Meeting Evaluasi Tahunan",
      recipient: "Direksi",
      department: "Administrasi",
      message: "Meeting evaluasi tahunan akan dilaksanakan pada tanggal 30 Juli 2025. Mohon kehadiran semua pihak terkait.",
      date: "2025-07-25", // Hari ini
      endDate: "2025-07-30",
      author: "Admin",
      isPinned: false,
      documents: [],
    },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('docx')) return '📝'
    if (type.includes('excel') || type.includes('xlsx')) return '📊'
    if (type.includes('powerpoint') || type.includes('pptx')) return '📈'
    if (type.includes('image')) return '🖼️'
    return '📎'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Process uploaded files
    const processedFiles = uploadedFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file), // In real app, this would be uploaded to server
      size: formatFileSize(file.size),
      type: file.type
    }))
    
    if (isEditing && editingId) {
      // Update existing announcement
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement.id === editingId
            ? { ...form, id: editingId, documents: processedFiles }
            : announcement
        )
      )
      setIsEditing(false)
      setEditingId(null)
    } else {
      // Create new announcement
      const newAnnouncement = { 
        ...form, 
        author: "Admin", 
        id: Date.now().toString(),
        isPinned: false,
        documents: processedFiles
      }
      setAnnouncements((prev) => [newAnnouncement, ...prev])
    }
    
    // Reset form and files
    setForm({
      title: "",
      recipient: "",
      department: "",
      message: "",
      date: "",
      endDate: "",
      author: "Admin",
      isPinned: false,
      id: "",
      documents: [],
    })
    setUploadedFiles([])
  }

  const handleEdit = (announcement: Announcement) => {
    setForm(announcement)
    setIsEditing(true)
    setEditingId(announcement.id)
    // Reset uploaded files when editing (would show existing docs in real app)
    setUploadedFiles([])
  }

  const handlePin = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === id
          ? { ...announcement, isPinned: !announcement.isPinned }
          : announcement
      )
    )
  }

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id))
    }
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setEditingId(null)
    setUploadedFiles([])
    setForm({
      title: "",
      recipient: "",
      department: "",
      message: "",
      date: "",
      endDate: "",
      author: "Admin",
      isPinned: false,
      id: "",
      documents: [],
    })
  }

  // Fungsi untuk menentukan apakah pengumuman masih aktif
  const isAnnouncementActive = (endDate: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set ke awal hari
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999) // Set ke akhir hari
    return end >= today
  }

  // Fungsi untuk menentukan apakah pengumuman adalah "terbaru" (dalam 7 hari terakhir)
  const isAnnouncementRecent = (date: string) => {
    const today = new Date()
    const announcementDate = new Date(date)
    const diffTime = today.getTime() - announcementDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 // Pengumuman dalam 7 hari terakhir dianggap terbaru
  }

  const getFilteredAnnouncements = (type: string) => {
    let filtered = [...announcements]

    if (type === "active") {
      // Hanya tampilkan pengumuman yang masih aktif (belum kedaluwarsa)
      filtered = filtered.filter((a) => isAnnouncementActive(a.endDate))
    } else if (type === "latest") {
      // Hanya tampilkan pengumuman terbaru (dalam 7 hari terakhir)
      filtered = filtered.filter((a) => isAnnouncementRecent(a.date))
      // Urutkan berdasarkan tanggal terbaru
      filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      // Untuk "all", urutkan berdasarkan tanggal terbaru
      filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    // Selalu tampilkan pengumuman yang di-pin di atas
    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return 0
    })
  }

  // Fungsi untuk mendapatkan badge status
  const getStatusBadge = (announcement: Announcement) => {
    const isActive = isAnnouncementActive(announcement.endDate)
    const isRecent = isAnnouncementRecent(announcement.date)
    
    if (!isActive) {
      return <span className="text-xs bg-red-100 px-2 py-0.5 rounded-full text-red-700 font-medium">⏰ Kedaluwarsa</span>
    }
    
    if (isRecent) {
      return <span className="text-xs bg-green-100 px-2 py-0.5 rounded-full text-green-700 font-medium">🆕 Baru</span>
    }
    
    return <span className="text-xs bg-blue-100 px-2 py-0.5 rounded-full text-blue-700 font-medium">✅ Aktif</span>
  }

  const AnnouncementList = ({ type }: { type: string }) => {
    const list = getFilteredAnnouncements(type)

    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    // Generate consistent view counts based on index and title
    const getViewCount = (index: number, title: string) => {
      const seed = title.length + index
      return (seed * 7 + 15) % 85 + 10 // Will always return same number for same input
    }

    // Fungsi untuk menghitung sisa hari
    const getDaysRemaining = (endDate: string) => {
      const today = new Date()
      const end = new Date(endDate)
      const diffTime = end.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays < 0) return "Kedaluwarsa"
      if (diffDays === 0) return "Berakhir hari ini"
      if (diffDays === 1) return "1 hari lagi"
      return `${diffDays} hari lagi`
    }

    return (
      <div className="flex flex-col gap-3 h-[calc(100vh-280px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Summary untuk filter aktif */}
        {type !== "all" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
            <div className="flex items-center gap-2 text-sm text-blue-800">
              {type === "active" && (
                <>
                  <span>✅</span>
                  <span className="font-semibold">Pengumuman Aktif:</span>
                  <span>{list.length} pengumuman masih berlaku</span>
                </>
              )}
              {type === "latest" && (
                <>
                  <span>🆕</span>
                  <span className="font-semibold">Pengumuman Terbaru:</span>
                  <span>{list.length} pengumuman dalam 7 hari terakhir</span>
                </>
              )}
            </div>
          </div>
        )}

        {list.map((a, index) => (
          <Card
            key={a.id}
            className={`p-3 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0 ${
              a.isPinned 
                ? 'bg-yellow-50 text-yellow-900 border-yellow-300 shadow-yellow-100' 
                : isAnnouncementActive(a.endDate)
                  ? 'bg-[var(--kujang-green-bg)] text-[var(--kujang-green)] border-[var(--kujang-green)]'
                  : 'bg-gray-50 text-gray-600 border-gray-300 opacity-75'
            }`}
          >
            {/* Header dengan avatar dan info */}
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs ${
                a.isPinned ? 'bg-yellow-500' : 
                isAnnouncementActive(a.endDate) ? 'bg-[var(--kujang-green)]' : 'bg-gray-400'
              }`}>
                {a.isPinned ? '📌' : '👤'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`font-semibold text-xs ${
                    a.isPinned ? 'text-yellow-900' : 
                    isAnnouncementActive(a.endDate) ? 'text-[var(--kujang-green)]' : 'text-gray-600'
                  }`}>
                    Admin
                  </span>
                  {a.isPinned && (
                    <span className="text-xs bg-yellow-200 px-1.5 py-0.5 rounded-full text-yellow-800 font-semibold">
                      📌 Pin
                    </span>
                  )}
                  {getStatusBadge(a)}
                </div>
                <div className={`text-xs ${
                  a.isPinned ? 'text-yellow-700' : 
                  isAnnouncementActive(a.endDate) ? 'text-[var(--kujang-green)]/70' : 'text-gray-500'
                }`}>
                  {formatDate(a.date)} • {getDaysRemaining(a.endDate)}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  a.isPinned ? 'bg-yellow-200 text-yellow-700' : 
                  isAnnouncementActive(a.endDate) ? 'bg-[var(--kujang-green)]/10 text-[var(--kujang-green)]' : 'bg-gray-200 text-gray-600'
                }`}>
                  📋
                </div>
                {/* Admin Actions Dropdown */}
                <div className="relative group">
                  <button className={`p-1 rounded-full hover:bg-gray-200 transition-colors text-xs ${
                    a.isPinned ? 'text-yellow-700' : 
                    isAnnouncementActive(a.endDate) ? 'text-[var(--kujang-green)]' : 'text-gray-600'
                  }`}>
                    ⋮
                  </button>
                  <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-28 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <button
                      onClick={() => handleEdit(a)}
                      className="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handlePin(a.id)}
                      className="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                    >
                      {a.isPinned ? '📌 Unpin' : '📌 Pin'}
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="w-full px-2 py-1 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-1"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-2">
              <h3 className={`text-sm font-bold mb-1.5 ${
                a.isPinned ? 'text-yellow-900' : 
                isAnnouncementActive(a.endDate) ? 'text-[var(--kujang-green)]' : 'text-gray-600'
              }`}>
                {a.title}
              </h3>
              <div className="flex gap-1.5 mb-1.5 flex-wrap">
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  a.isPinned 
                    ? 'bg-yellow-200 text-yellow-800' 
                    : isAnnouncementActive(a.endDate)
                      ? 'bg-[var(--kujang-green)]/20 text-[var(--kujang-green)]'
                      : 'bg-gray-200 text-gray-600'
                }`}>
                   {a.department}
                </span>
                <span className="text-xs bg-blue-500/20 px-1.5 py-0.5 rounded-full text-blue-600 font-medium">
                  👥 {a.recipient}
                </span>
              </div>
              <p className={`leading-relaxed text-xs ${
                a.isPinned ? 'text-yellow-800' : 
                isAnnouncementActive(a.endDate) ? 'text-[var(--kujang-green)]/90' : 'text-gray-600'
              }`}>
                {a.message}
              </p>
              
              {/* Documents Section */}
              {a.documents && a.documents.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs font-semibold mb-1.5 text-gray-700">📎 Dokumen Terlampir:</div>
                  <div className="grid gap-1">
                    {a.documents.map((doc, docIndex) => (
                      <div
                        key={docIndex}
                        className="flex items-center gap-1.5 p-1.5 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors cursor-pointer group"
                        onClick={() => window.open(doc.url, '_blank')}
                      >
                        <span className="text-xs">{getFileIcon(doc.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-900 truncate group-hover:text-blue-600">
                            {doc.name}
                          </div>
                          <div className="text-xs text-gray-500">{doc.size}</div>
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-blue-500 font-medium">
                          📥
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer dengan views */}
            <div className="flex justify-end pt-1.5 border-t border-gray-100">
              <div className={`flex items-center gap-1 text-xs ${
                a.isPinned ? 'text-yellow-700' : 
                isAnnouncementActive(a.endDate) ? 'text-[var(--kujang-green)]/70' : 'text-gray-500'
              }`}>
                <span>👁</span>
                <span>{getViewCount(index, a.title)} views</span>
              </div>
            </div>
          </Card>
        ))}
        
        {list.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <div className="text-4xl mb-4">
              {type === "active" ? "⏰" : type === "latest" ? "📅" : "📭"}
            </div>
            <p className="text-sm">
              {type === "active" ? "Tidak ada pengumuman aktif" : 
               type === "latest" ? "Tidak ada pengumuman terbaru" : 
               "Belum ada pengumuman"}
            </p>
            <p className="text-xs text-gray-400">
              {type === "active" ? "Semua pengumuman sudah kedaluwarsa" : 
               type === "latest" ? "Belum ada pengumuman dalam 7 hari terakhir" : 
               "Buat pengumuman pertama dari panel admin"}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-6 p-6 max-w-7xl mx-auto h-screen">
        {/* Form Pengumuman Admin - Compact, no scroll */}
        <div className="w-[380px] flex-shrink-0 bg-white shadow-lg rounded-xl h-[calc(100vh-48px)] flex flex-col">
          <div className="p-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--kujang-green)] rounded-full flex items-center justify-center text-white font-semibold text-xs">
                📢
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">
                  {isEditing ? 'Ubah Pengumuman' : 'Buat Pengumuman'}
                </h1>
                <p className="text-xs text-gray-600">Admin - Sistem Pengumuman</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-hidden">
            <div className="space-y-3 h-full flex flex-col">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Judul Pengumuman</label>
                <Input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  placeholder="Masukkan judul pengumuman"
                  className="h-8 text-xs border focus:border-[var(--kujang-green)]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 block">Target Penerima</label>
                  <Select value={form.recipient} onValueChange={(value) => handleSelectChange("recipient", value)} required>
                    <SelectTrigger className="h-8 text-xs border focus:border-[var(--kujang-green)] bg-white w-full">
                      <SelectValue placeholder="Pilih target penerima" />
                    </SelectTrigger>
                    <SelectContent>
                      {recipients.map((recipient) => (
                        <SelectItem key={recipient} value={recipient}>
                          <span className="text-xs">{recipient}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 block">Departemen Tujuan</label>
                  <Select value={form.department} onValueChange={(value) => handleSelectChange("department", value)} required>
                    <SelectTrigger className="h-8 text-xs border focus:border-[var(--kujang-green)] bg-white w-full">
                      <SelectValue placeholder="Pilih departemen tujuan" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          <span className="text-xs">{department}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">Isi Pengumuman</label>
                <Textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange}
                  placeholder="Tulis isi pengumuman yang akan disebarkan..."
                  rows={3}
                  className="text-xs resize-none border focus:border-[var(--kujang-green)]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 block">Tanggal Mulai</label>
                  <Input 
                    type="date" 
                    name="date" 
                    value={form.date} 
                    onChange={handleChange}
                    className="h-8 text-xs border focus:border-[var(--kujang-green)]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 block">Berlaku Sampai</label>
                  <Input 
                    type="date" 
                    name="endDate" 
                    value={form.endDate} 
                    onChange={handleChange}
                    className="h-8 text-xs border focus:border-[var(--kujang-green)]"
                    required
                  />
                </div>
              </div>

              {/* File Upload Section - Compact */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">📎 Lampiran (Opsional)</label>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                  className="h-8 text-xs file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[var(--kujang-green)] file:text-white hover:file:bg-[var(--kujang-green)]/90 border"
                />
                
                {/* Uploaded Files Preview - Compact */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">📎 {uploadedFiles.length} file dipilih</div>
                    <div className="space-y-1 max-h-16 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-1 bg-gray-50 rounded text-xs">
                          <span>{getFileIcon(file.type)}</span>
                          <div className="flex-1 min-w-0 truncate">{file.name}</div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 w-4 h-4 flex items-center justify-center rounded hover:bg-red-50"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2 flex-shrink-0">
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 h-8 bg-[var(--kujang-green)] hover:bg-[var(--kujang-green)]/90 text-white font-semibold text-xs rounded-lg"
                >
                  {isEditing ? '✏️ Update' : '📢 Kirim'}
                </Button>
                {isEditing && (
                  <Button 
                    variant="outline" 
                    className="h-8 px-3 font-medium rounded-lg border text-xs" 
                    onClick={cancelEdit}
                  >
                    Batal
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Pengumuman - Fixed height with proper scrolling */}
        <div className="flex-1 bg-white shadow-lg rounded-xl h-[calc(100vh-48px)] flex flex-col">
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <Tabs value={filter} onValueChange={setFilter} className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  📋 Daftar Pengumuman
                  {/* Indicator berdasarkan filter URL */}
                  {filter === 'active' && (
                    <span className="text-sm bg-green-100 px-2 py-1 rounded-full text-green-700 font-medium">
                      ✅ Aktif
                    </span>
                  )}
                  {filter === 'latest' && (
                    <span className="text-sm bg-blue-100 px-2 py-1 rounded-full text-blue-700 font-medium">
                      🆕 Terbaru
                    </span>
                  )}
                </h2>
                <TabsList className="bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger value="all" className="px-4 py-2 rounded-lg text-sm">Semua</TabsTrigger>
                  <TabsTrigger value="latest" className="px-4 py-2 rounded-lg text-sm">Terbaru</TabsTrigger>
                  <TabsTrigger value="active" className="px-4 py-2 rounded-lg text-sm">Aktif</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          <div className="flex-1 p-6 pt-4">
            <Tabs value={filter} className="w-full h-full">
              <TabsContent value="all" className="h-full mt-0">
                <AnnouncementList type="all" />
              </TabsContent>

              <TabsContent value="latest" className="h-full mt-0">
                <AnnouncementList type="latest" />
              </TabsContent>

              <TabsContent value="active" className="h-full mt-0">
                <AnnouncementList type="active" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}