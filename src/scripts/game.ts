import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import { Model } from './model';
import OverScene from './scenes/overScene';
import TitleScene from './scenes/titleScene';
import SettingsScene from './scenes/settingsScene';
import HowtoScene from './scenes/howtoScene';
import Controller from './controller';

const DEFAULT_WIDTH = 480;
const DEFAULT_HEIGHT = 640;
let model: Model;
let game: Phaser.Game;
let emitter: Phaser.Events.EventEmitter;
let controller: Controller;

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [TitleScene, HowtoScene, SettingsScene, MainScene, OverScene],
  // scene: [TitleScene, HowtoScene, SettingsScene, MainScene, OverScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 }
    }
  }
};

window.addEventListener('load', () => {
  model = new Model();
  game = new Phaser.Game(config);
  emitter = new Phaser.Events.EventEmitter();
  controller = Controller.getInstance();
});

export { model, game, emitter, controller };