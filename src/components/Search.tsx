import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import { MapBoundsAtom } from "../atoms/locationPositionAtom";
import { SkipButton } from "../layout/SkipButton";
import { TagButton } from "../layout/TagButton";

import styles from "./Search.module.scss";

export const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [phase, setPhase] = useState<"adjective" | "place">("adjective");
  const [selectedAdjective, setSelectedAdjective] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [__, { height }] = useMeasure();

  const containerRef = useRef<HTMLDivElement>(null);

  const setMapBounds = useAtomValue(MapBoundsAtom);

  const placeList = ["カフェ", "絶景", "公園", "本屋", "美術館", "スイーツショップ"];
  const adjectiveList = ["おしゃれな", "かわいい", "スタイリッシュ", "映えてる", "かっこいい"];

  const adjectiveColors: Record<string, "blue" | "green" | "red" | "orange" | "purple"> = {
    おしゃれな: "green",
    かわいい: "orange",
    スタイリッシュ: "purple",
    映えてる: "blue",
    かっこいい: "red",
  };

  const placeColors: Record<string, "blue" | "green" | "red" | "orange" | "purple"> = {
    カフェ: "red",
    絶景: "green",
    公園: "orange",
    本屋: "purple",
    美術館: "blue",
    スイーツショップ: "purple",
  };

  const request = async () => {
    const url = `${import.meta.env.VITE_API_KEY}/markers?latMin=${setMapBounds.southWestLat}&latMax=${setMapBounds.northEastLat}&lngMin=${setMapBounds.southWestLng}&lngMax=${setMapBounds.northEastLng}&scale=1&q=${selectedPlace}+${selectedAdjective}`;

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
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
          onClick={() => {
            setIsOpen(true);
            setSelectedAdjective(null);
            setSelectedPlace(null);
            setPhase("adjective");
          }}
        >
          {selectedAdjective || selectedPlace ? (
            <div className={styles.selectedTags}>
              {selectedAdjective && (
                <TagButton color={adjectiveColors[selectedAdjective]}>{selectedAdjective}</TagButton>
              )}
              {selectedPlace && <TagButton color={placeColors[selectedPlace]}>{selectedPlace}</TagButton>}
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
            >
              見つけたい場所のジャンルを選択しよう !
            </motion.div>
          )}
        </div>
        {(selectedAdjective || selectedPlace) && (
          <div
            onClick={() => {
              setIsOpen(false);
              setSelectedAdjective(null);
              setSelectedPlace(null);
            }}
          >
            ×
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className={styles.optionGroupWrapper}>
            {phase === "adjective" && (
              <motion.div
                className={styles.optionGroup}
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                exit={{ y: -300 }}
                transition={{ ease: "easeOut" }}
              >
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
                      color={adjectiveColors[adjective]}
                      delay={i / 20}
                      onClick={() => {
                        setSelectedAdjective(adjective);
                        setPhase("place");
                      }}
                    >
                      {adjective}
                    </TagButton>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "place" && (
              <motion.div
                key="place"
                className={styles.optionGroup}
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: -300 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                <div className={styles.optionGroupHeader}>
                  <div className={styles.optionGroupTitle}>場所</div>
                  <SkipButton />
                </div>
                <div className={styles.dividerLine} />
                <div className={styles.optionTagList}>
                  {placeList.map((place, i) => (
                    <TagButton
                      key={i}
                      color={placeColors[place]}
                      delay={i / 20 + 0.2}
                      onClick={() => {
                        setSelectedPlace(place);
                        setPhase("place");
                        setIsOpen(false);
                      }}
                    >
                      {place}
                    </TagButton>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
