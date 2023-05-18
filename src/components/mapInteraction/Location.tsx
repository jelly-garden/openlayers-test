import { useContext, useEffect } from "react";

import OlFeature from "ol/Feature";
import { Point as OlPoint } from "ol/geom";
import { Vector as OlVectorLayer } from "ol/layer";
import * as OlProj from "ol/proj";
import { Vector as OlVectorSource } from "ol/source";
import { Style as OlStyle, Icon as OlIcon } from "ol/style";

import { MapContext } from "../map";

const Location = () => {
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
          const newCoordinate = OlProj.transform(oldCoordinate, oldCode, newCode);

          // 지도 이동
          map.getView().setCenter(newCoordinate);

          // location 레이어의 Source에 Feature를 추가
          const locationSource = map
            .getAllLayers()
            .filter((layer) => layer.get("name") === "location")[0]
            .getSource() as OlVectorSource;
          if (locationSource) {
            const locationFeature = new OlFeature({
              geometry: new OlPoint(newCoordinate),
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
        .getSource() as OlVectorSource;
      if (locationSource) {
        locationSource.clear();
      }
    });

    // location 벡터 레이어가 없을 경우
    const locationLayers = map.getAllLayers().filter((layer) => layer.get("name") === "location");
    if (locationLayers.length === 0) {
      // 전용 레이어를 하나 추가함
      const locationLayer = new OlVectorLayer({
        source: new OlVectorSource(),
        properties: {
          name: "location",
        },
        style: new OlStyle({
          image: new OlIcon({
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

export default Location;
