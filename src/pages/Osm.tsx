import { Map, View } from "ol";
import { osmLayer } from "./MapLayer";

const view = new View({
  projection: "EPSG:3857",
  center: [14135490.777017945, 4518386.883679577],
  zoom: 17,
});

const map = new Map({
  layers: [osmLayer],
  target: "map",
  view: view,
});
