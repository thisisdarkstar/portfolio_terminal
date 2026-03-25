import React from "react";
import Image from "next/image";

export default function TerminalClosedChip({ bg, isDark, iconSrc, onReopen }) {
  const finalIconSrc = iconSrc || "/default-terminal-icon.png";

  return (
    <div className={`min-h-screen ${bg} relative`}>
      <button
        className={`fixed top-4 left-4 flex flex-col items-center gap-1 text-xs px-3 py-2 rounded-xl cursor-pointer ${
          isDark
            ? "text-[#c9d1d9] bg-black/65 hover:bg-black/80"
            : "text-[#24324d] bg-white/80 hover:bg-white"
        } transition-colors shadow-lg backdrop-blur`}
        onClick={onReopen}
      >
        <Image
          src={finalIconSrc}
          alt="Terminal icon"
          width={40}
          height={40}
          className="rounded-xl"
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            borderRadius: 10,
            padding: 4,
          }}
        />
        <span>Terminal</span>
      </button>
    </div>
  );
}
