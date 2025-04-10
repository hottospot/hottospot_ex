import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLng } from 'leaflet'
import * as turf from '@turf/turf'
import style from './MapPage.module.scss'
import L from 'leaflet'
import PinLocate from '../components/PinLocate'
import { isHotModalAtom } from '../atoms/isHotModalAtom'
import { useAtom } from 'jotai'
import { locationPositionAtom } from '../atoms/locationPositionAtom'
import { locationDataAtom } from '../atoms/locationDataAtom'

function MapPage() {
  const [correntposition, setCorrentPosition] = useState({
    latitude: 35.65862055760233,
    longitude: 139.74543043734087,
  })
  const center = new LatLng(35.65862055760233, 139.74543043734087) //座標オブジェクトLatLng
  // const position = new LatLng(35.65862055760233, 139.74543043734087) //座標オブジェクトLatLng
  const [isHotModal, setIsHotModalAtom] = useAtom(isHotModalAtom);
  const [position, setPosition] = useAtom(locationPositionAtom);
  const [locationData, setLocationData] = useAtom(locationDataAtom);
  //仮の緯度軽度
  const arrDistance = [
    {
      name: 'tokyoTower',
      position: [35.65862055760233, 139.74543043734087],
    },
    {
      name: 'skytree',
      position: [35.71013065861893, 139.81068527858596],
    },
  ]
  

  //緯度 35° lat

  //現在地の取得
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setCorrentPosition({ latitude, longitude })
    })
    console.log("arrDistance",arrDistance)

    arrDistance.map((position) => {
      console.log("position",position.position)
    })
    setLocationData(arrDistance.map((position) => position.position))
  }, [])

  console.log("locationData",locationData)

  //距離の計算
  const R = Math.PI / 180
  function distance(lat1: number, lng1: number, lat2: number, lng2: number) {
    lat1 *= R
    lng1 *= R
    lat2 *= R
    lng2 *= R
    return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2))
  }
  

  arrDistance.map((d) => {
    //console.log("d.position",d.position)
    //現在の経度緯度、目的地の経度緯度
    console.log('distance', distance(correntposition.latitude, correntposition.longitude, d.position[0], d.position[1]))
  })

  // console.log(`arrDistanceの距離${arrDistance}`);

  const from = turf.point([correntposition.longitude, correntposition.latitude])
  const to = turf.point([139.74543043734087, 35.65862055760233])
  const d = turf.distance(from, to, { units: 'kilometers' })

  console.log(`${d} km`)

  return (
    <>
      <div className={style.MapPage}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false} 
          // zoomControl={false} //ズームバー（開発時のみ)
          style={{ height: '100vh', width: '100vw' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
          />
          {
            arrDistance.map((pin,index) => (
              // <Marker position={[pin.position[0], pin.position[1]]} key={index}></Marker>
              <PinLocate 
              setIsOpen={setIsHotModalAtom}
              setPosition={setPosition}
              arrDistance={arrDistance}
              key={index}
              />
            ))
          }
        </MapContainer>
      </div>
    </>
  )
}

export default MapPage
