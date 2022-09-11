import classNames from "classnames";
import React from "react";
import styles from "./badge.module.css";

interface BadgeProps {
  className: string;
  children: React.ReactNode;
  index: number;
}

export function Badge({ className, children, index }: BadgeProps) {
  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.badge}>{index}</div>
      {children}
    </div>
  );
}
