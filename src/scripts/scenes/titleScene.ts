import { Align } from "../../utils/align";
import CustomButton from "../customButton";
import { emitter, game } from "../game";

export default class TitleScene extends Phaser.Scene {

  private titleBackground: Phaser.GameObjects.Image;
  private titleText: Phaser.GameObjects.Text;
  private buttonStart: CustomButton;
  
  constructor() {
    super({
      key: 'TitleScene'
    });
  }

  preload(): void {
    this.load.image('bStart', 'assets/img/bStart.png');
    this.load.image('bg', 'assets/img/background.png');

    this.load.image('blue', 'assets/img/blue.png');
    this.load.image('green', 'assets/img/green.png');
    this.load.image('orange', 'assets/img/orange.png');
    this.load.image('red', 'assets/img/red.png');
  }

  create(): void {
        this.titleBackground = this.add.image(0, 0, 'bg');
    this.titleBackground.setOrigin(0, 0);

    this.titleText = this.add.text(15, 15, 'Quick Blocks', { 
      fontSize: (this.game.config.width as number) / 10,
      fontFamily: 'Verdana' 
    });

    this.buttonStart = new CustomButton({ 
      scene: this, 
      event: 'START_GAME',
      // callback: this.startGame,
      // callbackScope: this,
      key: 'blue', 
      text: 'Start', 
      scale: .35, 
      textScale: 25,
      style: {
        color: '#ffffff',
        fontFamily: 'Verdana'
      }
    });

    Align.center(this.game, this.buttonStart);

    emitter.on('START_GAME', this.startGame, this);

    // Align.scaleToGameW(this.game, this.buttonStart, .45);

    // this.buttonStart = this.add.image(0, 0, 'bStart');
    // Align.scaleToGameW(this.game, this.buttonStart, .45);
    // Align.center(this.game, this.buttonStart);

    // this.buttonStart.setInteractive();
    // this.buttonStart.on('pointerdown', this.startGame, this);
  }

  startGame(): void {
    this.scene.start('MainScene');
  }
}