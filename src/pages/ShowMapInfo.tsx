import { useEffect } from "react";

import { Map, View, MapBrowserEvent } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export const ShowMapInfo = () => {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    map.once("postrender", () => {
      // EPSG 코드
      const epsg: string = map.getView().getProjection().getCode();
      console.log("## EPSG 코드 : ", epsg);
    });

    map.on("moveend", () => {
      // 줌 레벨
      const zoom = map.getView().getZoom();
      console.log("## 줌 레벨 : ", zoom);

      // 현재 영역 좌표 추출하기
      const [minX, minY, maxX, maxY]: number[] = map.getView().calculateExtent();
      console.log("## 현재 영역 좌표: ", [minX, minY, maxX, maxY]);
    });

    map.on("pointermove", (e: MapBrowserEvent<UIEvent>) => {
      // 마우스 위치 좌표 추출하기
      const [x, y]: number[] = e.coordinate;
      console.log("## 마우스 위치 좌표: ", [x, y]);
    });
  }, []);

  return (
    <div className="map-wrapper">
      <div id="map"></div>
    </div>
  );
};
