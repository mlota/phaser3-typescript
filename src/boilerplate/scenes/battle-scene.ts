import { Texture, UnitType } from '../enums';
import { Enemy, PlayerCharacter, Unit } from '../game-objects/sprites/sprites';
import { UnitParams } from '../models';

export class BattleScene extends Phaser.Scene {
  public heroes: PlayerCharacter[];
  public enemies: Enemy[];
  public units: Unit[];
  public index: number = 0;

  constructor() {
    super({ key: 'BattleScene' });
  }

  create(): void {
    // Change the background to green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    // Player character - warrior
    const warrior = new PlayerCharacter({
      scene: this,
      x: 250,
      y: 50,
      texture: Texture.PLAYER,
      frame: 1,
      type: UnitType.WARRIOR,
      hp: 100,
      damage: 20
    } as UnitParams);

    // Player character - mage
    const mage = new PlayerCharacter({
      scene: this,
      x: 250,
      y: 100,
      texture: Texture.PLAYER,
      frame: 4,
      type: UnitType.MAGE,
      hp: 80,
      damage: 8
    } as UnitParams);

    // Enemy character - blue dragon
    const dragonBlue = new Enemy({
      scene: this,
      x: 50,
      y: 50,
      texture: Texture.BLUEDRAGON,
      frame: null,
      type: UnitType.DRAGON,
      hp: 50,
      damage: 3
    } as UnitParams);

    // Enemy character - orange dragon
    const dragonOrange = new Enemy({
      scene: this,
      x: 50,
      y: 100,
      texture: Texture.ORANGEDRAGON,
      frame: null,
      type: UnitType.DRAGON2,
      hp: 50,
      damage: 3
    } as UnitParams);

    this.heroes = [warrior, mage];
    this.enemies = [dragonBlue, dragonOrange];
    this.units = [...this.heroes, ...this.enemies];

    // Run UI scene at the same time
    this.scene.launch('UiScene');

    this.index = -1;
  }

  nextTurn(): void {
    this.index++;
    // If there are no more units, we start again from the
    // first one
    if (this.index >= this.units.length) {
      this.index = 0;
    }
    if (this.units[this.index]) {
      // If its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else {
        // Else if its enemy unit
        const r = Math.floor(Math.random() * this.heroes.length);
        // Call the enemy's attack function
        this.units[this.index].attack(this.heroes[r]);
        // Add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({
          delay: 3000,
          callback: this.nextTurn,
          callbackScope: this
        });
      }
    }
  }

  receivePlayerSelection(action: string, target: number) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this
    });
  }
}
