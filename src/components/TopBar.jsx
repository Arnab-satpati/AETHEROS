import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import {
  Wifi,
  BatteryFull,
  Volume2,
  Bluetooth,
} from "lucide-react";

const TopBar = () => {
  const setActivitiesMode = useStore((s) => s.setActivitiesMode);
  const windows = useStore((s) => s.windows);

  const focusedWindow = [...windows]
    .filter((w) => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const title = focusedWindow?.title || "";

  // 🕒 Track live time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every 1s

    return () => clearInterval(interval); // cleanup
  }, []);

  const timeString = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = currentTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full h-8 bg-[#0f0f0f] text-white flex items-center justify-between px-4 fixed top-0 z-[9999] font-ubuntu text-sm border-b border-gray-800">
      {/* Left - Activities + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={setActivitiesMode}
          className="hover:bg-gray-200 hover:text-black px-2 rounded transition"
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

      {/* Center - Date and Time */}
      <div className="absolute left-1/2 -translate-x-1/2 text-white hover:bg-gray-600 hover:text-white px-2 py-1 rounded cursor-pointer">
        {dateString} • {timeString}
      </div>

      {/* Right - System Icons */}
      <div className="flex items-center gap-3 text-white">
        <Wifi size={16} />
        <Bluetooth size={16} />
        <Volume2 size={16} />
        <BatteryFull size={16} />
      </div>
    </div>
  );
};

export default TopBar;
