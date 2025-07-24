"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DailyData = {
  date: string;
  read: number;
  unread: number;
};

type FilterKey = "today" | "week" | "month";

type DataProps = {
  stats: Record<FilterKey, DailyData[]>;
};

const FILTERS = [
  { label: "Hari Ini", key: "today" },
  { label: "7 Hari", key: "week" },
  { label: "30 Hari", key: "month" },
] as const;

export default function AnnouncementChart({ stats }: DataProps) {
  const [filter, setFilter] = useState<FilterKey>("today");

  const data = stats[filter];

  return (
    <div
      className="bg-white rounded-lg shadow p-4 mt-6 w-full"
      style={{ border: "1px solid var(--kujang-green-bg)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Statistik Pembacaan Pengumuman</h2>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`px-3 py-1 rounded text-sm font-medium border ${
                filter === f.key
                  ? "bg-[var(--kujang-green)] text-white border-[var(--kujang-green)]"
                  : "bg-white text-[var(--kujang-green)] border-[var(--kujang-green)]"
              }`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--kujang-green-bg)" />
          <XAxis dataKey="date" stroke="var(--kujang-green)" />
          <YAxis allowDecimals={false} stroke="var(--kujang-green)" />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid var(--kujang-green)",
            }}
            cursor={{ fill: "var(--kujang-green-bg)" }}
          />
          <Bar
            dataKey="read"
            fill="var(--kujang-green)"
            name="Sudah Baca"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="unread"
            fill="#FFD700" // Kuning khas Pupuk Kujang, bisa ganti ke var(--kujang-yellow)
            name="Belum Baca"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}