import { useState, useEffect, useRef } from "react";

import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import Map from "ol/Map";
import { ImageWMS as ImageWMSSource, TileWMS as TileWMSSource } from "ol/source";
import View from "ol/View";
import proj4 from "proj4";

import { vworldBaseLayer } from "../common/layers";
import { sejongPosition } from "../contants/position";

const WMS_URL = import.meta.env.VITE_WMS_URL;

type SourceType = "tile" | "image";

export const WMS = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [mapState, setMapState] = useState<Map>();
  const [sourceType, setSourceType] = useState<SourceType>();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      layers: [vworldBaseLayer],
      view: new View({
        projection: "EPSG:3857",
        center: proj4("EPSG:4326", "EPSG:3857", sejongPosition),
        zoom: 17,
      }),
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
    </div>
  );
};
