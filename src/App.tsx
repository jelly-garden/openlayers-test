import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Layout } from "./layouts";
import { Home, NotFound, Osm, VWorld, ShowMapInfo, ChangeMapObject, AdvancedMap } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="osm" element={<Osm />} />
        <Route path="vworld" element={<VWorld />} />
        <Route path="show-map-info" element={<ShowMapInfo />} />
        <Route path="change-map-object" element={<ChangeMapObject />} />
        <Route path="advanced-map" element={<AdvancedMap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
