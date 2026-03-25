"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalBody from "./TerminalBody";
import TerminalMinimizedBar from "./TerminalMinimizedBar";
import TerminalClosedChip from "./TerminalClosedChip";

const WELCOME_LINES = [
  "  ██████╗  █████╗ ██████╗ ██╗  ██╗███████╗████████╗ █████╗ ██████╗",
  "  ██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗",
  "  ██║  ██║███████║██████╔╝█████╔╝ ███████╗   ██║   ███████║██████╔╝",
  "  ██║  ██║██╔══██║██╔══██╗██╔═██╗ ╚════██║   ██║   ██╔══██║██╔══██╗",
  "  ██████╔╝██║  ██║██║  ██║██║  ██╗███████║   ██║   ██║  ██║██║  ██║",
  "  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝",
  "",
  "  Penetration Tester & Full-Stack Developer",
  "  ──────────────────────────────────────────",
  "  Type 'help' to list all available commands.",
  "  Type 'about' to learn more about me.",
];

const PROMPT_HOST = "guest@portfolio";
const PROMPT_PATH = "~";

export default function Terminal() {
  const [history, setHistory] = useState([
    { id: 0, type: "banner", lines: WELCOME_LINES },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [theme, setTheme] = useState("dark");
  const [termSize, setTermSize] = useState({ cols: 80, rows: 24 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [windowPos, setWindowPos] = useState({ x: 0, y: 0 });
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const measureRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, originX: 0, originY: 0 });
  const idRef = useRef(1);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Track terminal visible size in character cols/rows
  useEffect(() => {
    if (!bodyRef.current || !measureRef.current) return;

    const computeSize = () => {
      if (!bodyRef.current || !measureRef.current || isMinimized || isClosed) return;
      const bodyRect = bodyRef.current.getBoundingClientRect();
      const measureRect = measureRef.current.getBoundingClientRect();
      const charWidth = measureRect.width || 8;
      const lineHeight = measureRect.height || 16;
      const cols = Math.max(40, Math.floor(bodyRect.width / charWidth));
      const rows = Math.max(10, Math.floor(bodyRect.height / lineHeight));
      setTermSize({ cols, rows });
    };

    computeSize();

    const resizeObserver = new ResizeObserver(() => computeSize());
    resizeObserver.observe(bodyRef.current);
    window.addEventListener("resize", computeSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", computeSize);
    };
  }, [isMinimized, isClosed]);

  // Focus input on click anywhere in terminal
  const focusInput = () => inputRef.current?.focus();

  const isDark = theme === "dark";

  const pushHistory = useCallback((entries) => {
    setHistory((prev) => [
      ...prev,
      ...entries.map((e) => ({ ...e, id: idRef.current++ })),
    ]);
  }, []);

  const handleCommand = useCallback(
    (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIdx((prev) => {
          const next = Math.min(prev + 1, cmdHistory.length - 1);
          setInput(cmdHistory[next] ?? "");
          return next;
        });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIdx((prev) => {
          const next = Math.max(prev - 1, -1);
          setInput(next === -1 ? "" : cmdHistory[next] ?? "");
          return next;
        });
        return;
      }
      if (e.key !== "Enter") return;

      const cmd = input.trim();
      if (!cmd) return;

      // Save to cmd history
      setCmdHistory((prev) => [cmd, ...prev]);
      setHistoryIdx(-1);

      const lower = cmd.toLowerCase();

      if (lower === "clear") {
        setHistory([]);
        setInput("");
        return;
      }

      if (lower === "theme") {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        pushHistory([
          { type: "command", content: cmd },
          { type: "text", content: `Switched to ${newTheme} mode.` },
        ]);
        setInput("");
        return;
      }

      pushHistory([
        { type: "command", content: cmd },
        { type: "output", command: lower },
      ]);
      setInput("");
    },
    [input, theme, cmdHistory, pushHistory]
  );

  const handleWindowControl = (action) => (e) => {
    e.stopPropagation();
    if (action === "close") {
      setIsClosed(true);
      setIsMinimized(false);
      return;
    }
    if (action === "minimize") {
      setIsMinimized((prev) => !prev);
      return;
    }
    if (action === "maximize") {
      setIsMaximized((prev) => !prev);
      setIsMinimized(false);
    }
  };

  const handleHeaderPointerDown = (e) => {
    if (isMaximized || isClosed) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: windowPos.x,
      originY: windowPos.y,
    };
    document.addEventListener("pointermove", handleHeaderPointerMove);
    document.addEventListener("pointerup", handleHeaderPointerUp);
  };

  const handleHeaderPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setWindowPos({ x: dragRef.current.originX + dx, y: dragRef.current.originY + dy });
  };

  const handleHeaderPointerUp = () => {
    dragRef.current.active = false;
    document.removeEventListener("pointermove", handleHeaderPointerMove);
    document.removeEventListener("pointerup", handleHeaderPointerUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("pointermove", handleHeaderPointerMove);
      document.removeEventListener("pointerup", handleHeaderPointerUp);
    };
  });

  const bg = isDark
    ? "bg-gradient-to-br from-[#050914] via-[#0b1224] to-[#0d1320]"
    : "bg-gradient-to-br from-[#eef2fb] via-[#f7f9ff] to-[#e5ecfa]";
  const cardBg = isDark
    ? "bg-gradient-to-br from-[#0f162c] via-[#0c1224] to-[#0b1020]"
    : "bg-gradient-to-br from-white via-[#f9fbff] to-[#eef2ff]";
  const border = isDark ? "border-[#1f2b3d]" : "border-[#d3deef]";
  const headerBg = isDark ? "bg-[#131b2f]/90" : "bg-[#e2e8f7]";
  const promptColor = isDark ? "text-[#6fb0ff]" : "text-[#2f5fa7]";
  const textColor = isDark ? "text-[#c9d1d9]" : "text-[#24324d]";
  const inputColor = isDark ? "text-[#52d18a]" : "text-[#1f5135]";
  const barTitle = isDark ? "text-[#8b97ae]" : "text-[#637197]";
  const TERMINAL_ICON = "https://img.icons8.com/?size=100&id=2MYJ8bTQeTvq&format=png&color=000000";

  const bodyHeight = isMaximized ? "calc(100vh - 180px)" : "82vh";

  const cardStyle = {
    transform: isMaximized ? undefined : `translate(${windowPos.x}px, ${windowPos.y}px)`,
    position: isMaximized ? "fixed" : "relative",
    inset: isMaximized ? "16px" : undefined,
    width: isMaximized ? "calc(100% - 32px)" : undefined,
    height: isMaximized ? "calc(100vh - 32px)" : undefined,
    maxWidth: isMaximized ? "none" : undefined,
    zIndex: isMaximized ? 30 : undefined,
    boxShadow: isDark
      ? "0 30px 80px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)"
      : "0 30px 70px rgba(33,52,90,0.18), 0 12px 30px rgba(33,52,90,0.16), inset 0 1px 0 rgba(255,255,255,0.75)",
  };

  if (isClosed) {
    return (
      <TerminalClosedChip
        bg={bg}
        isDark={isDark}
        iconSrc={TERMINAL_ICON}
        onReopen={() => setIsClosed(false)}
      />
    );
  }

  if (isMinimized) {
    return (
      <div className={`min-h-screen ${bg} relative`}>
        <TerminalMinimizedBar
          border={border}
          headerBg={headerBg}
          barTitle={barTitle}
          onRestore={() => setIsMinimized(false)}
          onClose={() => {
            setIsMinimized(false);
            setIsClosed(true);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${bg} flex items-start justify-center md:items-center p-4 md:p-8 transition-colors duration-300`}
      onClick={focusInput}
    >
      <div
        className={`relative w-full max-w-5xl rounded-2xl overflow-hidden border ${border} ${cardBg} transition-colors duration-300 backdrop-blur flex flex-col`}
        style={{
          ...cardStyle,
          backgroundColor: isDark ? "rgba(7, 10, 18, 0.9)" : "rgba(255,255,255,0.82)",
          borderColor: isDark ? "rgba(48,54,61,0.82)" : "rgba(207,217,239,0.9)",
          backdropFilter: "blur(32px)",
        }}
      >
        <TerminalHeader
          isDark={isDark}
          barTitle={barTitle}
          border={border}
          headerBg={headerBg}
          termSize={termSize}
          promptHost={PROMPT_HOST}
          promptPath={PROMPT_PATH}
          onPointerDown={handleHeaderPointerDown}
          onClose={handleWindowControl("close")}
          onMinimize={handleWindowControl("minimize")}
          onMaximize={handleWindowControl("maximize")}
          onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        />

        <TerminalBody
          bodyRef={bodyRef}
          measureRef={measureRef}
          textColor={textColor}
          bodyHeight={bodyHeight}
          isMinimized={isMinimized}
          history={history}
          isDark={isDark}
          promptColor={promptColor}
          inputColor={inputColor}
          input={input}
          setInput={setInput}
          handleCommand={handleCommand}
          inputRef={inputRef}
          bottomRef={bottomRef}
          promptHost={PROMPT_HOST}
          promptPath={PROMPT_PATH}
        />
      </div>
    </div>
  );
}
