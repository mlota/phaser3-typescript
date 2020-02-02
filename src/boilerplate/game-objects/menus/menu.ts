import { MenuItemParams, MenuParams } from '../../models';
import { MenuItem } from '../menus';
import { PlayerCharacter, Unit } from '../sprites/sprites';

export class Menu extends Phaser.GameObjects.Container {
  public menuItems: MenuItem[];
  public menuItemIndex: number;
  public heroes: PlayerCharacter[];

  constructor(params: MenuParams) {
    super(params.scene, params.x, params.y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = params.children;
  }

  addMenuItem(unit: string): void {
    const menuItem = new MenuItem({
      x: 0,
      y: this.menuItems.length * 20,
      text: unit,
      scene: this.scene
    } as MenuItemParams);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  }

  moveSelectionUp(): void {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex--;
    if (this.menuItemIndex < 0) {
      this.menuItemIndex = this.menuItems.length - 1;
    }
    this.menuItems[this.menuItemIndex].select();
  }

  moveSelectionDown(): void {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex++;
    if (this.menuItemIndex >= this.menuItems.length) {
      this.menuItemIndex = 0;
    }
    this.menuItems[this.menuItemIndex].select();
  }

  /**
   * Select the menu as a whole and an element with index from it
   */
  select(index: number): void {
    if (!index) {
      index = 0;
    }
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    this.menuItems[this.menuItemIndex].select();
  }

  /**
   * Deselect this menu
   */
  deselect(): void {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  }

  confirm(): void {
    // When the player confirms his selection, do the action
  }

  clear(): void {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  }

  remap(units: Unit[]): void {
    this.clear();
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      this.addMenuItem(unit.type);
    }
  }
}
