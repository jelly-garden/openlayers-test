import { useEffect } from "react";

import { Map as OlMap, View as OlView, MapBrowserEvent as OlMapBrowserEvent } from "ol";
import { Tile as OlTileLayer } from "ol/layer";
import { OSM as OlOSMSource } from "ol/source";

export const ShowMapInfo = () => {
  useEffect(() => {
    const map = new OlMap({
      target: "map",
      layers: [
        new OlTileLayer({
          source: new OlOSMSource(),
        }),
      ],
      view: new OlView({
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

    map.on("pointermove", (e: OlMapBrowserEvent<UIEvent>) => {
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
