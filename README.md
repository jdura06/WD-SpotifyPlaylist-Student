# Mood Mixtape — Dev Team Guide

Welcome back! Your instructor just walked you through **Steps 1–4** of
`script.js` live — the data object, the event listener, and the dynamic
property access trick (`playlistData[mood]`). Now it's your team's turn to
finish the app.

This file explains how to set up the project, what's already done, what you
need to build, and how each piece maps to your **charity: water** game
project.

---

## 1. Project setup

You need three files in the same folder:

```
your-project/
├── index.html
├── styles.css
└── script.js   ← you'll be editing this one
```

`index.html` and `styles.css` should already be provided to you — **don't
edit those** unless your instructor tells you to. All your work happens
inside `script.js`.

To run the project: open `index.html` in your browser (double-click it, or
use a tool like VS Code's Live Server extension). Open your browser's
DevTools console (`F12` or right-click → Inspect → Console) — you'll be
using `console.log()` a lot to check your work.

### A note on IDs and classes

Your `script.js` file expects these elements to already exist in
`index.html`. If something isn't working, check that these IDs match exactly:

| Element | ID/Class used in JS |
|---|---|
| Mood dropdown | `#mood-selector` |
| Mode dropdown | `#mode-selector` |
| Where songs get rendered | `#playlist-container` |
| Feedback message | `#feedback` |
| Milestone message | `#milestone` |
| Each song's wrapper | `.song-row` (CSS class, not ID) |
| Removal animation trigger | `.removing` (CSS class) |
| "click to remove" label | `.remove-hint` (CSS class) |

If you ever get a console error like `Cannot read properties of null`, it
almost always means one of these IDs doesn't match between your HTML and JS.
Check that first before anything else.

---

## 2. What's already done for you (Steps 1–4)

Don't touch these — they're the foundation everything else builds on.

- **Step 1 — `playlistData`**: an object where each mood (`focus`, `chill`,
  `hype`) holds an array of song objects (`title` + `cover`).
- **Step 2 — Event listeners**: both dropdowns call `buildPlaylist()`
  whenever their value changes.
- **Step 3 — Reading the mood**: `selector.value` grabs whatever the user
  picked.
- **Step 4 — Dynamic property access**: `playlistData[mood]` looks up the
  right array of songs based on whatever string is in `mood` — **not**
  `playlistData.focus`, which would only ever return the focus playlist no
  matter what the user picked. This is the single most important concept in
  the whole file. If you're shaky on it, ask before moving on.

Everything below this point — marked `STOP. INSTRUCTOR DEMO ENDS HERE` — is
yours to build.

---

## 3. What your team builds (Steps 5–10)

Work through these **in order**. Each one builds on the last, so skipping
ahead will likely break things. For each step, the comment block in
`script.js` gives you:

- **What this step needs to do** — a plain-language checklist
- **A worked mini-example** — the same code *shape*, using a different
  scenario, so you can see the pattern before writing your own version
- **A guiding question** — talk it through with your team before coding
- **Where to write your code** — marked with `YOUR CODE GOES HERE`

### Step 5 — Listening Mode Logic
Build the `if / else if` that decides which songs to show based on
`modeSelector.value` (`"quickPlay"` → first 3 songs, `"fullSession"` → all of
them).

**Rubric connection:** this is the exact shape you'll use for **Difficulty
Modes** in your game — instead of `"quickPlay"` vs `"fullSession"`, you'll
check something like `"easy"` vs `"hard"` and change lives, time limits, or
win conditions instead of song counts.

### Step 6 — Conditional Feedback
Clear the old playlist, reset your milestone counter, then set the
feedback message's text *and* CSS class depending on whether any songs were
found.

**Rubric connection:** this is the same shape as a win/lose message in your
game. Two things change together in each branch — the **text** and the
**class** — every time.

### Step 7 — The Loop
Loop through your `songs` array so Steps 8 and 9 run once per song.

**Rubric connection:** this loop pattern is how you'll render anything
repeated in your game — falling drops, score entries, whatever you're
generating dynamically.

### Step 8 — Create and Display DOM Elements
For each song: build a row `<div>`, an `<img>`, and two `<span>`s, then
attach them to the page. Don't forget the image fallback (`onerror`) so
broken image links don't break the layout.

### Step 9 — DOM Element Removal on Click
Add a click listener to each row: add the `"removing"` class, wait ~200ms for
the CSS transition, then actually remove the element and update your
milestone counter.

**Rubric connection:** this is **directly** the "DOM Element change/add/remove"
rubric line — the exact pattern for making a drop disappear when a player
clicks it in your game.

### Step 10 — Milestone Tracking (Bonus)
Write `updateMilestone()`: an array of `{ count, message }` objects, looped
and checked against `songsRemovedCount`.

**Rubric connection:** this is the bonus "Track and Display Milestones" line
— the same pattern works for celebrating a player hitting 5, 10, or 20 drops
collected.

---

## 4. Testing as you go

Don't write all six steps and then test once — you'll have a hard time
finding the bug. Instead:

1. Write Step 5. Reload the page, pick a mood, check the console — does
   `songs` look right? (Add a temporary `console.log(songs)` if you want to
   check, then remove it once it works.)
2. Write Step 6. Pick a mood — does the feedback message and color change
   correctly?
3. Write Steps 7–8 together (the loop won't do anything useful without the
   element-creation code inside it). Reload — do song rows actually appear?
4. Write Step 9. Click a row — does it fade and disappear?
5. Write Step 10. Remove a few songs — does a milestone message show up at
   the right counts?

---

## 5. Common mistakes to watch for

- **Using `playlistData.mood` instead of `playlistData[mood]`** — this is
  the #1 bug from Step 4 carrying forward. `mood` is a variable holding a
  string; you need square brackets to use its *value* as the key.
- **Forgetting to reset `songsRemovedCount` and clear `milestone.textContent`
  in Step 6** — without this, milestones from a previous playlist will carry
  over into a new one.
- **Calling `.remove()` immediately instead of after the `setTimeout`** —
  this skips the fade-out animation entirely; the row will just vanish.
- **Mismatched class names** — double-check you're using the exact strings
  `"song-row"`, `"removing"`, and `"remove-hint"` (typos won't throw errors,
  they'll just silently fail to style anything).
- **Forgetting to close your Step 7 loop** before Step 10's code — Step 10
  should run *once*, after the loop finishes, not once per song.

---

## 6. When you move to your charity: water project

Everything you build here is meant to be **adapted, not copy-pasted**. Ask
your team, for each step: *"What's the equivalent of this in our game?"*

| This lab | Your game |
|---|---|
| Mood → playlist | Difficulty → game rules |
| Song count by mode | Win condition / time limit by difficulty |
| Feedback message on playlist load | Win/lose message |
| Click a song to remove it | Click a drop to collect/remove it |
| Milestone messages on songs removed | Milestone messages on drops collected |

If you get stuck translating a pattern from this lab into your game, that's
a great question for Drop-In Hours or the HelpHub — bring both files and ask
"how do I turn this into that?"

Good luck — have fun with it!
