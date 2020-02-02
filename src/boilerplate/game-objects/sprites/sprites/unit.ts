import { UnitParams } from '../../../models';

export class Unit extends Phaser.GameObjects.Sprite {
  public type: any;
  public hp: number;
  public maxHp: number;
  public damage: number;
  public currentScene: Phaser.Scene;
  public alive: boolean;

  constructor(params: UnitParams) {
    super(params.scene, params.x, params.y, params.texture, params.frame);
    this.type = params.type;
    this.maxHp = this.hp = params.hp;
    this.damage = params.damage; // Default damage

    // TODO: Unsure if this is correct way of adding sprite to scene. Further research needed.
    this.currentScene = params.scene;
    this.currentScene.add.existing(this);
  }

  attack(target: Unit): void {
    target.takeDamage(this.damage);
    this.scene.events.emit(
      'Message',
      `${this.type} attacks ${target.type} for ${this.damage} damage`
    );
  }

  takeDamage(damage: number) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    }
  }
}
