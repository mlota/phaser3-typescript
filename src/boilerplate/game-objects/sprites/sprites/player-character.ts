import { UnitParams } from '../../../models';
import { Unit } from './unit';

export class PlayerCharacter extends Unit {
  constructor(params: UnitParams) {
    super(params);
    this.flipX = true;
    this.setScale(2);
  }
}
