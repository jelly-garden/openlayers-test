import { Map, View, MapEvent, MapBrowserEvent } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export const ShowMapInfo = () => {
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

  // EPSG 코드
  const epsg: string = map.getView().getProjection().getCode();
  console.log("## EPSG 코드 : ", epsg);

  map.on("moveend", (e: MapEvent) => {
    // 줌 레벨
    const zoom2 = e.map.getView().getZoom();
    console.log("## 줌 레벨2 : ", zoom2);

    // 현재 영역 좌표 추출하기
    const [minX, minY, maxX, maxY]: number[] = e.map
      .getView()
      .calculateExtent();
    console.log("## 현재 영역 좌표: ", [minX, minY, maxX, maxY]);
  });

  map.on("pointermove", (e: MapBrowserEvent<UIEvent>) => {
    // 마우스 위치 좌표 추출하기
    const [x, y]: number[] = e.coordinate;
    console.log("## 마우스 위치 좌표: ", [x, y]);
  });

  return <div id="map"></div>;
};
