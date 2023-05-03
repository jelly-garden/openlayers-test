import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

// 기본지도
const vworldBaseLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Base/{z}/{y}/{x}.png",
  }),
  properties: { name: "base-vworld-base" },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});

// 백지도
const vworldGrayLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/gray/{z}/{y}/{x}.png",
  }),
  properties: { name: "base-vworld-gray" },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// 야간지도
const vworldMidnightLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/midnight/{z}/{y}/{x}.png",
  }),
  properties: { name: "base-vworld-midnight" },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// 하이브리드 지도
const vworldHybridLayer = new TileLayer({
  source: new XYZ({
    url: "https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Hybrid/{z}/{y}/{x}.png",
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
    url: "https://api.vworld.kr/req/wmts/1.0.0/2AAC4DD9-4F6F-3844-A740-E2DB6BDC8CEF/Satellite/{z}/{y}/{x}.jpeg",
  }),
  properties: { name: "base-vworld-satellite" },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});

const view = new View({
  projection: "EPSG:3857",
  center: [14135490.777017945, 4518386.883679577],
  zoom: 17,
});
