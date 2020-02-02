export class UiScene extends Phaser.Scene {
  private _graphics: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'UiScene' });
  }

  create(): void {
    this._graphics = this.add.graphics();
    this._graphics.lineStyle(1, 0xffffff);
    this._graphics.fillStyle(0x031f4c, 1);
    this._graphics.strokeRect(2, 150, 90, 100);
    this._graphics.fillRect(2, 150, 90, 100);
    this._graphics.strokeRect(95, 150, 90, 100);
    this._graphics.fillRect(95, 150, 90, 100);
    this._graphics.strokeRect(188, 150, 130, 100);
    this._graphics.fillRect(188, 150, 130, 100);
  }
}
