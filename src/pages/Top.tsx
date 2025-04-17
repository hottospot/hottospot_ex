import { useNavigate } from 'react-router-dom'

import Background from '../layout/home/Background'
import Title from '../layout/home/Title'
import { useEffect, useState } from 'react';

function Top() {
  const navigate = useNavigate();

  const [correntposition, setCorrentPosition] = useState({ latitude: 35.6586205576023, longitude: 139.74543043734087 })

  //現在地の取得
    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        // console.log('{ latitude, longitude }', { latitude, longitude })
        setCorrentPosition({ latitude, longitude })
      })
  
      // arrDistance.map((position) => {
      //   console.log('position', position.position)
      // })
      
    }, [])
  
  return (
    <div onClick={() => navigate('/map',{state:{correntposition}})}>
      <div
        style={{
          position: 'absolute',
          top: '12rem',
          right: 0,
          left: 0,
          margin: '0 auto',
        }}
        
      >
        <Title />
      </div>
      <Background />
    </div>
  )
}

export default Top
