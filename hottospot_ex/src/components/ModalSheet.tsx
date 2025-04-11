import React from 'react'
import { motion } from "framer-motion";
import style from "./ModalSheet.module.scss";
import { useAtom } from 'jotai';
import { modalWindowAtom } from '../atoms/modalWindowAtom';

function ModalSheet() {
      const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom)

      console.log("modalWindowIsOpen",modalWindowIsOpen)
      
    return (
        <div className={style.modalContainer}>
        {modalWindowIsOpen ? (
          <motion.div
            style={{ height: "60%" }}
            className={style.container}
            initial={{ y: "100%" }}
            animate={{ y: modalWindowIsOpen ? "0%" : "100%" }}
            exit={{ y: "100%" }}
            transition={{
              stiffness: 300,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: "100%" }}
            dragElastic={0}
            onDragEnd={(_, info) => {
              if (info.velocity.y > 100) setModalWindowIsOpen(false);
              if (info.offset.y > 100) setModalWindowIsOpen(false);
            }}
          >
          aaaa
          </motion.div>
        ) : (
          <></>
        )}
      </div>
      );
}

export default ModalSheet
