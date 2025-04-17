import { motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

import { SkipButton } from "../layout/SkipButton";
import { TagButton } from "../layout/TagButton";

import styles from "./Search.module.scss";

export const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ref, { height }] = useMeasure();

  const placeList = ["カフェ", "絶景", "公園", "本屋", "美術館", "スイーツショップ"];
  const adjectiveList = ["おしゃれな", "かわいい", "スタイリッシュ", "映えてる", "かっこいい"];

  return (
    <motion.div
      className={`${styles.container} ${isOpen && styles.openContainer}`}
      animate={{
        height: isOpen ? "180px" : `calc(${height}px + 24px)`,
      }}
      initial={false}
      transition={{ duration: 0.16 }}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className={styles.placeholder}>見つけたい場所のジャンルを選択しよう !</div>

      {isOpen && (
        <motion.div className={styles.optionGroupWrapper}>
          <div className={styles.optionGroup}>
            <div className={styles.optionGroupHeader}>
              <div className={styles.optionGroupTitle}>形容詞</div>
              <SkipButton />
            </div>
            <div className={styles.dividerLine} />
            <div className={styles.optionTagList}>
              {placeList.map((place, i) => (
                <TagButton
                  key={i}
                  color="blue"
                >
                  {place}
                </TagButton>
              ))}
            </div>
          </div>

          <div className={styles.optionGroup}>
            <div className={styles.optionGroupHeader}>
              <div className={styles.optionGroupTitle}>場所</div>
              <SkipButton />
            </div>
            <div className={styles.dividerLine} />
            <div className={styles.optionTagList}>
              <TagButton color="blue">afldjs</TagButton>
              {adjectiveList.map((adjective, i) => (
                <TagButton
                  key={i}
                  color="blue"
                >
                  {adjective}
                </TagButton>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
