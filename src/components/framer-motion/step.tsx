import React from "react";
import styles from "./step.module.css";
import { motion } from "framer-motion";

export type StatusType = "active" | "inactive" | "complete";

interface StepProps {
  status: StatusType;
}

const BLUE = "#3b82f6";
const WHITE = "#FFF";
const GREY = "#D4D4D4";

export function Step({ status }: StepProps) {
  return (
    <motion.div
      className={styles.root}
      initial={false}
      animate={status}
      variants={{
        inactive: { backgroundColor: WHITE, borderColor: GREY, color: GREY },
        active: { backgroundColor: WHITE, borderColor: BLUE, color: BLUE },
        complete: { backgroundColor: BLUE, borderColor: BLUE, color: BLUE },
      }}
      transition={{ duration: 0.2 }}
    ></motion.div>
  );
}
