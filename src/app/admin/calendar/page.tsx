"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, Plus, X } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: Date;
  color: string;
  time?: string;
  location?: string;
  attendees?: number;
  category: 'meeting' | 'training' | 'audit' | 'workshop' | 'social';
};

const initialEvents: Event[] = [
  { 
    id: '1',
    title: "Rapat Divisi Produksi", 
    date: new Date(2025, 6, 17), 
    color: "from-blue-500 to-blue-600", 
    time: "08:00",
    location: "Ruang Meeting A",
    attendees: 12,
    category: 'meeting'
  },
  { 
    id: '2',
    title: "Audit Internal ISO", 
    date: new Date(2025, 6, 18), 
    color: "from-red-500 to-red-600", 
    time: "09:00",
    location: "Gedung Utama",
    attendees: 8,
    category: 'audit'
  },
  { 
    id: '3',
    title: "Kunjungan Mitra Industri", 
    date: new Date(2025, 6, 20), 
    color: "from-emerald-500 to-emerald-600", 
    time: "10:00",
    location: "Lobby Utama",
    attendees: 25,
    category: 'social'
  },
  { 
    id: '4',
    title: "Pelatihan K3", 
    date: new Date(2025, 6, 22), 
    color: "from-purple-500 to-purple-600", 
    time: "13:00",
    location: "Ruang Training",
    attendees: 30,
    category: 'training'
  },
  { 
    id: '5',
    title: "Workshop Digitalisasi", 
    date: new Date(2025, 6, 24), 
    color: "from-amber-500 to-amber-600", 
    time: "09:30",
    location: "Lab Komputer",
    attendees: 20,
    category: 'workshop'
  },
  { 
    id: '6',
    title: "Sosialisasi SOP Baru", 
    date: new Date(2025, 6, 25), 
    color: "from-indigo-500 to-indigo-600", 
    time: "15:00",
    location: "Aula Besar",
    attendees: 50,
    category: 'meeting'
  },
  { 
    id: '7',
    title: "Rapat Evaluasi Bulanan", 
    date: new Date(2025, 6, 29), 
    color: "from-pink-500 to-pink-600", 
    time: "14:00",
    location: "Ruang Direksi",
    attendees: 15,
    category: 'meeting'
  },
];

const daysOfWeek = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const categoryIcons = {
  meeting: Users,
  training: Calendar,
  audit: Clock,
  workshop: MapPin,
  social: Users
};

const categoryColors = {
  meeting: "from-blue-500 to-blue-600",
  training: "from-purple-500 to-purple-600", 
  audit: "from-red-500 to-red-600",
  workshop: "from-amber-500 to-amber-600",
  social: "from-emerald-500 to-emerald-600"
};

export default function ModernCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 24));
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [clickedDate, setClickedDate] = useState<Date | null>(null); // New state for clicked date
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    location: '',
    category: ''
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, 0).getDate() - startingDayOfWeek + i + 1;
      days.push(new Date(year, month - 1, prevMonthDay));
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    const totalCells = 42;
    let nextMonthDay = 1;
    while (days.length < totalCells) {
      days.push(new Date(year, month + 1, nextMonthDay));
      nextMonthDay++;
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
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
    // Disabled today highlighting
    return false;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // New function to check if date is clicked/selected
  const isClickedDate = (date: Date) => {
    if (!clickedDate) return false;
    return date.getDate() === clickedDate.getDate() &&
           date.getMonth() === clickedDate.getMonth() &&
           date.getFullYear() === clickedDate.getFullYear();
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title.trim()) return;
    
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      color: categoryColors['meeting'], // Default color
      time: newEvent.time,
      location: newEvent.location,
      attendees: 0,
      category: 'meeting'
    };
    
    setEvents([...events, event]);
    setShowAddModal(false);
    setSelectedDate(null);
    setNewEvent({
      title: '',
      time: '',
      location: '',
      category: ''
    });
  };

  const handleDateClick = (date: Date) => {
    if (isCurrentMonth(date)) {
      setClickedDate(date); // Only set clicked date for highlighting
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --kujang-green: #009a44;
          --kujang-green-bg: #e6f7ef;
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.5);
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}</style>
      
      <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-white/80 backdrop-blur-md border-b border-white/20 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-3 hover:bg-white/60 rounded-xl transition-all duration-200 hover:scale-105 border border-white/30"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
                  <span className="text-lg font-semibold text-slate-800">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                </div>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-3 hover:bg-white/60 rounded-xl transition-all duration-200 hover:scale-105 border border-white/30"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scroll" style={{ maxHeight: 'calc(100vh - 96px)', paddingBottom: '1rem' }}>
          <div className="max-w-7xl mx-auto p-6 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-full">
              {/* Calendar */}
              <div className="lg:col-span-3">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-6 shadow-xl">
                  {/* Days Header */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center py-3">
                        <span className="text-sm font-semibold text-slate-600">{day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentDate).map((date, index) => {
                      const dayEvents = getEventsForDate(date);
                      const today = isToday(date);
                      const currentMonth = isCurrentMonth(date);
                      const clicked = isClickedDate(date);

                      return (
                        <div 
                          key={index} 
                          onClick={() => handleDateClick(date)}
                          className={`h-28 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer relative group ${
                            clicked && currentMonth
                              ? 'text-white shadow-lg ring-2 ring-green-500 ring-opacity-50' 
                              : currentMonth 
                                ? 'bg-white/50 hover:bg-white/70 border border-white/40' 
                                : 'bg-slate-100/30 text-slate-400'
                          }`}
                          style={clicked && currentMonth ? {
                            backgroundColor: 'var(--kujang-green)'
                          } : {}}
                        >
                          <div className={`text-sm font-semibold mb-2 ${
                            clicked && currentMonth ? 'text-white'
                            : currentMonth ? 'text-slate-800' 
                            : 'text-slate-400'
                          }`}>
                            {date.getDate()}
                          </div>
                          
                          {/* Add button for current month dates */}
                          {currentMonth && !clicked && (
                            <div 
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDate(date);
                                setShowAddModal(true);
                              }}
                            >
                              <Plus className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
                            </div>
                          )}
                          
                          {/* Add button for clicked dates */}
                          {clicked && currentMonth && (
                            <div 
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDate(date);
                                setShowAddModal(true);
                              }}
                            >
                              <Plus className="w-3 h-3 text-white hover:text-gray-200 cursor-pointer" />
                            </div>
                          )}
                          
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => {
                              const IconComponent = categoryIcons[event.category];
                              return (
                                <div
                                  key={eventIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                  }}
                                  className={`cursor-pointer text-xs px-2 py-1 rounded-md bg-gradient-to-r ${event.color} text-white shadow-sm hover:shadow-md transition-all duration-200`}
                                >
                                  <div className="flex items-center space-x-1">
                                    <IconComponent className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate font-medium">
                                      {event.title.length > 6 ? event.title.substring(0, 6) + '...' : event.title}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                            {dayEvents.length > 2 && (
                              <div className={`text-xs font-medium ${
                                (clicked && currentMonth) ? 'text-white/80' : 'text-slate-500'
                              }`}>
                                +{dayEvents.length - 2} lagi
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Add Event Button */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-4 shadow-xl">
                  <button
                    onClick={() => {
                      setSelectedDate(clickedDate || new Date());
                      setShowAddModal(true);
                    }}
                    className="w-full flex items-center justify-center space-x-2 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--kujang-green)' }}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Tambah Kegiatan</span>
                  </button>
                </div>

                {/* Selected Date Info */}
                {clickedDate && (
                  <div className="rounded-2xl border border-white/30 p-4 shadow-xl" style={{ backgroundColor: 'var(--kujang-green-bg)' }}>
                    <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--kujang-green)' }}>
                      Tanggal Terpilih
                    </h3>
                    <p className="text-sm text-slate-700">{formatDate(clickedDate)}</p>
                    <div className="mt-2">
                      <span className="text-xs text-slate-600">
                        {getEventsForDate(clickedDate).length} kegiatan
                      </span>
                    </div>
                  </div>
                )}

                {/* Events */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Event Mendatang
                  </h3>
                  <div className="space-y-3">
                    {events.slice(0, 4).map((event, index) => {
                      const IconComponent = categoryIcons[event.category];
                      return (
                        <div 
                          key={index} 
                          onClick={() => setSelectedEvent(event)}
                          className="group cursor-pointer p-3 rounded-xl bg-white/50 hover:bg-white/80 border border-white/40 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-3 h-3 rounded-full mt-2 bg-gradient-to-r ${event.color} shadow-sm flex-shrink-0`}></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <IconComponent className="w-4 h-4 text-slate-600 flex-shrink-0" />
                                <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 truncate">
                                  {event.title}
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 flex items-center space-x-3">
                                <span>{event.time}</span>
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                {formatDate(event.date)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Statistik Bulan Ini</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Total Event</span>
                      <span className="font-bold text-slate-800">{events.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Rapat</span>
                      <span className="font-bold text-blue-600">{events.filter(e => e.category === 'meeting').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Pelatihan</span>
                      <span className="font-bold text-purple-600">{events.filter(e => e.category === 'training').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Workshop</span>
                      <span className="font-bold text-amber-600">{events.filter(e => e.category === 'workshop').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">Tambah Kegiatan Baru</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Judul Kegiatan</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ 
                      '--tw-ring-color': 'var(--kujang-green)',
                      '--tw-ring-opacity': '0.5'
                    } as any}
                    placeholder="Masukkan judul kegiatan"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Waktu</label>
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ 
                        '--tw-ring-color': 'var(--kujang-green)',
                        '--tw-ring-opacity': '0.5'
                      } as any}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                    <input
                      type="text"
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ 
                        '--tw-ring-color': 'var(--kujang-green)',
                        '--tw-ring-opacity': '0.5'
                      } as any}
                      placeholder="Rapat, Pelatihan, dll"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ 
                      '--tw-ring-color': 'var(--kujang-green)',
                      '--tw-ring-opacity': '0.5'
                    } as any}
                    placeholder="Masukkan lokasi"
                  />
                </div>
                
                {selectedDate && (
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--kujang-green-bg)' }}>
                    <span className="text-sm text-slate-600">Tanggal: </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--kujang-green)' }}>{formatDate(selectedDate)}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={handleAddEvent}
                  className="flex-1 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: 'var(--kujang-green)' }}
                >
                  Simpan Kegiatan
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all duration-200"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">{selectedEvent.title}</h3>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <span className="text-slate-700">{selectedEvent.time} - {formatDate(selectedEvent.date)}</span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-slate-600" />
                    <span className="text-slate-700">{selectedEvent.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-slate-600" />
                  <span className="text-slate-700">{selectedEvent.attendees} peserta</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-3">
                <button 
                  className="flex-1 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: 'var(--kujang-green)' }}
                >
                  Edit Event
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-all duration-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}