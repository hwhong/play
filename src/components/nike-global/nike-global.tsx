import { motion, useAnimation } from "framer-motion";
import React from "react";
import styles from "./nike-global.module.css";

export function NikeGlobal() {
  const buttonControl = useAnimation();
  const originControl = useAnimation();
  const languageControl = useAnimation();

  async function animateStartSequence() {
    await originControl.start({
      display: "none",
    });
    await buttonControl.start({
      height: 100,
      transition: { duration: 0.3 },
    });
    await buttonControl.start({ width: 130, transition: { duration: 0.3 } });
    return await languageControl.start({
      display: "inline-block",
      opacity: 1,
      transition: { duration: 0.3 },
    });
  }

  async function animateEndSequence() {
    await languageControl.start({
      display: "none",
    });
    await buttonControl.start({ width: 162, transition: { duration: 0.3 } });
    await buttonControl.start({
      height: 40,
      transition: { duration: 0.3 },
    });
    await originControl.start({
      display: "block",
    });
    // something weird is happening here
    await languageControl.set({
      display: "none",
    });
    await buttonControl.set({ width: 162 });

    // ------- EXPERIEMENT
    // await buttonControl.start({
    //   width: 162,
    //   transition: { duration: 0.3 },
    // });
    // await buttonControl.start({
    //   height: 40,
    //   transition: { duration: 0.3 },
    // });
    // await originControl.start({
    //   display: "block",
    // });
    // await languageControl.set({
    //   display: "none",
    // });
    // // something weird is happening here
    // await languageControl.set({
    //   display: "none",
    // });
    // await buttonControl.set({ width: 162 });
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <motion.div
          style={{
            height: 40,
            width: 162,
          }}
          className={styles.control}
          animate={buttonControl}
          onClick={() => animateStartSequence()}
        >
          <motion.div animate={originControl} className={styles.origin}>
            Canada
          </motion.div>
          <motion.ul
            className={styles.list}
            animate={languageControl}
            initial={{ display: "none", opacity: 0 }}
          >
            <motion.li
              className={styles.listItem}
              onClick={() => animateEndSequence()}
            >
              English
            </motion.li>
            <motion.li
              className={styles.listItem}
              onClick={() => animateEndSequence()}
            >
              Français
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
}
