import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import { Model } from './model';
import OverScene from './scenes/overScene';
import TitleScene from './scenes/titleScene';

const DEFAULT_WIDTH = 480;
const DEFAULT_HEIGHT = 640;
let model: Model;
let game: Phaser.Game;

// export const test: number = 123;

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#d4d4d4',
  scale: {
    parent: 'phaser-game',
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [TitleScene, MainScene, OverScene],
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
});

export { model, game };