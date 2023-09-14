import { ButtonProperty, CustomConfig } from "../interfaces/utils.interface";
import { UIBlock } from "../utils/UIBlock";
import { Align } from "../utils/align";
import { emitter } from "./game";

export default class CustomButton extends UIBlock {

  private scene: Phaser.Scene;
  private background: Phaser.GameObjects.Image;
  private text: Phaser.GameObjects.Text;
  private callback: Function;
  private callbackScope: any;
  private event: string;
  private params: any;

  constructor(config: Partial<CustomConfig & ButtonProperty>) {
    super();
    this.scene = (config.scene as Phaser.Scene);
    this.background = this.scene.add.image(0, 0, (config.key as string));
    this.background.setInteractive();
    this.background.on('pointerdown', this.buttonPressed, this);

    this.add(this.background);
    Align.scaleToGameW(this.scene.game, this.background, config.scale ? config.scale : .5);

    // Defaults
    config.textScale = config.textScale ? config.textScale : 30;
    // config.color = config.color ? config.color : '#ffffff';
    config.style = config.style ? config.style : {
      color: '#ffffff',
      fontFamily: 'Verdana'
    }

    this.text = this.scene.add.text(0, 0, (config.text as string), {
      fontSize: this.scene.game.config.width as number / config.textScale,
      color: config.style.color,
      fontFamily: config.style.fontFamily
    });

    this.text.setOrigin(0.5, 0.5);
    this.add(this.text);

    if(config.callback) {
      this.callback = config.callback;
    }

    if(config.callbackScope) {
      this.callbackScope = config.callbackScope;
    }

    if(config.event) {
      this.event = config.event;
    }

    if(config.params) {
      this.params = config.params;
    }
  }

  private buttonPressed(): void {
    console.log('pressed');

    if(this.callback) {
      if(this.callbackScope) {
        this.callback.call(this.callbackScope);
      } 
    }

    if(this.event) {
      if(this.params) {
        emitter.emit(this.event, this.params);
      } else {
        emitter.emit(this.event);
      }
    }
  }
}