import { useEffect } from "react";

import { Map as OlMap, View } from "ol";

import { osmLayer } from "../components/layers";

export const Osm = () => {
  useEffect(() => {
    const view = new View({
      projection: "EPSG:3857",
      center: [14135490.777017945, 4518386.883679577],
      zoom: 17,
    });

    const map = new OlMap({
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
