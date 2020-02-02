import { UnitParams } from '../models';

export class Unit extends Phaser.GameObjects.Sprite {
  private _type: any;
  private _hp: number;
  private _maxHp: number;
  private _damage: number;
  private _currentScene: Phaser.Scene;

  constructor(params: UnitParams) {
    super(params.scene, params.x, params.y, params.texture, params.frame);
    console.log(params);
    this._type = params.type;
    this._maxHp = this._hp = params.hp;
    this._damage = params.damage; // Default damage

    this._currentScene = params.scene;
    this._currentScene.add.existing(this);
  }

  attack(target: Unit): void {
    target.takeDamage(this._damage);
  }

  takeDamage(damage: number) {
    this._hp -= damage;
  }
}
