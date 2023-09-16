import Consts from "./consts";

export class Model {

  public numberOfColors: number = Consts.DEFAULT_START_COLORS;
  public level: number = 1;
  public score: number = 0;
  private _music: boolean = true;
  public sfx: boolean = true;

  constructor() {}

  set music(value: boolean) {
    this._music = value;
  }

  get music() {
    return this._music;
  }

  reset(): void {
    this.score = 0;
    this.level = 1;
    this.numberOfColors = Consts.DEFAULT_START_COLORS;
  }
}