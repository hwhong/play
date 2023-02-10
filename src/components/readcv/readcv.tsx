import styles from "./readcv.module.css";
import { motion, useAnimationControls } from "framer-motion";
import React from "react";

export function ReadCV() {
  const controls = useAnimationControls();

  const onMouseEnter = async (e: any) => {
    await controls.start({ opacity: 1, transition: { duration: 0.001 } });
    await controls.start({
      width: e.target.offsetWidth,
      left: `${e.target.offsetLeft}px`,
    });
  };

  const onMouseLeave = () => {
    controls.start({
      opacity: 0,
      transition: { duration: 0.001 },
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <ul className={styles.list}>
          <motion.div
            animate={controls}
            style={{
              position: "absolute",
              height: "40px",
              backgroundColor: "#EDEDED",
              borderRadius: "20px",
            }}
          />
          <li>
            <button
              className={styles.button}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              About
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              Features
            </button>
          </li>
          <li>
            <button
              className={styles.button}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              Log in
            </button>
          </li>
          <li className={styles.signupWrapper}>
            <button className={styles.signupButton}>Sign up</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
