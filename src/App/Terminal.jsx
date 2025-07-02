import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/useStore"; // ✅ Make sure this path is correct

const Terminal = () => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(true);
  const [suggestion, setSuggestion] = useState(null);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const openApp = useStore((state) => state.openApp); // ✅ access app-opening logic

  const bio = [
    " ",
    <span key="bio-glow">
    Hi, I'm{" "}
    <span style={{ color: "#ff4bff", textShadow: "0px 0px 8px #ff00e9" }}>
      Arnab Satpati
    </span>.
  </span>,
    "Full Stack Developer | Designer | Innovator.",
    "Passionate about intuitive UI & powerful backends.",
    "Obsessed with Ubuntu-style desktops and terminal aesthetics.",
    "Always learning. Always building.",
    "Type `help` to view available commands.",
  ];

  const commands = {
    help: [
      "Available commands:",
      "- help → List commands",
      "- about → Show bio again (no animation)",
      "- reload → Reload hint message",
      "- clear → Clear terminal",
      "- cook → Open cooking website",
    ],
    about: bio,
    reload: "reload",
    clear: "clear",
    cook: "open-cook",
  };

  const glowKeywords = ["about", "help", "reload", "clear", "y", "n", "cook"];

  useEffect(() => {
    boot();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const boot = () => {
    setLines(["Type 'help' to know more."]);
    setBooting(false);
  };

  const promptLine = () => "[Arnab@AetherOS:~]$ ";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawCommand = input.trim();

    if (!rawCommand) {
      setInput("");
      return;
    }

    const command = rawCommand.toLowerCase();
    setLines((prev) => [...prev, `${promptLine()}${rawCommand}`]);
    setHistory((prev) => [...prev, rawCommand]);
    setHistoryIndex(-1);
    setInput("");

    if (suggestion) {
      if (command === "y") {
        const corrected = suggestion;
        setSuggestion(null);
        await runCommand(corrected);
      } else if (command === "n") {
        setLines((prev) => [...prev, "> Command not recognized."]);
        setSuggestion(null);
      } else {
        setLines((prev) => [...prev, "> Please answer with 'y' or 'n'."]);
      }
      return;
    }

    await runCommand(command);
  };

  const runCommand = async (command) => {
    const result = commands[command];

    if (command === "clear") {
      setLines([]);
    } else if (command === "reload") {
      boot();
    } else if (command === "about") {
      const output = bio.map((line) => line);
      setLines((prev) => [...prev, ...output]);
    } else if (command === "cook") {
      setLines((prev) => [...prev, "> Opening cooking website..."]);
      openApp("Cook"); // ✅ opens the floating window like in Dock
    } else if (Array.isArray(result)) {
      const output = result.map((line) => `> ${line}`);
      setLines((prev) => [...prev, ...output]);
    } else if (typeof result === "string") {
      setLines((prev) => [...prev, `> ${result}`]);
    } else {
      const closest = getClosestMatch(command);
      setLines((prev) => [...prev, `> Command not found: ${command}`]);
      if (closest) {
        setLines((prev) => [...prev, `> Did you mean \`${closest}\`? (y/n)`]);
        setSuggestion(closest);
      }
    }
  };

  const getClosestMatch = (cmd) => {
    const cmds = Object.keys(commands);
    let closest = null;
    let minDist = Infinity;

    for (let c of cmds) {
      const dist = levenshtein(cmd, c);
      if (dist < minDist && dist <= 3) {
        closest = c;
        minDist = dist;
      }
    }
    return closest;
  };

  const levenshtein = (a, b) => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setInput(history[newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1 || historyIndex === history.length - 1 ? -1 : historyIndex + 1;
        setInput(newIndex === -1 ? "" : history[newIndex]);
        setHistoryIndex(newIndex);
      }
    }
  };

  const renderLineWithGlow = (line) => {
    const parts = [];
    let lastIndex = 0;
    const regex = new RegExp(`\\b(${glowKeywords.join("|")})\\b`, "gi");

    line.replace(regex, (match, keyword, offset) => {
      if (offset > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{line.substring(lastIndex, offset)}</span>);
      }
      parts.push(
        <span
          key={`keyword-${offset}-${match}`}
          style={{ color: "#ff4bff", textShadow: "0px 0px 8px #ff00e9" }}
        >
          {match}
        </span>
      );
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < line.length) {
      parts.push(<span key={`text-${lastIndex}`}>{line.substring(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div
      ref={terminalRef}
      className="w-full h-full p-4 font-mono overflow-auto text-white scrollbar-thin scrollbar-thumb-[#e2dada13] scrollbar-track-[#32072100]"
      style={{ backgroundColor: "transparent" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Static Banner and Info */}
      <div className="flex flex-col sm:flex-row gap-20 mb-4">
        <div className="text-[10px] leading-[12px] text-white font-mono">
          <pre>{`
 ██████  ██████  ███   ██  ██████  ██████
 ██  ██  ██  ██  ████  ██  ██  ██  ██   ██
 ██████  █████   ██ ██ ██  ██████  ██████
 ██  ██  ██  ██  ██  ████  ██  ██  ██   ██
 ██  ██  ██  ██  ██   ███  ██  ██  ██████
`}</pre>
        </div>
        <div className="text-sm text-white font-mono flex flex-col gap-1">
          <span className="text-cyan-300">
            <i className="ri-id-card-fill" style={{ fontSize: "16px", color: "white" }}></i>{" "}
            Arnab Satpati
          </span>
          <span className="text-gray-400">────────────────────────────</span>
          <span>
            <i className="ri-github-fill" style={{ fontSize: "16px" }}></i> GitHub →{" "}
            <span className="text-cyan-300 cursor-pointer hover:text-red-300">
              github.com/yourhandle
            </span>
          </span>
          <span>
            <i className="ri-linkedin-fill" style={{ fontSize: "16px" }}></i> LinkedIn →{" "}
            <span className="text-cyan-300 cursor-pointer hover:text-red-300">
              linkedin.com/in/yourhandle
            </span>
          </span>
          <span>
            <i className="ri-instagram-fill" style={{ fontSize: "16px" }}></i> Instagram →{" "}
            <span className="text-cyan-300 cursor-pointer hover:text-red-300">
              instagram.com/yourhandle
            </span>
          </span>
        </div>
      </div>

      {/* Terminal Output */}
      {lines.map((line, idx) => {
        const isPromptLine =
          typeof line === "string" && line.startsWith(promptLine());
        const containsGlowKeyword =
          typeof line === "string" &&
          glowKeywords.some((keyword) => line.toLowerCase().includes(keyword));

        return (
          <div
            key={idx}
            className={`whitespace-pre-wrap ${isPromptLine ? "mt-2 mb-1" : ""}`}
            style={
              isPromptLine
                ? { color: "#ff4bff", textShadow: "0px 0px 5px #ff00e9" }
                : {}
            }
          >
            {isPromptLine
              ? line
              : containsGlowKeyword
              ? renderLineWithGlow(line)
              : line}
          </div>
        );
      })}

      {/* Command Input */}
      {!booting && (
        <form onSubmit={handleSubmit} className="mt-1 flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none border-none text-[#ffffff] flex-1 mt-2 mb-2 ml-0"
            style={{ color: "#ff4bff", textShadow: "0px 0px 5px #ff00e9" }}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default Terminal;
