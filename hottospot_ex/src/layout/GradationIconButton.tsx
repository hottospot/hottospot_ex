import React from 'react'
import { easeOut, motion } from "framer-motion";
import styles from "./GradationIconButton.module.scss";

interface GradationIconButtonProps{
    children:string;
    color:string;
    onClick: () => void;
}

function GradationIconButton({ children, color, onClick }:GradationIconButtonProps) {
  return (
    <div>
      <motion.button
        initial={{ scale: 1, position: 'relative', zIndex: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{
          duration: 0.1,
          ease: easeOut,
        }}
        className={`${styles.button} ${styles[color]}`}
        onClick={onClick}
        style={{ outline: 'none' }}
      >
        {children}
      </motion.button>
    </div>
  )
}

export default GradationIconButton
