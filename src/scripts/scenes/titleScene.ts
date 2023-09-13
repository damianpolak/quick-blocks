import { Align } from "../../utils/align";
import CustomButton from "../customButton";
import { game } from "../game";

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
      key: 'blue', 
      text: 'Start Game', 
      scale: .35, 
      textScale: 30,
      color: '#ff0000'
    });

    Align.center(this.game, this.buttonStart);
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