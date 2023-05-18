import { createContext } from "react";

import OlMap from "ol/Map";

interface MapContextProps {
  map?: OlMap;
}
const MapContext = createContext<MapContextProps>({});

export default MapContext;
