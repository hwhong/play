import React from "react";
import styles from "./App.module.css";
import { Marquee } from "./components/marquee/marquee";
import { SnapScrolling } from "./components/snap-scrolling/snap-scrolling";

function App() {
  return (
    <div className={styles.root}>
      <Marquee />
      <SnapScrolling />
    </div>
  );
}

export default App;
