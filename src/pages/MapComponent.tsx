import { View as OlView } from "ol";

import { Map } from "../components/map";
import { MapBoard, BoundaryBoard, LayerBoard, MetaBoard, PositionBoard } from "../components/mapBoard";
import { MapInteraction, Location } from "../components/mapInteraction";

export const MapComponent = () => {
  const initialView = new OlView({
    projection: "EPSG:3857",
    center: [14135490.777017945, 4518386.883679577],
    zoom: 17,
  });

  return (
    <div className="map-wrapper">
      <Map initialView={initialView}>
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
