import styles from "./App.module.css";
import { Accordion } from "./components/accordion/accordion";
import { AnimatePresenceExample } from "./components/animate-presence/animate-presence";
import { Button } from "./components/button/button";
import { InfiniteCircle } from "./components/infinite-circle/infinite-circle";
// import { IPadCursor } from "./components/ipad-cursor/ipad-cursor";
import { Marquee } from "./components/marquee/marquee";
import { NikeGlobal } from "./components/nike-global/nike-global";
import { ReadCV } from "./components/readcv/readcv";
import { RetoolGrid } from "./components/retool-grid/retool-grid";
import { ScrollListener } from "./components/scroll-listener/scroll-listener";
import { Slider } from "./components/slider/slider";
import { SnapScrolling } from "./components/snap-scrolling/snap-scrolling";
import { Wizard } from "./components/wizard/wizard";
import { Zoom } from "./components/zoom/zoom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

// import { Parallax } from "./components/parallax/parallax";

interface Content {
  name: string;
  node: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={styles.tabPanel}
    >
      {value === index && children}
    </div>
  );
}

function App() {
  const [value, setValue] = React.useState(12);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    {
      name: "Circle",
      node: <InfiniteCircle />,
    },
    {
      name: "Button",
      node: <Button onClick={() => console.log("Blah")} children={1} />,
    },
    {
      name: "Nike Global",
      node: <NikeGlobal />,
    },
    {
      name: "Animate Presence",
      node: <AnimatePresenceExample />,
    },
    {
      name: "Draggable Grid",
      node: <RetoolGrid />,
    },
    {
      name: "Read CV",
      node: <ReadCV />,
    },
  ];

  return (
    <div className={styles.root}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {components.map(({ name }) => (
            <Tab label={name} />
          ))}
        </Tabs>

        {components.map(({ node }, i) => (
          <TabPanel value={value} index={i}>
            {node}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}

export default App;
