import { createContext } from "react";

import { Map } from "ol";

interface MapContextProps {
  map?: Map;
}
const MapContext = createContext<MapContextProps>({});

export default MapContext;
