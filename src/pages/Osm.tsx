import { useEffect } from "react";

import OlMap from "ol/Map";
import OlView from "ol/View";

import { osmLayer } from "../components/layers";

export const Osm = () => {
  useEffect(() => {
    const view = new OlView({
      projection: "EPSG:3857",
      center: [14135490.777017945, 4518386.883679577],
      zoom: 17,
    });

    new OlMap({
      layers: [osmLayer],
      target: "map",
      view: view,
    });
  }, []);

  return (
    <div className="map-wrapper">
      <div id="map"></div>
    </div>
  );
};
