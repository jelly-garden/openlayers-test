import { Tile as OlTileLayer } from "ol/layer";
import { OSM as OlOSMSource, XYZ as OlXYZSource } from "ol/source";

const API_KEY = import.meta.env.VITE_VWORLD_API_KEY;

export enum BaseMap {
  BASE_OSM = "base-osm", // OSM
  BASE_VWORLD_BASE = "base-vworld-base", // VWorld 기본
  BASE_VWORLD_GRAY = "base-vworld-gray", // VWorld 흑백
  BASE_VWORLD_MIDNIGHT = "base-vworld-midnight", // VWorld 야간
  BASE_VWORLD_SATELLITE = "base-vworld-satellite", // VWorld 위성
}

// OSM 지도
export const osmLayer = new OlTileLayer({
  source: new OlOSMSource({
    cacheSize: 0,
  }),
  properties: { name: BaseMap.BASE_OSM },
  zIndex: 1,
  preload: Infinity,
});

// VWorld 기본지도
export const vworldBaseLayer = new OlTileLayer({
  source: new OlXYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Base/{z}/{y}/{x}.png`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_BASE },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 백지도
export const vworldGrayLayer = new OlTileLayer({
  source: new OlXYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/gray/{z}/{y}/{x}.png`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_GRAY },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 야간지도
export const vworldMidnightLayer = new OlTileLayer({
  source: new OlXYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/midnight/{z}/{y}/{x}.png`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_MIDNIGHT },
  minZoom: 5,
  maxZoom: 18,
  zIndex: 2,
  preload: Infinity,
});

// VWorld 위성지도
export const vworldSatelliteLayer = new OlTileLayer({
  source: new OlXYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Satellite/{z}/{y}/{x}.jpeg`,
  }),
  properties: { name: BaseMap.BASE_VWORLD_SATELLITE },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 2,
  preload: Infinity,
});
