export interface AlignGridConfig {
  scene: Phaser.Scene;
  rows: number;
  cols: number;
  height?: number | string;
  width?: number | string;
}

export type ChildObject = any;

export type Position = {
  x: number,
  y: number
}