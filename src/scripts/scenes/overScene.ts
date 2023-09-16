import { AlignGrid } from "../../utils/alignGrid";
import Consts from "../consts";
import CustomButton from "../customButton";
import { model } from "../game";

export default class OverScene extends Phaser.Scene {

  private bPlayAgain: CustomButton;
  private bHome: CustomButton;
  private gameoverText: Phaser.GameObjects.Text;
  private levelText: Phaser.GameObjects.Text;
  private titleBackground: Phaser.GameObjects.Image;
  private alignGrid: AlignGrid;
  
  constructor() {
    super({ key: 'OverScene' });
  }

  preload(): void {}

  create(): void {
    this.alignGrid = new AlignGrid({ scene: this, cols: 11, rows: 11 });
    this.titleBackground = this.add.image(0, 0, 'bg-blacked');
    this.titleBackground.setOrigin(0, 0);

    this.bPlayAgain = new CustomButton({ 
      scene: this, 
      event: Consts.START_GAME,
      params: this,
      key: 'green', 
      text: 'Play again', 
      scale: .35, 
      textScale: 25,
      style: {
        color: '#ffffff',
        fontFamily: 'Verdana'
      }
    });

    this.bHome = new CustomButton({ 
      scene: this, 
      event: Consts.HOME,
      params: this,
      key: 'green', 
      text: 'Home', 
      scale: .35, 
      textScale: 25,
      style: {
        color: '#ffffff',
        fontFamily: 'Verdana'
      }
    });

    this.gameoverText = this.add.text(15, 15, `Game Over`, { 
      fontSize: (this.game.config.width as number) / 10,
      fontFamily: 'Verdana',
      color: '#ffffff'
    });

    this.levelText = this.add.text(15, 15, `Reached Level\n${model.level}`, { 
      fontSize: (this.game.config.width as number) / 20,
      fontFamily: 'Verdana',
      color: '#ffffff',
      align: 'center'
    });
    
    this.alignGrid.placeAtIndex(13, this.gameoverText);
    this.alignGrid.placeAtIndex(36, this.levelText);
    this.alignGrid.placeAtIndex(71, this.bHome);
    this.alignGrid.placeAtIndex(60, this.bPlayAgain);

    // this.alignGrid.showNumbers();
  }

  update(): void {}
}