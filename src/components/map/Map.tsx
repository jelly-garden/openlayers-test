import { useEffect, useState, useRef, ReactNode } from "react";

import { Map as OlMap, View as OlView } from "ol";
import { Layer } from "ol/layer";

import { osmLayer } from "../layers";

import MapContext from "./MapContext";

import "./Map.css";

interface MapProps {
  children?: ReactNode;
  initialLayers?: Layer[];
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
