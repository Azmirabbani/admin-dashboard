"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Message = {
  sender: string
  content: string
  timestamp: string
  fromAdmin?: boolean
}

type Group = {
  id: string
  name: string
  members: string[]
  messages: Message[]
}

const allEmployees = ["Pak Abdul", "Bu Widiya", "Pak Rehan", "Pak Joni", "Pak Andi"]

export default function GroupChatPage() {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "operasional",
      name: "Operasional Lapangan",
      members: ["Pak Abdul", "Bu Widiya"],
      messages: [
        { sender: "Pak Abdul", content: "Selamat pagi, rapat persiapan simulasi akan dimulai pukul 09.00 WIB.", timestamp: "08:30", fromAdmin: true },
        { sender: "Bu Widiya", content: "Baik pak, kami sudah siap di lokasi.", timestamp: "08:35" },
      ],
    },
    {
      id: "keuangan",
      name: "Divisi Keuangan",
      members: ["Pak Rehan", "Pak Joni"],
      messages: [
        { sender: "Pak Rehan", content: "Mohon laporan pengeluaran bulan Juni dikirimkan hari ini.", timestamp: "08:00", fromAdmin: true },
      ],
    },
  ])

  const [selectedGroup, setSelectedGroup] = useState<Group>(groups[0])
  const [messageInput, setMessageInput] = useState("")
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const toggleMember = (name: string) => {
    setSelectedMembers(prev =>
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    )
  }

  const handleCreateGroup = () => {
    if (newGroupName.trim() === "" || selectedMembers.length === 0) return
    
    const newGroup: Group = {
      id: crypto.randomUUID(),
      name: newGroupName.trim(),
      members: selectedMembers,
      messages: [],
    }
    const updatedGroups = [...groups, newGroup]
    setGroups(updatedGroups)
    setSelectedGroup(newGroup)
    setShowCreateGroupModal(false)
    setNewGroupName("")
    setSelectedMembers([])
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] border rounded-xl overflow-hidden bg-white">

      {/* Sidebar */}
      <div className="w-[300px] bg-muted p-4 border-r flex flex-col flex-shrink-0">
        <h2 className="font-semibold text-lg mb-4">Group Chats</h2>

        <Button onClick={() => setShowCreateGroupModal(true)} className="mb-4 w-full">
          + Tambah Grup
        </Button>

        <ScrollArea className="flex-1">
          <div className="space-y-0">
            {groups.map((group) => (
              <div
                key={group.id}
                className={cn(
                  "flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0",
                  selectedGroup.id === group.id
                    ? "bg-[#e6f7ef]"
                    : ""
                )}
                onClick={() => setSelectedGroup(group)}
              >
                {/* Avatar/Icon */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-semibold text-gray-600">
                    {group.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm truncate pr-2">{group.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {group.messages[group.messages.length - 1]?.timestamp || ""}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {group.messages[group.messages.length - 1]?.content || "Belum ada pesan"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Panel - Mengisi sisa ruang */}
      <div className="flex-1 flex flex-col w-220">
        <div className="border-b px-6 py-4 bg-muted font-medium">
          <h2 className="text-lg font-semibold">{selectedGroup.name}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedGroup.members.length} anggota: {selectedGroup.members.join(", ")}
          </p>
        </div>
        <ScrollArea className="flex-1 px-6 py-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {selectedGroup.messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex mb-4",
                  msg.fromAdmin ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className="max-w-[70%] p-3 rounded-lg shadow-sm break-words text-white"
                  style={{ backgroundColor: "var(--kujang-green)" }}
                >
                  <p className="text-sm font-semibold">{msg.sender}</p>
                  <p>{msg.content}</p>
                  <p className="text-xs font-semibold text-white/80 text-right tracking-wider mt-1">
                    {msg.timestamp} WIB
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-6 border-t bg-white">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Input
              placeholder="Ketik pesan..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => setMessageInput("")} className="px-6">
              Kirim
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
            <h2 className="font-bold text-lg">Buat Grup Baru</h2>
            <Input
              placeholder="Nama Grup"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <div className="max-h-[200px] overflow-y-auto border rounded p-2 space-y-1">
              {allEmployees.map((emp) => (
                <label key={emp} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(emp)}
                    onChange={() => toggleMember(emp)}
                  />
                  {emp}
                </label>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowCreateGroupModal(false)}>
                Batal
              </Button>
              <Button
                onClick={handleCreateGroup}
                disabled={newGroupName.trim() === "" || selectedMembers.length === 0}
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}