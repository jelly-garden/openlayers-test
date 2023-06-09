import { Feature } from "ol";
import Geometry from "ol/geom/Geometry";
import RenderFeature from "ol/render/Feature";
import { Icon } from "ol/style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import { LiteralStyle } from "ol/style/literal";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import Text from "ol/style/Text";

/**
 * 기본 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function basicStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string) {
  return new Style({
    fill: new Fill({ color: "rgba(100, 149, 237, 0.6)" }),
    stroke: new Stroke({
      color: "rgba(100, 149, 237, 1)",
      width: 2,
    }),
    text: new Text({
      fill: new Fill({ color: "white" }),
      font: "0.8rem sans-serif",
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 1)",
        width: 4,
      }),
      text: feature.get(labelColumn),
    }),
  });
}

/**
 * 호버 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function hoverStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string) {
  return new Style({
    fill: new Fill({ color: "rgba(100, 149, 237, 0.6)" }),
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 1)",
      width: 2,
    }),
    text: new Text({
      fill: new Fill({ color: "white" }),
      font: "0.8rem sans-serif",
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 1)",
        width: 4,
      }),
      text: feature.get(labelColumn),
    }),
  });
}

/**
 * 클릭 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function clickStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string) {
  return new Style({
    fill: new Fill({ color: "rgba(100, 149, 237, 1)" }),
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 1)",
      width: 2,
    }),
    text: new Text({
      fill: new Fill({ color: "yellow" }),
      font: "0.8rem sans-serif",
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 1)",
        width: 4,
      }),
      text: feature.get(labelColumn),
    }),
  });
}

/**
 * 스타벅스 기본 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function starbucksBasicStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string) {
  return new Style({
    image: new Icon({
      scale: 0.05,
      src: "https://t1.daumcdn.net/cfile/tistory/99857F4F5E738F472F",
    }),
    text: new Text({
      fill: new Fill({ color: "white" }),
      font: "0.8rem sans-serif",
      offsetY: 30,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 1)",
        width: 4,
      }),
      text: feature.get("features")[0].get(labelColumn),
    }),
  });
}

/**
 * 클러스터 기본 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 *
 * @returns {Style} 스타일
 */
export function clusterBasicStyle(feature: RenderFeature | Feature<Geometry>) {
  return new Style({
    image: new Circle({
      fill: new Fill({ color: "rgba(3, 102, 53, 0.6)" }),
      radius: 20,
      stroke: new Stroke({
        color: "rgba(3, 102, 53, 1)",
        width: 2,
      }),
    }),
    text: new Text({
      fill: new Fill({ color: "white" }),
      font: "0.8rem sans-serif",
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 1)",
        width: 4,
      }),
      text: feature.get("features").length.toString(),
    }),
  });
}

/**
 * 스타벅스 호버 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function starbucksHoverStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string) {
  return new Style({
    image: new Icon({
      scale: 0.07,
      src: "https://t1.daumcdn.net/cfile/tistory/99857F4F5E738F472F",
    }),
    text: new Text({
      fill: new Fill({ color: "white" }),
      font: "0.8rem sans-serif",
      offsetY: 35,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 1)",
        width: 4,
      }),
      text: feature.get("features")[0].get(labelColumn),
    }),
  });
}

/**
 * 스타벅스 클릭 스타일 반환 메서드
 *
 * @param {RenderFeature | Feature<Geometry>} feature: Feature
 * @param {string} labelColumn: 라벨 컬럼
 *
 * @returns {Style} 스타일
 */
export function starbucksClickStyle(feature: RenderFeature | Feature<Geometry>, labelColumn: string) {
  return new Style({
    image: new Icon({
      scale: 0.07,
      src: "https://t1.daumcdn.net/cfile/tistory/99857F4F5E738F472F",
    }),
    text: new Text({
      fill: new Fill({ color: "yellow" }),
      font: "0.8rem sans-serif",
      offsetY: 35,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 1)",
        width: 4,
      }),
      text: feature.get("features")[0].get(labelColumn),
    }),
  });
}

/**
 * WebGL 스타일 반환 메서드
 *
 * @returns {LiteralStyle} 스타일
 */
export function webGLStyle(): LiteralStyle {
  return {
    symbol: {
      color: "red",
      opacity: 0.6,
      size: 14,
      symbolType: "circle",
    },
  };
}
