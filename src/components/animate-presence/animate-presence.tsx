import React, { useState } from "react";
import styles from "./animate-presence.module.css";
import { AnimatePresence, motion } from "framer-motion";

export function AnimatePresenceExample() {
  const [isOpen, setIsOpen] = useState(true);
  const [reminders, setReminders] = useState([
    "NEW YORK",
    "LONDON",
    "SF",
    "PARIS",
    "AMSTERDAM",
    "SEOUL",
    "TAIPEI",
  ]);

  // declarative programming
  return (
    <div className={styles.root}>
      {/* this means that onMount initially, we don't want any animations */}
      <AnimatePresence initial={false}>
        <div className={styles.sidebarWrapper}>
          {isOpen && (
            <motion.div
              className={styles.sidebar}
              animate={{ width: 200 }}
              initial={{ width: 0 }}
              exit={{ width: 0 }}
            >
              Sidebar
            </motion.div>
          )}
          <div className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "<" : ">"}
          </div>
        </div>
      </AnimatePresence>
      <div className={styles.listWrapper}>
        {/* <button
          onClick={() => {
            setReminders([...reminders, "TOKYO"]);
          }}
        >
          +
        </button> */}
        <ul className={styles.list}>
          <AnimatePresence>
            {reminders.map((r, i) => (
              <motion.li
                key={r}
                className={styles.listItem}
                custom={i}
                variants={{
                  hidden: (i) => ({ opacity: 0, y: -50 * i }),
                  visible: (i) => ({
                    y: 0,
                    opacity: 1,
                    transition: { delay: i * 0.05 },
                  }),
                  removed: { opacity: 0 },
                }}
                initial="hidden"
                animate="visible"
                // THIS GETS FIRED BEFORE THE NODE IS REMOVED FROM THE DOM
                exit="removed"
              >
                {r}
                <button
                  key={`${r} - ${i}`}
                  className={styles.removeButton}
                  onClick={() => {
                    reminders.splice(i, 1);
                    setReminders([...reminders]);
                  }}
                >
                  remove
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
