export class Align {
  static scaleToGameW(game: Phaser.Game, obj: any, per: number): void {
    obj.displayWidth = (game.config.width as number) * per;
    obj.scaleY = obj.scaleX;
  }

  static scaleToGameH(game: Phaser.Game, obj: any, per: number): void {
    obj.displayHeight = (game.config.height as number) * per;
    obj.scaleX = obj.scaleY;
  }

  static centerH(game: Phaser.Game, obj: any): void {
    obj.x = (game.config.width as number) / 2 - obj.displayWidth / 2;
  }

  static centerV(game: Phaser.Game, obj: any): void {
    obj.y = (game.config.height as number) / 2 - obj.displayHeight / 2;
  }

  static center2(game: Phaser.Game, obj: any): void {
    obj.x = (game.config.width as number) / 2 - obj.displayWidth / 2;
    obj.y = (game.config.height as number) / 2 - obj.displayHeight / 2;
  }

  static center(game: Phaser.Game, obj: any): void {
    obj.x = (game.config.width as number) / 2;
    obj.y = (game.config.height as number) / 2;
  }
}
