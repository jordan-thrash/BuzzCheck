# BuzzCheck Game Development Guardrails

When generating or refactoring mini-games for the BuzzCheck application, **YOU MUST ADHERE TO THE FOLLOWING PRINCIPLES**. These rules are non-negotiable to ensure the app maintains its "party foul" difficulty curve and engaging user experience.

## 1. The "No Binary Scoring" Rule (Gradient Scoring)
Never design a game that defaults to a simple Pass/Fail (0 or 10) outcome unless absolutely necessary. Scoring must be a spectrum based on performance.

* **BAD:** `if (success) return 10; else return 0;`
* **GOOD (Proximity):** Calculate distance from target. `score = 10 - (distance / tolerance);`
* **GOOD (Progress):** Partial credit for steps completed. `score = (stepsCompleted / totalSteps) * 10;`
* **GOOD (Time-Based):** `score = (timeRemaining / totalTime) * 10;`

**Requirement:** Always use `Math.max(0, ...)` and `Math.min(10, ...)` to keep scores within bounds, but ensure the middle ground (1-9) is achievable.

## 2. The "Sober Focus" Baseline (Difficulty Tuning)
The games must be challenging even for a sober user. A score of 10/10 should require genuine focus and dexterity. If a game feels "easy," it is broken.

* **Add Entropy:** Never use static positions. Targets should jitter, drift, or move in sine waves.
* **Sensory Overload:** Increase the number of distractors (e.g., if finding 1 item, hide it among 48, not 10).
* **Tighten Windows:** Hit boxes and timing windows should be unforgiving (e.g., < 150ms reaction time, < 5px alignment error).
* **Anti-Muscle Memory:** Randomize start positions, target locations, and movement speeds every single round.

## 3. Time Pressure & Penalties
Timers are mandatory for almost every game to induce stress.

* **The Timer Rule:** If a game involves logic or sorting, add a countdown (usually 10-20s).
* **The Penalty Rule:** Mistakes should rarely be instant "Game Overs." Instead, they should penalize the timer or the score.
    * *Example:* Tapping the wrong letter subtracts 2.0 seconds from the clock.
    * *Example:* Going off the line drains a "Health Bar" rather than instantly failing.
* **Speed Bonus:** If the user finishes early, the remaining time should act as a multiplier or bonus added to their accuracy score.

## 4. Chaos & "Juice" (Game Feel)
Avoid static, boring interfaces. The game should feel slightly "unstable" or "soupy" to mimic the theme.

* **Movement:** Elements should float, bounce, or drift (use simple physics or sine waves in `requestAnimationFrame`).
* **Feedback:** Visual feedback on interactions is required.
    * *Tap:* Elements should scale down or flash.
    * *Fail:* Screen shake or red flash.
    * *Success:* Particles or green flash.
* **Visual Noise:** Use emojis or distinct icons instead of abstract shapes.

## 5. Implementation Patterns
* **State Management:** Use `useRef` for high-frequency updates (game loops, timer intervals) to avoid React render lag, then sync to `useState` for UI updates.
* **No Canvas:** **Do NOT use HTML5 `<canvas>`.** Use standard DOM elements (`div`, `span`) or SVG for all game rendering to ensure consistent styling with Tailwind CSS and better accessibility/scaling on mobile.
* **Cleanup:** Always clear intervals and animation frames in the `useEffect` cleanup return.
* **Responsiveness:** All games must rely on percentages (`%`) or relative units for positioning to ensure they work on mobile screens. Never use fixed pixel coordinates for game logic boundaries.