import { motion } from "framer-motion";
import { useAtom } from "jotai";

import { modalWindowAtom } from "../../atoms/modalWindowAtom";

import style from "./ModalSheet.module.scss";
import PlaceInfo from "./modalSheetCards/PlaceInfo";
import { useEffect } from "react";

const noScroll = () => {
  const handleScroll = (e: Event) => {
    e.preventDefault();
  };

  document.body.style.overflow = "hidden"; // 基本的なスクロール防止（PC・スマホ両対応）
  window.addEventListener("wheel", handleScroll, { passive: false });
  window.addEventListener("touchmove", handleScroll, { passive: false });
};

const allowScroll = () => {
  const handleScroll = (e: Event) => {
    e.preventDefault();
  };

  document.body.style.overflow = "auto"; // スクロール復活
  window.removeEventListener("wheel", handleScroll);
  window.removeEventListener("touchmove", handleScroll);
};

function ModalSheet() {
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom);

  useEffect(() => {
    noScroll(); // モーダル表示時にスクロール禁止
    return () => allowScroll(); // モーダル閉じたときにスクロール復活
  }, []);

  return (
    <div className={style.modalContainer}>
      {modalWindowIsOpen && (
        <motion.div
          style={{ height: "60%" }}
          className={style.container}
          initial={{ y: "100%" }}
          animate={{ y: modalWindowIsOpen ? "0%" : "100%" }}
          exit={{ y: "100%" }}
          transition={{
            stiffness: 300,
          }}
          onClick={(e) => e.stopPropagation()}
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
      )}
    </div>
  );
}

export default ModalSheet;
