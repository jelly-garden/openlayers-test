import { useEffect, useState, useRef, ReactNode } from "react";

import { Map as OlMap, View as OlView } from "ol";
import { ViewOptions as OlViewOptions } from "ol/View";

import MapContext from "./MapContext";

import "./Map.css";

interface MapProps {
  children?: ReactNode;
  initialViewOptions: OlViewOptions;
}

const Map = ({ children, initialViewOptions }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<OlMap>();

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObject = new OlMap({
      layers: [],
      view: new OlView(initialViewOptions),
    });
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, [initialViewOptions]);

  return (
    <MapContext.Provider value={{ map }}>
      <div id="map" ref={mapRef}></div>
      {children}
    </MapContext.Provider>
  );
};

export default Map;
