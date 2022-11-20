import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from "./slider.module.css";

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(num, max));
}

export function Slider() {
  const min = 0;
  const max = 100;
  const [value, setValue] = useState(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const constraintRef = useRef(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const handleSize = 24;

  const handleX = useMotionValue(0);
  const progress = useTransform(handleX, (v) => v + handleSize / 2);
  const background = useMotionTemplate`linear-gradient(90deg, #374151 ${progress}px, #d1d5db 0)`;

  useEffect(() => {
    if (progressBarRef) {
      const newProgress = value / (max - min);
      const progressBarBounds = progressBarRef.current?.getBoundingClientRect();
      handleX.set(newProgress * progressBarBounds!.width);
    }
  }, [handleX, value]);

  function handleDrag() {
    if (handleRef.current && progressBarRef.current) {
      const handleBounds = handleRef.current.getBoundingClientRect();
      const middleOfHandle = handleBounds.x + handleBounds.width / 2;
      const progressBarBounds = progressBarRef.current.getBoundingClientRect();
      const newProgress =
        (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;

      setValue(newProgress / (max - min));
    }
  }

  return (
    <div className={styles.root}>
      <div data-test="slider" className={styles.wrapper}>
        <motion.div
          className={styles.slider}
          style={{
            background: background as unknown as string,
          }}
        />

        <div
          className={styles.progress}
          ref={progressBarRef}
          style={{ left: handleSize / 2, right: handleSize / 2 }}
        />

        <div ref={constraintRef}>
          <motion.div
            className={styles.handle}
            drag="x"
            dragMomentum={false}
            dragConstraints={constraintRef}
            dragElastic={0}
            ref={handleRef}
            onDrag={handleDrag}
            // whileDrag={{ scale: 2 }}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
            animate={{ scale: dragging ? 2 : 1 }}
            style={{ width: handleSize, height: handleSize, x: handleX }}
          />
        </div>

        <div
          className={styles.backClick}
          onPointerDown={(event) => {
            if (progressBarRef) {
              const { left, width } =
                progressBarRef.current!.getBoundingClientRect();
              const position = event.pageX - left;
              const newProgress = position / width;
              const newValue = newProgress * (max - min);
              setValue(clamp(newValue, min, max));
            }
          }}
        />
      </div>
    </div>
  );
}
