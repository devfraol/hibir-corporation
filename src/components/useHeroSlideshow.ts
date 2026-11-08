import { useCallback, useEffect, useState } from "react";

export const HERO_SLIDE_INTERVAL = 7000;

export function useHeroSlideshow(count: number, reducedMotion: boolean) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [navigation, setNavigation] = useState(0);

  useEffect(() => {
    const update = () => setVisible(document.visibilityState !== "hidden");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (count < 2 || reducedMotion || hovered || focused || !visible) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % count), HERO_SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [count, reducedMotion, hovered, focused, visible, navigation]);

  const navigate = useCallback((direction: number) => {
    if (count < 2) return;
    setActive(value => (value + direction + count) % count);
    setNavigation(value => value + 1);
  }, [count]);

  return { active, navigate, setHovered, setFocused };
}