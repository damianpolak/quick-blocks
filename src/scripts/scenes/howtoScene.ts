import { AlignGrid } from "../../utils/alignGrid";

export default class HowtoScene extends Phaser.Scene {

  private alignGrid: AlignGrid;

  constructor() {
    super({
      key: 'HowtoScene'
    });
  }

  preload(): void {}

  create(): void {
  
    const rect = this.add.rectangle(0, 0 as number, this.game.config.width as number, this.game.config.height as number, 0xffffff);
    rect.setOrigin(0.5, 0.5);
    this.alignGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    this.alignGrid.showNumbers();
  }

  update(): void {}
}