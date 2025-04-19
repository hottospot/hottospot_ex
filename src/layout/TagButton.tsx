import { motion } from "framer-motion";
import { ReactNode } from "react";

import styles from "./TagButton.module.scss";

type TagButtonProps = {
  children: ReactNode;
  color: "blue" | "green" | "red" | "orange" | "purple";
  isDisable?: boolean;
  onClick?: () => void;
  delay?: number;
};

export const TagButton = ({ children, color, isDisable, onClick, delay = 0 }: TagButtonProps) => {
  return (
    <motion.div
      className={`${styles.container} ${isDisable ? styles.disable : styles[color]}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.3, ease: "easeOut", type: "spring", delay: delay }}
      onClick={() => {
        if (onClick && !isDisable) {
          onClick();
        }
      }}
    >
      <div className={styles.text}>#{children}</div>
    </motion.div>
  );
};
