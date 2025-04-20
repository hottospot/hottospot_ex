import { motion } from "framer-motion";

import styles from "./LoadingGradient.module.scss";

export const LoadingGradient = () => {
  return (
    <div className={styles.loading}>
      <motion.div
        className={styles.gradient}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
