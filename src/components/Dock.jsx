import { useStore } from "../store/useStore";
import clsx from "clsx";

// Import your custom icons
import terminalIcon from "../assets/icons/terminal-app.png";
import filesIcon from "../assets/icons/user-home.png";
import cookIcon from "../assets/icons/logo_browse.png";
import browserIcon from "../assets/icons/brave-logo.svg";
import SheryIcon from "../assets/icons/SheryIcon.png"

const Dock = () => {
  const openApp = useStore((s) => s.openApp);
  const windows = useStore((s) => s.windows); // ✅ flat list

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
