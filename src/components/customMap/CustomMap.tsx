import { useEffect, useState, useRef, ReactNode } from "react";

import { Map, View } from "ol";
import { ViewOptions } from "ol/View";

import CustomMapContext from "./CustomMapContext";

import "./CustomMap.css";

interface CustomMapProps {
  children?: ReactNode;
  initialViewOptions: ViewOptions;
}

const CustomMap = ({ children, initialViewOptions }: CustomMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [map, setMap] = useState<Map>();

  useEffect(() => {
    if (!mapRef.current) return;

    const mapObject = new Map({
      layers: [],
      view: new View(initialViewOptions),
    });
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, [initialViewOptions]);

  return (
    <CustomMapContext.Provider value={{ map }}>
      <div id="map" ref={mapRef}></div>
      {children}
    </CustomMapContext.Provider>
  );
};

export default CustomMap;
