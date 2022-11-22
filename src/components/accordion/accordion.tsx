import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import styles from "./accordion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

enum Status {
  OPEN = "open",
  CLOSE = "close",
}

export function Accordion() {
  const [isExpanded, setIsExpanded] = useState<Status>(Status.OPEN);
  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <div
          className={styles.bar}
          onClick={() =>
            setIsExpanded(
              isExpanded === Status.CLOSE ? Status.OPEN : Status.CLOSE
            )
          }
        >
          <button className={styles.toggleButton}>
            <motion.div
              animate={{ rotate: isExpanded === Status.CLOSE ? 0 : 90 }}
              transition={{ type: "just" }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </motion.div>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded === Status.OPEN && (
            <motion.section
              className={styles.container}
              animate={isExpanded}
              initial={Status.CLOSE}
              variants={{
                open: { height: "auto", opacity: 1 },
                close: { height: 0, opacity: 0 },
              }}
              transition={{ delay: 0.2 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
