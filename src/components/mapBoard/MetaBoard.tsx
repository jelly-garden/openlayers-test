import { useEffect, useState } from "react";

import Map from "ol/Map";

interface MetaBoardProps {
  map?: Map;
}

const MetaBoard = ({ map }: MetaBoardProps) => {
  const [projState, setProjState] = useState<string>("");

  /**
   * EPSG 코드 추출
   */
  useEffect(() => {
    if (!map) return;

    map.once("postrender", () => {
      const epsg: string = map.getView().getProjection().getCode();
      setProjState(epsg);
    });
  }, [map]);

  /**
   * 줌 레벨 지정 메서드
   * @param level
   */
  const setZoom = (level: number) => {
    const zoomElement = document.querySelector("input[name=zoom]") as HTMLInputElement;
    if (zoomElement) {
      zoomElement.value = level.toString();
    }
  };

  /**
   * 줌 레벨 추출
   */
  useEffect(() => {
    if (!map) return;

    map.once("postrender", () => {
      const zoom = map.getView().getZoom() || 0;
      setZoom(zoom);
    });

    map.on("moveend", () => {
      const zoom = map.getView().getZoom() || 0;
      setZoom(zoom);
    });
  }, [map]);

  return (
    <div className="map-board-item-group" data-name="meta">
      <div className="map-board-title">Meta</div>
      <div className="map-board-item">
        <small>proj</small>
        <input name="proj" value={projState} readOnly />
      </div>
      <div className="map-board-item">
        <small>zoom</small>
        <input name="zoom" readOnly />
      </div>
    </div>
  );
};

export default MetaBoard;
