import { useEffect, useState, useRef } from "react";

import OlMap from "ol/Map";
import OlView from "ol/View";

import {
  BaseMap,
  osmLayer,
  vworldBaseLayer,
  vworldGrayLayer,
  vworldMidnightLayer,
  vworldSatelliteLayer,
} from "../components/layers";

export const ChangeMapObject = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<OlMap>();
  const [layerState, setLayerState] = useState<BaseMap>(BaseMap.BASE_OSM);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObject = new OlMap({
      layers: [osmLayer],
      view: new OlView({
        projection: "EPSG:3857",
        center: [14135490.777017945, 4518386.883679577],
        zoom: 17,
      }),
    });
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // 배경지도 전체 삭제
    map
      .getAllLayers()
      .filter((layer) => (layer.get("name") as string).startsWith("base"))
      .forEach((layer) => map.removeLayer(layer));

    // 선택한 값에 따라 레이어 추가
    switch (layerState) {
      case "base-vworld-base":
        map.addLayer(vworldBaseLayer);
        break;
      case "base-vworld-gray":
        map.addLayer(vworldGrayLayer);
        break;
      case "base-vworld-midnight":
        map.addLayer(vworldMidnightLayer);
        break;
      case "base-vworld-satellite":
        map.addLayer(vworldSatelliteLayer);
        break;
      default:
        map.addLayer(osmLayer);
        break;
    }
  }, [layerState, map]);

  return (
    <div className="map-wrapper">
      <select
        value={layerState}
        onChange={(e) => setLayerState(e.target.value as BaseMap)}
        style={{ position: "absolute", right: "10px", top: "10px", zIndex: 1 }}
      >
        <option value={BaseMap.BASE_OSM}>OSM</option>
        <option value={BaseMap.BASE_VWORLD_BASE}>VWorld 기본</option>
        <option value={BaseMap.BASE_VWORLD_GRAY}>VWorld 흑백</option>
        <option value={BaseMap.BASE_VWORLD_MIDNIGHT}>VWorld 야간</option>
        <option value={BaseMap.BASE_VWORLD_SATELLITE}>VWorld 위성</option>
      </select>
      <div id="map" ref={mapRef}></div>
    </div>
  );
};
