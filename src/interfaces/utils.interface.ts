export interface CustomConfig {
  scene: Phaser.Scene,
  rows: number,
  cols: number,
  event: string,
  height?: number | string,
  width?: number | string
}

export interface ButtonProperty {
  scale?: number,
  textScale?: number,
  style: {
    color: string,
    fontFamily: string
  }
  key: string,
  text: string,
  callback: Function,
  callbackScope: any,
}

export type ChildObject = any;

export type Position = {
  x: number,
  y: number
}