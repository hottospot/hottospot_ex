import React from 'react';
import icon from '../../../public/img/icon.svg';
import style from './Title.module.scss';

function Title() {
  return (
    <div className={style.title}>
      <img src={icon} className={style.image} />
      <div className={style.hottospot}>Hottospot</div>
    </div>
  );
}

export default Title;
