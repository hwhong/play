import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect } from "react";
import styles from "./infinite-circle.module.css";

export function InfiniteCircle() {
  let interval = useMotionValue(0);
  const y = useTransform(interval, (value) => Math.sin(value) * 100);
  const x = useTransform(interval, (value) => Math.cos(value) * 100);

  useEffect(() => {
    let controls = animate(interval, [0, Math.PI * 2], {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
    });
    return controls.stop;
  }, [interval]);

  return <motion.div className={styles.dot} style={{ x, y }}></motion.div>;
}
