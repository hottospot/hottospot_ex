import { SetStateAction, useAtom, WritableAtom } from 'jotai'
import React from 'react'
import { Marker, useMap } from 'react-leaflet'
import blueicon from '../../public/img/blueIcon.png'
import greenicon from '../../public/img/greenIcon.png'
import redicon from '../../public/img/redIcon.png'
import fireicon from '../../public/img/fireIcon.png'
import L from 'leaflet'

interface PinLocateProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
  setPosition: React.Dispatch<
    SetStateAction<{
      latitude: number | null
      longitude: number | null
      name: string | null
    }>
  >
  arrDistance: {
    name: string
    position: number[]
  }[]
}

function PinLocate({ setIsOpen, setPosition, arrDistance }: PinLocateProps) {
  console.log('locationData', arrDistance)
  const map = useMap()
  //   const locationArr = Object.values(locationData)

  const handleOpen = (location) => {
    console.log('location[0]', location.position[0])
    console.log('location[0]', location.name)
    setIsOpen(true)
    setPosition({
      latitude: location.position[0],
      longitude: location.position[1],
      name: location.name,
    })

    // クリック時に地図を拡大
    map.setView([location.position[0], location.position[1]], 13, {
      animate: true,
    })
  }

  function Icon(location) {
    const showIcon =
      location.likeCount < 50
        ? blueicon
        : location.likeCount >= 50 && location.likeCount < 100
        ? greenicon
        : location.likeCount >= 100 && location.likeCount < 200
        ? redicon
        : fireicon

    return L.divIcon({
      className: 'custom-marker',
      html: `
            <div style="position: relative; text-align: center;">
              <img src=${showIcon} style="width: 50px; height: 50px;" />
              <div style="
              transform: translateY(-210%);
              color:white;
                display: flex; top:16px; justify-content: center;
                font-weight: bold; font-size: 12px;">
                ${location.likeCount}
              </div>
            </div>
            `,
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    })
  }

  return (
    <div>
      {arrDistance.map((location, index) => (
        //   console.log("location",location.position[0])
        <Marker
          position={[location.position[0], location.position[1]]}
          icon={Icon(location)}
          key={index}
          eventHandlers={{ click: () => handleOpen(location) }}
        />
      ))}
    </div>
  )
}

export default PinLocate
