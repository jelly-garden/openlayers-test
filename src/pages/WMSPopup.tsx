import { useState, useEffect, useRef, ReactNode } from "react";

import { Overlay } from "ol";
import { getCenter } from "ol/extent";
import { GeoJSON } from "ol/format";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import Map from "ol/Map";
import { ImageWMS as ImageWMSSource, TileWMS as TileWMSSource } from "ol/source";
import { Vector as VectorSource } from "ol/source";
import View from "ol/View";
import proj4 from "proj4";

import { vworldBaseLayer } from "../common/layers";
import { MapPopup } from "../components/mapPopup";
import { sejongPosition } from "../contants/position";

const WMS_URL = import.meta.env.VITE_WMS_URL;

type SourceType = "tile" | "image";

export const WMSPopup = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [mapState, setMapState] = useState<Map>();
  const [sourceType, setSourceType] = useState<SourceType>();
  const [popupTitle, setPopupTitle] = useState("");
  const [popupContent, setPopupContent] = useState<ReactNode>();

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;

    // Overlay 생성
    const overlay = new Overlay({
      id: "popup",
      element: popupRef.current || undefined,
      positioning: "center-center",
      autoPan: { animation: { duration: 250 } },
    });

    const map = new Map({
      layers: [vworldBaseLayer],
      overlays: [overlay],
      view: new View({
        projection: "EPSG:3857",
        center: proj4("EPSG:4326", "EPSG:3857", sejongPosition),
        zoom: 17,
      }),
    });

    // 객체 선택 시, Overlay 출력
    map.on("singleclick", async (e) => {
      const wmsLayer = map.getAllLayers().filter((layer) => layer.get("name") === "wms")[0];

      const wmsSource = wmsLayer.getSource() as TileWMSSource | ImageWMSSource;

      const url = wmsSource.getFeatureInfoUrl(e.coordinate, map.getView().getResolution() || 0, "EPSG:3857", {
        INFO_FORMAT: "application/json",
        QUERY_LAYERS: "test:build_sejong",
      });

      // GetFeatureInfo URL이 유효할 경우
      if (url) {
        const request = await fetch(url.toString(), { method: "GET" }).catch((e) => alert(e.message));
        // 응답이 유효할 경우
        if (request) {
          // 응답이 정상일 경우
          if (request.ok) {
            const json = await request.json();
            // 객체가 하나도 없을 경우
            if (json.features.length === 0) {
              overlay.setPosition(undefined);
            }
            // 객체가 있을 경우
            else {
              const feature = new GeoJSON().readFeature(json.features[0]);
              const vectorSource = new VectorSource({ features: [feature] });

              setPopupTitle(feature.getId()?.toString() || "");
              setPopupContent(
                <ul>
                  <li>건물명 : {feature.get("BULD_NM") || <span>이름 없음</span>}</li>
                  <li>관리번호 : {feature.get("BUL_MAN_NO")}</li>
                </ul>
              );

              overlay.setPosition(getCenter(vectorSource.getExtent()));
            }
          }
          // 아닐 경우
          else {
            alert(request.status);
          }
        }
      }
    });

    map.setTarget(mapRef.current);
    setMapState(map);
    setSourceType("tile");

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!mapState) return;

    // WMS 레이어 전체 삭제
    mapState
      .getAllLayers()
      .filter((layer) => layer.get("name") === "wms")
      .forEach((layer) => mapState.removeLayer(layer));

    // 선택한 타입의 WMS 레이어 추가
    if (sourceType) {
      mapState.addLayer(getLayer(sourceType));
    }

    return () => {
      mapState
        .getAllLayers()
        .filter((layer) => layer.get("name") === "wms")
        .forEach((layer) => mapState.removeLayer(layer));
    };
  }, [sourceType]);

  const getLayer = (type: SourceType): TileLayer<TileWMSSource> | ImageLayer<ImageWMSSource> => {
    let wmsSource: TileWMSSource | ImageWMSSource;

    switch (type) {
      case "tile":
        // WMS 소스 객체
        wmsSource = new TileWMSSource({
          url: WMS_URL,
          params: {
            exceptions: "application/json",
            layers: "test:build_sejong",
          },
          serverType: "geoserver",
          transition: 0.3,
        });

        // WMS 레이어 객체
        return new TileLayer({
          minZoom: 15,
          properties: { name: "wms" },
          source: wmsSource,
          zIndex: 5,
        });
      case "image":
        // WMS 소스 객체
        wmsSource = new ImageWMSSource({
          url: WMS_URL,
          params: {
            exceptions: "application/json",
            layers: "test:build_sejong",
          },
          serverType: "geoserver",
        });

        // WMS 레이어 객체
        return new ImageLayer({
          minZoom: 15,
          properties: { name: "wms" },
          source: wmsSource,
          zIndex: 5,
        });
    }
  };

  return (
    <div className="map-wrapper">
      <div id="map" ref={mapRef}></div>
      <select
        value={sourceType}
        onChange={(e) => setSourceType(e.target.value as SourceType)}
        style={{ position: "absolute", right: "10px", top: "10px", zIndex: 1 }}
      >
        <option value={"tile"}>Tile</option>
        <option value={"image"}>Image</option>
      </select>
      <MapPopup ref={popupRef} map={mapState} title={popupTitle}>
        {popupContent}
      </MapPopup>
    </div>
  );
};
