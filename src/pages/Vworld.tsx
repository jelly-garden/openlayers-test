import { useEffect } from "react";

import { Map as OlMap, View } from "ol";

import {
  vworldBaseLayer,
  vworldGrayLayer,
  vworldMidnightLayer,
  vworldHybridLayer,
  vworldSatelliteLayer,
} from "../components/layers";

export const VWorld = () => {
  useEffect(() => {
    const view = new View({
      projection: "EPSG:3857",
      center: [14135490.777017945, 4518386.883679577],
      zoom: 17,
    });

    const map = new OlMap({
      layers: [vworldBaseLayer, vworldGrayLayer, vworldMidnightLayer, vworldHybridLayer, vworldSatelliteLayer],
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
