import { PlayerCharacter } from '../game-objects/sprites/sprites';
import { GameObjectParams } from './game-object-params';

export interface MenuParams extends GameObjectParams {
  children?: PlayerCharacter[];
}
