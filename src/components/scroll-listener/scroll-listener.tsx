import { motion, useScroll } from "framer-motion";
import React, { useRef } from "react";
import styles from "./scroll-listener.module.css";

export function ScrollListener() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: rootRef });

  return (
    <div className={styles.root} ref={rootRef}>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className={styles.progress}
      />
      <div className={styles.blocksWrapper}>
        {Array.from(Array(100).keys()).map((k) => (
          <div className={styles.block}>{k}</div>
        ))}
      </div>
    </div>
  );
}
