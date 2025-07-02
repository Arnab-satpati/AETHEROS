// App.jsx
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import Dock from "./components/Dock";
import Window from "./components/Window";
import ActivitiesView from "./components/ActivitiesView";

import FileExplorer from "./App/FileExplorer";
import Terminal from "./App/Terminal";
import Browser from "./App/Browser";
import Cook from "./App/Cook";

import { useStore } from "./store/useStore";
import clsx from "clsx";
import "./LogoLoader.css"; // 🔥 Logo loader styles

function App() {
  const windows = useStore((s) => s.windows);
  const isActivitiesMode = useStore((s) => s.isActivitiesMode);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000); // Matches animation
    return () => clearTimeout(timer);
  }, []);

  const getAppComponent = (title) => {
    switch (title) {
      case "Terminal":
        return <Terminal />;
      case "Files":
        return <FileExplorer />;
      case "Cook":
        return <Cook />;
      case "Browser":
        return <Browser />;
      default:
        return <div>{title} App</div>;
    }
  };

  if (loading) {
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
  }

  return (
    <div
      className={clsx(
        "h-screen w-screen bg-cover bg-center font-ubuntu relative overflow-hidden transition-opacity duration-700 ease-in",
        isActivitiesMode && "scale-90 blur-sm",
        !loading ? "opacity-100" : "opacity-0"
      )}
      style={{
        backgroundImage:
          "url('https://cosmicwanderer7.github.io/Terminal-Portfolio/assets/beautiful-anime-street-scenery-cherry-blossom-kimono-uhdpaper.com-4K-6.1621.jpg')",
        backgroundSize: "cover",
      }}
    >
      <TopBar />
      <Dock />

      <div
        className="absolute inset-0 top-[2rem] overflow-hidden border-0"
        id="desktop-area"
      >
        <div className="relative w-full h-full">
          {windows.map((win) => (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
            >
              {getAppComponent(win.title)}
            </Window>
          ))}
        </div>
      </div>

      {isActivitiesMode && <ActivitiesView />}
    </div>
  );
}

export default App;
