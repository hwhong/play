import React from "react";
import styles from "./snap-scrolling.module.css";

export function SnapScrolling() {
  return (
    <>
      <h3>scroll-snap-type: x mandatory</h3>
      <div className={styles.root}>
        {Array.from(Array(25).keys()).map((k) => (
          <div className={styles.item} key={k} />
        ))}
      </div>
    </>
  );
}
