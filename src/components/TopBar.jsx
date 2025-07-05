import { useEffect, useState, useRef } from "react";
import { useStore } from "../store/useStore";
import {
  Wifi,
  BatteryFull,
  Volume2,
  Bluetooth,
  Sun,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

const TopBar = () => {
  const setActivitiesMode = useStore((s) => s.setActivitiesMode);
  const windows = useStore((s) => s.windows);
  const openApp = useStore((s) => s.openApp);

  const [showSystemDropdown, setShowSystemDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const systemRef = useRef(null);
  const calendarRef = useRef(null);

  const [volume, setVolume] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const focusedWindow = [...windows]
    .filter((w) => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];
  const title = focusedWindow?.title || "";

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !systemRef.current?.contains(e.target) &&
        !calendarRef.current?.contains(e.target) &&
        !e.target.closest(".calendar-toggle")
      ) {
        setShowSystemDropdown(false);
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.querySelectorAll("audio, video").forEach((el) => {
      el.volume = volume / 100;
    });
  }, [volume]);

  const timeString = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateString = currentTime.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  };

  const isSelected = (day) => selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear();

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const cells = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push(
        <button key={`prev-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors text-sm rounded-lg hover:bg-gray-800/30" disabled>
          {prevMonth - i}
        </button>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const selected = isSelected(day);
      const today = isToday(day);
      cells.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200 relative group ${
            selected
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : today
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
          }`}
        >
          {day}
          {today && !selected && (
            <div className="absolute inset-0 bg-purple-500/10 rounded-lg animate-pulse"></div>
          )}
        </button>
      );
    }

    const total = firstDay + daysInMonth;
    const remaining = Math.ceil(total / 7) * 7 - total;

    for (let day = 1; day <= remaining; day++) {
      cells.push(
        <button key={`next-${day}`} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors text-sm rounded-lg hover:bg-gray-800/30" disabled>
          {day}
        </button>
      );
    }

    return cells;
  };

  const handleSettingsClick = () => {
    alert("⚡ Accessing AetherOS Terminal...\nSystem Integrity Compromised.");
    openApp("EdexUI");
  };

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundColor: `rgba(0,0,0,${(100 - brightness) / 100})`, zIndex: 9998 }} />

      <div className="w-full h-8 bg-[#0f0f0f] text-white flex items-center justify-between px-4 fixed top-0 z-[9999] font-ubuntu text-sm border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button onClick={setActivitiesMode} className="hover:bg-[#80808069] px-2 py-[1px] rounded-[999px]">Activities</button>
          {title && (
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-xs">⛶</span>
              <span>{title}</span>
            </div>
          )}
        </div>

        <div className="calendar-toggle absolute left-1/2 -translate-x-1/2 text-white hover:bg-[#80808069] px-2 py-[1px] rounded-[999px] cursor-pointer" onClick={() => setShowCalendar((prev) => !prev)}>
          {dateString} • {timeString}
        </div>

        <div ref={systemRef} className="relative">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-[#80808069] py-[2px] px-2 rounded-[999px]" onClick={() => setShowSystemDropdown((v) => !v)}>
            <Wifi size={16} />
            <Bluetooth size={16} />
            <Volume2 size={16} />
            <BatteryFull size={16} />
          </div>

          {showSystemDropdown && (
            <div className="absolute bg-black right-0 mt-2 w-72  backdrop-blur-sm rounded-3xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-300"></div>
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="flex justify-between items-center mb-1">
                    <span className="text-xs">Volume</span>
                    <Volume2 size={14} />
                  </label>
                  <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-blue-500 h-1 rounded-full" />
                </div>
                <div>
                  <label className="flex justify-between items-center mb-1">
                    <span className="text-xs">Brightness</span>
                    <Sun size={14} />
                  </label>
                  <input type="range" min={0} max={100} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full accent-yellow-400 h-1 rounded-full" />
                </div>
                <hr className="border-gray-600" />
                <div className="space-y-2">
                  <a href="#" className="flex items-center justify-between hover:text-blue-400 transition">
                    <span className="flex items-center gap-2"><i className="ri-github-fill"></i> GitHub</span>
                    <span>{">"}</span>
                  </a>
                  <a href="#" className="flex items-center justify-between hover:text-pink-400 transition">
                    <span className="flex items-center gap-2"><i className="ri-instagram-fill"></i> Instagram</span>
                    <span>{">"}</span>
                  </a>
                  <a href="#" className="flex items-center justify-between hover:text-sky-400 transition">
                    <span className="flex items-center gap-2"><i className="ri-linkedin-box-fill"></i> LinkedIn</span>
                    <span>{">"}</span>
                  </a>
                </div>
                <hr className="border-gray-600" />
                <button onClick={handleSettingsClick} className="w-full flex items-center gap-2 px-3 py-1.5 rounded bg-[#0f0f0f] hover:bg-[#1f1f1f] transition text-left">
                  <i className="ri-settings-3-fill"></i>
                  <span>System Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCalendar && (
        <div ref={calendarRef} className="absolute bg-black rounded-[24px] top-10 left-1/2 -translate-x-1/2 z-[9999]">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white text-lg font-medium">Calendar</h3>
              </div>
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h4 className="text-white font-medium text-lg">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/30 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day, index) => (
                  <div key={`${day}-${index}`} className="w-10 h-8 flex items-center justify-center text-gray-400 text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>
              <div className="mt-6 p-4 bg-gray-800/30 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">Selected Date</div>
                <div className="text-white font-medium">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-purple-500/30"
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedDate(new Date())}
                  className="flex-1 bg-gray-800/30 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                >
                  Select Today
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
