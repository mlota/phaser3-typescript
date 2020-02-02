import { MenuItemParams, MenuParams } from '../../models';
import { MenuItem } from '../menus';
import { PlayerCharacter, Unit } from '../sprites/sprites';

export class Menu extends Phaser.GameObjects.Container {
  private _menuItems: MenuItem[];
  private _menuItemIndex: number;
  private _heroes: PlayerCharacter[];

  constructor(params: MenuParams) {
    super(params.scene, params.x, params.y);
    this._menuItems = [];
    this._menuItemIndex = 0;
    this._heroes = params.children;
  }

  addMenuItem(unit: string): void {
    const menuItem = new MenuItem({
      x: 0,
      y: this._menuItems.length * 20,
      text: unit,
      scene: this.scene
    } as MenuItemParams);
    this._menuItems.push(menuItem);
    this.add(menuItem);
  }

  moveSelectionUp(): void {
    this._menuItems[this._menuItemIndex].deselect();
    this._menuItemIndex--;
    if (this._menuItemIndex < 0) {
      this._menuItemIndex = this._menuItems.length - 1;
    }
    this._menuItems[this._menuItemIndex].select();
  }

  moveSelectionDown(): void {
    this._menuItems[this._menuItemIndex].deselect();
    this._menuItemIndex++;
    if (this._menuItemIndex >= this._menuItems.length) {
      this._menuItemIndex = 0;
    }
    this._menuItems[this._menuItemIndex].select();
  }

  /**
   * Select the menu as a whole and an element with index from it
   */
  select(index: number): void {
    if (!index) {
      index = 0;
    }
    this._menuItems[this._menuItemIndex].deselect();
    this._menuItemIndex = index;
    this._menuItems[this._menuItemIndex].select();
  }

  /**
   * Deselect this menu
   */
  deselect(): void {
    this._menuItems[this._menuItemIndex].deselect();
    this._menuItemIndex = 0;
  }

  confirm(): void {
    // When the player confirms his selection, do the action
  }

  clear(): void {
    for (let i = 0; i < this._menuItems.length; i++) {
      this._menuItems[i].destroy();
    }
    this._menuItems.length = 0;
    this._menuItemIndex = 0;
  }

  remap(units: Unit[]): void {
    this.clear();
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      console.log(unit);
      this.addMenuItem(unit.type);
    }
  }
}
