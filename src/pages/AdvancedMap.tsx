import { ViewOptions as OlViewOptions } from "ol/View";

import { Map } from "../components/map";
import { MapBoard, BoundaryBoard, LayerBoard, MetaBoard, PositionBoard } from "../components/mapBoard";
import { MapInteraction, Location } from "../components/mapInteraction";

export const AdvancedMap = () => {
  const initialViewOptions: OlViewOptions = {
    projection: "EPSG:3857",
    center: [14135490.777017945, 4518386.883679577],
    zoom: 17,
  };

  return (
    <div className="map-wrapper">
      <Map initialViewOptions={initialViewOptions}>
        <MapInteraction>
          <Location />
        </MapInteraction>
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
