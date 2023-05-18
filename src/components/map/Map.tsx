import { useEffect, useState, useRef, ReactNode } from "react";

import { Layer as OlLayer } from "ol/layer";
import OlMap from "ol/Map";
import OlView from "ol/View";

import { osmLayer } from "../layers";

import MapContext from "./MapContext";

import "./Map.css";

interface MapProps {
  children?: ReactNode;
  initialLayers?: OlLayer[];
  initialView?: OlView;
}

const Map = ({ children, initialLayers, initialView }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<OlMap>();

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObject = new OlMap({
      layers: initialLayers || [osmLayer],
      view: initialView || new OlView(),
    });
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, [initialLayers, initialView]);

  return (
    <MapContext.Provider value={{ map }}>
      <div id="map" ref={mapRef}></div>
      {children}
    </MapContext.Provider>
  );
};

export default Map;
