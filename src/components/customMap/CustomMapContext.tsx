import { createContext } from "react";

import * as ol from "ol";

interface MapContextProps {
  map?: ol.Map;
}
const CustomMapContext = createContext<MapContextProps>({});

export default CustomMapContext;
