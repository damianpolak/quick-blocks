import { Align } from "../../utils/align";
import { AlignGrid } from "../../utils/alignGrid";
import Consts from "../consts";
import CustomButton from "../customButton";
import { controller, emitter, game } from "../game";

export default class TitleScene extends Phaser.Scene {

  private titleBackground: Phaser.GameObjects.Image;
  private titleText: Phaser.GameObjects.Text;
  private buttonStart: CustomButton;
  private buttonHowTo: CustomButton;
  private buttonSettings: CustomButton;
  private alignGrid: AlignGrid;

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

    this.alignGrid = new AlignGrid({ scene: this, cols: 11, rows: 11 });
    this.alignGrid.showNumbers();

    this.titleText = this.add.text(15, 15, 'Quick Blocks', { 
      fontSize: (this.game.config.width as number) / 10,
      fontFamily: 'Verdana' 
    });

    this.buttonStart = new CustomButton({ 
      scene: this, 
      event: Consts.START_GAME,
      params: this,
      key: 'green', 
      text: 'Start', 
      scale: .35, 
      textScale: 25,
      style: {
        color: '#ffffff',
        fontFamily: 'Verdana'
      }
    });
    this.alignGrid.placeAtIndex(60, this.buttonStart);

    this.buttonHowTo = new CustomButton({ 
      scene: this, 
      event: Consts.HOW_TO_PLAY,
      params: this,
      key: 'blue', 
      text: 'How to play', 
      scale: .35, 
      textScale: 25,
      style: {
        color: '#ffffff',
        fontFamily: 'Verdana'
      }
    });
    this.alignGrid.placeAtIndex(71, this.buttonHowTo);

    this.buttonSettings = new CustomButton({ 
      scene: this, 
      event: Consts.SETTINGS,
      params: this,
      key: 'blue', 
      text: 'Settings', 
      scale: .35, 
      textScale: 25,
      style: {
        color: '#ffffff',
        fontFamily: 'Verdana'
      }
    });
    this.alignGrid.placeAtIndex(82, this.buttonSettings);
  }

  // startGame(): void {
  //   this.scene.start('MainScene');
  // }

  // showHowto(): void {
  //   this.scene.start('HowtoScene');
  // }

  // showSettings(): void {
  //   this.scene.start('SettingsScene');
  // }
}