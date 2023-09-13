export interface CustomConfig {
  scene: Phaser.Scene,
  rows: number,
  cols: number,
  height?: number | string,
  width?: number | string
}

export interface ButtonProperty {
  scale?: number,
  textScale?: number,
  color: string,
  key: string,
  text: string
}

export type ChildObject = any;

export type Position = {
  x: number,
  y: number
}