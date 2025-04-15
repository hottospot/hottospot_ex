import { SetStateAction, useAtom } from "jotai";
import L from "leaflet";
import React from "react";
import { Marker, useMap } from "react-leaflet";

import blueicon from "../../public/img/blueIcon.png";
import fireicon from "../../public/img/fireIcon.png";
import greenicon from "../../public/img/greenIcon.png";
import redicon from "../../public/img/redIcon.png";
import { locationPositionAtom } from "../atoms/locationPositionAtom";

interface PinLocateProps {
  setModalWindowIsOpen: React.Dispatch<SetStateAction<boolean>>;
  arrDistance: {
    name: string;
    position: number[];
    likeCount: number;
  }[];
}

function PinLocate({ setModalWindowIsOpen, arrDistance }: PinLocateProps) {
  console.log("locationData", arrDistance);

  const [position, setPosition] = useAtom(locationPositionAtom); //選択した場所の情報
  const map = useMap();
  //   const locationArr = Object.values(locationData)

  const handleOpen = (location: { position: number[]; name: string }) => {
    console.log("location[0]", location.position[0]);
    console.log("location[0]", location.name);
    setModalWindowIsOpen(true);
    setPosition({
      latitude: location.position[0],
      longitude: location.position[1],
      name: location.name,
    });

    // クリック時に地図を拡大
    map.setView([location.position[0], location.position[1]], 13, {
      animate: true,
    });
  };

  console.log("position", position);

  function Icon(location: { likeCount: number }) {
    const showIcon =
      location.likeCount < 50
        ? blueicon
        : location.likeCount >= 50 && location.likeCount < 100
          ? greenicon
          : location.likeCount >= 100 && location.likeCount < 200
            ? redicon
            : fireicon;

    return L.divIcon({
      className: "custom-marker",
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
    });
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
  );
}

export default PinLocate;
