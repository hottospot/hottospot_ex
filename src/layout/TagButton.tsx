import { ReactNode } from "react";

import styles from "./TagButton.module.scss";

type TagButtonProps = {
  children: ReactNode;
  color: "blue" | "green" | "red" | "orange" | "purple";
};

export const TagButton = ({ children, color }: TagButtonProps) => {
  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <div className={styles.text}>{children}</div>
    </div>
  );
};
