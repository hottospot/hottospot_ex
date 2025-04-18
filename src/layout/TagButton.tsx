import { ReactNode } from "react";

import styles from "./TagButton.module.scss";

type TagButtonProps = {
  children: ReactNode;
  color: "blue" | "green" | "red" | "orange" | "purple";
  isDisable?: boolean;
  onClick?: () => void;
};

export const TagButton = ({ children, color, isDisable, onClick }: TagButtonProps) => {
  return (
    <div
      className={`${styles.container} ${isDisable ? styles.disable : styles[color]}`}
      onClick={() => {
        if (onClick && !isDisable) {
          onClick();
        }
      }}
    >
      <div className={styles.text}>{children}</div>
    </div>
  );
};
