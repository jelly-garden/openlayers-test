import { Tile as OlTileLayer } from "ol/layer";
import { XYZ as OlXYZSource } from "ol/source";

const API_KEY = import.meta.env.VITE_VWORLD_API_KEY;

export enum ExtMap {
  EXT_VWORLD_HYBRID = "ext-vworld-hybrid", // VWorld 하이브리드
}

// VWorld 하이브리드 지도
export const vworldHybridLayer = new OlTileLayer({
  source: new OlXYZSource({
    url: `https://api.vworld.kr/req/wmts/1.0.0/${API_KEY}/Hybrid/{z}/{y}/{x}.png`,
  }),
  properties: { name: ExtMap.EXT_VWORLD_HYBRID },
  minZoom: 5,
  maxZoom: 19,
  zIndex: 3,
  preload: Infinity,
});
