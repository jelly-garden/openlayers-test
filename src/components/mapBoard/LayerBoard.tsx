import { useEffect, useState } from "react";

import Map from "ol/Map";

import {
  BaseMap,
  osmLayer,
  vworldBaseLayer,
  vworldGrayLayer,
  vworldHybridLayer,
  vworldMidnightLayer,
  vworldSatelliteLayer,
  googleRoadLayer,
  googleTerrainLayer,
  googleAlterLayer,
  googleSatelliteLayer,
  googleOnlyTerrainLayer,
  googleHybridLayer,
} from "../../common/layers";

interface LayerBoardProps {
  map?: Map;
}

const LayerBoard = ({ map }: LayerBoardProps) => {
  const [layerState, setLayerState] = useState<BaseMap>(BaseMap.BASE_VWORLD_BASE);
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
      case BaseMap.BASE_OSM:
        map.addLayer(osmLayer);
        break;
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
      case BaseMap.BASE_GOOGLE_ROAD:
        map.addLayer(googleRoadLayer);
        break;
      case BaseMap.BASE_GOOGLE_TERRAIN:
        map.addLayer(googleTerrainLayer);
        break;
      case BaseMap.BASE_GOOGLE_ALTER:
        map.addLayer(googleAlterLayer);
        break;
      case BaseMap.BASE_GOOGLE_SATELLITE:
        map.addLayer(googleSatelliteLayer);
        break;
      case BaseMap.BASE_GOOGLE_ONLY_TERRAIN:
        map.addLayer(googleOnlyTerrainLayer);
        break;
      case BaseMap.BASE_GOOGLE_HYBRID:
        map.addLayer(googleHybridLayer);
        break;
    }

    // vworld로 시작하지 않을 경우
    if (!layerState.startsWith("base-vworld")) {
      setExtState(false);
    }

    return () => {
      map
        .getAllLayers()
        .filter((layer) => (layer.get("name") as string).startsWith("base"))
        .forEach((layer) => map.removeLayer(layer));
    };
  }, [layerState]);

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

    return () => {
      map
        .getAllLayers()
        .filter((layer) => (layer.get("name") as string).startsWith("ext"))
        .forEach((layer) => map.removeLayer(layer));
    };
  }, [extState]);

  return (
    <div className="map-board-item-group" data-name="layer">
      <div className="map-board-title">Layer</div>
      <div className="map-board-item">
        <small>layer</small>
        <select value={layerState} onChange={(e) => setLayerState(e.target.value as BaseMap)}>
          <option value={BaseMap.BASE_OSM}>OSM</option>
          <option value={BaseMap.BASE_VWORLD_BASE}>VWorld 기본</option>
          <option value={BaseMap.BASE_VWORLD_GRAY}>VWorld 흑백</option>
          <option value={BaseMap.BASE_VWORLD_MIDNIGHT}>VWorld 야간</option>
          <option value={BaseMap.BASE_VWORLD_SATELLITE}>VWorld 위성</option>
          <option value={BaseMap.BASE_GOOGLE_ROAD}>Google 로드맵</option>
          <option value={BaseMap.BASE_GOOGLE_TERRAIN}>Google 지형도</option>
          <option value={BaseMap.BASE_GOOGLE_ALTER}>Google 변경된 로드맵</option>
          <option value={BaseMap.BASE_GOOGLE_SATELLITE}>Google 위성</option>
          <option value={BaseMap.BASE_GOOGLE_ONLY_TERRAIN}>Google 지형 전용도</option>
          <option value={BaseMap.BASE_GOOGLE_HYBRID}>Google 하이브리드</option>
        </select>
      </div>
      <div className="map-board-item">
        <small>ext</small>
        <input
          type="checkbox"
          name="ext"
          checked={extState}
          disabled={!layerState.startsWith("base-vworld")}
          onChange={(e) => setExtState(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default LayerBoard;
