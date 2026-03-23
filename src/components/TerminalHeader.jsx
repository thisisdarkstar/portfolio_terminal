import React from "react";

export default function TerminalHeader({
  isDark,
  barTitle,
  border,
  headerBg,
  termSize,
  promptHost,
  promptPath,
  onPointerDown,
  onClose,
  onMinimize,
  onMaximize,
  onThemeToggle,
}) {
  return (
    <div
      className={`relative flex items-center gap-3 border-b ${border} ${headerBg} select-none cursor-grab active:cursor-grabbing`}
      style={{ padding: "8px 14px" }}
      onPointerDown={onPointerDown}
    >
      <div
        className="flex items-center gap-2"
        style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
      >
        <button
          aria-label="Close"
          className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] shadow-sm flex items-center justify-center text-[10px] text-white/90 cursor-pointer hover:opacity-90"
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ×
        </button>
        <button
          aria-label="Minimize"
          className="w-3.5 h-3.5 rounded-full bg-[#febc2e] shadow-sm flex items-center justify-center text-[11px] text-white/90 cursor-pointer hover:opacity-90"
          onClick={onMinimize}
          onPointerDown={(e) => e.stopPropagation()}
        >
          –
        </button>
        <button
          aria-label="Maximize"
          className="w-3.5 h-3.5 rounded-full bg-[#28c840] shadow-sm flex items-center justify-center text-[10px] text-white/90 cursor-pointer hover:opacity-90"
          onClick={onMaximize}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ◻
        </button>
      </div>

      <div className={`flex-1 text-center text-xs ${barTitle} tracking-widest`}>
        {promptHost}:{promptPath} — zsh — {termSize.cols}×{termSize.rows}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onThemeToggle();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={`ml-auto mr-3 md:mr-5 w-fit text-xs px-4 py-1.5 rounded-full border cursor-pointer ${
          isDark
            ? "border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9]"
            : "border-[#cfd9ef] text-[#3d4f73] hover:text-[#1f2f4d]"
        } transition-colors`}
      >
        {isDark ? "☀ light" : "🌙 dark"}
      </button>
    </div>
  );
}
