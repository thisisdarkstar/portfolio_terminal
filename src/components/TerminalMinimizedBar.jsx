import React from "react";

export default function TerminalMinimizedBar({ border, headerBg, barTitle, onRestore, onClose }) {
  return (
    <div
      className={`fixed w-fit h-fit relative top-4 left-4 items-center border ${border} ${headerBg} rounded-lg shadow-lg select-none z-30 backdrop-blur cursor-pointer`}
      onClick={onRestore}
      style={{ maxWidth: 210, padding: "4px" }}
    >
      <span className={`${barTitle} text-[11px] tracking-[0.18em] font-semibold`}>
        Terminal — minimized
      </span>
      <button
        aria-label="Close"
        className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white/12 text-[11px] text-white/85 flex items-center justify-center border border-white/20 cursor-pointer hover:opacity-90"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        X
      </button>
    </div>
  );
}
