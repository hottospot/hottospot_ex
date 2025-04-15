import { motion } from "framer-motion";
import { useAtom } from "jotai";

import { modalWindowAtom } from "../../atoms/modalWindowAtom";

import style from "./ModalSheet.module.scss";
import PlaceInfo from "./modalSheetCards/PlaceInfo";

function ModalSheet() {
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom);

  console.log("modalWindowIsOpen", modalWindowIsOpen);

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
          dragConstraints={{ top: 0, bottom: window.innerHeight * 0.6 }}
          dragElastic={0}
          onDragEnd={(_, info) => {
            if (info.velocity.y > 100) setModalWindowIsOpen(false);
            if (info.offset.y > 100) setModalWindowIsOpen(false);
          }}
        >
          <PlaceInfo />
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ModalSheet;
