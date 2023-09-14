import { AlignGrid } from "../../utils/alignGrid";
import Consts from "../consts";
import CustomButton from "../customButton";

export default class HowtoScene extends Phaser.Scene {

  private alignGrid: AlignGrid;
  private descriptionText: Phaser.GameObjects.Text;
  private titleBackground: Phaser.GameObjects.Image;
  private buttonHome: CustomButton;

  constructor() {
    super({
      key: 'HowtoScene'
    });
  }

  preload(): void {
    this.load.image('bg', 'assets/img/background.png');
  }

  create(): void {
    this.titleBackground = this.add.image(0, 0, 'bg');
    this.titleBackground.setOrigin(0, 0);
    this.alignGrid = new AlignGrid({ scene: this, cols: 13, rows: 11 });
    // this.alignGrid.showNumbers();

    const description = 'Click on the same colored blocks\nas in the central part of the game.\nYou have to stay on time!';

    this.add.text(15, 15, 'How to play', { 
      fontSize: (this.game.config.width as number) / 10,
      fontFamily: 'Verdana' 
    });

    this.descriptionText = this.add.text(0, 0, description, {
      color: '#ffffff',
      fontFamily: 'Verdana',
      fontSize: 22,
    });
    this.alignGrid.placeAtIndex(40, this.descriptionText);

    this.buttonHome = new CustomButton({ 
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
    this.alignGrid.placeAtIndex(84, this.buttonHome);

  }

  update(): void {}
}