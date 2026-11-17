# Project conventions

- Keep homepage hero copy in the existing locale message dictionaries and use localized route helpers for its links, so edits preserve English/Amharic navigation without coupling presentation to company statistics.
- Keep hero slideshow timing and interaction state in a separately tested hook, so reduced motion and pause/resume behavior stay independent of presentation.
- Keep resolved appearance and browser-saved appearance choice in ThemeProvider, with a single navbar selector; this preserves consistent themes across routes and isolates system preference handling from presentation.