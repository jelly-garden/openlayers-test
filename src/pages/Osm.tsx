import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import proj4 from "proj4";

import { osmLayer } from "../common/layers";
import { seoulPosition } from "../contants/position";

export const Osm = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      layers: [osmLayer],
      view: new View({
        projection: "EPSG:3857",
        center: proj4("EPSG:4326", "EPSG:3857", seoulPosition),
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
