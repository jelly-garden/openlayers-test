import "./MapBoard.css";

import { ReactNode } from "react";

interface MapBoardProps {
  children?: ReactNode;
}

const MapBoard = ({ children }: MapBoardProps) => {
  return <div className="map-boards">{children}</div>;
};

export default MapBoard;
