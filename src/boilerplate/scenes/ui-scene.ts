import { HeroesMenu, Menu } from '../game-objects/menus';
import { ActionsMenu } from '../game-objects/menus/actions-menu';
import { EnemiesMenu } from '../game-objects/menus/enemies-menu';
import { Message } from '../game-objects/utils';
import { BattleScene } from './battle-scene';

export class UiScene extends Phaser.Scene {
  private _graphics: Phaser.GameObjects.Graphics;
  private _menus: Phaser.GameObjects.Container;
  private _heroesMenu: HeroesMenu;
  private _actionsMenu: ActionsMenu;
  private _enemiesMenu: EnemiesMenu;
  private _currentMenu: Menu;
  private _battleScene: BattleScene;
  private _message: Message;

  constructor() {
    super({ key: 'UiScene' });
  }

  create(): void {
    this._graphics = this.add.graphics();
    this._graphics.lineStyle(1, 0xffffff);
    this._graphics.fillStyle(0x031f4c, 1);
    this._graphics.strokeRect(2, 150, 90, 100);
    this._graphics.fillRect(2, 150, 90, 100);
    this._graphics.strokeRect(95, 150, 90, 100);
    this._graphics.fillRect(95, 150, 90, 100);
    this._graphics.strokeRect(188, 150, 130, 100);
    this._graphics.fillRect(188, 150, 130, 100);

    // Basic container to hold all menus
    this._menus = this.add.container(0, 0);

    this._heroesMenu = new HeroesMenu({ x: 195, y: 153, scene: this });
    this._actionsMenu = new ActionsMenu({ x: 100, y: 153, scene: this });
    this._enemiesMenu = new EnemiesMenu({ x: 8, y: 153, scene: this });

    // The currently selected menu
    this._currentMenu = this._actionsMenu;

    // Add menus to the container
    this._menus.add(this._heroesMenu);
    this._menus.add(this._actionsMenu);
    this._menus.add(this._enemiesMenu);

    this._battleScene = this.scene.get('BattleScene') as BattleScene;

    this.remapHeroes();
    this.remapEnemies();

    this.input.keyboard.on('keydown', this.onKeyInput, this);

    this._battleScene.events.on('PlayerSelect', this.onPlayerSelect, this);

    this.events.on('SelectEnemies', this.onSelectEnemies, this);

    this.events.on('Enemy', this.onEnemy, this);

    this._message = new Message(this, this._battleScene.events);
    this.add.existing(this._message);

    this._battleScene.events;

    this._battleScene.nextTurn();
  }

  remapHeroes(): void {
    const heroes = this._battleScene.heroes;
    this._heroesMenu.remap(heroes);
  }

  remapEnemies(): void {
    const enemies = this._battleScene.enemies;
    this._enemiesMenu.remap(enemies);
  }

  onKeyInput(event: any): void {
    if (this._currentMenu) {
      if (event.code === 'ArrowUp') {
        this._currentMenu.moveSelectionUp();
      } else if (event.code == 'ArrowDown') {
        this._currentMenu.moveSelectionDown();
      } else if (event.code === 'ArrowRight' || event.code === 'Shift') {
      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        this._currentMenu.confirm();
      }
    }
  }

  onPlayerSelect(id: number): void {
    this._heroesMenu.select(id);
    this._actionsMenu.select(0);
    this._currentMenu = this._actionsMenu;
  }

  onSelectEnemies(): void {
    this._currentMenu = this._enemiesMenu;
    this._enemiesMenu.select(0);
  }

  onEnemy(index: number): void {
    console.log(index);
    this._heroesMenu.deselect();
    this._actionsMenu.deselect();
    this._enemiesMenu.deselect();
    this._currentMenu = null;
    this._battleScene.receivePlayerSelection('attack', index);
  }
}
