import styles from "./readcv.module.css";
import { motion, useAnimationControls } from "framer-motion";
import React, { useState } from "react";

export function ReadCV() {
  const [hover, setHover] = useState<boolean>(false);
  const controls = useAnimationControls();

  const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHover(true);
    console.log(e);
    // const g = e.target.getBoundingClientRect();
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <ul className={styles.list}>
          {hover && <motion.div animate={controls}></motion.div>}
          <li>
            <button className={styles.button} onMouseEnter={onMouseEnter}>
              About
            </button>
          </li>
          <li>
            <button className={styles.button} onMouseEnter={onMouseEnter}>
              Features
            </button>
          </li>
          <li>
            <button className={styles.button} onMouseEnter={onMouseEnter}>
              Log in
            </button>
          </li>
          <li>
            <button className={styles.signupButton}>Sign up</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
