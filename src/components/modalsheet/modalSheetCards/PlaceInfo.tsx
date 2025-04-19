import { Icon } from '@iconify/react'
import { useAtom } from 'jotai'
import { useState } from 'react'

import { locationPositionAtom } from '../../../atoms/locationPositionAtom'
import GradationIconButton from '../../../layout/GradationIconButton'

import styles from './PlaceInfo.module.scss'
import { modalWindowAtom } from '../../../atoms/modalWindowAtom'

import { GetMethod } from '../../ResponseMethod'
import { nowPositionAtom } from '../../../atoms/nowPositionAtom'

function PlaceInfo() {
  const [position, _] = useAtom(locationPositionAtom) //押した場所の情報
  const [nowposition] = useAtom(nowPositionAtom)
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom)
  const [selectedTransport, setSelectedTransport] = useState<'walk' | 'car' | 'train' | null>(null)
  const [duration, setDuration] = useState<{hour:string, mins:string}>();
  const modes = ['driving', 'walking', 'bicycling', 'transit']

  console.log('position', position)
  console.log('"position.name', position.tiktokTitle)

  const apiUrl = import.meta.env.VITE_API_KEY

  const handleShare = () => {
    console.log('シェアボタンが押されました。')
    const shareUrl = `https://www.google.com/maps?q=${position.latitude},${position.longitude}`;
    window.open(shareUrl);
  }

  const handleClose = () => {
    console.log('閉じるボタンが押されました。')
      setModalWindowIsOpen(false);
  }

  const handleWalk = async () => {
    console.log('徒歩ボタンが押されました。')
    console.log("nowposition", nowposition);
    setSelectedTransport('walk');
    const RootUrl =  `${apiUrl}/route?latOrigin=${nowposition?.[0]}&lonOrigin=${nowposition?.[1]}&latDestination=${position.latitude}&lonDestination=${position.longitude}&mode=${modes?.[1]}`;
    const res = await GetMethod(RootUrl);
    console.log("res", JSON.stringify(res));
    console.log("walkminuts", res.routes.duration);
    setDuration(res.routes.duration);
    
    
  }

  const handleCar = async () => {
    console.log('車ボタンが押されました。')
    setSelectedTransport('car');
    const RootUrl =  `${apiUrl}/route?latOrigin=${nowposition?.[0]}&lonOrigin=${nowposition?.[1]}&latDestination=${position.latitude}&lonDestination=${position.longitude}&mode=${modes?.[0]}`;
    const res = await GetMethod(RootUrl);
    console.log("res", JSON.stringify(res));
    console.log("carminuts", res.routes.duration);
    setDuration(res.routes.duration);
  }

  const handleTrain = async () => {
    console.log('電車ボタンが押されました。')
    setSelectedTransport('train');
    const RootUrl =  `${apiUrl}/route?latOrigin=${nowposition?.[0]}&lonOrigin=${nowposition?.[1]}&latDestination=${position.latitude}&lonDestination=${position.longitude}&mode=${modes?.[3]}`;
    const res = await GetMethod(RootUrl);
    console.log("res", JSON.stringify(res));
    console.log("trainminuts", res.routes.duration);
    setDuration(res.routes.duration);
  }
  console.log('position', position)

  console.log("modalWindowIsOpen", modalWindowIsOpen);
  console.log("duration", duration);
  console.log("duration[0]", duration?.hour);

  return (
    <div className={styles.container}>
      <div className={styles.whole}>
        <div className={styles.header}>
          
          <div className={styles.title}>{
            position.place == "不明" ? (<div>{position.tags}</div>):(<div>{position.place}</div>)
          }</div>

          <div className={styles.buttons}>
            <div className={styles.share}>
              <GradationIconButton color="red" onClick={handleShare}>
                <Icon icon="heroicons:arrow-up-tray-16-solid" style={{ fontSize: '22px', color: '#ffffff' }} />
              </GradationIconButton>
            </div>
            <div className={styles.close}>
              <GradationIconButton color="gray" onClick={handleClose}>
                <Icon icon="mingcute:close-fill" style={{ fontSize: '22px', color: '#758693' }} />
              </GradationIconButton>
            </div>
          </div>
        </div>
        <div className={styles.subtitle}>検索した場所の詳細</div>
        <div>{position.tiktokTitle}</div>
      </div>

      <div className={styles.middle}>
        <div className={styles.middleLeft}>
          <div className={styles.img}>画像</div>
        </div>
        <div className={styles.middleRight}>
          <div className={styles.targetTitle}>目的地まで</div>
          <div className={styles.limit}>10km</div>
          <div className={styles.predict}>予想時間</div>

          <div className={styles.waysButton}>
            <div className={styles.walk}>
              <GradationIconButton color={selectedTransport ==="walk" ? "red" : "gray"} onClick={handleWalk}>
                <Icon icon="material-symbols:directions-walk-rounded" style={{ fontSize: '15px', color: '#ffffff' }} />
              </GradationIconButton>
            </div>
            <div className={styles.car}>
              <GradationIconButton color={selectedTransport ==='car' ? "red" : "gray"} onClick={handleCar}>
                <Icon icon="ic:outline-directions-car" style={{ fontSize: '15px', color: '#ffffff' }} />
              </GradationIconButton>
            </div>
            <div className={styles.train}>
              <GradationIconButton color={selectedTransport ==='train' ? "red" : "gray"} onClick={handleTrain}>
                <Icon icon="material-symbols:train-outline-rounded" style={{ fontSize: '15px', color: '#ffffff' }} />
              </GradationIconButton>
            </div>
          </div>

          <div className={styles.hour}>{duration?.hour}</div>

          <div className={styles.minutes}>{duration?.mins || "ー"}</div>

          <div className={styles.url}>参考元リンク</div>
        </div>
      </div>
    </div>
  );
}

export default PlaceInfo;
