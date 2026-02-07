# 22 – Dark Mode Toggle

## Problem

Build a **dark mode** toggle: switch between light and dark theme; persist preference in localStorage; apply class or CSS variables to root so entire app reflects theme.

## Requirements

- **Toggle:** Button or switch toggles theme (light ↔ dark). Show current theme (icon or label).
- **Apply:** Theme applied to whole app (e.g. class "dark" on document.documentElement or body, or CSS variables --bg, --text).
- **Persistence:** Save preference (e.g. "theme": "dark") in localStorage; on load read and apply before first paint if possible (script in head or default to light then update).
- **Optional:** Respect system preference (prefers-color-scheme: dark) as default when no saved preference.

## Approach / Hints

- **State:** `theme: 'light' | 'dark'`. Toggle: setTheme(t => t === 'light' ? 'dark' : 'light'). Sync to document: useEffect that sets document.documentElement.className = theme or data-theme={theme}, and to localStorage.
- **Initial read:** useState(() => localStorage.getItem('theme') || 'light') or matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'. Then useEffect to apply to DOM.
- **CSS:** .dark { --bg: #1a1a1a; --text: #eee; } body { background: var(--bg); color: var(--text); }

## Component structure (suggestion)

- `ThemeProvider` – state theme; context value { theme, setTheme }; useEffect to apply class and localStorage; render children.
- `ThemeToggle` – consumes context; button toggles setTheme.
- Optional: read prefers-color-scheme and set initial theme.

## Solution

```jsx
import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button onClick={() => setTheme(next)}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

// In index.css or global: [data-theme="dark"] { --bg: #1a1a1a; --text: #eee; }
// body { background: var(--bg); color: var(--text); }
export { ThemeProvider, ThemeToggle };
```

## React concepts tested

- useState, useEffect (side effect to DOM and localStorage).
- Context (theme + setter).
- Optional: lazy initial state from localStorage.
