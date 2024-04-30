import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

export const ToastAlert = ({ type, message, isDisplayed = true }: { type: string, message: string, isDisplayed: boolean }) => {
  const [isShown, showAlert] = useState(true);
  const handleClose = () => {
    showAlert(false);
  };
  return (
    <div
      className={`${styles.alert} ${styles[type]} ${!isShown || !isDisplayed ? styles.hide : ""}`}
    >
      <span className={styles.close} onClick={handleClose}>
        {" "}
        &times;
      </span>
      {message}
    </div>
  );
};
