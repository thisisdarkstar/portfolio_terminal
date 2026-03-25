"use client";

import aboutData from "../data/about.json";
import experienceData from "../data/experience.json";
import projectsData from "../data/projects.json";
import skillsData from "../data/skills.json";
import educationData from "../data/education.json";
import writeupsData from "../data/writeups.json";

/* ─── tiny clsx helper ─── */
const cx = (...args) => args.filter(Boolean).join(" ");

/* ─── colour tokens per theme ─── */
const t = (isDark) => ({
  accent: isDark ? "text-[#58a6ff]" : "text-blue-600",
  green: isDark ? "text-[#4ade80]" : "text-green-600",
  yellow: isDark ? "text-[#f0c532]" : "text-yellow-600",
  muted: isDark ? "text-[#8b949e]" : "text-gray-500",
  text: isDark ? "text-[#c9d1d9]" : "text-gray-700",
  card: isDark ? "bg-[#161b27] border-[#21262d]" : "bg-gray-50 border-gray-200",
  bar: isDark ? "bg-[#21262d]" : "bg-gray-200",
  barFill: isDark ? "bg-[#4ade80]" : "bg-blue-500",
  divider: isDark ? "border-[#21262d]" : "border-gray-200",
});

/* ─── Section components ─── */

function Help({ isDark }) {
  const c = t(isDark);
  const cmds = [
    ["about",      "Who am I"],
    ["experience", "Work history"],
    ["projects",   "Technical projects"],
    ["skills",     "Technical expertise"],
    ["education",  "Academic background"],
    ["writeups",   "Security writeups & articles"],
    ["ls",         "List portfolio files"],
    ["whoami",     "Current user"],
    ["theme",      "Toggle dark / light mode"],
    ["clear",      "Clear the terminal"],
  ];
  return (
    <div className={c.text} style={{ marginTop: 4, marginBottom: 6 }}>
      <p className={cx(c.muted, "mb-2 text-xs")}>Usage: &lt;command&gt;</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
        {cmds.map(([cmd, desc]) => (
          <div key={cmd} className="flex gap-3">
            <span className={cx(c.yellow, "w-24 shrink-0")}>{cmd}</span>
            <span className={c.muted}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function About({ isDark }) {
  const c = t(isDark);
  return (
    <div className="space-y-5">
      <div style={{ marginTop: 4 }}>
        <p className={cx(c.text, "leading-relaxed")}>{aboutData.summary}</p>
      </div>
      <div>
        <p className={cx(c.accent, "font-semibold mb-2")} style={{ marginTop: 4 }} >✦ Core Expertise</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1" style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 8 }}>
          {aboutData.expertise.map((item, i) => (
            <div key={i} className={cx("flex items-start gap-2", c.text)}>
              <span className={c.green}>▹</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Experience({ isDark }) {
  const c = t(isDark);
  return (
    <div style={{ margin: 4 }}>
      {experienceData.map((exp, i) => (
        <div key={i} className={cx("border rounded-lg", c.card)} style={{ margin: 2, padding: 4 }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
            <span className={cx(c.accent, "font-bold text-base")}>{exp.title}</span>
            <span className={cx(c.muted, "text-xs")}>{exp.period}</span>
          </div>
          <div className={cx(c.yellow, "text-sm mb-3")}>{exp.company}</div>
          <ul className="space-y-1">
            {exp.details.map((d, j) => (
              <li key={j} className={cx(c.text, "flex gap-2 text-sm")}>
                <span className={c.green}>▸</span>{d}
              </li>
            ))}
          </ul>
          {exp.credential && (
            <a
              href={exp.credential}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(c.green, "text-xs mt-3 inline-block hover:underline")}
            >
              ↗ View Certificate
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function Projects({ isDark }) {
  const c = t(isDark);
  return (
    <div className="space-y-8">
      {Object.entries(projectsData).map(([category, projects]) => (
        <div key={category}>
          <div className={cx("text-xs uppercase tracking-widest mb-3 pb-1 border-b", c.yellow, c.divider)} style={{ marginTop: 10 }}>
            {category}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
            {projects.map((proj, j) => (
              <div key={j} className={cx("border rounded-lg p-5 hover:scale-[1.01] transition-transform", c.card)} style={{ padding: 6 }}>
                <h4 className={cx(c.green, "font-semibold mb-1")}>{proj.title}</h4>
                <p className={cx(c.muted, "text-xs mb-2")}>{proj.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.technologies.map((tech, k) => (
                    <span
                      key={k}
                      className={cx(
                        "text-[10px] px-1.5 py-0.5 rounded font-medium",
                        isDark ? "bg-[#0d1117] text-[#58a6ff] border border-[#30363d]" : "bg-white text-blue-600 border border-blue-200"
                      )}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="space-y-0.5 mb-3">
                  {proj.details.map((d, k) => (
                    <li key={k} className={cx(c.text, "flex gap-2 text-xs")}>
                      <span className={c.accent}>▹</span>{d}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  {proj.links.map((link, k) => (
                    <a
                      key={k}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(c.accent, "text-xs hover:underline")}
                    >
                      ↗ {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Skills({ isDark }) {
  const c = t(isDark);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7" style={{ marginTop: 8, marginBottom: 8 }}>
      {skillsData.map((cat, i) => (
        <div key={i}>
          <div className={cx(c.yellow, "text-xs uppercase tracking-widest mb-2")}>{cat.title}</div>
          <div className="space-y-2">
            {cat.skills.map((skill, j) => (
              <div key={j}>
                <div className={cx("flex justify-between text-xs mb-0.5", c.text)}>
                  <span>{skill.name}</span>
                  <span className={c.muted}>{skill.level}%</span>
                </div>
                <div className={cx("h-1.5 rounded-full overflow-hidden", c.bar)}>
                  <div
                    className={cx("h-full rounded-full skill-bar-fill", c.barFill)}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Education({ isDark }) {
  const c = t(isDark);
  return (
    <div className="space-y-5">
      {educationData.map((edu, i) => (
        <div key={i} className={cx("border rounded-lg p-5", c.card)} style={{ padding: 6 }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
            <span className={cx(c.accent, "font-bold")}>{edu.degree}</span>
            <span className={cx(c.muted, "text-xs")}>{edu.period}</span>
          </div>
          <div className={cx(c.green, "text-sm mb-3")}>{edu.school}</div>
          <ul className="space-y-1">
            {edu.details.map((d, j) => (
              <li key={j} className={cx(c.text, "flex gap-2 text-sm")}>
                <span className={c.yellow}>▸</span>{d}
              </li>
            ))}
          </ul>
          {edu.credential && (
            <a
              href={edu.credential}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(c.yellow, "text-xs mt-3 inline-block hover:underline")}
            >
              ↗ View Certificate
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function Writeups({ isDark }) {
  const c = t(isDark);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ marginTop: 6, marginBottom: 6 }}>
      {writeupsData.map((w, i) => (
        <div key={i} className={cx("border rounded-lg p-5 hover:scale-[1.01] transition-transform", c.card)} style={{ padding: 6 }}>
          <h4 className={cx(c.accent, "font-semibold mb-1 text-sm")}>{w.title}</h4>
          <p className={cx(c.muted, "text-xs mb-2")}>{w.description}</p>
          <ul className="space-y-0.5 mb-3">
            {w.details.map((d, j) => (
              <li key={j} className={cx(c.text, "flex gap-2 text-xs")}>
                <span className={c.green}>▹</span>{d}
              </li>
            ))}
          </ul>
          {w.links.map((link, j) => (
            <a
              key={j}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(c.green, "text-xs hover:underline")}
            >
              ↗ {link.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Main resolver ─── */
export default function CommandOutput({ command, isDark }) {
  const c = t(isDark);

  const render = () => {
    switch (command) {
      case "help":        return <Help isDark={isDark} />;
      case "about":       return <About isDark={isDark} />;
      case "experience":  return <Experience isDark={isDark} />;
      case "projects":    return <Projects isDark={isDark} />;
      case "skills":      return <Skills isDark={isDark} />;
      case "education":   return <Education isDark={isDark} />;
      case "writeups":    return <Writeups isDark={isDark} />;
      case "whoami":
        return <span className={c.yellow}>guest</span>;
      case "ls":
        return (
          <div className="flex flex-wrap gap-4 md:gap-5">
            {["about.txt","experience.log","projects.txt","skills.json","education.dat","writeups.txt"].map((f) => (
              <span key={f} className={f.endsWith("/") ? c.accent : c.text}>{f}</span>
            ))}
          </div>
        );
      case "sudo":
        return (
          <span className={cx(c.muted)}>
            guest is not in the sudoers file. This incident will be reported. 😅
          </span>
        );
      default:
        if (command.startsWith("cd ")) {
          return <span className={c.muted}>cd: {command.split(" ")[1]}: Not a directory</span>;
        }
        if (command.startsWith("cat ")) {
          const file = command.split(" ").slice(1).join(" ");
          const base = file.replace(/\.[^/.]+$/, "").toLowerCase();
          const validCmds = ["about","experience","projects","skills","education","writeups"];
          if (validCmds.includes(base)) {
            return <CommandOutput command={base} isDark={isDark} />;
          }
          return <span className={c.muted}>cat: {file}: No such file or directory</span>;
        }
        return (
          <span>
            <span className="text-red-400">command not found: </span>
            <span className={c.text}>{command}</span>
            <span className={c.muted}> (type &apos;help&apos; for available commands)</span>
          </span>
        );
    }
  };

  return <div className="space-y-4 md:space-y-5 co-wrap">{render()}</div>;
}
