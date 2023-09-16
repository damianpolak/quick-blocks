import Consts from "./consts";
import { emitter, model } from "./game";

export default class Controller {

  private static instance: Controller;
  private constructor() {
    emitter.on(Consts.START_GAME, this.startGame, this);
    emitter.on(Consts.HOW_TO_PLAY, this.showHowto, this);
    emitter.on(Consts.SETTINGS, this.showSettings, this);
    emitter.on(Consts.HOME, this.showHome, this);
  }

  public static getInstance(): Controller {
    if(!Controller.instance) {
      Controller.instance = new Controller();
    }

    return Controller.instance;
  }

  startGame(scene: Phaser.Scene): void {
    model.reset();
    scene.scene.start('MainScene');
  }
  
  showHowto(scene: Phaser.Scene): void {
    scene.scene.start('HowtoScene');
  }

  showSettings(scene: Phaser.Scene): void {
    scene.scene.start('SettingsScene');
  }

  showHome(scene: Phaser.Scene): void {
    model.reset();
    scene.scene.start('TitleScene');
  }
}