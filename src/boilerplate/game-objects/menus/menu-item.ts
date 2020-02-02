import { MenuItemParams } from '../../models/menu-item-params';

export const menuTextStyle = {
  color: '#ffffff',
  align: 'left',
  fontSize: '15'
} as Phaser.Types.GameObjects.Text.TextStyle;

export class MenuItem extends Phaser.GameObjects.Text {
  constructor(params: MenuItemParams) {
    super(params.scene, params.x, params.y, params.text, menuTextStyle);
  }

  select(): void {
    this.setColor('#f8ff38');
  }

  deselect(): void {
    this.setColor('#ffffff');
  }
}
