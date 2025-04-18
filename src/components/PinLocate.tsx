import { SetStateAction, useAtom } from 'jotai'
import L from 'leaflet'
import React, { useState } from 'react'
import { Marker, useMap, useMapEvents } from 'react-leaflet'

import blueicon from '../../public/img/blueIcon.png'
import fireicon from '../../public/img/fireIcon.png'
import greenicon from '../../public/img/greenIcon.png'
import redicon from '../../public/img/redIcon.png'
import { locationPositionAtom } from '../atoms/locationPositionAtom'
interface PinLocateProps {
  setModalWindowIsOpen: React.Dispatch<SetStateAction<boolean>>
  arrDistance: {
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
  }[]
  correntposition: {
    latitude: number
    longitude: number
  }
}

function PinLocate({ setModalWindowIsOpen, arrDistance, correntposition }: PinLocateProps) {
  const map = useMap()
  const [zoomLevel, setZoomLevel] = useState(map.getZoom())

  const [__, setPosition] = useAtom(locationPositionAtom) //選択した場所の情報

  useMapEvents({
    zoomend: () => {
      setZoomLevel(map.getZoom())
    },
  })

  const handleOpen = (place: {
    tiktokTitle: string
    explanation: string
    tags: string
    userName: string
    url: string
    title:string
    latitude:number
    longitude:number
    likes:number
    photoName:string
    place:string
  }) => {
    setModalWindowIsOpen(true)
    setPosition({
      explanation: place.explanation,
      tags: place.tags,
      tiktokTitle: place.tiktokTitle,
      userName: place.userName,
      url: place.url,
      title:place.title,
      likes:place.likes,
      photoName:place.photoName,
      place:place.place
    })

    // クリック時に地図を拡大
    map.setView([place.latitude, place.longitude], 13, {
      animate: true,
    })

    const R = Math.PI / 180
    function distance(lat1: number, lng1: number, lat2: number, lng2: number) {
      lat1 *= R
      lng1 *= R
      lat2 *= R
      lng2 *= R
      return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2))
    }

    const road = distance(correntposition.latitude, correntposition.longitude, place.latitude, place.longitude)

    // console.log("road",road);

    const walk = road / 0.08
    console.log('walk', walk)

    const car = road / 34
    console.log('car', car)

    const train = road / 100
    console.log('train', train)

    if (car < 1) {
      console.log('carMini', car * 60)
    }
    if (train < 1) {
      console.log('trainMini', train * 60)
    }
  }

  function Icon(location: { likes: number }) {
    const showIcon =
      location.likes < 50
        ? { icon: blueicon, zoomlevel: 11 }
        : location.likes >= 50 && location.likes < 100
          ? { icon: greenicon, zoomlevel: 9 }
          : location.likes >= 100 && location.likes < 200
            ? { icon: redicon, zoomlevel: 7 }
            : { icon: fireicon, zoomlevel: 0 }

    if (zoomLevel >= showIcon.zoomlevel) {
      return L.divIcon({
        className: 'custom-marker',
        html: `
              <div style="position: relative; text-align: center;">
                <img src=${showIcon.icon} style="width: 50px; height: 50px;" />
                <div style="
                transform: translateY(-210%);
                color:white;
                  display: flex; top:16px; justify-content: center;
                  font-weight: bold; font-size: 12px;">
                  ${location.likes}
                </div>
              </div>
              `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      })
    } else {
      return L.divIcon({
        className: 'custom-marker',
        html: ``,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
      })
    }
  }

  return (
    <div>
      {arrDistance.map((place, index) => (
        //   console.log("location",location.position[0])
        <Marker
          position={[place.latitude, place.longitude]}
          icon={Icon(place)}
          key={index}
          eventHandlers={{ click: () => handleOpen(place) }}
        />
      ))}
    </div>
  )
}

export default PinLocate
