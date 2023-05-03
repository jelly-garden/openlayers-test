import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const source = new OSM({
  attributions:
    '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>',
  cacheSize: 0,
});

const layer = new TileLayer({
  source: source,
  properties: { name: "base-osm" },
  zIndex: 1,
  preload: Infinity,
});
