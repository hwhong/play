import React from "react";
import { CursorContext } from "./context";
import styles from "./cursor.module.css";

export function Cursor() {
  const { position } = React.useContext(CursorContext);
  return (
    <div
      className={styles.root}
      style={{
        left: position.x,
        top: position.y,
        width: "24px",
        height: "24px",
      }}
    />
  );
}
