import { Map, View } from "ol";
import { osmLayer, vworldHybridLayer, vworldSatelliteLayer } from "./MapLayer";

export const ChangeMapObject = () => {
  const map = new Map({
    target: "map",
    layers: [osmLayer],
    view: new View({
      projection: "EPSG:3857",
      center: [14135490.777017945, 4518386.883679577],
      zoom: 17,
    }),
  });

  // 레이어 추가하기
  map.addLayer(vworldHybridLayer);
  map.addLayer(vworldSatelliteLayer);

  // 레이어 삭제하기
  map.getAllLayers().forEach((layer) => {
    if (layer.get("name") === "base-vworld-satellite") {
      map.removeLayer(layer);
    }
  });

  return <div id="map"></div>;
};
