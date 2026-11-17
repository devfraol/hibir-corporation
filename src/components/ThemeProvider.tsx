import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";
export type ThemeMode = Theme | "system";
const STORAGE_KEY = "hibir-theme";

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "light", mode: "light", setMode: () => {} });

const systemTheme = (): Theme =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const initialMode = (): ThemeMode => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch { /* Appearance still works when browser storage is unavailable. */ }
  return "light";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [system, setSystem] = useState<Theme>(systemTheme);
  const theme = mode === "system" ? system : mode;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystem(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, mode); } catch { /* Optional preference storage. */ }
  }, [mode]);

  const value = useMemo(() => ({ theme, mode, setMode }), [theme, mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
