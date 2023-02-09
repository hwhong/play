import styles from "./marquee.module.css";
import React from "react";

export function Marquee() {
  return (
    <div className={styles.root}>
      <ul className={styles.contentWrapper}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>

      <ul aria-hidden="true" className={styles.contentWrapper}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
  );
}
