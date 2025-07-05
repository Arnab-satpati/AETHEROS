// App.jsx
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import Dock from "./components/Dock";
import Window from "./components/Window";
import ActivitiesView from "./components/ActivitiesView";
import ContextMenu from "./components/ContextMenu";

import FileExplorer from "./App/FileExplorer";
import Terminal from "./App/Terminal";
import Browser from "./App/Browser";
import Cook from "./App/Cook";
import EdexUI from "./components/EdexUI";
import Shery from "./App/Shery";

import { useStore } from "./store/useStore";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { Rnd } from "react-rnd";
import "./LogoLoader.css";

function App() {
  const windows = useStore((s) => s.windows);
  const isActivitiesMode = useStore((s) => s.isActivitiesMode);
  const desktopItems = useStore((s) => s.desktopItems);
  const addDesktopItem = useStore((s) => s.addDesktopItem);
  const renameDesktopItem = useStore((s) => s.renameDesktopItem);
  const deleteDesktopItem = useStore((s) => s.deleteDesktopItem);

  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    targetId: null,
    type: "desktop",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4000);
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
      case "EdexUI":
        return <EdexUI />;
      case "Shery":
        return <Shery />;
      default:
        return <div>{title} App</div>;
    }
  };

  const handleContextMenu = (e, targetId = null, type = "desktop") => {
    // e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      targetId,
      type,
    });
  };

  const handleAction = (action, targetId) => {
    setContextMenu({ ...contextMenu, visible: false });

    if (action === "create-file" || action === "create-folder") {
      const type = action === "create-file" ? "file" : "folder";
      const newItem = {
        id: uuidv4(),
        name: "",
        type,
        x: 50,
        y: 50 + desktopItems.length * 80,
        isEditing: true,
      };
      addDesktopItem(newItem);
    }

    if (action === "rename" && targetId) {
      renameDesktopItem(targetId, "");
    }

    if (action === "delete" && targetId) {
      deleteDesktopItem(targetId);
    }

    if (action === "change-wallpaper") {
      alert("Wallpaper change dialog would go here.");
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
        isActivitiesMode && "scale-90 blur-sm"
      )}
      style={{
        backgroundImage:
          "url('https://cosmicwanderer7.github.io/Terminal-Portfolio/assets/beautiful-anime-street-scenery-cherry-blossom-kimono-uhdpaper.com-4K-6.1621.jpg')",
        backgroundSize: "cover",
      }}
      onContextMenu={(e) => handleContextMenu(e, null, "desktop")}
    >
      <TopBar />
      <Dock />

      <div className="absolute inset-0 top-[2rem] overflow-hidden border-0" id="desktop-area">
        <div className="relative w-full h-full">
          {/* Desktop Icons */}
          {desktopItems.map((item) => (
            <Rnd
              key={item.id}
              default={{ x: item.x, y: item.y, width: 80, height: 100 }}
              bounds="parent"
              enableResizing={false}
              className="text-center text-white font-ubuntu"
              onContextMenu={(e) => handleContextMenu(e, item.id, "item")}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white/20 border border-white/40 rounded flex items-center justify-center">
                  {item.type === "folder" ? "📁" : "📄"}
                </div>
                {item.isEditing ? (
                  <input
                    type="text"
                    autoFocus
                    onBlur={(e) =>
                      renameDesktopItem(item.id, e.target.value || "Untitled")
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        renameDesktopItem(item.id, e.target.value || "Untitled");
                      }
                    }}
                    className="bg-transparent border border-white/40 text-white text-xs p-1 w-full text-center"
                    placeholder="New name"
                  />
                ) : (
                  <div className="text-xs mt-1 truncate w-full">{item.name}</div>
                )}
              </div>
            </Rnd>
          ))}

          {/* Windows */}
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

      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onAction={handleAction}
          type={contextMenu.type}
          targetId={contextMenu.targetId}
        />
      )}

      {isActivitiesMode && <ActivitiesView />}
    </div>
  );
}

export default App;
