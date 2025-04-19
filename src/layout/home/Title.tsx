import newIcon from '../../../public/img/newIcon.svg';

import style from './Title.module.scss';

function Title() {
  return (
    <div className={style.title}>
      <img
        src={newIcon}
        className={style.image}
      />
      <div className={style.hottospot}>Hottospot</div>
    </div>
  )
}

export default Title
