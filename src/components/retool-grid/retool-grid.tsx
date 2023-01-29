import Draggable from "./draggable";
import styles from "./retool-grid.module.css";
import React from "react";

export function RetoolGrid() {
  return (
    <div className={styles.root}>
      <Draggable n={80}>
        <div className={styles.elem}></div>
      </Draggable>
    </div>
  );
}
