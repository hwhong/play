import React, { useState } from "react";
import { CursorContext } from "./context";
import { Cursor } from "./cursor";
import styles from "./ipad-cursor.module.css";

export function IPadCursor() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  return (
    <div
      className={styles.root}
      onMouseMove={(e) => {
        setMousePos({ x: e.pageX, y: e.pageY });
      }}
    >
      <CursorContext.Provider
        value={{ position: { x: mousePos.x, y: mousePos.y } }}
      >
        <Cursor />
      </CursorContext.Provider>
    </div>
  );
}
