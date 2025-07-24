"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function EditProfilePage() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("Admin Pupuk Kujang");
  const [email, setEmail] = useState("admin@kujang.co.id");
  const [bio, setBio] = useState("Selalu siap melayani kebutuhan perusahaan dan tim.");
  const [photo, setPhoto] = useState("/onana.jpeg");
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhoto(url);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      {open ? (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border border-[var(--kujang-green-bg)] relative">
          <button
            className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <h1 className="text-2xl font-bold text-[var(--kujang-green)] mb-6 text-center">Edit Profile</h1>
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={photo}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[var(--kujang-green)] object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-[var(--kujang-green)] text-white rounded-full p-1 cursor-pointer shadow hover:bg-green-700 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
          </div>
          <form
            className="space-y-5"
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nama Lengkap</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                className="bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Bio</label>
              <Textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                className="bg-gray-50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[var(--kujang-green)] hover:bg-green-700 text-white font-semibold"
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center flex flex-col items-center">
          <svg className="w-12 h-12 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Profile telah diperbarui.</h2>
          <a
            href="/"
            className="mt-2 px-4 py-2 bg-[var(--kujang-green)] text-white rounded hover:bg-green-700 transition"
          >
            Kembali ke Dashboard
          </a>
        </div>
      )}
    </div>
  );
}