import { createContext } from "react";

import * as ol from "ol";

interface MapContextProps {
  map?: ol.Map;
}
const MapContext = createContext<MapContextProps>({});

export default MapContext;
