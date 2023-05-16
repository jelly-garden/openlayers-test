import { Tile as TileLayer } from "ol/layer";
import { OSM as OSMSource, XYZ as XYZSource } from "ol/source";

import { BaseMap, ExtMap } from "./types";

const API_KEY = import.meta.env.VITE_VWORLD_API_KEY;

// OSM 지도
const osmLayer = new TileLayer({
  source: new OSMSource({
    cacheSize: 0,
  }),
  properties: { name: BaseMap.BASE_OSM },
  zIndex: 1,
  preload: Infinity,
});

// VWorld 기본지도
const vworldBaseLayer = new TileLayer({
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Base/{z}/{y}/{x}.png`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_BASE },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 백지도
const vworldGrayLayer = new TileLayer({
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/gray/{z}/{y}/{x}.png`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_GRAY },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 야간지도
const vworldMidnightLayer = new TileLayer({
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/midnight/{z}/{y}/{x}.png`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_MIDNIGHT },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 하이브리드 지도
const vworldHybridLayer = new TileLayer({
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Hybrid/{z}/{y}/{x}.png`,
  }),
  properties: { name: ExtMap.EXT_VWORLD_HYBRID },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 3,
  preload: Infinity,
});

// VWorld 위성지도
const vworldSatelliteLayer = new TileLayer({
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Satellite/{z}/{y}/{x}.jpeg`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_SATELLITE },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});

export { osmLayer, vworldBaseLayer, vworldGrayLayer, vworldMidnightLayer, vworldHybridLayer, vworldSatelliteLayer };
