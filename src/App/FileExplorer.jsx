import { useState } from "react";
import {
  Folder,
  FolderOpen,
  FileCode2,
  FileImage,
  FileText,
  MoreVertical,
} from "lucide-react";
import { codeFiles, imageFiles } from "../data/fileContents";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import clsx from "clsx";

const FileIcon = ({ type }) => {
  switch (type) {
    case "image":
      return <FileImage size={14} />;
    case "code":
      return <FileCode2 size={14} />;
    case "svg":
      return <FileImage size={14} />;
    default:
      return <FileText size={14} />;
  }
};

const ContextMenu = ({ x, y, onAction }) => {
  return (
    <div
      className="absolute bg-[#252526] text-white border border-gray-700 text-xs rounded shadow-lg z-50 backdrop-blur-md"
      style={{ top: y, left: x }}
    >
      {["Open", "Rename", "Delete"].map((action) => (
        <div
          key={action}
          className="px-4 py-2 hover:bg-purple-700/30 cursor-pointer"
          onClick={() => onAction(action)}
        >
          {action}
        </div>
      ))}
    </div>
  );
};

const TreeItem = ({ name, value, depth, onFileClick, selectedFile }) => {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const isFolder = typeof value === "object";

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleAction = (action) => {
    setShowMenu(false);
    alert(`${action}: ${name}`);
  };

  const isSelected = selectedFile === name;

  return (
    <div onContextMenu={handleContextMenu}>
      <div
        className={clsx(
          "flex items-center justify-between cursor-pointer transition-all px-2 py-1 rounded-sm",
          isSelected
            ? "bg-[#320c47] text-purple-100 shadow-md shadow-purple-700"
            : "hover:bg-[#2c313c]",
          "text-gray-300"
        )}
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={() => {
          if (isFolder) setOpen(!open);
          else onFileClick(name);
        }}
      >
        <div className="flex items-center gap-2">
          {isFolder ? (open ? <FolderOpen size={14} /> : <Folder size={14} />) : <FileIcon type={value} />}
          <span className="text-[13px] tracking-tight font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.05)]">
            {name}
          </span>
        </div>
        <MoreVertical size={12} className="opacity-40 hover:opacity-80 transition" />
      </div>

      {showMenu && <ContextMenu x={menuPos.x} y={menuPos.y} onAction={handleAction} />}

      {isFolder && open && (
        <div>
          {Object.entries(value).map(([childName, childValue]) => (
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
      )}
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
      <div className="w-64 h-full sidebar-scroll bg-gradient-to-br from-[#202020] to-[#1e1e1e] text-white border-r border-gray-700 font-mono text-sm overflow-auto relative shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/5 to-transparent pointer-events-none" />

        <div className="p-2">
          <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
            <span className="font-bold text-xs tracking-wide text-purple-400 drop-shadow-[0_0_2px_rgba(128,0,255,0.3)]">File Explorer</span>
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
                }}codeTagProps={{
                  style: {
                    fontSize: "1.1rem",
                    overflowY:"auto",
                  },
                }}
              >
                {codeFiles[selectedFile] || "// Preview not available."}
              </SyntaxHighlighter>
            )}
          </div>
        ) : (
          <p className="text-gray-500 z-10 relative">Select a file to preview its content</p>
        )}
      </div>

      {/* Scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7e22ce;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a855f7;
        }
      `}</style>
      <style jsx global>{`
  /* Scrollbar for .custom-scrollbar containers (sidebar + preview) */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #7e22ce;
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a855f7;
  }

  /* Scrollbar for <pre> inside SyntaxHighlighter */
  pre::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  pre::-webkit-scrollbar-track {
    background: transparent;
  }

  pre::-webkit-scrollbar-thumb {
    background-color: #a855f7;
    border-radius: 4px;
  }

  pre::-webkit-scrollbar-thumb:hover {
    background: #d8b4fe;
  }
`}</style>
<style jsx global>{`
  /* === Sidebar Scrollbar === */
  .sidebar-scroll::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .sidebar-scroll::-webkit-scrollbar-thumb {
    background-color: #9333ea;
    border-radius: 6px;
  }

  .sidebar-scroll::-webkit-scrollbar-thumb:hover {
    background-color: #c084fc;
  }

  /* === Preview Panel Scrollbar === */
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

  /* === SyntaxHighlighter <pre> Horizontal Scroll === */
  pre::-webkit-scrollbar {
    height: 6px;
  }

  pre::-webkit-scrollbar-track {
    background: transparent;
  }

  pre::-webkit-scrollbar-thumb {
    background-color: #9333ea;
    border-radius: 6px;
  }

  pre::-webkit-scrollbar-thumb:hover {
    background-color: #c084fc;
  }
`}</style>


    </div>
  );
};

export default FileExplorer;
 