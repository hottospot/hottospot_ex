import { useState } from "react";

import { SkipButton } from "../layout/SkipButton";
import { TagButton } from "../layout/TagButton";

import styles from "./Search.module.scss";

export const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={`${styles.container} ${isOpen && styles.openContainer}`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className={styles.placeholder}>見つけたい場所のジャンルを選択しよう !</div>

      {isOpen && (
        <div className={styles.optionGroupWrapper}>
          <div className={styles.optionGroup}>
            <div className={styles.optionGroupHeader}>
              <div className={styles.optionGroupTitle}>形容詞</div>
              <SkipButton />
            </div>
            <div className={styles.dividerLine} />
            <div className={styles.optionTagList}>
              <TagButton color="blue">afldjs</TagButton>
              <TagButton color="red">afasdfasdfldjs</TagButton>
              <TagButton color="purple">afldjs</TagButton>
              <TagButton color="blue">afldjfasds</TagButton>
              <TagButton color="orange">afldjs</TagButton>
            </div>
          </div>

          <div className={styles.optionGroup}>
            <div className={styles.optionGroupHeader}>
              <div className={styles.optionGroupTitle}>形容詞</div>
              <SkipButton />
            </div>
            <div className={styles.dividerLine} />
            <div className={styles.optionTagList}>
              <TagButton color="blue">afldjs</TagButton>
              <TagButton color="red">afasdfasdfldjs</TagButton>
              <TagButton color="purple">afldjs</TagButton>
              <TagButton color="blue">afldjfasds</TagButton>
              <TagButton color="orange">afldjs</TagButton>
            </div>
          </div>

          <div className={styles.optionGroup}>
            <div className={styles.optionGroupHeader}>
              <div className={styles.optionGroupTitle}>形容詞</div>
              <SkipButton />
            </div>
            <div className={styles.dividerLine} />
            <div className={styles.optionTagList}>
              <TagButton color="blue">afldjs</TagButton>
              <TagButton color="red">afasdfasdfldjs</TagButton>
              <TagButton color="purple">afldjs</TagButton>
              <TagButton color="blue">afldjfasds</TagButton>
              <TagButton color="orange">afldjs</TagButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
