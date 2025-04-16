import { Icon } from '@iconify/react'
import { useAtom } from 'jotai'

import { locationPositionAtom } from '../../../atoms/locationPositionAtom'
import GradationIconButton from '../../../layout/GradationIconButton'

import styles from './PlaceInfo.module.scss'

function PlaceInfo() {
  const [position, _] = useAtom(locationPositionAtom) //押した場所の情報
  console.log('position', position)
  console.log('"position.name', position.name)

  const handleShare = () => {
    console.log('シェアボタンが押されました。')
  }

  const handleClose = () => {
    console.log('閉じるボタンが押されました。')
  }

  return (
    <div className={styles.container}>
      <div className={styles.whole}>
        <div className={styles.title}>検索した場所</div>
        <div className={styles.subtitle}>検索した場所の詳細</div>

        <div className={styles.buttons}>
          <div className={styles.share}>
            <GradationIconButton color="red" onClick={handleShare}>
              <Icon icon="" style={{ fontSize: '24px', color: '#ffffff' }} />
            </GradationIconButton>
          </div>
          <div className={styles.close}>
            <GradationIconButton color="gray" onClick={handleClose}>
              <Icon icon="" style={{ fontSize: '24px', color: '#ffffff' }} />
            </GradationIconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceInfo
