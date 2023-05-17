import { Routes, Route } from "react-router-dom";

import { Layout } from "./layouts";
import { Home, NotFound, Osm, VWorld, MapInfo, ChangeMapObject, MapComponent, Feature } from "./pages";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="osm" element={<Osm />} />
        <Route path="vworld" element={<VWorld />} />
        <Route path="map-info" element={<MapInfo />} />
        <Route path="change-map-object" element={<ChangeMapObject />} />
        <Route path="map-component" element={<MapComponent />} />
        <Route path="feature" element={<Feature />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
