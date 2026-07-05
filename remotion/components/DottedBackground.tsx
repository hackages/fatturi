import React from "react";
import { AbsoluteFill } from "remotion";

// Texture "pointillés" de la charte, discrète, sur fond sombre.
export const DottedBackground: React.FC<{
  color?: string;
  dot?: string;
  gap?: number;
  opacity?: number;
}> = ({ color = "#1A3A5C", dot = "#E8EDF2", gap = 34, opacity = 0.08 }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: color }}>
      <AbsoluteFill
        style={{
          opacity,
          backgroundImage: `radial-gradient(${dot} 1.6px, transparent 1.7px)`,
          backgroundSize: `${gap}px ${gap}px`,
        }}
      />
    </AbsoluteFill>
  );
};
