import { createContext } from "react";

import { Map as OlMap } from "ol";

interface MapContextProps {
  map?: OlMap;
}
const MapContext = createContext<MapContextProps>({});

export default MapContext;
