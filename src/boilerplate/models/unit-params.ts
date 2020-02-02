import { GameObjectParams } from './game-object-params';

export interface UnitParams extends GameObjectParams {
  texture: string;
  frame: number;
  type: string;
  hp: number;
  damage: number;
}
