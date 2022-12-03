import classNames from "classnames";
import { motion, useAnimation } from "framer-motion";
import React, { useRef } from "react";
import { FocusRing, useButton } from "react-aria";
import styles from "./button.module.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ onClick, children }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();
  let { buttonProps } = useButton(
    {
      onPressStart: () => {
        controls.stop();
        controls.set({ background: "#757376" });
      },
      onPressEnd: () => {
        controls.start({
          background: "#353336",
          transition: { duration: 0.4 },
        });
      },
      onPress: onClick,
    },
    ref
  );

  return (
    <div className={styles.wrapper}>
      {/* let's you apply classes when the element is in focus */}
      <FocusRing focusRingClass={styles.ring}>
        {/* @ts-ignore */}
        <motion.button
          animate={controls}
          {...buttonProps}
          style={{ WebkitTapHighlightColor: "transparent" }}
          className={classNames(styles.root, {})}
          ref={ref}
        >
          {children}
        </motion.button>
      </FocusRing>
    </div>
  );
}
