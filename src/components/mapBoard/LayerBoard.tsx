import { useContext, useEffect, useState } from "react";

import {
  BaseMap,
  BaseMapValueType,
  osmLayer,
  vworldBaseLayer,
  vworldGrayLayer,
  vworldHybridLayer,
  vworldMidnightLayer,
  vworldSatelliteLayer,
} from "../layers";
import MapContext from "../map/MapContext";

export const LayerBoard = () => {
  const { map } = useContext(MapContext);

  const [layerState, setLayerState] = useState<BaseMapValueType>(BaseMap.BASE_OSM);
  const [extState, setExtState] = useState<boolean>(false);

  /**
   * 배경지도 변경 핸들러
   */
  useEffect(() => {
    if (!map) return;

    // 배경지도 전체 삭제
    map
      .getAllLayers()
      .filter((layer) => (layer.get("name") as string).startsWith("base"))
      .forEach((layer) => map.removeLayer(layer));

    // 선택한 값에 따라 레이어 추가
    switch (layerState) {
      case BaseMap.BASE_VWORLD_BASE:
        map.addLayer(vworldBaseLayer);
        break;
      case BaseMap.BASE_VWORLD_GRAY:
        map.addLayer(vworldGrayLayer);
        break;
      case BaseMap.BASE_VWORLD_MIDNIGHT:
        map.addLayer(vworldMidnightLayer);
        break;
      case BaseMap.BASE_VWORLD_SATELLITE:
        map.addLayer(vworldSatelliteLayer);
        break;
      default:
        map.addLayer(osmLayer);
        setExtState(false);
        break;
    }
  }, [layerState, map]);

  /**
   * 확장지도 변경 핸들러
   */
  useEffect(() => {
    if (!map) return;

    // 확장지도를 추가할 경우
    if (extState) {
      map.addLayer(vworldHybridLayer);
    }
    // 확장지도를 삭제할 경우
    else {
      map
        .getAllLayers()
        .filter((layer) => (layer.get("name") as string).startsWith("ext"))
        .forEach((layer) => map.removeLayer(layer));
    }
  }, [extState, map]);

  return (
    <div className="map-board-item-group" data-name="layer">
      <div className="map-board-title">Layer</div>
      <div className="map-board-item">
        <small>layer</small>
        <select value={layerState} onChange={(e) => setLayerState(e.target.value as BaseMapValueType)}>
          <option value={BaseMap.BASE_OSM}>OSM</option>
          <option value={BaseMap.BASE_VWORLD_BASE}>VWorld 기본</option>
          <option value={BaseMap.BASE_VWORLD_GRAY}>VWorld 흑백</option>
          <option value={BaseMap.BASE_VWORLD_MIDNIGHT}>VWorld 야간</option>
          <option value={BaseMap.BASE_VWORLD_SATELLITE}>VWorld 위성</option>
        </select>
      </div>
      <div className="map-board-item">
        <small>ext</small>
        <input
          type="checkbox"
          name="ext"
          checked={extState}
          disabled={layerState === BaseMap.BASE_OSM}
          onChange={(e) => setExtState(e.target.checked)}
        />
      </div>
    </div>
  );
};
