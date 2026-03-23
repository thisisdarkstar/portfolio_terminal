# Portfolio Terminal

An interactive, draggable “terminal” portfolio built with Next.js. It renders commands like `about`, `experience`, `projects`, `skills`, `education`, `writeups`, and more, with dark/light themes, realistic window controls, and live terminal size readout.

## Features
- Terminal-like UI with banner, command history, and custom cursor
- Commands: `help`, `about`, `experience`, `projects`, `skills`, `education`, `writeups`, `ls`, `whoami`, `theme`, `clear`
- Window controls: close (reopen chip), minimize (dock pill), maximize/restore, draggable window
- Dynamic cols×rows display based on the visible area
- Dark/light theme toggle
- Glassmorphic terminal shell over a DARKSTAR wallpaper background

## Quick Start
Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project Structure
- `src/app/page.js` – mounts the Terminal with the wallpaper background
- `src/components/Terminal.jsx` – state and orchestration
  - `TerminalHeader.jsx` – title bar, traffic lights, theme toggle
  - `TerminalBody.jsx` – history rendering and input line
  - `TerminalMinimizedBar.jsx` – dock-style minimized pill
  - `TerminalClosedChip.jsx` – reopen chip when closed
  - `CommandOutput.jsx` – renders command responses and sections
- `src/data/*.json` – portfolio content
- `src/app/globals.css` – global styles, scrollbar, wallpaper

## Theming & Controls
- Theme toggle: `theme` command or header pill
- Minimize: yellow button (or dock pill click to restore)
- Maximize/drag: green button to toggle; drag the header when not maximized
- Close: red button; reopen via top-left chip over the wallpaper

## Notes
- No backend required; all data is local JSON.
- Tested with Node 18+.
