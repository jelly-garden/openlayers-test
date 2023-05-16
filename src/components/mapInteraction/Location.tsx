import { useContext, useEffect } from "react";

import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import * as olProj from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";

import MapContext from "../map/MapContext";

export const Location = () => {
  const { map } = useContext(MapContext);

  /**
   * 현재 위치로 이동 메서드
   */
  const handleCurrentLocationClick = () => {
    if (!map) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const oldCode = "EPSG:4326";
          const newCode: string = map.getView().getProjection().getCode();
          const oldCoordinate = [longitude, latitude];
          const newCoordinate = olProj.transform(oldCoordinate, oldCode, newCode);

          // 지도 이동
          map.getView().setCenter(newCoordinate);

          // location 레이어의 Source에 Feature를 추가
          const locationSource = map
            .getAllLayers()
            .filter((layer) => layer.get("name") === "location")[0]
            .getSource() as VectorSource;
          if (locationSource) {
            const locationFeature = new Feature({
              geometry: new Point(newCoordinate),
            });
            locationSource.addFeature(locationFeature);
          }
        },
        () => alert("실패"),
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    if (!map) return;

    // 드래그 할 경우, 레이어의 Feature를 전부 초기화
    map.on("pointerdrag", () => {
      const locationSource = map
        .getAllLayers()
        .filter((layer) => layer.get("name") === "location")[0]
        .getSource() as VectorSource;
      if (locationSource) {
        locationSource.clear();
      }
    });

    // location 벡터 레이어가 없을 경우
    if (map.getAllLayers().filter((layer) => layer.get("name") === "location").length === 0) {
      // 전용 레이어를 하나 추가함
      const locationLayer = new VectorLayer({
        source: new VectorSource(),
        properties: {
          name: "location",
        },
        style: new Style({
          image: new Icon({
            src: "https://tsauerwein.github.io/ol3/animation-flights/examples/data/icon.png",
          }),
        }),
        minZoom: 15,
        zIndex: 10,
      });
      map.addLayer(locationLayer);
    }
  }, [map]);

  return (
    <button className="location" onClick={handleCurrentLocationClick}>
      현재 위치
    </button>
  );
};
