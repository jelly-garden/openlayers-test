import TileLayer from "ol/layer/Tile";
import { OSM, XYZ } from "ol/source";

const API_KEY = import.meta.env.VITE_VWORLD_API_KEY;

// OSM 지도
const osmLayer = new TileLayer({
  source: new OSM({
    attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>',
    cacheSize: 0,
  }),
  properties: { name: "base-osm" },
  zIndex: 1,
  preload: Infinity,
});

// VWorld 기본지도
const vworldBaseLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Base/{z}/{y}/{x}.png`,
  }),
  properties: { name: "base-vworld-base" },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 백지도
const vworldGrayLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/gray/{z}/{y}/{x}.png`,
  }),
  properties: { name: "base-vworld-gray" },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 야간지도
const vworldMidnightLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/midnight/{z}/{y}/{x}.png`,
  }),
  properties: { name: "base-vworld-midnight" },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 하이브리드 지도
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

// VWorld 위성지도
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

export { osmLayer, vworldBaseLayer, vworldGrayLayer, vworldMidnightLayer, vworldHybridLayer, vworldSatelliteLayer };
