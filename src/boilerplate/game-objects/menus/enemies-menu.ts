import { MenuParams } from '../../models';
import { Menu } from './menu';

export class EnemiesMenu extends Menu {
  constructor(params: MenuParams) {
    super(params);
  }

  confirm(): void {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  }
}
