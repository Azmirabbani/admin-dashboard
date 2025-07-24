"use client";

import { useState, useRef, useEffect } from "react";
import PupukLogo from "@/components/icons/PupukLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow flex justify-between items-center px-6 z-50">
      {/* KIRI: Logo Pupuk Kujang */}
      <div className="flex items-center space-x-3">
        <PupukLogo className="w-8 h-8" />
        <span className="font-semibold text-gray-700 text-lg">PUPUK KUJANG</span>
      </div>

   {/* KANAN: Profil Admin */}
<div className="relative" ref={menuRef}>
  <button
    className="flex items-center space-x-3 focus:outline-none hover:bg-gray-100 px-2 py-1 rounded transition"
    onClick={() => setOpen((v) => !v)}
  >
    <span className="text-sm font-medium text-gray-600">Hi, Admin</span>
    <img
      src="/onana.jpeg"
      alt="Profile"
      className="w-9 h-9 rounded-full border"
    />
    <svg
      className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  {open && (
    <div
      className="absolute right-0 mt-2 w-44 bg-white border border-[var(--kujang-green)] rounded-lg shadow-lg py-2 z-50 transition-all animate-fade-in"
      style={{ minWidth: 160 }}
    >
      <a
        href="/admin/edit-profile"
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-[var(--kujang-green-bg)] hover:text-[var(--kujang-green)] transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 15.232l2.768 2.768M16.5 10.5A6 6 0 1 1 4.5 10.5a6 6 0 0 1 12 0z" />
        </svg>
        Edit Profile
      </a>
      <div className="my-1 border-t border-gray-100" />
      <button
        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        onClick={() => {
          // Tambahkan logika logout di sini
          alert("Logout clicked");
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
        </svg>
        Log Out
      </button>
    </div>
  )}
</div>
    </nav>
  );
}