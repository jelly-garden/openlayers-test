import Map from "ol/Map";
import View from "ol/View";
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

const view = new View({
  projection: "EPSG:3857",
  center: [14135490.777017945, 4518386.883679577],
  zoom: 17,
});

const map = new Map({
  layers: [layer],
  target: "map",
  view: view,
});
