import { AlignGridConfig } from "../interfaces/utils.interface";
import { UIBlock } from "../utils/UIBlock";

export class Timer extends UIBlock {

  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;
  private count: number = 100;
  private timer: Phaser.Time.TimerEvent;
  private actionOnEnd: any;

  constructor(config: Partial<AlignGridConfig>) {
    super();

    this.scene = (config.scene as Phaser.Scene);
    this.graphics = this.scene.add.graphics();

    this.setPer(100);
    this.add(this.graphics);
  }

  setPer(per: number): void {
    const rad = (per / 100) * 360;

    this.graphics.clear();
    this.graphics.fillStyle(0xffffff, .5);
    this.graphics.slice(0, 0, (this.scene.game.config.width as number) * .1, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(rad));

    this.graphics.fillPath();
  }

  setCallback(action: Function): void {
    this.actionOnEnd = action;
  }

  start(): void {
    this.timer = this.scene.time.addEvent({
      delay: 100,
      callback: this.tick, 
      callbackScope: this,
      loop: true
    });
  }

  stop(): void {
    this.timer.remove();
  }

  reset(): void {
    this.count = 100;
    this.stop();
    this.start();
  }

  tick(): void {
    this.count -= 2;
    this.setPer(this.count);
    let scope;

    if(this.count <= 0) {
      this.stop();
      this.actionOnEnd.call();
    }
  }
}