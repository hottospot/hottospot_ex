import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import * as turf from '@turf/turf'
import { useAtom } from 'jotai'
import { LatLng } from 'leaflet'

import { locationDataAtom } from '../atoms/locationDataAtom'
import { modalWindowAtom } from '../atoms/modalWindowAtom'
import ModalSheet from '../components/modalsheet/ModalSheet'

import style from './MapPage.module.scss'
import PinLocate from '../components/PinLocate'
import { GetMethod } from '../components/ResponseMethod'
import { useLocation } from 'react-router-dom'

function SetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
}

function MapPage() {
  // const [correntposition, setCorrentPosition] = useState({
  //   latitude: 35.65862055760233,
  //   longitude: 139.74543043734087,
  // });

  const location = useLocation()
  const correntposition = location.state.correntposition
  console.log(correntposition)

  const center = new LatLng(correntposition.latitude, correntposition.longitude) //座標オブジェクトLatLng

  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom)
  const [arrDistance, setArrDistance] = useState([
    {
      explanation: '',
      latitude: 0,
      likes: 0,
      longitude: 0,
      tags: '',
      tiktokTitle: '',
      url: '',
      userName: '',
    },
  ])

  // //仮の緯度軽度
  // const arrDistance = [
  //   {
  //     name: 'ジブリパーク',
  //     position: [35.1744374, 137.0901494],
  //     likeCount: 29,
  //   },
  //   {
  //     name: 'ikea',
  //     position: [35.1762717, 137.0754212],
  //     likeCount: 79,
  //   },
  // ]

  const MapBoundsLoggerFirst = () => {
    const mapFirst = useMap() //leafletのイベントハンドラを使うことができる
    useEffect(() => {
      const bounds = mapFirst.getBounds()
      const southWest = bounds.getSouthWest() // 左下
      const northEast = bounds.getNorthEast() // 右上
      // console.log('SouthWest.lat:', southWest.lat)
      // console.log('SouthWest.lng:', southWest.lng) // 緯度・経度
      // console.log('NorthEast.lat:', northEast.lat)
      // console.log('NorthEast.lng:', northEast.lng)

      const fetchData = async () => {
        const data = await GetMethod(
          `https://hottospot-backend-ex.umaminokiami.workers.dev/markers?latMin=${southWest.lat}&latMax=${northEast.lat}&lngMin=${southWest.lng}&lngMax=${northEast.lng}&scale=1`,
        )

        setArrDistance((prev) => [
          ...prev,
          ...data.map(
            (d: {
              explanation: string
              latitude: number
              likes: number
              longitude: number
              tags: string
              tiktokTitle: string
              url: string
              userName: string
            }) => ({
              explanation: d.explanation,
              latitude: d.latitude,
              likes: d.likes,
              longitude: d.longitude,
              tags: d.tags,
              tiktokTitle: d.tiktokTitle,
              url: d.url,
              userName: d.userName,
            }),
          ),
        ])
      }

      

      fetchData()
    }, [])

    return null
  }

  //console.log('bounds', bounds)

  const MapBoundsLogger = () => {
    const mapzoom = useMap()

    const [__, setZoomLevel] = useState(mapzoom.getZoom())

    useMapEvents({
      zoomend: () => {
        setZoomLevel(mapzoom.getZoom())
      },
    })

    //console.log('zoomlevel', zoomLevel)

    // if(zoomLevel >= 0){
    //   setSendScale(3)
    // }
    // if(zoomLevel >= 0 && zoomLevel <= 8){
    //   setSendScale(2)
    // }
    // if(zoomLevel <= 10){
    //   setSendScale(3)
    // }

    const map = useMapEvents({
      //leafletのイベントハンドラを使うことができる
      moveend: async () => {
        const bounds = map.getBounds()
        const southWest = bounds.getSouthWest() // 左下
        const northEast = bounds.getNorthEast() // 右上

        //console.log('zoom', zoomLevel)

        const data = await GetMethod(
          `https://hottospot-backend-ex.umaminokiami.workers.dev/markers?latMin=${southWest.lat}&latMax=${northEast.lat}&lngMin=${southWest.lng}&lngMax=${northEast.lng}&scale=1`,
        )
        setArrDistance([])
        setArrDistance((prev) => [
          ...prev,
          ...data.map(
            (d: {
              explanation: string
              latitude: number
              likes: number
              longitude: number
              tags: string
              tiktokTitle: string
              url: string
              userName: string
            }) => ({
              explanation: d.explanation,
              latitude: d.latitude,
              likes: d.likes,
              longitude: d.longitude,
              tags: d.tags,
              tiktokTitle: d.tiktokTitle,
              url: d.url,
              userName: d.userName,
            }),
          ),
        ])
      },
    })

    return null
  }

  // console.log('bounds', bounds)
  // console.log('arrDistance', arrDistance)

  //距離の計算
  // const R = Math.PI / 180
  // function distance(lat1: number, lng1: number, lat2: number, lng2: number) {
  //   lat1 *= R
  //   lng1 *= R
  //   lat2 *= R
  //   lng2 *= R
  //   return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2))
  // }

  // arrDistance.map((d) => {
  //   //console.log("d.position",d.position)
  //   //現在の経度緯度、目的地の経度緯度
  //   console.log('distance', distance(correntposition.latitude, correntposition.longitude, d.position[0], d.position[1]))
  // })

  const from = turf.point([correntposition.longitude, correntposition.latitude])
  const to = turf.point([139.74543043734087, 35.65862055760233])
  const d = turf.distance(from, to, { units: 'kilometers' })

  console.log(`${d} km`)

  return (
    <>
      {modalWindowIsOpen && <div className={style.modalOverlay} onClick={() => setModalWindowIsOpen(false)} />}
      <div style={{ zIndex: '10', position: 'absolute' }}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          // zoomControl={false} //ズームバー（開発時のみ)
          style={{ height: '100vh', width: '100vw' }}
          key={`${correntposition.latitude}-${correntposition.longitude}`} // ←座標が変わると再描画
        >
          <TileLayer
            url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ATIwUC2ahI1bMSEcMrXJ"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          />

          <MapBoundsLoggerFirst />
          <MapBoundsLogger />

          <SetViewOnClick />
          <Marker position={center} />

          {arrDistance.map((distance, index) => (
            <PinLocate
              setModalWindowIsOpen={setModalWindowIsOpen}
              arrDistance={arrDistance}
              key={index}
              correntposition={correntposition}
            />
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
