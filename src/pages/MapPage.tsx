import "leaflet/dist/leaflet.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { LatLng } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";

import { MapBoundsAtom } from "../atoms/locationPositionAtom";
import { modalWindowAtom } from "../atoms/modalWindowAtom";
import PinLocate from "../components/PinLocate";
import { Search } from "../components/Search";
import ModalSheet from "../components/modalsheet/ModalSheet";

import style from "./MapPage.module.scss";
import { GetMethod } from "../components/ResponseMethod";
import { useLocation } from "react-router-dom";

import { sendZoomAtom } from "../atoms/sendZoomAtom";
import { nowPositionAtom } from "../atoms/nowPositionAtom";
import { arrDistanceAtom } from "../atoms/arrDistanceAtom";
import { isSearchAtom } from "../atoms/isSearchAtom";

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

function MapPage() {
  const api = import.meta.env.VITE_API_KEY;
  const map_key = import.meta.env.VITE_MAP_KEY;
  const location = useLocation();
  const correntposition = location.state.correntposition;
  console.log(correntposition);
  const setMapBounds = useSetAtom(MapBoundsAtom);
  const [arrDistance, setArrDistance] = useAtom(arrDistanceAtom);
  const isSearch = useAtomValue(isSearchAtom);
  const [sendZoom, setSendZoom] = useAtom(sendZoomAtom);

  const center = new LatLng(correntposition.latitude, correntposition.longitude); //座標オブジェクトLatLng

  console.log("center", center);

  const arrCenter = [Number(center.lat), Number(center.lng)] as [number, number];

  console.log("arrCenter", arrCenter);
  const [, setModalWindowIsOpen] = useAtom(modalWindowAtom);
  const setNowPostion = useSetAtom(nowPositionAtom);
  setNowPostion(arrCenter);

  const initializedRef = useRef(false);

  const MapBoundsLoggerFirst = () => {
    const mapFirst = useMap(); //leafletのイベントハンドラを使うことができる
    useEffect(() => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      const fetchData = async () => {
        const bounds = mapFirst.getBounds();
        const southWest = bounds.getSouthWest(); // 左下
        const northEast = bounds.getNorthEast(); // 右上
        setMapBounds({
          northEastLat: northEast.lat,
          southWestLat: southWest.lat,
          northEastLng: northEast.lng,
          southWestLng: southWest.lng,
        });
        console.log("SouthWest.lat:", southWest.lat);
        console.log("SouthWest.lng:", southWest.lng); // 緯度・経度
        console.log("NorthEast.lat:", northEast.lat);
        console.log("NorthEast.lng:", northEast.lng);
        const data = await GetMethod(
          `${api}/markers?latMin=${southWest.lat}&latMax=${northEast.lat}&lngMin=${southWest.lng}&lngMax=${northEast.lng}&scale=2`
        );
        console.log("data", data);
        setArrDistance(data);

        console.log("initializedRef.curren", initializedRef.current);
      };
      fetchData();
    }, []);

    return null;
  };

  const MapBoundsLogger = () => {
    const mapzoom = useMap();

    const [zoomLevel, setZoomLevel] = useState(mapzoom.getZoom());

    useMapEvents({
      zoomend: () => {
        setZoomLevel(mapzoom.getZoom());
      },
    });

    console.log("zoomLevel", zoomLevel);

    if (zoomLevel < 8) {
      setSendZoom(4);
    }
    if (zoomLevel >= 8 && zoomLevel < 12) {
      setSendZoom(3);
    }
    if (zoomLevel >= 12 && zoomLevel < 14) {
      setSendZoom(2);
    }

    if (zoomLevel >= 14) {
      setSendZoom(1);
    }
    console.log("sendZoom", sendZoom);
    const map = useMapEvents({
      //leafletのイベントハンドラを使うことができる
      moveend: async () => {
        if (isSearch) return; // 検索している時にデータ取得をスキップ

        const bounds = map.getBounds();
        const southWest = bounds.getSouthWest(); // 左下
        const northEast = bounds.getNorthEast(); // 右上

        setMapBounds({
          northEastLat: northEast.lat,
          southWestLat: southWest.lat,
          northEastLng: northEast.lng,
          southWestLng: southWest.lng,
        });
        console.log("SouthWest.lat:", southWest.lat);
        console.log("SouthWest.lng:", southWest.lng);
        console.log("NorthEast.lat:", northEast.lat);
        console.log("NorthEast.lng:", northEast.lng);

        const data = await GetMethod(
          `${api}/markers?latMin=${southWest.lat}&latMax=${northEast.lat}&lngMin=${southWest.lng}&lngMax=${northEast.lng}&scale=${sendZoom}`
        );

        setArrDistance([]);
        setArrDistance((prev) => [
          ...prev,
          ...data.map(
            (d: {
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
            }) => ({
              explanation: d.explanation,
              latitude: d.latitude,
              likes: d.likes,
              longitude: d.longitude,
              tags: d.tags,
              tiktokTitle: d.tiktokTitle,
              url: d.url,
              userName: d.userName,
              title: d.title,
              photoName: d.photoName,
              place: d.place,
              scale: d.scale,
            })
          ),
        ]);
      },
    });

    return null;
  };

  return (
    <>
      <div className={style.form}>
        <ModalSheet />
      </div>
      <div className={style.gradationBackground} />
      <Search />
      <div style={{ zIndex: "10", position: "absolute" }}>
        <MapContainer
          center={arrCenter}
          zoom={11}
          scrollWheelZoom
          doubleClickZoom={false}
          zoomControl={false}
          // zoomControl={false} //ズームバー（開発時のみ)
          style={{ height: "100vh", width: "100vw" }}
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

          <PinLocate
            setModalWindowIsOpen={setModalWindowIsOpen}
            arrDistance={arrDistance}
            correntposition={correntposition}
          />
        </MapContainer>
      </div>
    </>
  );
}

export default MapPage;
