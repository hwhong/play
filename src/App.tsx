import React from "react";
import styles from "./App.module.css";
import { Badge } from "./components/badge/badge";
// import { IPadCursor } from "./components/ipad-cursor/ipad-cursor";
import { Marquee } from "./components/marquee/marquee";
import { SnapScrolling } from "./components/snap-scrolling/snap-scrolling";
import { Zoom } from "./components/zoom/zoom";

interface Content {
  name: string;
  node: React.ReactNode;
}

function App() {
  const components: Content[] = [
    { name: "Marquee", node: <Marquee /> },
    { name: "Snap Scrolling", node: <SnapScrolling /> },
    { name: "Zoom", node: <Zoom /> },
    // { name: "IPad Cursor", node: <IPadCursor /> },
  ];

  return (
    <div className={styles.root}>
      {/* <div className={styles.grid}> */}
      {components.map(({ name, node }, index) => (
        <div className={styles.item}>
          <Badge className={styles.badge} index={index + 1}>
            {name}
          </Badge>
          {node}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
}

export default App;
