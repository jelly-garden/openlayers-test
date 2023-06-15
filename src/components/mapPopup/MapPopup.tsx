import { ReactNode, forwardRef, ForwardedRef } from "react";

import Map from "ol/Map";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";

import "./MapPopup.scss";

interface MapPopupProps {
  map?: Map;
  children?: ReactNode;
  title?: string;
  onUpdateClick?: () => void;
  onDeleteClick?: () => void;
}

export const MapPopup = forwardRef(
  (
    { map, children, title, onUpdateClick, onDeleteClick }: MapPopupProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div id="map-popup" ref={forwardedRef}>
        <div className="map-popup-header">
          <div className="map-popup-header-left">
            {title && <h5>{title}</h5>}
            {onUpdateClick && (
              <button data-action="update" onClick={onUpdateClick}>
                <MdEdit color="dodgerblue" />
              </button>
            )}
            {onDeleteClick && (
              <button data-action="delete" onClick={onDeleteClick}>
                <MdDelete color="crimson" />
              </button>
            )}
          </div>

          <div className="map-popup-header-right">
            <button onClick={() => map && map.getOverlayById("popup").setPosition(undefined)}>
              <MdClose color="inherit" />
            </button>
          </div>
        </div>

        <div className="map-popup-body">{children}</div>
      </div>
    );
  }
);
MapPopup.displayName = "MapPopup";
