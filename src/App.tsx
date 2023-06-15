import { Routes, Route } from "react-router-dom";

import { Layout } from "./layouts";
import { NotFound, Osm, VWorld, MapInfo, GeoLocation, GeoLocationWithMarker, WFS, WMS, FeatureClick } from "./pages";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="osm" element={<Osm />} />
        <Route path="vworld" element={<VWorld />} />
        <Route path="map-info" element={<MapInfo />} />
        <Route path="geo-location" element={<GeoLocation />} />
        <Route path="geo-location-with-marker" element={<GeoLocationWithMarker />} />
        <Route path="wfs" element={<WFS />} />
        <Route path="wms" element={<WMS />} />
        <Route path="feature-click" element={<FeatureClick />} />
        <Route path="wfs-popup" element={<></>} />
        <Route path="wms-popup" element={<></>} />
        <Route path="transaction-insert" element={<></>} />
        <Route path="transaction-update" element={<></>} />
        <Route path="transaction-delete" element={<></>} />
        <Route path="cluster-map" element={<></>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
