# AGENTS.md

## Project Overview
This repository is for a browser-based dark fantasy adventure game built as a static website.

This game is **not** primarily a combat game.
It is primarily a:
- story-driven retro RPG
- choice-driven dark fantasy adventure
- character-development game
- branching narrative experience
- exploration-focused cursed-world game

The goal is to create a game that feels like:
- an eerie old-school Nintendo RPG
- a dark choose-your-own-adventure book with movement and exploration
- a strange prophetic fantasy world where choices matter
- a memorable retro experience powered by writing, atmosphere, music, and consequences

## Core Creative Direction
The game should feel:
- eerie
- melancholic
- mysterious
- ominous
- old-school
- readable
- immersive

The emotional tone should lean toward:
- cursed prophecy
- dying kingdom
- forgotten shrines
- broken faith
- strange followers
- morally dangerous choices
- power with consequences
- loneliness, devotion, corruption, and fate

The player is not a generic hero.
The player is someone drawn into a role that may be holy, false, cursed, manipulated, or all of the above.

## Core Design Rule
**Story, choices, atmosphere, and character development come before combat.**

If a design decision must choose between:
- deeper story choice
- better world reactivity
- stronger character writing
- more emotional atmosphere

or:

- more combat mechanics
- more enemy complexity
- more action systems

choose the story/atmosphere side first.

## Platform Constraints
This project must run as a static browser game hosted on GitHub Pages.

That means:
- no backend
- no server database
- no required build step for normal gameplay
- no Node dependency required to run the game
- no framework unless explicitly requested
- must work with plain browser HTML, CSS, and JavaScript

Use:
- HTML
- CSS
- JavaScript

Prefer:
- simple browser-safe code
- modular separate files
- easy editing
- GitHub Pages compatibility at all times

## Primary Gameplay Pillars
The main pillars of the game are:

1. Story
2. Choices
3. Consequences
4. Character development
5. Atmosphere
6. Exploration
7. Save persistence
8. Light tension/conflict systems
9. Combat only when useful

## Game Structure Direction
The game should be built around:
- areas or scenes to explore
- NPC interactions
- dialogue trees
- meaningful player choices
- world-state changes
- evolving player identity
- branching outcomes
- recurring themes and consequences

This is closer to:
- a narrative RPG
- a branching dark fantasy quest
- an exploration-based story game

It is **not** meant to become a button-mashing action game.

## Narrative Design Principles
Choices must matter.

Choices should:
- affect future dialogue
- alter relationships
- unlock or block scenes
- change how NPCs speak to the player
- increase or decrease stats/traits
- shape future opportunities
- produce delayed consequences
- contribute to different endings

Avoid fake choices that all lead to the same result unless absolutely necessary.

The player should feel that they are becoming someone through decisions.

## Character Development Direction
Character development should come more from decisions and relationships than combat stats.

Important player variables may include:
- corruption
- mercy
- conviction
- fear
- influence
- devotion
- doubt
- followerCount
- gold
- relicsOwned
- trust with key NPCs

Examples of identity-shaping directions:
- merciful but weak
- feared and powerful
- manipulative prophet
- reluctant chosen one
- devoted believer
- cynical survivor
- corrupted savior
- false messiah
- destroyer of old faith
- protector at terrible cost

Do not reduce character progression to just:
- more HP
- better sword
- higher damage

That can exist, but it must stay secondary.

## World-State Direction
The world should react to the player.

Track persistent story flags and relationship states such as:
- sparedPilgrim
- burnedShrine
- acceptedRelic
- liedToOracle
- recruitedGravedigger
- villageTrust
- cultInfluence
- chapelCorruption
- sawHiddenVision
- openedCatacombs

These flags should change:
- future dialogue
- available choices
- NPC behavior
- available areas
- tone of scenes
- endings and later events

A good story game remembers what the player did.

## Exploration Direction
Exploration should support mood and story.

Areas should feel like:
- ruined villages
- dead woods
- shrines
- catacombs
- abandoned roads
- torch-lit halls
- foggy edges of the world
- forgotten sacred places

Exploration does not need to be huge at first.
It needs to be meaningful, readable, and atmospheric.

Even a small map can feel powerful if it includes:
- strong writing
- visual identity
- hidden lore
- reactive NPCs
- choices with consequence

## Dialogue Direction
Dialogue is one of the most important systems in the game.

Dialogue should:
- reveal character
- build tension
- provide choices
- alter relationships
- trigger story flags
- shape player identity

Dialogue should not all sound the same.
Different NPCs should have distinct voices, rhythms, and attitudes.

Examples:
- fearful villager
- bitter knight
- soft-spoken heretic
- manipulative priest
- calm but unnerving oracle
- loyal but unstable follower

## Audio Direction
Audio is important in this project and should support atmosphere heavily.

The intended audio style is:
- eerie old-school RPG music
- retro Nintendo-style mood
- haunting loopable background tracks
- minimal but memorable melodic lines
- dark fantasy ambience
- simple, creepy, nostalgic emotional tone

Music should feel like:
- cursed village themes
- ancient shrine loops
- lonely road music
- strange sacred places
- low-key dread rather than loud chaos

Audio should be used to make simple visuals feel richer.

### Dialogue Text Sound Direction
Text boxes should support classic retro RPG-style speaking sounds.

When dialogue text appears, the game may use:
- beeps
- blips
- boops
- bloops
- short generated tone sounds

These sounds should:
- be subtle
- be low volume
- not trigger on every character at full intensity
- vary by NPC type when practical
- support immersion instead of annoying the player

Examples:
- villager = quick light beeps
- priest = lower slower blips
- oracle = airy strange tones
- child/follower = slightly higher tones

Include support for:
- text sound toggle on/off
- music toggle on/off
- later volume controls if practical

### Audio Technical Direction
For audio:
- background music can use looped audio files
- dialogue blips can use short audio files or Web Audio API
- do not rely on autoplay before user interaction
- start music after player input such as pressing Start Game

## Visual Direction
The visual direction should be:
- retro
- pixel-inspired
- dark fantasy
- readable
- moody
- simple and strong rather than flashy

Use:
- dark backgrounds
- muted palettes
- bone, ash, deep red, faded gold, dirty green, candlelight colors
- strong readable text
- clean UI boxes
- old-school panel layouts
- UI that feels like a game, not a product landing page

Avoid:
- modern corporate web design
- glassmorphism
- startup-looking buttons
- generic SaaS layouts
- overpolished modern app aesthetics

The page should feel like a game from the moment it loads.

## UI Direction
The UI should prioritize:
- readability
- mood
- retro feel
- clean text presentation
- story delivery
- easy interaction

Important UI elements may include:
- title screen
- dialogue box
- name of current speaker
- choice list
- player stats panel
- current area label
- save/load access
- simple gold/follower/resource indicators

The dialogue box is a major visual feature and should feel deliberate and atmospheric.

## Combat Direction
Combat is optional, limited, and secondary.

Combat should only exist if it improves:
- tension
- pacing
- danger
- consequence
- story moments

If combat is included, keep it:
- simple
- readable
- lightweight
- expandable later
- less important than story systems

Do not spend major development time on advanced combat systems early.

Acceptable early combat approaches:
- simple top-down contact/attack system
- event-based conflict resolution
- choice-based conflict encounters
- stat-influenced danger outcomes

Combat should never overwhelm the narrative focus.

## Save System
Use `localStorage` for save data unless explicitly told otherwise.

The save system should support:
- player name
- current area/scene
- character variables
- relationship states
- gold
- follower count
- key story flags
- relics or important items
- major route choices

Do not casually break old save data.
If save structure changes, preserve compatibility when practical or clearly document migration logic.

## Technical Style Rules
- Keep code readable
- Comment important logic
- Use descriptive names
- Prefer small clear functions
- Avoid overengineering
- Avoid adding libraries without a real reason
- Do not convert this into React, Vue, TypeScript, canvas engines, or a complicated architecture unless explicitly requested
- Preserve GitHub Pages compatibility
- Keep code easy for a non-expert repo owner to edit

## File Structure Goals
Preferred structure as the project grows:

- `index.html` = main page
- `style.css` = global styles
- `game.js` = core game startup and state flow
- `dialogue.js` = dialogue logic
- `choices.js` = branching choices and consequence handling
- `story.js` = story scene data and narrative content
- `state.js` = player stats and world state
- `save.js` = localStorage save/load
- `audio.js` = music and dialogue blips
- `ui.js` = HUD, text box, menus, stat panels
- `world.js` = area/scene navigation if needed
- `assets/` = images/audio
- `assets/audio/` = music and sfx
- `assets/ui/` = interface visuals
- `assets/sprites/` = pixel art if used

Smaller early versions are fine, but build toward clear separation.

## What to Avoid
Do NOT:
- turn this into a generic action RPG
- overbuild combat before story works
- add random libraries
- create huge systems before a playable story loop exists
- replace the mood with generic fantasy clichés
- make every character sound the same
- use fake choices too often
- clutter the interface
- use bland placeholder text everywhere
- casually rename files or break structure
- rewrite working systems unnecessarily
- design the page like a corporate website

## Working Style for Changes
When making changes:
- preserve the dark retro narrative direction
- explain what files changed
- provide complete file replacements when practical
- otherwise provide exact copy-paste blocks with clear placement instructions
- keep implementations grounded and actually usable
- improve structure instead of making file chaos
- keep future expansion in mind without overcomplicating the current build

## Early Milestone Priority
The first strong playable version should include:

1. title screen
2. eerie intro/lore text
3. one starting area or scene
4. dialogue box system
5. speaker name display
6. choice system
7. at least one meaningful branching NPC interaction
8. world-state tracking
9. player trait tracking
10. save/load system with localStorage
11. atmospheric visual style
12. basic music support
13. dialogue blip support or placeholder system for it

## First Playable Loop
The first useful playable loop should look something like:

- start game
- read intro
- enter first area
- meet NPC
- choose response
- alter story state
- unlock next scene or consequence
- save progress
- continue shaping identity

That is more important than combat.

## Long-Term Expansion
After the first playable story-driven version is solid, the game can expand with:
- multiple areas
- more NPCs
- relationship systems
- relics with consequences
- branching scenes
- follower/cult mechanics
- shrine/ritual choices
- alternate routes
- hidden lore
- multiple endings
- rare simple combat encounters
- bosses only when story earns them

## Output Expectations
When asked to build or revise something:
- prioritize working code
- prioritize story systems first
- give complete code when practical
- clearly state where code belongs
- keep changes compatible with the rest of the repo
- preserve style, tone, and structure
- make the result feel like a real eerie retro narrative RPG

## Final Direction Summary
This project should become:
- a dark fantasy retro narrative adventure
- a choice-driven RPG with consequence and atmosphere
- a game where music, writing, dialogue, and identity matter more than combat
- a static browser game that feels eerie, memorable, and genuinely alive
