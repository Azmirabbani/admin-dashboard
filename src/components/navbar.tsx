"use client";

import PupukLogo from "@/components/icons/PupukLogo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow flex justify-between items-center px-6 z-50">
      {/* KIRI: Logo Pupuk Kujang */}
      <div className="flex items-center space-x-3">
        <PupukLogo className="w-8 h-8" />
        <span className="font-semibold text-gray-700 text-lg">PUPUK KUJANG</span>
      </div>

      {/* KANAN: Profil Admin */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-600">Hi, Admin</span>
        <img
          src="/onana.jpeg"
          alt="Profile"
          className="w-9 h-9 rounded-full border"
        />
      </div>
    </nav>
  );
}
