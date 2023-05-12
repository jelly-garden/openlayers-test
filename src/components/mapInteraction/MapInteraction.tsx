import { ReactNode } from "react";

import "./MapInteraction.css";

interface MapInteractionProps {
  children?: ReactNode;
}

const MapInteraction = ({ children }: MapInteractionProps) => {
  return <div className="map-interaction">{children}</div>;
};

export default MapInteraction;
