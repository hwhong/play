import React from "react";
import styles from "./parallax.module.css";
import { motion, useScroll, useTransform } from "framer-motion";

export function Parallax() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className={styles.root}>
      <motion.div style={{ y }} className={styles.background}></motion.div>

      <div className={styles.content}>
        <h1>Hello this is parallax</h1>
      </div>
    </div>
  );
}
