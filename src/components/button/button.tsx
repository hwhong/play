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
  const { buttonProps, isPressed } = useButton(
    {
      onPressStart: () => {
        // cancels any running animations
        controls.stop();
        controls.set({ background: "#757376" });
      },
      onPress: () => {
        onClick();
        controls.start({
          background: ["#757376", "#353336"],
          transition: { duration: 0.4 },
        });
      },
      onPressEnd: () => {
        controls.set({ background: "#353336", transition: { duration: 0.4 } });
      },
    },
    ref
  );

  return (
    <div className={styles.wrapper}>
      {/* let's you apply classes when the element is in focus */}
      <FocusRing focusRingClass={styles.ring}>
        <motion.button
          animate={controls}
          style={{ WebkitTapHighlightColor: "transparent" }}
          className={classNames(styles.root)}
          ref={ref}
          {...buttonProps}
        >
          {children}
        </motion.button>
      </FocusRing>
    </div>
  );
}
