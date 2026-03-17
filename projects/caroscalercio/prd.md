# Product Requirements Document (PRD)

> **Instructions:** This is your project specification. Fill in the sections below to define what you're building.

---

## Project Overview

**Project Name:** Cursor-Man (Pac-Man)

**One-line Description:** A playable Pac-Man style game where you move the Cursor logo through a maze, collect dot icons (Claude code icon), avoid ghosts, and win by eating all dots—with live scoring.

**Type:** Web App (single-page HTML/CSS/JS in one file: `pacman.html`)

**Implementation location:** `/Users/caro/Desktop/Cursor_Test/` — contains `pacman.html` plus assets `cursor-logo.png` and `dot-icon.png`.

---

## Guidelines

### Keep It Small!
- Your MVP should be buildable in **10 minutes**
- Think "proof of concept" not "production ready"
- If it sounds ambitious, make it simpler
- **Use Cursor to help you plan this!**
- This exercise is about learning the git flow and understanding where Cursor's features fit into the SDLC

### Good Project Ideas

**Pong** — classic paddle-and-ball game
- _Example features:_ scoreboard, sound effects, difficulty/speed settings

**Memory Card Match** — flip cards to find matching pairs
- _Example features:_ move counter, timer, win animation/confetti

**Drawing Pad** — simple canvas you can sketch on
- _Example features:_ color picker, brush size slider, eraser tool

**Typing Speed Game** — type a passage and measure your words per minute
- _Example features:_ WPM display, accuracy tracker, difficulty levels

**Trivia Quiz** — multiple choice questions with score tracking
- _Example features:_ timer per question, category selector, results summary screen

### Bad Project Ideas (Too Big!)
- Anything with a database — tell Cursor to avoid this
- Anything requiring authentication
- Anything with multiple pages/screens
- Anything that "needs" an API

---

## Base MVP

> **Status:** Implemented in `/Users/caro/Desktop/Cursor_Test/`.

**What the MVP includes:**
- **Single file:** `pacman.html` — HTML, CSS, and JavaScript in one file; canvas 280×320, pixel-style rendering.
- **Maze:** Programmatic grid maze (walls, open paths). Collect all dots to win; hit a ghost to lose.
- **Player:** Cursor logo (`cursor-logo.png`) as Pac-Man; rotates with direction; black pixels made transparent. Fallback: classic yellow Pac-Man shape if image fails.
- **Collectibles:** Dots use Claude code icon (`dot-icon.png`) with transparent background; fallback: yellow circles. 10 points per dot; score shown at bottom of canvas.
- **Ghosts:** Two ghosts (pink/red with white eyes) that move randomly through the maze. Collision with Pac-Man = Game Over.
- **Controls:** Click canvas to focus, then Arrow keys or WASD to move.
- **Start/End screens:** "Click here, then use Arrow keys or WASD" before start; "YOU WIN!" or "GAME OVER" with final score when the game ends.
- **Assets:** `cursor-logo.png` and `dot-icon.png` in the same folder; open via a local server (e.g. `python3 -m http.server 8000`) so images load.

**What it does NOT include (candidate features):**
- High-score ranking (local leaderboard).
- Multiple levels or difficulty settings.
- Sound effects or music.
- Restart button (refresh page to play again).

---

## Features

> Plan out the features you want to add after the MVP is working. Each feature should be in its own component file to keep things organized.

### Feature 1: Local high-score ranking
- **Description:** On game over, save the score in `localStorage`. Show a "High Scores" list (e.g. top 5 or 10) so players can rank their results—on the game-over overlay or a sidebar.
- **Files to create:** Optional `highScores.js` for read/write; or keep logic in `pacman.html` and add a small UI block for the list.

### Feature 2: Restart button
- **Description:** On "YOU WIN!" / "GAME OVER", add a "Play again" button that resets the maze, score, ghosts, and Pac-Man position without reloading the page.
- **Files to create:** No new file; add a button and a `resetGame()` (or equivalent) that re-runs maze build and state init.

### Feature 3: Second level or difficulty
- **Description:** After winning, offer "Next level" or "Play again" with a different maze layout and/or faster ghost movement.
- **Files to create:** Optional `levels.js` or a levels array in the same file; `buildMaze()` (or similar) takes a level index or layout.

---

## Success Criteria

- [ ] MVP runs locally
- [ ] At least one PR merged to the original repo
- [ ] Features work without breaking the base app
