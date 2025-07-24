"use client";

import * as React from "react";
import {
  Mail,
  Settings,
  HelpCircle,
  Users,
  Megaphone,
  LayoutDashboard,
  Calendar as CalendarIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// import PupukLogo from "@/components/icons/PupukLogo";

const data = {
  teams: [
  //   {
  //     name: "PUPUK KUJANG",
  //     logo: PupukLogo,
  //   },
  ],
  navMain: [
    { title: "Dashboard", url: "/", icon: LayoutDashboard, items: [] },
    { title: "Announcement", url: "/admin/announcement", icon: Megaphone, items: [] },
    { title: "Group Chat", url: "/admin/group-chat", icon: Users, items: [] },
    { title: "Kalender", url: "/admin/calendar", icon: CalendarIcon, items: [] }, // ← Kalender ditambahkan ke navMain
  ],
  footerNav: [
    { title: "Settings", url: "/", icon: Settings },
    { title: "Get Help", url: "/admin/help", icon: HelpCircle },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-[var(--kujang-green-bg)] text-black py-4"
      {...props}
    >
      <SidebarHeader>
       
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-2 px-2 pb-4">
          {data.footerNav.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className="flex items-center gap-2 text-sm text-black hover:font-semibold transition"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
