import React from "react";
import CommandOutput from "./CommandOutput";

export default function TerminalBody({
  bodyRef,
  measureRef,
  textColor,
  bodyHeight,
  isMinimized,
  history,
  isDark,
  promptColor,
  inputColor,
  input,
  setInput,
  handleCommand,
  inputRef,
  bottomRef,
  promptHost,
  promptPath,
}) {
  return (
    <div
      ref={bodyRef}
      className={`relative p-6 md:p-8 overflow-y-auto terminal-scrollbar font-mono text-sm ${textColor}`}
      style={{ height: bodyHeight, overflow: "auto", visibility: isMinimized ? "hidden" : "visible" }}
    >
      <span
        ref={measureRef}
        className="invisible absolute pointer-events-none text-sm font-mono"
        aria-hidden
      >
        M
      </span>

      {isMinimized ? null : (
        <div className="space-y-4 md:space-y-6">
          {history.map((item) => {
            if (item.type === "banner") {
              return (
                <div key={item.id} className="animate-fade-in" style={{ marginTop: 16, marginBottom: 8 }}>
                  {item.lines.map((line, i) => (
                    <div
                      key={i}
                      className={`text-[11px] leading-tight whitespace-pre ${
                        i < 6
                          ? isDark
                            ? "text-[#4ade80] terminal-glow"
                            : "text-green-600"
                          : isDark
                          ? "text-[#8b949e]"
                          : "text-gray-500"
                      }`}
                    >
                      {line || "\u00a0"}
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === "command") {
              return (
                <div
                  key={item.id}
                  className="flex items-start mb-1"
                  style={{ paddingLeft: 6 }}
                >
                  <span
                    className={`${promptColor} font-bold shrink-0`}
                    style={{ padding: "0 1px", marginRight: 2, display: "inline-block" }}
                  >
                    {promptHost}:{promptPath}$
                  </span>
                  <span className={isDark ? "text-[#e6edf3]" : "text-gray-800"}>
                    {item.content}
                  </span>
                </div>
              );
            }

            if (item.type === "text") {
              return (
                <div
                  key={item.id}
                  className={`mb-2 ml-2 ${isDark ? "text-[#8b949e]" : "text-gray-500"} animate-fade-in`}
                >
                  {item.content}
                </div>
              );
            }

            if (item.type === "output") {
              return (
                <div key={item.id} className="mb-4 ml-2 animate-fade-in">
                  <CommandOutput command={item.command} isDark={isDark} />
                </div>
              );
            }

            return null;
          })}

          <div className="flex items-center mt-1" style={{ paddingLeft: 6 }}>
            <span
              className={`${promptColor} font-bold shrink-0`}
              style={{ padding: "0 1px", marginRight: 2, display: "inline-block" }}
            >
              {promptHost}:{promptPath}$
            </span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="none"
                className={`flex-1 bg-transparent outline-none ${inputColor} caret-transparent`}
              />
              <span
                className={`absolute pointer-events-none cursor-blink ${isDark ? "bg-[#4ade80]" : "bg-gray-800"} h-4 w-0.5`}
                style={{
                  left: `${input.length}ch`,
                }}
              />
            </div>
          </div>

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
