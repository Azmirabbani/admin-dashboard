"use client"

import { ReactNode } from "react"
import Link from "next/link"

type DashboardCardProps = {
  title: string
  value: number | string
  icon?: ReactNode
  href?: string
}

export default function DashboardCard({ title, value, icon, href }: DashboardCardProps) {
  const content = (
    <div className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4 w-full bg-white border h-24" style={{ borderColor: "var(--kujang-green)" }}>
      <div className="flex items-center justify-center rounded-lg p-2 flex-shrink-0" style={{ backgroundColor: "var(--kujang-green-bg)" }}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <p 
          className="font-bold leading-tight" 
          style={{ 
            color: "var(--kujang-green)",
            fontSize: typeof value === 'number' ? '1.875rem' : '1.25rem' // 3xl untuk angka, xl untuk text
          }}
        >
          {value}
        </p>
      </div>
    </div>
  )

  return href ? <Link href={href}>{content}</Link> : content
}