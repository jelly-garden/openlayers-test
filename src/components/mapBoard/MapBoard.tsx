import { ReactNode } from "react";

import "./MapBoard.css";

interface MapBoardProps {
  children?: ReactNode;
}

const MapBoard = ({ children }: MapBoardProps) => {
  return <div className="map-board">{children}</div>;
};

export default MapBoard;
