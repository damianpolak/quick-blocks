import { ImageObject } from "../../interfaces/game.interface";
import { Align } from "../../utils/align";
import { Timer } from "../timer";

export default class MainScene extends Phaser.Scene {

  private block: ImageObject;
  private colorArray: number[] = [];
  private centerBlock: ImageObject;
  private timer: Timer;

  constructor() {
    super({ key: 'MainScene' })
  }

  preload(): void {
    this.load.spritesheet('blocks', 'assets/img/blocks.png', { frameWidth: 64, frameHeight: 84 });
  }

  create(): void {
    for(let c = 0; c < 25; c++) {
      this.colorArray.push(Phaser.Math.Between(0, 4));
    }

    let xPosCurrBlock: number = 0;
    let yPosCurrBlock: number = 0;
    let counter: number = 0;
    
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        this.block = this.add.image(0, 0, 'blocks');

        this.block.displayWidth = (this.game.config.width as number) / 5;
        this.block.displayHeight = (this.game.config.height as number) / 5;
        this.block.setFrame(this.colorArray[counter]);
        this.block.x = xPosCurrBlock + this.block.displayWidth / 2;
        this.block.y = yPosCurrBlock + this.block.displayHeight / 2;

        if(i == 2 && j == 2) {
          this.centerBlock = this.block;
        } else {
          this.block.setInteractive();
        }

        xPosCurrBlock += this.block.displayWidth;
        counter++;
      }
      xPosCurrBlock = 0;
      yPosCurrBlock += this.block.displayHeight;
    }

    this.colorArray[12] = -1;
    this.pickColor();

    this.input.on('gameobjectdown', this.selectBlock, this);
    this.timer = new Timer({ scene: this });
    this.timer.x = this.centerBlock.x;
    this.timer.y = this.centerBlock.y;
    this.timer.setCallback(this.timeUp);
    this.timer.start();
  }

  private selectBlock(pointer: PointerEvent, block: ImageObject): void {
    if(block.frame.name == this.centerBlock.frame.name) {
      console.log('right');
      block.removeInteractive();
      this.fall(block);
      this.pickColor();
      this.timer.reset();
    } else {
      console.log('wrong');
    }

  }

  timeUp(): void {
    console.log('Time is up!');
  }

  private fall(block: ImageObject): void {
    this.tweens.add({
      targets: block,
      duration: 200,
      scaleX: 0,
      scaleY: 0
    })
  }

  private pickColor(): void {
    if(this.colorArray.length == 0) {
      console.log('next level');
      return;
    }

    let color = this.colorArray.shift() as number;

    if(color == -1) {
      this.pickColor();
      return;
    }

    this.centerBlock.setFrame(color);
  }

  update(): void {
  }
}
