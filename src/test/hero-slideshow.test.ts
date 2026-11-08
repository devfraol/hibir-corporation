import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useHeroSlideshow } from "@/components/useHeroSlideshow";

describe("hero slideshow behavior", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("advances after seven seconds, not earlier", () => {
    const { result } = renderHook(() => useHeroSlideshow(3, false));
    act(() => vi.advanceTimersByTime(6999));
    expect(result.current.active).toBe(0);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.active).toBe(1);
  });

  it("previous and next wrap through distinct slides", () => {
    const { result } = renderHook(() => useHeroSlideshow(3, false));
    act(() => result.current.navigate(-1));
    expect(result.current.active).toBe(2);
    act(() => result.current.navigate(1));
    expect(result.current.active).toBe(0);
  });

  it("pauses during pointer interaction and resumes with a fresh interval", () => {
    const { result } = renderHook(() => useHeroSlideshow(3, false));
    act(() => result.current.setHovered(true));
    act(() => vi.advanceTimersByTime(14000));
    expect(result.current.active).toBe(0);
    act(() => result.current.navigate(1));
    act(() => result.current.setHovered(false));
    act(() => vi.advanceTimersByTime(6999));
    expect(result.current.active).toBe(1);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current.active).toBe(2);
  });

  it("pauses while keyboard focus is inside the slideshow", () => {
    const { result } = renderHook(() => useHeroSlideshow(3, false));
    act(() => result.current.setFocused(true));
    act(() => vi.advanceTimersByTime(14000));
    expect(result.current.active).toBe(0);
  });

  it("disables automatic progression for reduced motion but permits manual navigation", () => {
    const { result } = renderHook(() => useHeroSlideshow(3, true));
    act(() => vi.advanceTimersByTime(21000));
    expect(result.current.active).toBe(0);
    act(() => result.current.navigate(1));
    expect(result.current.active).toBe(1);
  });

  it("keeps a single approved image static", () => {
    const { result } = renderHook(() => useHeroSlideshow(1, false));
    act(() => vi.advanceTimersByTime(21000));
    act(() => result.current.navigate(1));
    expect(result.current.active).toBe(0);
  });
});