import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import DashboardCard from "@/components/DashboardCard";
import AnnouncementChart from "@/components/AnnouncementChart";
import { IdCardLanyard, Megaphone, ScrollText, BarChart3 } from "lucide-react";

export default function Page() {
  const totalEmployees = 250;
  const alreadyRead = 145;
  const unread = totalEmployees - alreadyRead;

  const activeAnnouncements = 5;
  const latestAnnouncementTitle = "Rapat Koordinasi 22 Juli";

  const stats = {
    today: [{ date: "21 Jul", read: 145, unread: 105 }],
    week: [
      { date: "15 Jul", read: 20, unread: 10 },
      { date: "16 Jul", read: 25, unread: 8 },
      { date: "17 Jul", read: 30, unread: 5 },
      { date: "18 Jul", read: 40, unread: 3 },
      { date: "19 Jul", read: 50, unread: 5 },
      { date: "20 Jul", read: 60, unread: 4 },
      { date: "21 Jul", read: 70, unread: 2 },
    ],
    month: Array.from({ length: 30 }, (_, i) => ({
      date: `${i + 1} Jul`,
      read: Math.floor(Math.random() * 50),
      unread: Math.floor(Math.random() * 20),
    })),
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Summary Cards */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <DashboardCard
              title="Total Pegawai"
              value={totalEmployees}
              icon={<IdCardLanyard className="w-6 h-6 text-green-600" />}
            />
            <DashboardCard
              title="Pengumuman Aktif"
              value={activeAnnouncements}
              icon={<Megaphone className="w-6 h-6 text-green-600" />}
              href="/admin/announcement?filter=active"
            />
            <DashboardCard
              title="Pengumuman Terbaru"
              value={latestAnnouncementTitle}
              icon={<ScrollText className="w-6 h-6 text-green-600" />}
              href="/admin/announcement?filter=latest"
            />
          </div>

          {/* Chart Section */}
          <div className="flex items-center gap-2 mt-6">
            <BarChart3 className="w-5 h-5 text-[var(--kujang-green)]" />
            <h2 className="text-lg font-semibold text-[var(--kujang-green)]">
              Statistik Pembacaan Pengumuman
            </h2>
          </div>

          <div className="mt-2">
            <AnnouncementChart stats={stats} />
          </div>
        </div>
        
      </SidebarInset>
    </SidebarProvider>
  );
}