import Map from "ol/Map";
import proj4 from "proj4";

interface LocationProps {
  map?: Map;
}

const Location = ({ map }: LocationProps) => {
  /**
   * 현재 위치로 이동 메서드
   */
  const handleCurrentLocationClick = () => {
    if (!map) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const oldCode = "EPSG:4326";
          const newCode: string = map.getView().getProjection().getCode();
          const oldCoordinate = [longitude, latitude];
          const newCoordinate = proj4(oldCode, newCode, oldCoordinate);

          // 지도 이동
          map.getView().setCenter(newCoordinate);
        },
        () => alert("실패"),
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <button className="location" onClick={handleCurrentLocationClick}>
      현재 위치
    </button>
  );
};

export default Location;
