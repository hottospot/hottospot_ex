import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useAtom, useSetAtom } from 'jotai'
import { LatLng } from 'leaflet'

import { modalWindowAtom } from '../atoms/modalWindowAtom'
import ModalSheet from '../components/modalsheet/ModalSheet'

import style from './MapPage.module.scss'
import PinLocate from '../components/PinLocate'
import { GetMethod } from '../components/ResponseMethod'
import { useLocation } from 'react-router-dom'

import { nowPositionAtom } from '../atoms/nowPositionAtom'

function SetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
}

function MapPage() {
  const api = import.meta.env.VITE_API_KEY
  const map_key = import.meta.env.VITE_MAP_KEY
  const location = useLocation()
  const correntposition = location.state.correntposition
  console.log(correntposition)

  const center = new LatLng(correntposition.latitude, correntposition.longitude) //座標オブジェクトLatLng

  console.log('center', center)

  const arrCenter = [Number(center.lat), Number(center.lng)] as [number, number]

  console.log('arrCenter', arrCenter)
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom)
  const setNowPostion = useSetAtom(nowPositionAtom);
  setNowPostion(arrCenter);

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
      photoName:'',
      title:'',
      place:''
    },
  ])

  const initializedRef = useRef(false)

  const MapBoundsLoggerFirst = () => {
    const mapFirst = useMap() //leafletのイベントハンドラを使うことができる
    useEffect(() => {
      if (initializedRef.current) return
      initializedRef.current = true
      const fetchData = async () => {
        const bounds = mapFirst.getBounds()
        const southWest = bounds.getSouthWest() // 左下
        const northEast = bounds.getNorthEast() // 右上
        console.log('SouthWest.lat:', southWest.lat)
        console.log('SouthWest.lng:', southWest.lng) // 緯度・経度
        console.log('NorthEast.lat:', northEast.lat)
        console.log('NorthEast.lng:', northEast.lng)
        const data = await GetMethod(
          `${api}/markers?latMin=${southWest.lat}&latMax=${northEast.lat}&lngMin=${southWest.lng}&lngMax=${northEast.lng}&scale=3`,
        )
        console.log('data', data)
        setArrDistance(data)

        console.log('initializedRef.curren', initializedRef.current)
      }
      fetchData()
    }, [])

    return null
  }

  //console.log('bounds', bounds)

  const MapBoundsLogger = () => {
    const mapzoom = useMap()

    const [zoomLevel, setZoomLevel] = useState(mapzoom.getZoom())

    useMapEvents({
      zoomend: () => {
        setZoomLevel(mapzoom.getZoom())
      },
    })

    console.log('zoomLevel', zoomLevel)

    let sendZoom = 0

    if (zoomLevel < 8 && zoomLevel > 7) {
      sendZoom = 3
    }

    console.log('sendZoom', sendZoom)
    const map = useMapEvents({
      //leafletのイベントハンドラを使うことができる
      moveend: async () => {
        const bounds = map.getBounds()
        const southWest = bounds.getSouthWest() // 左下
        const northEast = bounds.getNorthEast() // 右上

        //console.log('zoom', zoomLevel)

        const data = await GetMethod(
          `${api}/markers?latMin=${southWest.lat}&latMax=${northEast.lat}&lngMin=${southWest.lng}&lngMax=${northEast.lng}&scale=3`,
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
              title:string
              photoName:string
              place:string
            }) => ({
              explanation: d.explanation,
              latitude: d.latitude,
              likes: d.likes,
              longitude: d.longitude,
              tags: d.tags,
              tiktokTitle: d.tiktokTitle,
              url: d.url,
              userName: d.userName,
              title:d.title,
              photoName:d.photoName,
              place:d.place
            }),
          ),
        ])
      },
    })

    return null
  }

  return (
    <>
      {modalWindowIsOpen && <div className={style.modalOverlay} onClick={() => setModalWindowIsOpen(false)} />}
      <div style={{ zIndex: '10', position: 'absolute' }}>
        <MapContainer
          center={arrCenter}
          zoom={11}
          scrollWheelZoom={false}
          // zoomControl={false} //ズームバー（開発時のみ)
          style={{ height: '100vh', width: '100vw' }}
          key={`${correntposition.latitude}-${correntposition.longitude}`} // ←座標が変わると再描画
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${map_key}`}
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          />

          <MapBoundsLoggerFirst />
          <MapBoundsLogger />

          <SetViewOnClick />
          <Marker position={arrCenter} />

          {arrDistance.map((__, index) => (
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
