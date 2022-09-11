import React from "react";

interface ContextData {
  position: { x: number; y: number };
}

export const CursorContext = React.createContext<ContextData>({
  position: { x: 0, y: 0 },
});
