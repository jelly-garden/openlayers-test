import { useEffect } from "react";

import Map from "ol/Map";
import MapBrowserEvent from "ol/MapBrowserEvent";

interface PositionBoardProps {
  map?: Map;
}

const PositionBoard = ({ map }: PositionBoardProps) => {
  /**
   * 마우스 위치 지정 메서드
   * @param coordinate
   */
  function setPosition(coordinate: number[]) {
    const xElement = document.querySelector("input[name=x]") as HTMLInputElement;
    const yElement = document.querySelector("input[name=y]") as HTMLInputElement;
    // 태그가 유효할 경우
    if (xElement && yElement) {
      const [x, y] = coordinate;
      xElement.value = x.toString();
      yElement.value = y.toString();
    }
  }

  /**
   * 마우스 위치 좌표 추출
   */
  useEffect(() => {
    if (!map) return;

    map.once("postrender", () => {
      const center = map.getView().getCenter();
      if (center) {
        setPosition(center);
      }
    });

    map.on("pointermove", (e: MapBrowserEvent<UIEvent>) => {
      const [x, y]: number[] = e.coordinate;
      setPosition([x, y]);
    });
  }, [map]);

  return (
    <div className="map-board-item-group" data-name="positionState">
      <div className="map-board-title">Position</div>
      <div className="map-board-item">
        <small>x</small>
        <input name="x" readOnly />
      </div>
      <div className="map-board-item">
        <small>y</small>
        <input name="y" readOnly />
      </div>
    </div>
  );
};

export default PositionBoard;
