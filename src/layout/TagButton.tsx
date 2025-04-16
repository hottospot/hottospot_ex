import { ReactNode } from "react";

import styles from "./TagButton.module.scss";

type TagButtonProps = {
  children: ReactNode;
  color: "blue" | "green" | "red" | "orange" | "purple";
  isDisable?: boolean;
};

export const TagButton = ({ children, color, isDisable }: TagButtonProps) => {
  return (
    <div className={`${styles.container} ${isDisable ? styles.disable : styles[color]}`}>
      <div className={styles.text}>{children}</div>
    </div>
  );
};
