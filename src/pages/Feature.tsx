import { useContext, useEffect } from "react";

import { click, pointerMove } from "ol/events/condition";
import OlFeature from "ol/Feature";
import { GeoJSON as OlGeoJSON } from "ol/format";
import Geometry from "ol/geom/Geometry";
import { Select } from "ol/interaction";
import { Vector as OlVectorLayer, Image as OlImageLayer } from "ol/layer";
import { bbox as olBbox } from "ol/loadingstrategy";
import RenderFeature from "ol/render/Feature";
import { Vector as OlVectorSource, ImageWMS as OlImageWMSource } from "ol/source";
import { Style as OlStyle, Stroke as OlStroke, Fill as OlFill, Text as OlText } from "ol/style";
import { default as OlView } from "ol/View";

import { Map, MapContext } from "../components/map";
import { urlBuilder } from "../utils/url";

const WfsFeature = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // WFS 벡터 소스 객체
    const wfsSource = new OlVectorSource({
      format: new OlGeoJSON(),
      url: (extent) =>
        urlBuilder("/geoserver/wfs", {
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

    // WFS 벡터 스타일
    const getPolygonStyle = (): OlStyle => {
      return new OlStyle({
        stroke: new OlStroke({
          color: "rgba(100, 149, 237, 1)",
          width: 2,
        }),
        fill: new OlFill({
          color: "rgba(100, 149, 237, 0.6)",
        }),
      });
    };

    // WFS 벡터 레이어 객체
    const wfsLayer = new OlVectorLayer({
      source: wfsSource,
      properties: { name: "wfs" },
      style: getPolygonStyle,
      minZoom: 15,
      zIndex: 5,
    });

    map.addLayer(wfsLayer);

    // hover 상호작용 추가
    const getHoverStyle = (): OlStyle => {
      return new OlStyle({
        stroke: new OlStroke({
          color: "rgba(40, 108, 232, 1)",
          width: 2,
        }),
        fill: new OlFill({
          color: "rgba(40, 108, 232, 0.6)",
        }),
      });
    };
    const hoverSelect = new Select({
      condition: pointerMove,
      style: getHoverStyle,
    });
    map.addInteraction(hoverSelect);

    // click 상호작용 추가
    const getClickStyle = (feature: RenderFeature | OlFeature<Geometry>): OlStyle => {
      return new OlStyle({
        stroke: new OlStroke({
          color: "rgba(210,19,82, 1)",
          width: 2,
        }),
        fill: new OlFill({
          color: "rgba(210,19,82, 0.6)",
        }),
        text: new OlText({
          font: "0.8rem sans-serif",
          fill: new OlFill({ color: "white" }),
          stroke: new OlStroke({
            color: "rgba(0, 0, 0, 1)",
            width: 4,
          }),
          text: feature.get("BULD_MNNM").toString(),
        }),
      });
    };
    const clickSelect = new Select({
      condition: click,
      style: getClickStyle,
    });
    map.addInteraction(clickSelect);

    return () => {
      if (map) {
        map.removeLayer(wfsLayer);
      }
    };
  }, [map]);

  return null;
};

const WmsFeature = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // WMS 소스 객체
    const wmsSource = new OlImageWMSource({
      url: "/geoserver/wms",
      params: {
        layers: "test:build_sejong",
        exceptions: "application/json",
      },
      serverType: "geoserver",
    });

    // WMS 레이어 객체
    const wmsLayer = new OlImageLayer({
      source: wmsSource,
      properties: { name: "wms" },
      minZoom: 15,
      zIndex: 5,
    });

    map.addLayer(wmsLayer);

    return () => {
      if (map) {
        map.removeLayer(wmsLayer);
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
