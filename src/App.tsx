import React from "react";
import styles from "./App.module.css";
import { Badge } from "./components/badge/badge";
import { Wizard } from "./components/wizard/wizard";
// import { IPadCursor } from "./components/ipad-cursor/ipad-cursor";
import { Marquee } from "./components/marquee/marquee";
import { SnapScrolling } from "./components/snap-scrolling/snap-scrolling";
import { Zoom } from "./components/zoom/zoom";
import { Slider } from "./components/slider/slider";
import classNames from "classnames";
import { ScrollListener } from "./components/scroll-listener/scroll-listener";
import { Accordion } from "./components/accordion/accordion";
// import { Parallax } from "./components/parallax/parallax";

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
    { name: "Framer Motion Wizard", node: <Wizard /> },
    // { name: "Framer Motion Parallax", node: <Parallax /> },
    {
      name: "Slider",
      node: <Slider />,
    },
    {
      name: "useScroll",
      node: <ScrollListener />,
    },
    {
      name: "Accordion",
      node: <Accordion />,
    },
  ];

  return (
    <div className={styles.root}>
      {components.map(({ name, node }, index) => (
        <div
          className={classNames(styles.item, {
            [styles.off]: name === "Slider",
          })}
        >
          <Badge className={styles.badge} index={index + 1}>
            {name}
          </Badge>
          {node}
        </div>
      ))}
    </div>
  );
}

export default App;
