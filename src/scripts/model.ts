export class Model {

  public numberOfColors: number = 4;
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
}