import { SetStateAction, useAtom } from "jotai";
import L from "leaflet";
import React, { useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";

import blueicon from "../../public/img/bluePIn.svg";
import fireicon from "../../public/img/firePin.svg";
import greenicon from "../../public/img/greenPin.svg";
import redIcon from "../../public/img/redPin.svg";
import { locationPositionAtom } from "../atoms/locationPositionAtom";
import { sendZoomAtom } from "../atoms/sendZoomAtom";
interface PinLocateProps {
  setModalWindowIsOpen: React.Dispatch<SetStateAction<boolean>>;
  arrDistance: {
    explanation: string;
    latitude: number;
    likes: number;
    longitude: number;
    tags: string;
    tiktokTitle: string;
    url: string;
    userName: string;
    title: string;
    photoName: string;
    place: string;
    scale: number;
  }[];
  correntposition: {
    latitude: number;
    longitude: number;
  };
}

function PinLocate({ setModalWindowIsOpen, arrDistance }: PinLocateProps) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  const [__, setPosition] = useAtom(locationPositionAtom); //選択した場所の情報
  const [, setSendZoom] = useAtom(sendZoomAtom);

  useMapEvents({
    zoomend: () => {
      setZoomLevel(map.getZoom());
    },
  });

  const handleOpen = (place: {
    tiktokTitle: string;
    explanation: string;
    tags: string;
    userName: string;
    url: string;
    title: string;
    latitude: number;
    longitude: number;
    likes: number;
    photoName: string;
    place: string;
    scale: number;
  }) => {
    setModalWindowIsOpen(true);
    setPosition({
      explanation: place.explanation,
      tags: place.tags,
      tiktokTitle: place.tiktokTitle,
      userName: place.userName,
      url: place.url,
      title: place.title,
      likes: place.likes,
      photoName: place.photoName,
      place: place.place,
      latitude: place.latitude,
      longitude: place.longitude,
      scale: place.scale,
    });

    setSendZoom(2);

    map.setView([place.latitude, place.longitude], 13, {
      animate: true,
    });
  };

  function Icon(location: { scale: number; likes: number; place:string}) {
    const showIcon =
      location.scale == 1 ? {icon:blueicon , width:"120", stopColor:"#4FF8F8",startColor:"#4B89ED"} : location.scale == 2 ? {icon:greenicon,width:"130",stopColor:"#A7F84F",startColor:"#4BED74"} : location.scale == 3 ? {icon:redIcon,width:"140",stopColor:"#F84F90",startColor:"#ED4B4B"} : {icon:fireicon,width:"160",stopColor:"#F84F90",startColor:"#ED4B4B"};

    const textSVG =
      zoomLevel > 15
        ? `
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-size="20" font-weight="bold" fill="white"
        stroke="#ED4B4B" stroke-width="1.5">
        ${location.likes}
      </text>
          
          `
          
        : "";

    return L.divIcon({
      className: "custom-marker",
      html: `
              <div style="position: relative; text-align: center;">
      <img src=${showIcon.icon} style="width: 50px; height: 50px;" />
      
      <div style="position: absolute; top: 140%; left: 130%; transform: translate(-50%, -210%);">
        <svg viewBox="0 0 100 30" width=${showIcon.width} height="30">
          
          
          ${textSVG}
          
        </svg>
        
        
      </div>
    </div>
              `,
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    });
  }

  const uniqueArrDistance = Array.from(new Map(arrDistance.map((distance) => [distance.latitude, distance])).values());

  return (
    <div>
      {uniqueArrDistance.map((place, index) => (
        <Marker
          position={[place.latitude, place.longitude]}
          icon={Icon(place)}
          key={index}
          eventHandlers={{ click: () => handleOpen(place) }}
        />
      ))}
    </div>
  );
}

export default PinLocate;
