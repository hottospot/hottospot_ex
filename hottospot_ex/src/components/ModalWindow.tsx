import React from 'react'
import { motion } from 'framer-motion'
import styles from './ModalWindow.module.scss'
import { SetStateAction } from 'jotai'
import GradationIconButton from '../layout/GradationIconButton'
import { Icon } from "@iconify/react";

interface ModalWindowProps {
  children:string,
  isOpen:boolean,
  setIsOpen:React.Dispatch<SetStateAction<boolean>>

}

function ModalWindow({ children, setIsOpen, isOpen }:ModalWindowProps) {
  const handleBackgroundClick = () => {
  
      // 背景がクリックされたときにモーダルを閉じる
      setIsOpen(false)
    }
    return (
      <div>
        {isOpen ? (
          <div className={styles.container} onClick={handleBackgroundClick}>
            <motion.div
              className={styles.mainContainer}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: '100%', scale: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
            <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: "100%", scale: "100%" }}
          >
            <GradationIconButton
              color="red"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <Icon
                icon="material-symbols:close-rounded"
                style={{
                  fontSize: "18px",
                  color: "#ffffff",
                }}
              />
            </GradationIconButton>
          </motion.div>
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  
}

export default ModalWindow
