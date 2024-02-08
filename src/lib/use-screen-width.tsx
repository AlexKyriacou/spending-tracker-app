"use client";

import { useState, useEffect } from "react";

export function useScreenWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  const isWindow = typeof window !== "undefined";

  const getWidth = () => (isWindow ? window.innerWidth : windowWidth);

  const resize = () => setWindowWidth(getWidth());

  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth());

      window.addEventListener("resize", resize);

      return () => window.removeEventListener("resize", resize);
    }
  }, [isWindow]);

  return windowWidth;
}

export function useIsMobile() {
  const screenWidth = useScreenWidth();
  return screenWidth < 768;
}