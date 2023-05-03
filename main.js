import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

// // 기본
// const source = new OSM();
// 옵션 적용
const source = new OSM({
  attributions:
    '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>',
  cacheSize: 0,
});

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: source,
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
