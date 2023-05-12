import { useContext, useEffect } from "react";

import MapContext from "../map/MapContext";

export const BoundaryBoard = () => {
  const { map } = useContext(MapContext);

  /**
   * 영역 지정 메서드
   * @param extent
   */
  const setBoundary = (extent: number[]) => {
    {
      const minXElement = document.querySelector("input[name=minX]") as HTMLInputElement;
      const minYElement = document.querySelector("input[name=minY]") as HTMLInputElement;
      const maxXElement = document.querySelector("input[name=maxX]") as HTMLInputElement;
      const maxYElement = document.querySelector("input[name=maxY]") as HTMLInputElement;
      // 태그가 유효할 경우
      if (minXElement && minYElement && maxXElement && maxYElement) {
        const [minX, minY, maxX, maxY] = extent;
        minXElement.value = minX.toString();
        minYElement.value = minY.toString();
        maxXElement.value = maxX.toString();
        maxYElement.value = maxY.toString();
      }
    }
  };

  /**
   * 현재 영역 좌표 추출
   */
  useEffect(() => {
    if (!map) return;

    map.once("postrender", () => {
      const [minX, minY, maxX, maxY]: number[] = map.getView().calculateExtent();
      setBoundary([minX, minY, maxX, maxY]);
    });

    map.on("moveend", () => {
      const [minX, minY, maxX, maxY]: number[] = map.getView().calculateExtent();
      setBoundary([minX, minY, maxX, maxY]);
    });
  }, [map]);

  return (
    <div className="map-board-item-group" data-name="boundary">
      <div className="map-board-title">Boundary</div>
      <div className="map-board-item">
        <small>minX</small>
        <input name="minX" readOnly />
      </div>
      <div className="map-board-item">
        <small>minY</small>
        <input name="minY" readOnly />
      </div>
      <div className="map-board-item">
        <small>maxX</small>
        <input name="maxX" readOnly />
      </div>
      <div className="map-board-item">
        <small>maxY</small>
        <input name="maxY" readOnly />
      </div>
    </div>
  );
};
