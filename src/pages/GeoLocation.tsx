import { useEffect, useRef, useState } from "react";

import Map from "ol/Map";
import View from "ol/View";
import proj4 from "proj4";

import { vworldBaseLayer } from "../common/layers";
import { Location, MapInteraction } from "../components/mapInteraction";
import { seoulPosition } from "../contants/position";

export const GeoLocation = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [mapState, setMapState] = useState<Map>();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      layers: [vworldBaseLayer],
      view: new View({
        projection: "EPSG:3857",
        center: proj4("EPSG:4326", "EPSG:3857", seoulPosition),
        zoom: 17,
      }),
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
      <MapInteraction>
        <Location map={mapState} />
      </MapInteraction>
    </div>
  );
};
