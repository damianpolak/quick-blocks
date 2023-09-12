import { AlignGridConfig } from '../interfaces/utils.interface';

export class AlignGrid {
  public config: AlignGridConfig;
  public scene: Phaser.Scene;
  public cellWidth: number;
  public cellHeight: number;
  public graphics: Phaser.GameObjects.Graphics;

  constructor(config: AlignGridConfig) {
    this.config = config;

    if (!config.scene) {
      console.log('The scene is missing.');
      return;
    }

    if (!config.height) {
      config.height = this.config.scene.game.config.height;
    }

    if (!config.width) {
      config.width = this.config.scene.game.config.width;
    }

    this.scene = config.scene;
    this.cellWidth = (config.width as number) / config.cols;
    this.cellHeight = (config.height as number) / config.rows;
  }

  show(): void {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);

    for (let i = 0; i < <number>this.config.width; i += this.cellWidth) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height as number);
    }

    for (let i = 0; i < <number>this.config.height; i += this.cellHeight) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.config.width as number, i);
    }

    this.graphics.strokePath();
  }

  placeAt(xx: number, yy: number, obj: any): void {
    const x2 = this.cellWidth * xx + this.cellWidth / 2;
    const y2 = this.cellHeight * yy + this.cellHeight / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index: number, obj: any): void {
    const yy = Math.floor(index / this.config.cols);
    const xx = index - yy * this.config.cols;
    this.placeAt(xx, yy, obj);
  }

  showNumbers(): void {
    this.show();
    let count = 0;

    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.cols; j++) {
        const numText = this.scene.add.text(0, 0, count.toString(), {
          color: '#ff0000'
        });

        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);
        count++;
      }
    }
  }
}
