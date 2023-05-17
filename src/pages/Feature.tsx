import { useContext, useEffect } from "react";

import { GeoJSON as OlGeoJSON } from "ol/format";
import { Vector as OlVectorLayer } from "ol/layer";
import { bbox as olBbox } from "ol/loadingstrategy";
import { Vector as OlVectorSource } from "ol/source";
import { Style as OlStyle, Stroke as OlStroke, Fill as OlFill, Text as OlText } from "ol/style";
import { default as OlView } from "ol/View";

import { Map, MapContext } from "../components/map";
import { Util } from "../util";

const WfsFeature = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // WFS 벡터 소스
    const wfsSource = new OlVectorSource({
      format: new OlGeoJSON(),
      url: (extent) =>
        Util.urlBuilder("/geoserver/wfs", {
          service: "WFS",
          version: "2.0.0",
          request: "GetFeature",
          typename: "test:build_sejong",
          srsName: "EPSG:3857",
          outputFormat: "application/json",
          exceptions: "application/json",
          bbox: `${extent.join(",")},EPSG:3857`,
        }),
      strategy: olBbox,
    });

    // WFS 벡터 레이어 객체
    const wfsLayer = new OlVectorLayer({
      source: wfsSource,
      style: (feature) =>
        new OlStyle({
          stroke: new OlStroke({
            color: "rgba(100, 149, 237, 1)",
            width: 2,
          }),
          fill: new OlFill({
            color: "rgba(100, 149, 237, 0.6)",
          }),
          text: new OlText({
            font: "0.8rem sans-serif",
            fill: new OlFill({ color: "white" }),
            stroke: new OlStroke({
              color: "rgba(0, 0, 0, 1)",
              width: 4,
            }),
            text: feature.get("address"),
          }),
        }),
      minZoom: 15,
      zIndex: 5,
      properties: { name: "wfs" },
    });

    map.addLayer(wfsLayer);

    return () => {
      if (map) {
        map.removeLayer(wfsLayer);
      }
    };
  }, [map]);

  return null;
};

export const Feature = () => {
  const initialView = new OlView({
    projection: "EPSG:3857",
    center: [14169813.729371138, 4366886.09289724],
    zoom: 17,
  });

  return (
    <div className="map-wrapper">
      <Map initialView={initialView}>
        <WfsFeature />
      </Map>
    </div>
  );
};
