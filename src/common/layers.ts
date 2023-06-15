import { Tile as TileLayer } from "ol/layer";
import { OSM as OSMSource, XYZ as XYZSource } from "ol/source";

const API_KEY = import.meta.env.VITE_VWORLD_API_KEY;

export enum BaseMap {
  BASE_OSM = "base-osm", // OSM
  BASE_VWORLD_BASE = "base-vworld-base", // VWorld 기본
  BASE_VWORLD_GRAY = "base-vworld-gray", // VWorld 흑백
  BASE_VWORLD_MIDNIGHT = "base-vworld-midnight", // VWorld 야간
  BASE_VWORLD_SATELLITE = "base-vworld-satellite", // VWorld 위성
  BASE_GOOGLE_ROAD = "base-google-road", // Google 로드맵
  BASE_GOOGLE_TERRAIN = "base-google-terrain", // Google 지형도
  BASE_GOOGLE_ALTER = "base-google-alter", // Google 변경된 로드맵
  BASE_GOOGLE_SATELLITE = "base-google-satellite", // Google 위성
  BASE_GOOGLE_ONLY_TERRAIN = "base-google-only-terrain", // Google 지형 전용도
  BASE_GOOGLE_HYBRID = "base-google-hybrid", // Google 하이브리드
}

export enum ExtMap {
  EXT_VWORLD_HYBRID = "ext-vworld-hybrid", // VWorld 하이브리드
}

// OSM 지도
export const osmLayer = new TileLayer({
  preload: Infinity,
  properties: { name: BaseMap.BASE_OSM },
  source: new OSMSource({
    attributions: "<p>Developed by Innodep</p>",
    cacheSize: 0,
  }),
  zIndex: 1,
});

// VWorld 기본지도
export const vworldBaseLayer = new TileLayer({
  maxZoom: 19,
  minZoom: 5,
  preload: Infinity,
  properties: { name: BaseMap.BASE_VWORLD_BASE },
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Base/{z}/{y}/{x}.png`,
  }),
  zIndex: 2,
});

// VWorld 흑백지도
export const vworldGrayLayer = new TileLayer({
  maxZoom: 18,
  minZoom: 5,
  preload: Infinity,
  properties: { name: BaseMap.BASE_VWORLD_GRAY },
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/gray/{z}/{y}/{x}.png`,
  }),
  zIndex: 2,
});

// VWorld 야간지도
export const vworldMidnightLayer = new TileLayer({
  maxZoom: 18,
  minZoom: 5,
  preload: Infinity,
  properties: { name: BaseMap.BASE_VWORLD_MIDNIGHT },
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/midnight/{z}/{y}/{x}.png`,
  }),
  zIndex: 2,
});

// VWorld 하이브리드지도
export const vworldHybridLayer = new TileLayer({
  maxZoom: 19,
  minZoom: 5,
  preload: Infinity,
  properties: { name: ExtMap.EXT_VWORLD_HYBRID },
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Hybrid/{z}/{y}/{x}.png`,
  }),
  zIndex: 3,
});

// VWorld 위성지도
export const vworldSatelliteLayer = new TileLayer({
  maxZoom: 19,
  minZoom: 5,
  preload: Infinity,
  properties: { name: BaseMap.BASE_VWORLD_SATELLITE },
  source: new XYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Satellite/{z}/{y}/{x}.jpeg`,
  }),
  zIndex: 2,
});

// Google 로드맵지도
export const googleRoadLayer = new TileLayer({
  preload: Infinity,
  properties: { name: BaseMap.BASE_GOOGLE_ROAD },
  source: new XYZSource({ url: "http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" }),
  zIndex: 2,
});

// Google 지형도
export const googleTerrainLayer = new TileLayer({
  preload: Infinity,
  properties: { name: BaseMap.BASE_GOOGLE_TERRAIN },
  source: new XYZSource({ url: "http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" }),
  zIndex: 2,
});

// Google 변경된 로드맵
export const googleAlterLayer = new TileLayer({
  preload: Infinity,
  properties: { name: BaseMap.BASE_GOOGLE_ALTER },
  source: new XYZSource({ url: "http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" }),
  zIndex: 2,
});

// Google 위성지도
export const googleSatelliteLayer = new TileLayer({
  preload: Infinity,
  properties: { name: BaseMap.BASE_GOOGLE_SATELLITE },
  source: new XYZSource({ url: "http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" }),
  zIndex: 2,
});

// Google 지형 전용도
export const googleOnlyTerrainLayer = new TileLayer({
  preload: Infinity,
  properties: { name: BaseMap.BASE_GOOGLE_ONLY_TERRAIN },
  source: new XYZSource({ url: "http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}" }),
  zIndex: 2,
});

// Google 하이브리드지도
export const googleHybridLayer = new TileLayer({
  preload: Infinity,
  properties: { name: BaseMap.BASE_GOOGLE_HYBRID },
  source: new XYZSource({ url: "http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" }),
  zIndex: 2,
});
