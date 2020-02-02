export class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    // Map tiles
    this.load.image('tiles', 'src/boilerplate/assets/map/spritesheet.png');

    // Map in json format
    this.load.tilemapTiledJSON('map', 'src/boilerplate/assets/map/map.json');

    // Our two characters
    this.load.spritesheet('player', 'src/boilerplate/assets/RPG_assets.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    // Load enemies
    this.load.image('dragonblue', 'src/boilerplate/assets/dragonblue.png');
    this.load.image('dragonorange', 'src/boilerplate/assets/dragonorange.png');
  }

  create(): void {
    // this.scene.start('WorldScene');
    this.scene.start('BattleScene');
  }
}
