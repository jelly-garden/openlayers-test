import { ViewOptions } from "ol/View";

import Map from "../components/map";
import MapBoard, { BoundaryBoard, LayerBoard, MetaBoard, PositionBoard } from "../components/mapBoard";

export const AdvancedMap = () => {
  const initialViewOptions: ViewOptions = {
    projection: "EPSG:3857",
    center: [14135490.777017945, 4518386.883679577],
    zoom: 17,
  };

  return (
    <div className="map-wrapper">
      <Map initialViewOptions={initialViewOptions}>
        <MapBoard>
          <LayerBoard />
          <MetaBoard />
          <BoundaryBoard />
          <PositionBoard />
        </MapBoard>
      </Map>
    </div>
  );
};
