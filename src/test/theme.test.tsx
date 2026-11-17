import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

describe("appearance preferences", () => {
  let onChange: ((event: { matches: boolean }) => void) | undefined;
  beforeEach(() => {
    localStorage.clear();
    onChange = undefined;
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      matches: true,
      addEventListener: (_: string, listener: typeof onChange) => { onChange = listener; },
      removeEventListener: vi.fn(),
    })));
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it("defaults to light even on a dark device", () => {
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    expect(result.current.mode).toBe("light");
    expect(result.current.theme).toBe("light");
  });
  it("allows explicit dark and light choices independently of the device", () => {
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    act(() => result.current.setMode("dark"));
    expect(result.current.theme).toBe("dark");
    act(() => result.current.setMode("light"));
    expect(result.current.theme).toBe("light");
  });
  it("follows device changes only when system is selected", () => {
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    act(() => result.current.setMode("system"));
    expect(result.current.theme).toBe("dark");
    act(() => onChange?.({ matches: false }));
    expect(result.current.theme).toBe("light");
    act(() => result.current.setMode("dark"));
    act(() => onChange?.({ matches: true }));
    act(() => onChange?.({ matches: false }));
    expect(result.current.theme).toBe("dark");
  });
  it("remembers the selected appearance after remounting", () => {
    const first = renderHook(useTheme, { wrapper: ThemeProvider });
    act(() => first.result.current.setMode("dark"));
    first.unmount();
    const { result } = renderHook(useTheme, { wrapper: ThemeProvider });
    expect(result.current.mode).toBe("dark");
    expect(result.current.theme).toBe("dark");
  });
});