import { Icon } from '@iconify/react'
import { useAtom } from 'jotai'
import { useState } from 'react'

import { locationPositionAtom } from '../../../atoms/locationPositionAtom'
import GradationIconButton from '../../../layout/GradationIconButton'

import styles from './PlaceInfo.module.scss'
import { modalWindowAtom } from '../../../atoms/modalWindowAtom'

function PlaceInfo() {
  const [position, _] = useAtom(locationPositionAtom) //押した場所の情報
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom)
  const [selectedTransport, setSelectedTransport] = useState<'walk' | 'car' | 'train' | null>(null)



  console.log('position', position)
  console.log('"position.name', position.tiktokTitle)

  const handleShare = () => {
    console.log('シェアボタンが押されました。')
    console.log("")
  }

  const handleClose = () => {
    console.log('閉じるボタンが押されました。')
      setModalWindowIsOpen(false);
  }

  const handleWalk = () => {
    console.log('徒歩ボタンが押されました。')
    setSelectedTransport('walk');
  }

  const handleCar = () => {
    console.log('車ボタンが押されました。')
    setSelectedTransport('car');
  }

  const handleTrain = () => {
    console.log('電車ボタンが押されました。')
    setSelectedTransport('train');
  }
  console.log('position', position)

  console.log("modalWindowIsOpen", modalWindowIsOpen);

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

          <div className={styles.hour}>231時間</div>

          <div className={styles.minutes}>30分</div>

          <div className={styles.url}>参考元リンク</div>
        </div>
      </div>
    </div>
  )
}

export default PlaceInfo
