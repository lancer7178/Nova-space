"use client";

import { useEffect, useState } from "react";

/** One-off check: can this browser create a WebGL context at all? */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Assumes support until proven otherwise (the check only runs in an effect, so
 * the first client render doesn't flash a fallback). Returns false only when a
 * context genuinely can't be created — the cue to show a graceful 2D fallback
 * instead of a broken canvas.
 */
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);
  return supported;
}
