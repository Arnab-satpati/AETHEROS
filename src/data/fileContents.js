// src/data/fileContents.js

import braveLogo from "../assets/icons/brave-logo.svg";
import folderIcon from "../assets/icons/folder.png";
import logoBrowse from "../assets/icons/logo_browse.png";
import sheryIcon from "../assets/icons/SheryIcon.png";
import terminalApp from "../assets/icons/terminal-app.png";
import userHome from "../assets/icons/user-home.png";
import wallpaper from "../assets/icons/wallpaper.jpg";

export const imageFiles = {
  "brave-logo.svg": braveLogo,
  "folder.png": folderIcon,
  "logo_browse.png": logoBrowse,
  "SheryIcon.png": sheryIcon,
  "terminal-app.png": terminalApp,
  "user-home.png": userHome,
  "wallpaper.jpg": wallpaper,
};

export const codeFiles = {
  "Browser.jsx": `// Browser component code\nconst Browser = () => {
  return (
    <iframe
      src="https://www.google.com/search?igu=1"
      title="Browser App"
      className="w-full h-full rounded-md border-none"
    />
  );
};

export default Browser;
\n`,
  "Cook.jsx": `// Cook component code\nconst Cook = () => {
  return (
    <iframe
      src="https://book-it-2min-guide.netlify.app/"
      title="Cook App"
      className="w-full h-full rounded-md border-none"
    />
  );
};

export default Cook;
\n`,
  "FileExplorer.jsx": `// FileExplorer logic lives here (you are here!)`,
  "Shery.jsx": `// Shery component code\nconst Shery = () => {
  return (
    <iframe
      src="https://sheryians.com/"
      title="Shery"
      className="w-full h-full rounded-md border-none"
    />
  );
};

export default Shery;
`,

  "Terminal.jsx": `// Terminal UI here\nexport default function Terminal() {\n  return <div>Terminal</div>;\n}`,

  "ActivitiesView.jsx": `// ActivitiesView logic\nimport { useStore } from "../store/useStore";
  
  const ActivitiesView = () => {
    const desktops = useStore((s) => s.desktops);
    const switchDesktop = useStore((s) => s.switchDesktop);
    const exitActivitiesMode = useStore((s) => s.exitActivitiesMode);
  
    const handleDesktopClick = (index) => {
      switchDesktop(index);
      exitActivitiesMode();
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
        {desktops.map((desktop, index) => (
          <div
            key={index}
            className="relative bg-white w-60 h-40 m-4 rounded shadow-lg text-center cursor-pointer hover:scale-105 hover:ring-4 hover:ring-blue-500 transition-transform"
            onClick={() => handleDesktopClick(index)}
          >
            <div className="absolute top-2 left-2 bg-gray-200 text-xs px-2 py-1 rounded">
              Desktop {index + 1}
            </div>
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-gray-700">{desktop.length} Window(s)</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ActivitiesView;
  `,
  "ContextMenu.jsx": `// ContextMenu actions`,
  "DesktopIcon.jsx": `// Desktop icon component\nconst DesktopIcon = ({ label, icon, onDoubleClick }) => {
  return (
    <div onDoubleClick={onDoubleClick} className="flex flex-col items-center text-white cursor-pointer w-16">
      <img src={icon} alt={label} className="w-10 h-10" />
      <span className="text-sm text-center mt-1">{label}</span>
    </div>
  );
};

export default DesktopIcon;
`,
  "Dock.jsx": `// Dock with app icons\nimport { useStore } from "../store/useStore";
  import clsx from "clsx";
  
  // Import your custom icons
  import terminalIcon from "../assets/icons/terminal-app.png";
  import filesIcon from "../assets/icons/user-home.png";
  import cookIcon from "../assets/icons/logo_browse.png";
  import browserIcon from "../assets/icons/brave-logo.svg";
  import SheryIcon from "../assets/icons/SheryIcon.png"
  
  const Dock = () => {
    const openApp = useStore((s) => s.openApp);
    const windows = useStore((s) => s.windows);
  
    const isAppOpen = (appTitle) =>
      windows.some((win) => win.title === appTitle);
  
    const dockApps = [
      { name: "Terminal", icon: terminalIcon },
      { name: "Files", icon: filesIcon },
      { name: "Cook", icon: cookIcon },
      { name: "Browser", icon: browserIcon },
      { name: "Shery", icon: SheryIcon },
    ];
  
    return (
      <div className="fixed bg-[#00000056] border border-[#7e7e7e8a] gap-2 px-2 py-1 rounded-[15px] left-1/2 transform -translate-x-1/2 bottom-5 flex justify-center items-center z-50 backdrop-blur-sm">
        {dockApps.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => openApp(name)}
            title={name}
            className="relative group focus:outline-none"
          >
            <img
              src={icon}
              alt={name}
              className={clsx(
                "w-12 h-12 p-2 rounded-[12px] hover:bg-[#8080803f] object-contain transition",
                isAppOpen(name) && "bg-[#8080803f]"
              )}
            />
  
            <div className="absolute top-[-53%] -translate-y-1/2 bg-[#1c1c1d] text-white text-xs px-3 py-[5px] rounded-[20px] border border-[#5e5d5d] opacity-0 group-hover:opacity-100 whitespace-nowrap transition pointer-events-none">
              {name}
            </div>
          </button>
        ))}
      </div>
    );
  };
  
  export default Dock;
  `,


  "EdexUI.jsx": `// Fancy futuristic terminal`,


  "FileIcon.jsx": `// Maps file type to icon`,


  "LogoLoader.jsx": `// Logo loader animation\nimport React, { useEffect } from "react";
  import "../styles/LogoLoader.css";
  
  const LogoLoader = ({ onFinish }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onFinish();
      }, 10000);
  
      return () => clearTimeout(timer);
    }, [onFinish]);
  
    return (
      <div className="logo-loader">
        <div className="logo-container">
          <div className="logo-animate">
            <img src="/logo.png" alt="AetherOS Logo" />
          </div>
          <p className="boot-text">Booting AetherOS...</p>
        </div>
      </div>
    );
  };
  
  export default LogoLoader;
  `,
  "TopBar.jsx": `//TopBar\nimport { useEffect, useState, useRef } from "react";
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
        <button key={"prev-" + i} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors text-sm rounded-lg hover:bg-gray-800/30" disabled>
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
          className={"w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200 relative group " +
            (selected
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : today
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white')}
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
        <button key={"next-" + day} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-400 transition-colors text-sm rounded-lg hover:bg-gray-800/30" disabled>
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
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", backgroundColor: "rgba(0,0,0," + (100 - brightness) / 100 + ")", zIndex: 9998 }} />
    </>
  );
};

export default TopBar;


`,
  "Window.jsx": `// App windows and dragging\nimport { Rnd } from "react-rnd";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/useStore";
import clsx from "clsx";

const Window = ({
  id,
  title,
  isMinimized,
  isMaximized,
  zIndex,
  children,
}) => {
  const closeApp = useStore((s) => s.closeApp);
  const toggleMinimize = useStore((s) => s.toggleMinimize);
  const toggleMaximize = useStore((s) => s.toggleMaximize);
  const focusWindow = useStore((s) => s.focusWindow);

  const isResizable = title !== "Cook" && title !== "EdexUI";
  const isDraggable = isResizable;
  const rndRef = useRef(null);

  const [position, setPosition] = useState({ x: 10, y: 27 });
  const [size, setSize] = useState({ width: 600, height: 400 });

  useEffect(() => {
    if (isMaximized) {
      const width = window.innerWidth;
      const height = window.innerHeight - 40;

      const newPos = { x: 0, y: 0 };
      const newSize = { width, height };

      setPosition(newPos);
      setSize(newSize);

      rndRef.current?.updatePosition(newPos);
      rndRef.current?.updateSize(newSize);
    }
  }, [isMaximized]);

  if (isMinimized) return null;

  const isTerminal = title === "Terminal";

  return (
    <Rnd
      ref={rndRef}
      size={size}
      position={position}
      onDragStart={() => focusWindow(id)}
      onResizeStart={() => focusWindow(id)}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, newPos) => {
        setSize({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        setPosition(newPos);
      }}
      minWidth={1000}
      minHeight={500}
      bounds="parent"
      style={{ zIndex }}
      dragHandleClassName="handle"
      enableResizing={isResizable}
      disableDragging={!isDraggable}
      className={clsx(
        "absolute",
        "rounded-lg border border-white/50 backdrop-blur-md",
        "bg-black/10 text-white font-ubuntu shadow-lg"
      )}
    >
      <div className="handle flex justify-between items-center px-3 py-1.5 bg-white/10 backdrop-blur border-b border-white/20 rounded-t-lg cursor-move relative">
        <div className="text-sm font-semibold tracking-wide z-10">{title}</div>

        {isTerminal && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 text-sm font-bold font-mono text-center z-0 text-[#ff0fff]"
            style={{ textShadow: "0 0 6px #ff00e9" }}
          >
            Arnab@AetherOS
          </div>
        )}

        <div className="flex gap-2 items-center z-10">
          <button
            onClick={() => toggleMinimize(id)}
            className="w-3 h-3 rounded-full bg-yellow-400"
          />
          <button
            onClick={() => toggleMaximize(id)}
            className="w-3 h-3 rounded-full bg-green-400"
          />
          <button
            onClick={() => closeApp(id)}
            className="w-3 h-3 rounded-full bg-red-500"
          />
        </div>
      </div>

      <div className="h-[92%] w-full overflow-hidden relative">
        {children}
        <style>{"@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } .terminal-cursor { display: inline-block; width: 1ch; height: 1em; background-color: white; animation: blink 1s step-start infinite; }"}</style>
      </div>
    </Rnd>
  );
};

export default Window;
`,
};
