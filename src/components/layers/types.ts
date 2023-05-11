/** 배경지도 */
export const BaseMap = {
  BASE_OSM: "base-osm", // OSM
  BASE_VWORLD_BASE: "base-vworld-base", // VWorld 기본
  BASE_VWORLD_GRAY: "base-vworld-gray", // VWorld 흑백
  BASE_VWORLD_MIDNIGHT: "base-vworld-midnight", // VWorld 야간
  BASE_VWORLD_SATELLITE: "base-vworld-satellite", // VWorld 위성
} as const;
export type BaseMapType = typeof BaseMap;
export type BaseMapValueType = BaseMapType[keyof BaseMapType];

/** 확장지도 */
export const ExtMap = {
  EXT_VWORLD_HYBRID: "ext-vworld-hybrid", // VWorld 하이브리드
} as const;
export type ExtMapType = typeof ExtMap;
export type ExtMapValueType = ExtMapType[keyof ExtMapType];
