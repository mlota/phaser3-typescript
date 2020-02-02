import { MenuParams } from '../../models';
import { Menu } from './menu';

export class ActionsMenu extends Menu {
  constructor(params: MenuParams) {
    super(params);
    this.addMenuItem('Attack');
  }

  confirm(): void {
    // Do something when the player selects an action
  }
}
