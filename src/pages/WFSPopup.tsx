/**
 * WFS 팝업 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 10:17:24
 */

import { ReactNode, useEffect, useRef, useState } from "react";

import { Map, Overlay, View } from "ol";
import { click, pointerMove } from "ol/events/condition";
import { GeoJSON } from "ol/format";
import { defaults, Select } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { bbox } from "ol/loadingstrategy";
import { Vector as VectorSource } from "ol/source";
import proj4 from "proj4";

import { vworldBaseLayer } from "../common/layers";
import { basicStyle, clickStyle, hoverStyle } from "../common/styles";
import { MapPopup } from "../components/mapPopup";
import { sejongPosition } from "../contants/position";
import { urlBuilder } from "../utils/url";

const WFS_URL = import.meta.env.VITE_WFS_URL;

export const WFSPopup = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [mapState, setMapState] = useState<Map>();
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState<ReactNode>();

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;

    const wfsSource = new VectorSource({
      format: new GeoJSON(),
      strategy: bbox,
      url: (extent) =>
        urlBuilder(WFS_URL, {
          service: "WFS",
          version: "2.0.0",
          request: "GetFeature",
          typename: "test:build_sejong",
          srsName: "EPSG:3857",
          outputFormat: "application/json",
          exceptions: "application/json",
          bbox: `${extent.join(",")},EPSG:3857`,
        }),
    });

    const wfsLayer = new VectorLayer({
      minZoom: 15,
      properties: { name: "wfs" },
      source: wfsSource,
      style: (feature) => basicStyle(feature, "BULD_NM"),
      zIndex: 5,
    });

    const hoverSelect = new Select({
      condition: pointerMove,
      style: (feature) => hoverStyle(feature, "BULD_NM"),
    });

    const clickSelect = new Select({
      condition: click,
      style: (feature) => clickStyle(feature, "BULD_NM"),
    });

    // Overlay 생성
    const overlay = new Overlay({
      id: "popup",
      element: popupRef.current || undefined,
      positioning: "center-center",
      autoPan: { animation: { duration: 250 } },
    });

    const map = new Map({
      layers: [vworldBaseLayer, wfsLayer],
      interactions: defaults().extend([hoverSelect, clickSelect]),
      overlays: [overlay],
      view: new View({
        projection: "EPSG:3857",
        center: proj4("EPSG:4326", "EPSG:3857", sejongPosition),
        zoom: 17,
      }),
    });

    // 객체 선택 시, Overlay 출력
    map.on("singleclick", (e) => {
      // 해당 픽셀에 객체가 있을 경우
      if (map.hasFeatureAtPixel(e.pixel)) {
        map.forEachFeatureAtPixel(e.pixel, (feature) => {
          const isBuildingFeature = feature.getId()?.toString().startsWith("build_sejong");
          if (isBuildingFeature) {
            const geom = feature.getGeometry();
            if (geom) {
              const [minX, minY, maxX, maxY] = geom.getExtent();

              setPopupTitle(feature.getId()?.toString() || "");
              setPopupContent(
                <ul>
                  <li>건물명 : {feature.get("BULD_NM") || <span>이름 없음</span>}</li>
                  <li>관리번호 : {feature.get("BUL_MAN_NO")}</li>
                </ul>
              );

              overlay.setPosition([(maxX + minX) / 2, (maxY + minY) / 2]);
            }
          }
        });
      }
      // 없을 경우
      else {
        overlay.setPosition(undefined);
      }
    });

    // Feature 에 커서 표시
    map.on("pointermove", (e) => {
      map.getViewport().style.cursor = map.hasFeatureAtPixel(e.pixel) ? "pointer" : "";
    });

    map.setTarget(mapRef.current);
    setMapState(map);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="map-wrapper">
      <div id="map" ref={mapRef}></div>
      <MapPopup ref={popupRef} map={mapState} title={popupTitle}>
        {popupContent}
      </MapPopup>
    </div>
  );
};
