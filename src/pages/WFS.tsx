import { useEffect, useRef } from "react";

import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { bbox } from "ol/loadingstrategy";
import Map from "ol/Map";
import { Vector as VectorSource } from "ol/source";
import View from "ol/View";
import proj4 from "proj4";

import { vworldBaseLayer } from "../common/layers";
import { basicStyle } from "../common/styles";
import { sejongPosition } from "../contants/position";
import { urlBuilder } from "../utils/url";

const WFS_URL = import.meta.env.VITE_WFS_URL;

export const WFS = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // WFS 벡터 소스 객체
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

    // WFS 벡터 레이어 객체
    const wfsLayer = new VectorLayer({
      minZoom: 15,
      properties: { name: "wfs" },
      source: wfsSource,
      style: (feature) => basicStyle(feature, "BULD_NM"),
      zIndex: 5,
    });

    const map = new Map({
      layers: [vworldBaseLayer, wfsLayer],
      view: new View({
        projection: "EPSG:3857",
        center: proj4("EPSG:4326", "EPSG:3857", sejongPosition),
        zoom: 17,
      }),
    });

    map.setTarget(mapRef.current);

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <div className="map-wrapper">
      <div id="map" ref={mapRef}></div>
    </div>
  );
};
