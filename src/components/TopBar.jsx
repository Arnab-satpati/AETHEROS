import { useEffect, useState, useRef } from "react";
import { useStore } from "../store/useStore";
import {
  Wifi,
  BatteryFull,
  Volume2,
  Bluetooth,
  Sun,
  CalendarDays,
} from "lucide-react";

const TopBar = () => {
  const setActivitiesMode = useStore((s) => s.setActivitiesMode);
  const windows = useStore((s) => s.windows);

  const [showSystemDropdown, setShowSystemDropdown] = useState(false);
  const systemRef = useRef(null);

  const [volume, setVolume] = useState(100);
  const [brightness, setBrightness] = useState(100);

  const focusedWindow = [...windows]
    .filter((w) => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const title = focusedWindow?.title || "";
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (systemRef.current && !systemRef.current.contains(e.target)) {
        setShowSystemDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Volume control
  useEffect(() => {
    const audios = document.querySelectorAll("audio, video");
    audios.forEach((el) => {
      el.volume = volume / 100;
    });
  }, [volume]);

  const timeString = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = currentTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const openApp = useStore((s) => s.openApp);
  const handleSettingsClick = () => {
    let variable = alert("⚡ Accessing AetherOS Terminal...\nSystem Integrity Compromised.");

      openApp("EdexUI");
    
  };

  return (
    <>
      {/* Brightness Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          backgroundColor: `rgba(0,0,0,${(100 - brightness) / 100})`,
          zIndex: 9998,
        }}
      />

      <div className="w-full h-8 bg-[#0f0f0f] text-white flex items-center justify-between px-4 fixed top-0 z-[9999] font-ubuntu text-sm border-b border-gray-800">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={setActivitiesMode}
            className="hover:bg-[#80808069] hover:text-white px-2 py-[1px] rounded-[999px] transition"
          >
            Activities
          </button>
          {title && (
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-xs">⛶</span>
              <span>{title}</span>
            </div>
          )}
        </div>

        {/* Center */}
        <div className="absolute left-1/2 -translate-x-1/2 text-white hover:bg-[#80808069] hover:text-white px-2 py-[1px] rounded-[999px] cursor-pointer">
          {dateString} • {timeString}
        </div>

        {/* Right */}
        <div ref={systemRef} className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-[#80808069] py-[2px] px-2 rounded-[999px]"
            onClick={() => setShowSystemDropdown((v) => !v)}
          >
            <Wifi size={16} />
            <Bluetooth size={16} />
            <Volume2 size={16} />
            <BatteryFull size={16} />
          </div>

          {showSystemDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-[#1a1a1a] text-white border border-gray-700 rounded-md shadow-lg p-4 z-50 text-sm space-y-4">
              {/* Volume */}
              <div>
                <label className="flex justify-between items-center mb-1">
                  <span className="text-xs">Volume</span>
                  <Volume2 size={14} />
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-blue-500 h-1 rounded-full [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-1"
                />
              </div>

              {/* Brightness */}
              <div>
                <label className="flex justify-between items-center mb-1">
                  <span className="text-xs">Brightness</span>
                  <Sun size={14} />
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-yellow-400 h-1 rounded-full [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-1"
                />
              </div>

              {/* Calendar */}
              <div>
                <label className="flex justify-between items-center mb-1">
                  <span className="text-xs">Calendar</span>
                  <CalendarDays size={14} />
                </label>
                <input
                  type="date"
                  className="w-full bg-[#2a2a2a] text-white p-1 rounded text-xs"
                />
              </div>

              <hr className="border-gray-600" />

              {/* Social */}
              <div className="space-y-2">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-blue-400 transition"
                >
                  <span className="flex items-center gap-2">
                    <i class="ri-github-fill" style={{ fontSize: "1rem" }}></i> GitHub
                  </span>
                  <span>{">"}</span>
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-blue-400 transition"
                >
                  <span className="flex items-center gap-2">
                    <i class="ri-linkedin-box-fill" style={{ fontSize: "1rem" }}></i> LinkedIn
                  </span>
                  <span>{">"}</span>
                </a>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-pink-400 transition"
                >
                  <span className="flex items-center gap-2">
                    <i class="ri-instagram-fill" style={{ fontSize: "1rem" }}></i> Instagram
                  </span>
                  <span>{">"}</span>
                </a>
              </div>

              <hr className="border-gray-600" />

              {/* Settings */}
              <button
                onClick={handleSettingsClick}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded bg-[#2a2a2a] hover:bg-[#333] transition text-left"
              >
                <i class="ri-settings-3-fill" style={{ fontSize: "1rem" }}></i>
                <span>System Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopBar;
