// "use client";

// import { useState } from "react";
// import { User, Lock, Bell, Palette, Shield, Save, Eye, EyeOff, Camera } from "lucide-react";

// export default function AdminSettings() {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [settings, setSettings] = useState({
//     // Profile settings
//     name: 'Admin User',
//     email: 'admin@company.com',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
    
//     // Notification settings
//     emailNotifications: true,
//     pushNotifications: false,
//     reportNotifications: true,
    
//     // Appearance settings
//     darkMode: false,
//     language: 'id',
//     timezone: 'Asia/Jakarta',
    
//     // Security settings
//     twoFactorAuth: false,
//     sessionTimeout: 30,
//     loginAttempts: 3
//   });

//   const handleInputChange = (field: string, value: any) => {
//     setSettings(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSave = () => {
//     alert('Pengaturan berhasil disimpan!');
//   };

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'security', label: 'Keamanan', icon: Shield },
//     { id: 'notifications', label: 'Notifikasi', icon: Bell },
//     { id: 'appearance', label: 'Tampilan', icon: Palette }
//   ];

//   return (
//     <>
//       <style jsx global>{`
//         :root {
//           --kujang-green: #009a44;
//           --kujang-green-bg: #e6f7ef;
//         }
//       `}</style>
      
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-slate-800 mb-2">Pengaturan Admin</h1>
//             <p className="text-slate-600">Kelola pengaturan akun dan sistem Anda</p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Sidebar Tabs */}
//             <div className="lg:col-span-1">
//               <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-4 shadow-xl">
//                 <div className="space-y-2">
//                   {tabs.map((tab) => {
//                     const IconComponent = tab.icon;
//                     return (
//                       <button
//                         key={tab.id}
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//                           activeTab === tab.id
//                             ? 'text-white shadow-lg'
//                             : 'text-slate-600 hover:bg-white/50'
//                         }`}
//                         style={activeTab === tab.id ? { backgroundColor: 'var(--kujang-green)' } : {}}
//                       >
//                         <IconComponent className="w-5 h-5" />
//                         <span className="font-medium">{tab.label}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="lg:col-span-3">
//               <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30 p-8 shadow-xl">
                
//                 {/* Profile Tab */}
//                 {activeTab === 'profile' && (
//                   <div className="space-y-6">
//                     <div className="flex items-center space-x-4 mb-8">
//                       <User className="w-8 h-8" style={{ color: 'var(--kujang-green)' }} />
//                       <h2 className="text-2xl font-bold text-slate-800">Profil Admin</h2>
//                     </div>

//                     {/* Profile Picture */}
//                     <div className="flex items-center space-x-6 mb-8">
//                       <div className="relative">
//                         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
//                           AU
//                         </div>
//                         <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
//                           <Camera className="w-4 h-4 text-slate-600" />
//                         </button>
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-slate-800">Foto Profil</h3>
//                         <p className="text-sm text-slate-600">Klik ikon kamera untuk mengganti foto</p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
//                         <input
//                           type="text"
//                           value={settings.name}
//                           onChange={(e) => handleInputChange('name', e.target.value)}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                           style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
//                         <input
//                           type="email"
//                           value={settings.email}
//                           onChange={(e) => handleInputChange('email', e.target.value)}
//                           className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                           style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                         />
//                       </div>
//                     </div>

//                     <div className="border-t border-slate-200 pt-6">
//                       <h3 className="text-lg font-semibold text-slate-800 mb-4">Ganti Password</h3>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">Password Saat Ini</label>
//                           <div className="relative">
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               value={settings.currentPassword}
//                               onChange={(e) => handleInputChange('currentPassword', e.target.value)}
//                               className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                               style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                             >
//                               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                             </button>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-2">Password Baru</label>
//                             <div className="relative">
//                               <input
//                                 type={showNewPassword ? "text" : "password"}
//                                 value={settings.newPassword}
//                                 onChange={(e) => handleInputChange('newPassword', e.target.value)}
//                                 className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                                 style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => setShowNewPassword(!showNewPassword)}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                               >
//                                 {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                               </button>
//                             </div>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-2">Konfirmasi Password</label>
//                             <input
//                               type="password"
//                               value={settings.confirmPassword}
//                               onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                               className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                               style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Security Tab */}
//                 {activeTab === 'security' && (
//                   <div className="space-y-6">
//                     <div className="flex items-center space-x-4 mb-8">
//                       <Shield className="w-8 h-8" style={{ color: 'var(--kujang-green)' }} />
//                       <h2 className="text-2xl font-bold text-slate-800">Keamanan</h2>
//                     </div>

//                     <div className="space-y-6">
//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                         <div>
//                           <h3 className="font-semibold text-slate-800">Two-Factor Authentication</h3>
//                           <p className="text-sm text-slate-600">Tambahan keamanan untuk akun Anda</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={settings.twoFactorAuth}
//                             onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                         </label>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (menit)</label>
//                           <select
//                             value={settings.sessionTimeout}
//                             onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                             style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                           >
//                             <option value={15}>15 menit</option>
//                             <option value={30}>30 menit</option>
//                             <option value={60}>1 jam</option>
//                             <option value={120}>2 jam</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">Max Login Attempts</label>
//                           <select
//                             value={settings.loginAttempts}
//                             onChange={(e) => handleInputChange('loginAttempts', parseInt(e.target.value))}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                             style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                           >
//                             <option value={3}>3 kali</option>
//                             <option value={5}>5 kali</option>
//                             <option value={10}>10 kali</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Notifications Tab */}
//                 {activeTab === 'notifications' && (
//                   <div className="space-y-6">
//                     <div className="flex items-center space-x-4 mb-8">
//                       <Bell className="w-8 h-8" style={{ color: 'var(--kujang-green)' }} />
//                       <h2 className="text-2xl font-bold text-slate-800">Notifikasi</h2>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                         <div>
//                           <h3 className="font-semibold text-slate-800">Email Notifications</h3>
//                           <p className="text-sm text-slate-600">Terima notifikasi melalui email</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={settings.emailNotifications}
//                             onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                         </label>
//                       </div>

//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                         <div>
//                           <h3 className="font-semibold text-slate-800">Push Notifications</h3>
//                           <p className="text-sm text-slate-600">Notifikasi real-time di browser</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={settings.pushNotifications}
//                             onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                         </label>
//                       </div>

//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                         <div>
//                           <h3 className="font-semibold text-slate-800">Report Notifications</h3>
//                           <p className="text-sm text-slate-600">Notifikasi laporan harian/mingguan</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={settings.reportNotifications}
//                             onChange={(e) => handleInputChange('reportNotifications', e.target.checked)}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Appearance Tab */}
//                 {activeTab === 'appearance' && (
//                   <div className="space-y-6">
//                     <div className="flex items-center space-x-4 mb-8">
//                       <Palette className="w-8 h-8" style={{ color: 'var(--kujang-green)' }} />
//                       <h2 className="text-2xl font-bold text-slate-800">Tampilan</h2>
//                     </div>

//                     <div className="space-y-6">
//                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
//                         <div>
//                           <h3 className="font-semibold text-slate-800">Dark Mode</h3>
//                           <p className="text-sm text-slate-600">Gunakan tema gelap</p>
//                         </div>
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={settings.darkMode}
//                             onChange={(e) => handleInputChange('darkMode', e.target.checked)}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                         </label>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">Bahasa</label>
//                           <select
//                             value={settings.language}
//                             onChange={(e) => handleInputChange('language', e.target.value)}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                             style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                           >
//                             <option value="id">Bahasa Indonesia</option>
//                             <option value="en">English</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
//                           <select
//                             value={settings.timezone}
//                             onChange={(e) => handleInputChange('timezone', e.target.value)}
//                             className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
//                             style={{ '--tw-ring-color': 'var(--kujang-green)' } as any}
//                           >
//                             <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
//                             <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
//                             <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Save Button */}
//                 <div className="flex justify-end pt-8 border-t border-slate-200">
//                   <button
//                     onClick={handleSave}
//                     className="flex items-center space-x-2 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
//                     style={{ backgroundColor: 'var(--kujang-green)' }}
//                   >
//                     <Save className="w-5 h-5" />
//                     <span>Simpan Pengaturan</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }