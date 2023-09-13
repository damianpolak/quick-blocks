import { Align } from "../../utils/align";

export default class OverScene extends Phaser.Scene {

  private buttonPlayAgain: Phaser.GameObjects.Image;
  
  constructor() {
    super({ key: 'OverScene' });
  }

  preload(): void {
    this.buttonPlayAgain = this.add.image(0, 0, 'bPlayAgain');
  }

  create(): void {
    Align.center(this.game, this.buttonPlayAgain);
    this.buttonPlayAgain.setInteractive();
    this.buttonPlayAgain.on('pointerdown', this.playAgain, this);
  }

  update(): void {

  }

  private playAgain() {
    this.scene.start('MainScene');
  }
}