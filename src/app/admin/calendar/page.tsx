"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
  title: string;
  date: Date;
  color: string;
  time?: string;
};

const events: Event[] = [
  { title: "Rapat Divisi Produksi", date: new Date(2025, 6, 17), color: "bg-blue-500", time: "08:00" },
  { title: "Audit Internal ISO", date: new Date(2025, 6, 18), color: "bg-red-500", time: "09:00" },
  { title: "Kunjungan Mitra Industri", date: new Date(2025, 6, 20), color: "bg-green-500", time: "10:00" },
  { title: "Pelatihan K3", date: new Date(2025, 6, 22), color: "bg-purple-500", time: "13:00" },
  { title: "Workshop Digitalisasi", date: new Date(2025, 6, 24), color: "bg-yellow-500", time: "09:30" },
  { title: "Sosialisasi SOP Baru", date: new Date(2025, 6, 25), color: "bg-indigo-500", time: "15:00" },
  { title: "Rapat Evaluasi Bulanan", date: new Date(2025, 6, 29), color: "bg-pink-500", time: "14:00" },
];

const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 23)); // July 2025

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  // Pad the calendar to always show 6 rows (42 days total)
  const getCalendarDays = (date: Date) => {
    const days = getDaysInMonth(date);
    const totalCells = 42; // 6 rows × 7 days
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Add days from next month to fill remaining cells
    while (days.length < totalCells) {
      const nextMonthDay = days.length - days.findIndex(day => day !== null) + 1 - new Date(year, month + 1, 0).getDate();
      if (nextMonthDay > 0) {
        days.push(new Date(year, month + 1, nextMonthDay));
      } else {
        days.push(null);
      }
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date(); // Use actual current date
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Calendar */}
        <div className="col-span-2 bg-white rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">Kalender Kegiatan</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-lg font-medium text-gray-900 min-w-[140px] text-center">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-3">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1" style={{ minHeight: '576px' }}>
            {getCalendarDays(currentDate).map((date, index) => {
              if (!date) {
                return <div key={index} className="h-24 min-h-[96px]"></div>;
              }

              const dayEvents = getEventsForDate(date);
              const today = isToday(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();

              return (
                <div key={index} className={`h-24 border border-gray-200 p-2 bg-white hover:bg-gray-50 transition-colors min-h-[96px] ${
                  !isCurrentMonth ? 'text-gray-400' : ''
                }`}>
                  <div className={`text-sm font-medium mb-1 ${
                    today 
                      ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' 
                      : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`text-xs px-2 py-1 rounded text-white ${event.color} truncate`}
                        title={event.title}
                      >
                        {event.title.length > 10 ? event.title.substring(0, 10) + '...' : event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Next Events</h3>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full mt-1 ${event.color} flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 mb-1">{event.title}</div>
                  <div className="text-xs text-gray-500">
                    {formatDate(event.date)}, {event.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}