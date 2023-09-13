import { ImageObject } from "../../interfaces/game.interface";
import { Align } from "../../utils/align";
import { model } from "../game";
import { Timer } from "../timer";

export default class MainScene extends Phaser.Scene {

  private block: ImageObject;
  private colorArray: number[] = [];
  private centerBlock: ImageObject;
  private timer: Timer;
  private clickLocked = false;
  private blockGroup: Phaser.GameObjects.Group;
  private scoreText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.spritesheet('blocks', 'assets/img/blocks.png', { frameWidth: 64, frameHeight: 84 });
    this.load.image('bPlayAgain', 'assets/img/bPlayAgain.png');
    this.load.image('bStart', 'assets/img/bStart.png');
  }

  create(): void {
    this.blockGroup = this.add.group();

    for(let c = 0; c < 25; c++) {
      this.colorArray.push(Phaser.Math.Between(0, model.numberOfColors));
    }

    let xPosCurrBlock: number = 0;
    let yPosCurrBlock: number = 0;
    let counter: number = 0;
    
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        this.block = this.add.image(0, 0, 'blocks');
        this.blockGroup.add(this.block);
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
    this.timer.setCallback(this.timeUp, this);
    this.timer.start();

    this.scoreText = this.add.text(0, 0, '0', { 
      fontSize: (this.game.config.width as number) / 15,
      color: '#000'
    });
    this.scoreText.setOrigin(0.5, 0.5);
    Align.center(this.game, this.scoreText);
  }

  private selectBlock(pointer: PointerEvent, block: ImageObject): void {
    if(this.clickLocked) return; 

    if(block.frame.name == this.centerBlock.frame.name) {
      block.removeInteractive();
      this.fall(block);
      this.pickColor();
      model.score++;
      this.scoreText.setText(model.score.toString());
      this.timer.reset();
    } else {
      this.gameOver();
    }

  }

  timeUp(): void {
    console.log('Time is up!');
    this.gameOver();
  }

  private fall(block: Phaser.GameObjects.GameObject): boolean {
    this.tweens.add({
      targets: block,
      duration: 200,
      scaleX: 0,
      scaleY: 0
    });
    return true;
  }

  private pickColor(): void {
    if(this.colorArray.length == 0) {
      console.log('next level');
      model.numberOfColors++;
      
      if(model.numberOfColors > 7) {
        model.numberOfColors = 7;
      }

      this.scene.restart();
      return;
    }

    // const color = this.colorArray.shift() as number;
    const index = Math.random() * this.colorArray.length;
    let color = this.colorArray.splice(index, 1)[0];

    if(color == -1) {
      this.pickColor();
      return;
    }

    this.centerBlock.setFrame(color);
  }

  gameOver(): void {
    this.clickLocked = true;
    this.timer.stop();
    this.timer.visible = false;
    this.scoreText.visible = false;
    
    this.blockGroup.children.iterate(child => {
      return this.fall(child);
    });

    this.time.addEvent({
      delay: 1200,
      callback: () => {
        this.scene.start('OverScene');
        this.clickLocked = false;
        console.log('Game Over - Click locked');
      },
      callbackScope: this,
      loop: false
    })
  }

  update(): void {
  }
}
