# Homepage Hero — Cinematic Engineering Upgrade

Only the homepage hero changes. The navbar, routes, CMS, admin area, SEO, sitemap and robots stay as they are.

## What you will see

- **Same headline, set in two lines:** "ENGINEERING CONNECTIONS / THAT SHAPE TOMORROW". It will be smaller and more controlled than now, with more space around it. The small "HIBIR CONSTRUCTION CORPORATION" label stays above it.
- **Same supporting paragraph** and two buttons: "Explore Our Projects" (goes to /projects) and "Discover Hibir" (goes to /about).
- **Same construction video and poster image,** presented more cinematically:
  - a softer dark gradient on the text side
  - a darker edge (vignette)
  - a faint warm light
  - the busy floating particles and colored glow blobs are removed
- **Subtle 3D depth:**
  - the video sits in a slightly tilted back layer
  - a thin line drawing of a bridge or truss sits in a middle layer
  - the text sits in front
  - on desktop, each layer moves very slightly with the mouse and with scrolling
- **Floating strip at the bottom** replaces the right-hand stat card. It shows four facts:
  - 843+ Staff
  - ETB 25B+ Active Project Contracts
  - GC-1 Contractor Classification
  - Bahir Dar Head Office
- **A small "Scroll to explore" cue** and a soft fade into the next section, so there is no hard edge.
- **Height:** about 92–100% of the screen on desktop. On mobile the height adapts to the content.

## Mobile and tablet
- No mouse-following effect, and much less scroll movement.
- The headline scales down.
- The facts strip becomes a 2×2 grid.
- Buttons are full width and easy to tap.
- Nothing spills sideways.

## Accessibility and speed
- If a visitor has asked their device to reduce motion, the mouse effect, floating movement and blur-in text are turned off.
- The video still pauses when it scrolls off screen.
- Mouse movement is handled without re-rendering the page.
- No new libraries are added.
- The page keeps one H1, with alt text on the poster image and visible keyboard focus.

## Technical details
- `src/components/Hero.tsx` is refactored, with small subcomponents placed alongside it:
  - `HeroBackdrop`: video, poster and overlays
  - `HeroStructure`: an inline SVG truss drawn in `currentColor`, using design tokens
  - `HeroInfoStrip`
- **Parallax:** Framer Motion `useMotionValue`/`useSpring` driven by `pointermove`. It is active only when `(pointer: fine)` matches and reduced motion is off. Scroll depth uses the existing `useScroll`.
- **Stats data:** there is no `companyService` or company CMS hook in this project. The strip therefore reads from the existing single source, `src/data/company.ts`: `companyStats.staff`, `activeContractValueBirr` and `contractorGrade`, plus the head office city. No figures are hardcoded again.
- **Styling:** small token-based CSS additions in `index.css`, such as a hero strip surface and a bottom fade. No hardcoded colors are introduced.
- **Checks:** tests, lint and build, then Playwright screenshots at 1280, 768 and 390 widths. I will also check for horizontal overflow, console errors and that the buttons link correctly.
