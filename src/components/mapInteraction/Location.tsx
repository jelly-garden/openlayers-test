import { useContext } from "react";

import * as olProj from "ol/proj";

import MapContext from "../map/MapContext.tsx";

export const Location = () => {
  const { map } = useContext(MapContext);

  /**
   * 현재 위치로 이동 메서드
   */
  const handleMoveLocationClick = () => {
    if (!map) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const oldCode = "EPSG:4326";
          const newCode: string = map.getView().getProjection().getCode();
          const oldCoordinate = [longitude, latitude];
          const newCoordinate = olProj.transform(oldCoordinate, oldCode, newCode);
          map.getView().setCenter(newCoordinate);
        },
        () => alert("실패"),
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <button className="location" onClick={handleMoveLocationClick}>
      현재 위치
    </button>
  );
};
