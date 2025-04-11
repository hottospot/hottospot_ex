import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import * as turf from '@turf/turf'
import { useAtom } from 'jotai'
import { LatLng } from 'leaflet'

import { locationDataAtom } from '../atoms/locationDataAtom'
import { modalWindowAtom } from '../atoms/modalWindowAtom'
import ModalSheet from '../components/ModalSheet'
import PinLocate from '../components/PinLocate'

import style from './MapPage.module.scss'

function SetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
}

function MapPage() {
  const [correntposition, setCorrentPosition] = useState({
    latitude: 35.65862055760233,
    longitude: 139.74543043734087,
  })
  const center = new LatLng(35.65862055760233, 139.74543043734087) //座標オブジェクトLatLng
  // const position = new LatLng(35.65862055760233, 139.74543043734087) //座標オブジェクトLatLng

  const [locationData, setLocationData] = useAtom(locationDataAtom)
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom)

  //仮の緯度軽度
  const arrDistance = [
    {
      name: 'tokyoTower',
      position: [35.65862055760233, 139.74543043734087],
      likeCount:29
    },
    {
      name: 'skytree',
      position: [35.71013065861893, 139.81068527858596],
      likeCount:79
    },
  ]

  //緯度 35° lat

  //現在地の取得
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setCorrentPosition({ latitude, longitude })
    })
    console.log('arrDistance', arrDistance)

    arrDistance.map((position) => {
      console.log('position', position.position)
    })
    setLocationData(arrDistance.map((position) => position.position))
  }, [])

  console.log('locationData', locationData)

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
      {modalWindowIsOpen && (
        <div className={style.modalOverlay} onClick={() => setModalWindowIsOpen(false)} />
      )}
      <div style={{ zIndex: "10", position: "absolute" }}>
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

          <SetViewOnClick/>
          <Marker position={center} />

          {arrDistance.map((index) => (
            <PinLocate  setModalWindowIsOpen={setModalWindowIsOpen}  arrDistance={arrDistance} key={index} />
          ))}
        </MapContainer>
      </div>
      <div className={style.form}>
        <ModalSheet />
      </div>
      
    </>
  )
}

export default MapPage
