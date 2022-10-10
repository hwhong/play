import classNames from "classnames";
import React, { useState } from "react";
import { StatusType, Step } from "./step";
import styles from "./wizard.module.css";

export function Wizard() {
  const [step, setStep] = useState(0);

  const getStatus = (index: number): StatusType => {
    if (index === step) {
      return "active";
    }
    return index > step ? "inactive" : "complete";
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Step status={getStatus(1)} />
        <Step status={getStatus(2)} />
        <Step status={getStatus(3)} />
        <Step status={getStatus(4)} />
        <Step status={getStatus(5)} />
      </div>
      <div className={styles.buttonBar}>
        <button
          className={classNames(styles.button, styles.override)}
          onClick={() => setStep(step > 1 ? step - 1 : 0)}
        >
          Previous
        </button>
        <button
          className={styles.button}
          onClick={() => setStep(step === 6 ? step : step + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
