import { useEffect } from "react";

import Feature from "ol/Feature";
import { Point as Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import Map from "ol/Map";
import { Vector as VectorSource } from "ol/source";
import { Circle, Fill, Stroke, Style } from "ol/style";
import proj4 from "proj4";

interface LocationWithMarkerProps {
  map?: Map;
}

export const LocationWithMarker = ({ map }: LocationWithMarkerProps) => {
  useEffect(() => {
    if (!map) return;

    // location 벡터 레이어 객체
    const locationLayer = new VectorLayer({
      minZoom: 15,
      properties: { name: "location" },
      source: new VectorSource(),
      style: new Style({
        image: new Circle({
          fill: new Fill({ color: "dodgerblue" }),
          radius: 10,
          stroke: new Stroke({
            color: "white",
            width: 3,
          }),
        }),
      }),
      zIndex: 10,
    });
    map.addLayer(locationLayer);

    // 드래그 할 경우, 레이어의 Feature를 전부 초기화
    map.on("pointerdrag", () => {
      const locationSource = locationLayer.getSource();
      if (locationSource) {
        locationSource.clear();
      }
    });

    return () => {
      map.removeLayer(locationLayer);
    };
  }, [map]);

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
          const newCoordinate = proj4(oldCode, newCode, oldCoordinate);

          // 지도 이동
          map.getView().setCenter(newCoordinate);

          // location 레이어의 Source에 Feature를 추가
          const locationLayers = map.getAllLayers().filter((layer) => layer.get("name") === "location");
          if (locationLayers.length > 0) {
            const locationSource = locationLayers[0].getSource() as VectorSource;
            if (locationSource) {
              const locationFeature = new Feature({
                geometry: new Point(newCoordinate),
              });
              locationSource.addFeature(locationFeature);
            }
          }
        },
        () => alert("실패"),
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <button className="location" onClick={handleCurrentLocationClick}>
      현재 위치
    </button>
  );
};

export default LocationWithMarker;
