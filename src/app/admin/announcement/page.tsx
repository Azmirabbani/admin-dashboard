"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Announcement = {
  title: string
  recipient: string
  department: string
  message: string
  date: string
}

const recipients = [
  "Seluruh Officer",
  "Officer",
  "Vice President",
  "Senior Vice President",
  "Direksi",
]

const departments = [
  "Seluruh Departemen",
  "Teknologi Informasi",
  "Pemasaran",
  "Pengadaan",
  "Keuangan",
  "SDM",
]

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      title: "Rapat Akhir Bulan",
      recipient: "Seluruh Officer",
      department: "Seluruh Departemen",
      message: "Diharapkan seluruh officer hadir dalam rapat akhir bulan pada hari Jumat.",
      date: "21 Juli 2025",
    },
    {
      title: "Update Sistem IT",
      recipient: "Officer",
      department: "Teknologi Informasi",
      message: "Akan ada maintenance sistem pada hari Sabtu malam pukul 22.00 WIB.",
      date: "20 Juli 2025",
    },
  ])

  const [recipient, setRecipient] = useState("")
  const [department, setDepartment] = useState("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    if (!recipient || !department || !title || !message) {
      alert("Semua kolom wajib diisi.")
      return
    }

    const newAnnouncement: Announcement = {
      title,
      recipient,
      department,
      message,
      date: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }

    setAnnouncements([newAnnouncement, ...announcements])
    setRecipient("")
    setDepartment("")
    setTitle("")
    setMessage("")
  }

  return (
    <div className="min-h-screen flex gap-6 p-6 max-w-7xl mx-auto">
      {/* Form Pengumuman */}
      <div className="w-[400px] flex-shrink-0 border bg-muted p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Pengumuman</h1>

        <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
          <h2 className="font-semibold text-lg mb-4">Buat Pengumuman Baru</h2>

          <div className="space-y-4 flex-1">
            <div>
              <label className="font-medium text-sm">Penerima</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              >
                <option value="">Pilih Penerima</option>
                {recipients.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-medium text-sm">Departemen</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Pilih Departemen</option>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-medium text-sm">Judul</label>
              <Input
                placeholder="Judul Pengumuman"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="font-medium text-sm">Pesan</label>
              <Textarea
                placeholder="Isi pengumuman..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} className="mt-4 w-full">
            Kirim Pengumuman
          </Button>
        </div>
      </div>

      {/* Daftar Pengumuman */}
      <div className="flex-1 min-w-179 bg-white p-6 overflow-y-auto rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Daftar Pengumuman</h2>

        {announcements.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada pengumuman.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-4"
                style={{
                  backgroundColor: "var(--kujang-green-bg)",
                  border: "1px solid var(--kujang-green)",
                  color: "var(--kujang-green)",
                }}
              >
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-sm font-medium mb-2">
                  {item.recipient} - {item.department} - {item.date}
                </p>
                <p className="text-sm text-black">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
