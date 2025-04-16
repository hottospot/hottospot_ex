import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import { useAtom } from "jotai";
import { LatLng } from "leaflet";

import { locationDataAtom } from "../atoms/locationDataAtom";
import { modalWindowAtom } from "../atoms/modalWindowAtom";
import ModalSheet from "../components/modalsheet/ModalSheet";

import style from "./MapPage.module.scss";
import PinLocate from "../components/PinLocate";
import { Search } from "../layout/Search";

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

function MapPage() {
  // const [correntposition, setCorrentPosition] = useState({
  //   latitude: 35.65862055760233,
  //   longitude: 139.74543043734087,
  // })
  const [correntposition, setCorrentPosition] = useState({ latitude: 35.6586205576023, longitude: 139.74543043734087 });

  const center = new LatLng(correntposition.latitude, correntposition.longitude); //座標オブジェクトLatLng

  const [_, setLocationData] = useAtom(locationDataAtom);
  const [modalWindowIsOpen, setModalWindowIsOpen] = useAtom(modalWindowAtom);

  //仮の緯度軽度
  const arrDistance = [
    {
      name: "ジブリパーク",
      position: [35.1744374, 137.0901494],
      likeCount: 29,
    },
    {
      name: "ikea",
      position: [35.1762717, 137.0754212],
      likeCount: 79,
    },
  ];

  //緯度 35° lat

  //現在地の取得
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log("{ latitude, longitude }", { latitude, longitude });
      setCorrentPosition({ latitude, longitude });
    });
    console.log("arrDistance", arrDistance);

    arrDistance.map((position) => {
      console.log("position", position.position);
    });
    setLocationData(arrDistance.map((position) => position.position));
  }, []);

  const MapBoundsLoggerFirst = () => {
    const mapFirst = useMap(); //leafletのイベントハンドラを使うことができる
    useEffect(() => {
      const bounds = mapFirst.getBounds();
      const southWest = bounds.getSouthWest(); // 左下
      const northEast = bounds.getNorthEast(); // 右上
      console.log("SouthWest.lat:", southWest.lat);
      console.log("SouthWest.lng:", southWest.lng); // 緯度・経度
      console.log("NorthEast.lat:", northEast.lat);
      console.log("NorthEast.lng:", northEast.lng);
    }, []);

    return null;
  };

  const MapBoundsLogger = () => {
    const map = useMapEvents({
      //leafletのイベントハンドラを使うことができる
      moveend: () => {
        const bounds = map.getBounds();
        const southWest = bounds.getSouthWest(); // 左下
        const northEast = bounds.getNorthEast(); // 右上
        console.log("SouthWest.lat:", southWest.lat);
        console.log("SouthWest.lng:", southWest.lng);
        console.log("NorthEast.lat:", northEast.lat);
        console.log("NorthEast.lng:", northEast.lng);
      },
    });

    return null;
  };

  //距離の計算
  const R = Math.PI / 180;
  function distance(lat1: number, lng1: number, lat2: number, lng2: number) {
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;
    return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
  }

  arrDistance.map((d) => {
    //console.log("d.position",d.position)
    //現在の経度緯度、目的地の経度緯度
    console.log(
      "distance",
      distance(correntposition.latitude, correntposition.longitude, d.position[0], d.position[1])
    );
  });

  // console.log(`arrDistanceの距離${arrDistance}`);

  const from = turf.point([correntposition.longitude, correntposition.latitude]);
  const to = turf.point([139.74543043734087, 35.65862055760233]);
  const d = turf.distance(from, to, { units: "kilometers" });

  console.log(`${d} km`);

  return (
    <>
      {modalWindowIsOpen && (
        <div
          className={style.modalOverlay}
          onClick={() => setModalWindowIsOpen(false)}
        />
      )}
      <div style={{ zIndex: "10", position: "absolute" }}>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          // zoomControl={false} //ズームバー（開発時のみ)
          style={{ height: "100vh", width: "100vw" }}
          key={`${correntposition.latitude}-${correntposition.longitude}`} // ←座標が変わると再描画
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
          />
          <MapBoundsLoggerFirst />
          <MapBoundsLogger />

          <SetViewOnClick />
          <Marker position={center} />

          {arrDistance.map((distance) => (
            <PinLocate
              setModalWindowIsOpen={setModalWindowIsOpen}
              arrDistance={arrDistance}
              key={distance.name}
            />
          ))}
        </MapContainer>
      </div>
      <Search />
      <div className={style.form}>
        <ModalSheet />
      </div>
    </>
  );
}

export default MapPage;
