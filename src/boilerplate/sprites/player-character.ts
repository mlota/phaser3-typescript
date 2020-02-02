import { Unit } from './unit';
import { UnitParams } from '../models';

export class PlayerCharacter extends Unit {
  constructor(params: UnitParams) {
    super(params);
    this.flipX = true;
    this.setScale(2);
  }
}
