import { motion } from "framer-motion";

import styles from "./SkipButton.module.scss";

type skipButtonProps = {
  isDisable?: boolean;
  onClick?: () => void;
};

export const SkipButton = ({ isDisable, onClick }: skipButtonProps) => {
  return (
    <motion.div
      className={`${styles.container} ${isDisable && styles.disable}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.4, ease: "easeOut", type: "spring" }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className={styles.text}>skip</div>
    </motion.div>
  );
};
