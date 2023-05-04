import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

const API_KEY = import.meta.env.VITE_VWORLD_API_KEY;

// 하이브리드 지도
const vworldHybridLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Hybrid/{z}/{y}/{x}.png`,
  }),
  properties: { name: "ext-vworld-hybrid" },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 3,
  preload: Infinity,
});

// 위성지도
const vworldSatelliteLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Satellite/{z}/{y}/{x}.jpeg`,
  }),
  properties: { name: "base-vworld-satellite" },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
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
