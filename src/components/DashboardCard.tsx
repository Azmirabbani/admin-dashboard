"use client"

import { ReactNode } from "react"
import Link from "next/link"

type DashboardCardProps = {
  title: string
  value: number | string
  icon?: ReactNode
  href?: string // <- Tambah ini
}

export default function DashboardCard({ title, value, icon, href }: DashboardCardProps) {
  const content = (
    <div className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4 w-full bg-white border" style={{ borderColor: "var(--kujang-green)" }}>
      <div className="flex items-center justify-center rounded-lg p-2" style={{ backgroundColor: "var(--kujang-green-bg)" }}>
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold leading-tight" style={{ color: "var(--kujang-green)" }}>
          {value}
        </p>
      </div>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}
