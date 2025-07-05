import { useState } from "react";
import { codeFiles, imageFiles } from "../data/fileContents";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import clsx from "clsx";

const getIcon = ({ name, isFolder, isOpen }) => {
  const lowerName = name.toLowerCase();

  if (isFolder) {
    if (lowerName === "src")
      return <img src={isOpen ? "/folder-src-open.svg" : "/folder-src.svg"} className="w-4 h-4" />;
    if (lowerName === "app")
      return <img src={isOpen ? "/folder-app-open.svg" : "/folder-app.svg"} className="w-4 h-4" />;
    if (lowerName === "components")
      return <img src={isOpen ? "/folder-components-open.svg" : "/folder-components.svg"} className="w-4 h-4" />;
    if (lowerName === "assets/icons")
      return <img src={isOpen ? "/folder-ui-open.svg" : "/folder-ui.svg"} className="w-4 h-4" />;
    return <img src="/folder.svg" className="w-4 h-4" />;
  }

  const ext = name.split(".").pop().toLowerCase();
  if (["js", "jsx", "ts", "tsx"].includes(ext))
    return <img src="/react.svg" className="w-4 h-4" />;
  if (["png", "jpg", "jpeg", "svg", "webp"].includes(ext))
    return <img src="/image.svg" className="w-4 h-4" />;
  return <img src="/file.svg" className="w-4 h-4" />;
};

const TreeItem = ({ name, value, depth, onFileClick, selectedFile }) => {
  const [open, setOpen] = useState(false);
  const isFolder = typeof value === "object";
  const isSelected = selectedFile === name;

  return (
    <div>
      <div
        className={clsx(
          "flex items-center cursor-pointer transition-all px-2 py-1 rounded-sm",
          isSelected
            ? "bg-[#320c47] text-purple-100 shadow-md shadow-purple-700"
            : "hover:bg-[#2c313c]",
          "text-gray-300"
        )}
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={() => (isFolder ? setOpen(!open) : onFileClick(name))}
      >
        <div className="flex items-center gap-2">
          {getIcon({ name, isFolder, isOpen: open })}
          <span className="text-[13px] font-semibold">{name}</span>
        </div>
      </div>

      {isFolder &&
        open &&
        Object.entries(value).map(([childName, childValue]) => (
          <TreeItem
            key={`${name}-${childName}`}
            name={childName}
            value={childValue}
            depth={depth + 1}
            onFileClick={onFileClick}
            selectedFile={selectedFile}
          />
        ))}
    </div>
  );
};

const fileStructure = {
  src: {
    App: {
      "Browser.jsx": "code",
      "Cook.jsx": "code",
      "FileExplorer.jsx": "code",
      "Shery.jsx": "code",
      "Terminal.jsx": "code",
    },
    "assets/icons": {
      "brave-logo.svg": "svg",
      "folder.png": "image",
      "logo_browse.png": "image",
      "SheryIcon.png": "image",
      "terminal-app.png": "image",
      "user-home.png": "image",
      "wallpaper.jpg": "image",
    },
    components: {
      "ActivitiesView.jsx": "code",
      "ContextMenu.jsx": "code",
      "DesktopIcon.jsx": "code",
      "Dock.jsx": "code",
      "EdexUI.jsx": "code",
      "FileIcon.jsx": "code",
      "LogoLoader.jsx": "code",
      "TopBar.jsx": "code",
      "Window.jsx": "code",
    },
  },
};

const FileExplorer = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-64 h-full sidebar-scroll bg-gradient-to-br from-[#202020] to-[#1e1e1e] text-white border-r border-gray-700 font-mono text-sm overflow-auto relative shadow-inner custom-scrollbar">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/5 to-transparent pointer-events-none" />
        <div className="p-2 pl-4">
          <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
            <span className="font-bold text-xs tracking-wide text-purple-400 drop-shadow-[0_0_2px_rgba(128,0,255,0.3)]">
              File Explorer
            </span>
          </div>
          {Object.entries(fileStructure).map(([name, value]) => (
            <TreeItem
              key={name}
              name={name}
              value={value}
              depth={0}
              onFileClick={setSelectedFile}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      </div>

      {/* File Preview Area */}
      <div className="flex-1 bg-gradient-to-br from-[#1e1e1e] to-[#151515] text-gray-200 p-6 overflow-auto custom-scrollbar font-mono relative">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-500/5 pointer-events-none z-0" />
        {selectedFile ? (
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4 text-purple-300 drop-shadow-[0_1px_1px_rgba(128,0,255,0.4)]">
              {selectedFile}
            </h2>
            {imageFiles[selectedFile] ? (
              <img
                src={imageFiles[selectedFile]}
                className="rounded-lg max-w-full border border-gray-700 shadow-lg"
              />
            ) : (
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  background: "#1f1f1f",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  overflowX: "auto",
                  border: "1px solid #5b21b6",
                  boxShadow: "0 0 25px rgba(168,85,247,0.3)",
                  color: "#e0e0e0",
                }}
                codeTagProps={{
                  style: {
                    fontSize: "1.1rem",
                    overflowY: "auto",
                  },
                }}
              >
                {codeFiles[selectedFile] || "// Preview not available."}
              </SyntaxHighlighter>
            )}
          </div>
        ) : (
          <p className="text-gray-500 z-10 relative">
            Select a file to preview its content
          </p>
        )}
      </div>

      {/* Custom Scrollbar Styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #7e22ce;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #a855f7;
        }

        pre::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        pre::-webkit-scrollbar-thumb {
          background: #9333ea;
          border-radius: 6px;
        }

        pre::-webkit-scrollbar-thumb:hover {
          background: #c084fc;
        }
      `}</style>
    </div>
  );
};

export default FileExplorer;
