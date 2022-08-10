import React from "react";
import styles from "./App.module.css";
import { Marquee } from "./components/marquee/marquee";

function App() {
  return (
    <div className={styles.root}>
      <Marquee />
    </div>
  );
}

export default App;
