import { Rnd } from "react-rnd";
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

  const isResizable = title !== "Cook" && title !== "EdexUI"; // 🔒 EdexUI not resizable
  const isDraggable = isResizable; // Disable dragging for EdexUI too
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
      {/* Top Bar */}
      <div className="handle flex justify-between items-center px-3 py-1.5 bg-white/10 backdrop-blur border-b border-white/20 rounded-t-lg cursor-move relative">
        {/* Left Side (Title) */}
        <div className="text-sm font-semibold tracking-wide z-10">{title}</div>

        {/* Center (Terminal Prompt) */}
        {isTerminal && (
          <div className="absolute left-1/2 -translate-x-1/2 text-sm font-bold font-mono text-center z-0 text-[#ff0fff]" style={{ textShadow: "0 0 6px #ff00e9" }}>
            Arnab@AetherOS
          </div>
        )}

        {/* Right Side (Window Controls) */}
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

      {/* Window Body */}
      <div className="h-[92%] w-full overflow-hidden relative">
        {children}
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .terminal-cursor {
            display: inline-block;
            width: 1ch;
            height: 1em;
            background-color: white;
            animation: blink 1s step-start infinite;
          }
        `}</style>
      </div>
    </Rnd>
  );
};

export default Window;
