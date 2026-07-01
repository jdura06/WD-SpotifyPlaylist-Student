function scrollToApp() {
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// STEP 1: Define the playlist data object
// =====================================================
const playlistData = {
  focus: [
    {
      title: "Tycho — Awake",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80",
    },
    {
      title: "Lo-fi Beats",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
    },
    {
      title: "Hans Zimmer — Time",
      cover:
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&q=80",
    },
    {
      title: "Bonus: Brian Eno — An Ending",
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80",
    },
  ],
  chill: [
    {
      title: "Frank Ocean — Pink + White",
      cover:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
      title: "SZA — Good Days",
      cover:
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&q=80",
    },
    {
      title: "Daniel Caesar — Best Part",
      cover:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&q=80",
    },
    {
      title: "Bonus: Beach House — Space Song",
      cover:
        "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&q=80",
    },
  ],
  hype: [
    {
      title: "Drake — Nonstop",
      cover:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80",
    },
    {
      title: "Travis Scott — SICKO MODE",
      cover:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80",
    },
    {
      title: "Kanye West — POWER",
      cover:
        "https://images.unsplash.com/photo-1464375117522-1311dd6d0cd1?w=300&q=80",
    },
    {
      title: "Bonus: Run The Jewels — Legend Has It",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
    },
  ],
};

/* DOM ELEMENTS */
const selector = document.getElementById("mood-selector");
const modeSelector = document.getElementById("mode-selector");
const container = document.getElementById("playlist-container");
const feedback = document.getElementById("feedback");
const milestone = document.getElementById("milestone");

// Counts songs removed in the current playlist. Will power
// the milestone tracker you build in Step 10.
let songsRemovedCount = 0;

/* =====================================================
   STEP 2: Basic Event Listener Setup
   What is an event? Why "change" instead of "click"?
   The page reacts when the user does something.
   ===================================================== */
selector.addEventListener("change", buildPlaylist);
modeSelector.addEventListener("change", buildPlaylist);

function buildPlaylist() {
  /* =====================================================
     STEP 3: Getting the Selected Mood
     console.log(selector.value) to show the mood
     ===================================================== */
  const mood = selector.value;
  console.log("Selected mood:", mood);

  if (!mood) {
    feedback.textContent = "Your personalized playlist will appear here.";
    feedback.className = "feedback-box";
    container.innerHTML = "";
    milestone.textContent = "";
    return;
  }

  /* =====================================================
     STEP 4: Dynamic Data Access (⭐ KEY CONCEPT!)
     💡 Emphasize: playlistData[mood] NOT playlistData.focus
     ===================================================== */
  const allSongs = playlistData[mood];
  console.log("Songs for this mood:", allSongs);

  // ===================================================== //
  // STOP. INSTRUCTOR DEMO ENDS HERE — DEV TEAMS BUILD STEPS 5-10 BELOW. //
  // ===================================================== //

  /* =====================================================
     DEV TEAMS — STEP 5: Listening Mode Logic
     (Your instructor didn't demo this one live — here's
     everything you need to figure it out as a team.)

     🟦 THIS IS THE SAME PATTERN AS A DIFFICULTY MODE.
     In your charity: water game, "Easy / Normal / Hard"
     will change things like time limits, win conditions,
     or how many drops the player needs to collect. The
     shape of the code is identical to what you'll write
     below — only the names change.

     WHAT THIS STEP NEEDS TO DO:
     Look at #mode-selector in index.html. It has two
     options: value="quickPlay" and value="fullSession".
     - "Quick Play" should use only the FIRST 3 songs from
       allSongs.
       (Hint: arrays have a .slice(start, end) method.)
     - "Full Session" should use ALL the songs in allSongs,
       bonus track included.

     WORKED MINI-EXAMPLE (same shape, different scenario):
       let lives;
       if (difficulty === "easy") {
         lives = 5;
       } else if (difficulty === "hard") {
         lives = 1;
       }
     Notice: one variable declared, then ASSIGNED a
     different value depending on the condition. You need
     a variable called `songs` that gets assigned the same
     way, based on `mode`.

     🤔 GUIDING QUESTION FOR YOUR TEAM:
     If you added a third mode (e.g. "shuffleMode"), what
     would you add — another `else if`? What should it set
     `songs` to? Talk through it before you code your
     game's difficulty modes.

     YOUR CODE GOES HERE:
     1. Get the selected mode from modeSelector.value
     2. Declare a `songs` variable
     3. Write an if / else if that assigns `songs` based on
        the mode
     ===================================================== */

  const selectedMode = document.getElementById("mode-selector");
  const selectedValue = selectedMode.value;

  let songs;
  if (selectedValue === "quickPlay") {
    songs = allSongs.slice(0, 3);
  } else {
    songs = allSongs;
  }

  /* =====================================================
     DEV TEAMS — STEP 6: Conditional Feedback
     (Also not demoed live — read closely before building
     your own win/lose message.)

     🟦 SAME PATTERN as a "You Win!" / "Try Again" message
     in your game: a conditional that changes BOTH the TEXT
     and the STYLE (CSS class) of one element, based on a
     condition.

     WHAT THIS STEP NEEDS TO DO:
     - Clear the previous playlist: container.innerHTML = ""
     - Reset songsRemovedCount to 0 and clear milestone text
       (so a fresh playlist starts its milestone count over)
     - Check if `songs.length === 0`:
         - If true: set feedback.textContent to a "no songs
           found" message, and feedback.className to
           "feedback-box error"
         - If false: set feedback.textContent to a message
           that includes how many songs loaded (look at the
           .feedback-box element in index.html for styling
           hooks), and feedback.className to
           "feedback-box success"

     WORKED MINI-EXAMPLE (same shape, different scenario):
       if (dropsCollected >= goal) {
         message.textContent = "You win!";
         message.className = "feedback-box success";
       } else {
         message.textContent = "Try again!";
         message.className = "feedback-box error";
       }
     Notice: TWO things change together inside each branch —
     the text AND the class. That's the pattern to copy.

     🤔 GUIDING QUESTION FOR YOUR TEAM:
     What condition will YOUR game check — a score, a timer
     running out, a number of drops collected? What are the
     two things (text + class) that should change in each
     branch?

     YOUR CODE GOES HERE:
     ===================================================== */
  container.innerHTML = "";
  songsRemovedCount = 0;
  if (songs.length === 0) {
    feedback.textContent = "No songs found.";
  } else {
    feedback.textContent = `${songs.length} songs loaded!`;
    feedback.className = "feeddback-box success";
  }

  /* =====================================================
     DEV TEAMS — STEP 7: The Loop (⭐⭐⭐ MOST IMPORTANT!)

     WHAT THIS STEP NEEDS TO DO:
     Loop through your `songs` array (try .forEach) so that
     Steps 8 and 9 run once per song.

     🤔 GUIDING QUESTION FOR YOUR TEAM:
     What two things does .forEach give you access to
     inside its callback function? You'll need at least one
     of them for Step 8.

     YOUR CODE GOES HERE:
     ===================================================== */

  songs.forEach((song) => {
    console.log(song.title);
  });

  /* =====================================================
       DEV TEAMS — STEP 8: Create and Display DOM Elements

       WHAT THIS STEP NEEDS TO DO (for each song):
       - Create a <div> with className "song-row"
       - Create an <img> — set its src to song.cover and
         alt to song.title
       - Add image fallback protection: if the image fails
         to load, set this.src to
         "https://placehold.co/60x60?text=Music"
         (Hint: img.onerror = function () { ... })
       - Create a <span> with the song title as its text
       - Create a <span> with className "remove-hint" and
         text "click to remove"
       - Append the img and both spans to the row, then
         append the row to `container`

       🤔 GUIDING QUESTION FOR YOUR TEAM:
       Which DOM method creates a new element? Which method
       puts a child element inside a parent element?

       YOUR CODE GOES HERE:
       ===================================================== */
  songs.forEach((song) => {
    // song div
    const newDiv = document.createElement("div");
    newDiv.className = "song-row";
    // song image
    const newImg = document.createElement("img");
    newImg.src = song.cover;
    newImg.alt = song.title;
    newImg.onerror = function () {
      newImg.src = "https://placehold.co/60x60?text=Music";
    };
    const songSpan = document.createElement("span");
    songSpan.textContent = song.title;
    const hintSpan = document.createElement("span");
    hintSpan.className = "remove-hint";
    hintSpan.textContent = "click to remove";

    newDiv.appendChild(newImg);
    newDiv.appendChild(songSpan);
    newDiv.appendChild(hintSpan);
    container.appendChild(newDiv);

    /* =====================================================
       DEV TEAMS — STEP 9: DOM Element Removal on Click
       🟦 DIRECT PRACTICE for your game's "DOM Element
       change/add/remove" requirement. This is the EXACT
       pattern you'll use to make a drop disappear when a
       player clicks it.

       WHAT THIS STEP NEEDS TO DO:
       - Add a "click" event listener to the row you just
         built
       - On click: add the CSS class "removing" to the row
         (check styles.css — this triggers a fade/slide
         transition)
       - After a short delay (try setTimeout, ~200ms to
         match the CSS transition), actually remove the row
         from the DOM (Hint: element.remove())
       - Increment songsRemovedCount
       - Call updateMilestone() (you'll write this in Step 10)

       🤔 GUIDING QUESTION FOR YOUR TEAM:
       Why do we add a class AND wait, instead of just
       calling .remove() immediately? What would the user
       see if we skipped the delay?

       YOUR CODE GOES HERE:
       ===================================================== */
    newDiv.addEventListener("click", function () {
      newDiv.classList.add("removing");
      setTimeout(200);
      song.remove;
      songsRemovedCount++;
      //updateMilestone();
    });
  });
  // (Make sure your Step 7 loop closes here.)

  /* =====================================================
     DEV TEAMS — STEP 10: Milestone Tracking (Bonus pattern)
     🟦 DIRECT PRACTICE for the optional "Track and Display
     Milestones" bonus — an array of milestone objects
     checked with a conditional, just like you'd use to
     celebrate a player hitting 5, 10, or 20 drops collected.

     WHAT THIS STEP NEEDS TO DO:
     - Write a function called updateMilestone()
     - Inside it, create an array of milestone objects, each
       with a `count` and a `message`, e.g.:
         { count: 1, message: "🎵 First song cleared!" }
     - Loop through that array (try .forEach) and check: if
       songsRemovedCount matches a milestone's count, set
       milestone.textContent to that milestone's message

     🤔 GUIDING QUESTION FOR YOUR TEAM:
     What milestone counts make sense for YOUR game? If a
     player can collect a maximum of 10 drops, what are 2-3
     meaningful checkpoints worth celebrating along the way?

     YOUR CODE GOES HERE:
     ===================================================== */
  function updateMilestone() {}
}
