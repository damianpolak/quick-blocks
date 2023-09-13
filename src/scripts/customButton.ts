import { ButtonProperty, CustomConfig } from "../interfaces/utils.interface";
import { UIBlock } from "../utils/UIBlock";
import { Align } from "../utils/align";

export default class CustomButton extends UIBlock {

  private scene: Phaser.Scene;
  private background: Phaser.GameObjects.Image;
  private text: Phaser.GameObjects.Text;

  constructor(config: Partial<CustomConfig & ButtonProperty>) {
    super();
    this.scene = (config.scene as Phaser.Scene);
    this.background = this.scene.add.image(0, 0, (config.key as string));
    this.add(this.background);
    Align.scaleToGameW(this.scene.game, this.background, config.scale ? config.scale : .5);

    // Defaults
    config.textScale = config.textScale ? config.textScale : 30;
    config.color = config.color ? config.color : '#ffffff';

    this.text = this.scene.add.text(0, 0, (config.text as string), {
      fontSize: this.scene.game.config.width as number / config.textScale,
      color: config.color
    });
    this.text.setOrigin(0.5, 0.5);
    this.add(this.text);
  }
}