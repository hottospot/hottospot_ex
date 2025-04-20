import { Icon } from "@iconify/react";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

import { isLoadingAtom } from "../../../atoms/isLoading";
import { locationPositionAtom } from "../../../atoms/locationPositionAtom";
import { modalWindowAtom } from "../../../atoms/modalWindowAtom";
import { nowPositionAtom } from "../../../atoms/nowPositionAtom";
import GradationIconButton from "../../../layout/GradationIconButton";
import { LoadingGradient } from "../../../layout/LoadingGradient";
import { GetMethod } from "../../ResponseMethod";

import styles from "./PlaceInfo.module.scss";

function PlaceInfo() {
  const [position, _] = useAtom(locationPositionAtom); //押した場所の情報
  const [nowposition] = useAtom(nowPositionAtom);
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom);
  const [selectedTransport, setSelectedTransport] = useState<"walk" | "car" | "train" | "bicycling">("walk");
  const [duration, setDuration] = useState<{ hour: string; mins: string }>();
  const [distance, setDistance] = useState();

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const modes = ["driving", "walking", "bicycling", "transit"];
  const [expanded, setExpanded] = useState(false);

  console.log("position", position);
  console.log('"position.name', position.tiktokTitle);

  const apiUrl = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (modalWindowIsOpen) {
      handleWalk();
    }
  }, [modalWindowIsOpen]);

  //const jsonTitle = JSON.stringify(position.tags)

  const handleShare = () => {

    const shareUrl = `https://www.google.com/maps?q=${position.latitude},${position.longitude}`;
    window.open(shareUrl);
  };

  const handleClose = () => {
    setModalWindowIsOpen(false);
  };

  const handleWalk = async () => {
    try {
      setIsLoading(true);
      setSelectedTransport("walk");

      const RootUrl = `${apiUrl}/route?latOrigin=${nowposition?.[0]}&lonOrigin=${nowposition?.[1]}&latDestination=${position.latitude}&lonDestination=${position.longitude}&mode=${modes?.[2]}`;
      const res = await GetMethod(RootUrl);
      console.log("res", JSON.stringify(res));
      console.log("walkminuts", res.routes.distance);
      setDuration(res.routes.duration);
      setDistance(res.routes.distance);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBicycling = async () => {
    try {
      setIsLoading(true);
      setSelectedTransport("bicycling");

      const RootUrl = `${apiUrl}/route?latOrigin=${nowposition?.[0]}&lonOrigin=${nowposition?.[1]}&latDestination=${position.latitude}&lonDestination=${position.longitude}&mode=${modes?.[0]}`;
      const res = await GetMethod(RootUrl);
      console.log("res", JSON.stringify(res));
      console.log("carminuts", res.routes.duration);
      setDuration(res.routes.duration);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCar = async () => {
    try {
      setIsLoading(true);
      setSelectedTransport("car");

      const RootUrl = `${apiUrl}/route?latOrigin=${nowposition?.[0]}&lonOrigin=${nowposition?.[1]}&latDestination=${position.latitude}&lonDestination=${position.longitude}&mode=${modes?.[0]}`;
      const res = await GetMethod(RootUrl);
      console.log("res", JSON.stringify(res));
      console.log("carminuts", res.routes.duration);
      setDuration(res.routes.duration);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrain = async () => {
    try {
      setIsLoading(true);
      setSelectedTransport("train");

      const RootUrl = `${apiUrl}/route?latOrigin=${nowposition?.[0]}&lonOrigin=${nowposition?.[1]}&latDestination=${position.latitude}&lonDestination=${position.longitude}&mode=${modes?.[3]}`;
      const res = await GetMethod(RootUrl);
      console.log("res", JSON.stringify(res));
      console.log("trainminuts", res.routes.duration);
      setDuration(res.routes.duration);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("position", position);

  console.log("modalWindowIsOpen", modalWindowIsOpen);

  // const hashtagArr = arr.map((data:string) => `#${data}`)

  // const isLong         = hashtagArr.length >= 15;
  // const displayText = expanded || !isLong ? hashtagArr.length : hashtagArr.length.slice(0, 22) + "…";

  const tiktokTitle = position.tiktokTitle ?? "";

  const isDetailsLong = tiktokTitle.length > 150;

  const displayDetails = isDetailsLong && !expanded ? tiktokTitle.slice(0, 150) + "…" : tiktokTitle;

  // if(expanded){

  // }

  return (
    <div className={styles.container}>
      <div className={styles.handle} />
      <div className={styles.whole}>
        <div className={styles.header}>
          <div className={styles.title}>
            {position.place?.includes("不明") ? <div>ー</div> : <div>{position.place}</div>}
          </div>

          <div className={styles.buttons}>
            <div className={styles.share}>
              <GradationIconButton
                color="red"
                onClick={handleShare}
              >
                <Icon
                  icon="heroicons:arrow-up-tray-16-solid"
                  style={{ fontSize: "22px", color: "#ffffff" }}
                />
              </GradationIconButton>
            </div>
            <div className={styles.close}>
              <GradationIconButton
                color="gray"
                onClick={handleClose}
              >
                <Icon
                  icon="mingcute:close-fill"
                  style={{ fontSize: "22px", color: "#758693" }}
                />
              </GradationIconButton>
            </div>
          </div>
        </div>
        <div className={styles.subtitle}>{displayDetails}</div>
        {isDetailsLong && <div onClick={() => setExpanded(!expanded)}>詳しく見る</div>}
      </div>

      <div className={styles.middle}>
        <div className={styles.middleLeft}>
          <img
            className={styles.img}
            src={position.photoName ?? undefined}
          />
        </div>
        <div className={styles.middleRight}>
          <div className={styles.targetTitle}>目的地まで</div>
          <div className={styles.limit}>{distance}</div>
          <div className={styles.predict}>予想時間</div>

          <div className={styles.waysButton}>
            <div className={styles.walk}>
              <GradationIconButton
                color={selectedTransport === "walk" ? "red" : "gray"}
                onClick={handleWalk}
              >
                <Icon
                  icon="material-symbols:directions-walk-rounded"
                  style={{ fontSize: "15px", color: "#ffffff" }}
                />
              </GradationIconButton>
            </div>
            <div className={styles.bicycling}>
              <GradationIconButton
                color={selectedTransport === "bicycling" ? "red" : "gray"}
                onClick={handleBicycling}
              >
                <Icon
                  icon="mdi:bicycle"
                  style={{ fontSize: "15px", color: "#ffffff" }}
                />
              </GradationIconButton>
            </div>
            <div className={styles.car}>
              <GradationIconButton
                color={selectedTransport === "car" ? "red" : "gray"}
                onClick={handleCar}
              >
                <Icon
                  icon="ic:outline-directions-car"
                  style={{ fontSize: "15px", color: "#ffffff" }}
                />
              </GradationIconButton>
            </div>
            <div className={styles.train}>
              <GradationIconButton
                color={selectedTransport === "train" ? "red" : "gray"}
                onClick={handleTrain}
              >
                <Icon
                  icon="material-symbols:train-outline-rounded"
                  style={{ fontSize: "15px", color: "#ffffff" }}
                />
              </GradationIconButton>
            </div>
          </div>

          <div className={styles.minutes}>
            {isLoading && duration?.hour}
            {isLoading ? <LoadingGradient /> : duration?.mins || "ー"}
          </div>

          {position.url ? (
            <a
              className={styles.url}
              href={position.url}
            >
              <span>参考元へ飛ぶ</span>
              <Icon
                icon="heroicons:arrow-up-right-solid"
                style={{ fontSize: "15px", color: "#00aaf2" }}
              />
              参考元
            </a>
          ) : (
            <div>ー</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceInfo;
