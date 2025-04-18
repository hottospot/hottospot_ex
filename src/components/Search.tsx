import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import useMeasure from "react-use-measure";

import { SkipButton } from "../layout/SkipButton";
import { TagButton } from "../layout/TagButton";

import styles from "./Search.module.scss";
import { useAtomValue } from "jotai";
import { MapBoundsAtom } from "../atoms/locationPositionAtom";

export const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [phase, setPhase] = useState<"adjective" | "place">("adjective");
  const [selectedAdjective, setSelectedAdjective] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [ref, { height }] = useMeasure();

  const setMapBounds = useAtomValue(MapBoundsAtom);

  const placeList = ["カフェ", "絶景", "公園", "本屋", "美術館", "スイーツショップ"];
  const adjectiveList = ["おしゃれな", "かわいい", "スタイリッシュ", "映えてる", "かっこいい"];

  const request = async () => {
    const url = `${import.meta.env.VITE_API_KEY}/markers?latMin=${setMapBounds.southWestLat}&latMax=${setMapBounds.northEastLat}&lngMin=${setMapBounds.southWestLng}&lngMax=${setMapBounds.northEastLng}&scale=1&q=${selectedPlace}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("ネットワーク応答が正常ではありません");

      const data = await response.json();
      console.log("Success:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedAdjective && selectedPlace) {
        const data = await request();
        if (data) {
          console.log("取得データ:", data);
        }
      }
    };
    fetchData();
  }, [selectedAdjective, selectedPlace]);

  return (
    <motion.div
      className={`${styles.container} ${isOpen && styles.openContainer}`}
      animate={{
        height: isOpen ? "180px" : `calc(${height}px + 24px)`,
      }}
      initial={false}
      transition={{ duration: 0.16 }}
    >
      <div className={styles.placeholderContainer}>
        <div
          className={styles.placeholder}
          onClick={() => setIsOpen(true)}
        >
          見つけたい場所のジャンルを選択しよう !
        </div>
        <div onClick={() => setIsOpen(false)}>×</div>
      </div>

      {isOpen && (
        <motion.div className={styles.optionGroupWrapper}>
          {phase === "adjective" && (
            <div className={styles.optionGroup}>
              <div className={styles.optionGroupHeader}>
                <div className={styles.optionGroupTitle}>形容詞</div>
                <SkipButton
                  onClick={() => {
                    setPhase("place");
                  }}
                />
              </div>
              <div className={styles.dividerLine} />
              <div className={styles.optionTagList}>
                {adjectiveList.map((adjective, i) => (
                  <TagButton
                    key={i}
                    color="blue"
                    onClick={() => {
                      setSelectedAdjective(adjective);
                      setPhase("place");
                    }}
                  >
                    {adjective}
                  </TagButton>
                ))}
              </div>
            </div>
          )}

          {phase === "place" && (
            <div className={styles.optionGroup}>
              <div className={styles.optionGroupHeader}>
                <div className={styles.optionGroupTitle}>場所</div>
                <SkipButton />
              </div>
              <div className={styles.dividerLine} />
              <div className={styles.optionTagList}>
                <TagButton color="blue">afldjs</TagButton>
                {placeList.map((place, i) => (
                  <TagButton
                    key={i}
                    color="blue"
                    onClick={() => {
                      setSelectedPlace(place);
                      setPhase("place");
                    }}
                  >
                    {place}
                  </TagButton>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
