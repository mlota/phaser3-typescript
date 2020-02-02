/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import 'phaser';
import { BattleScene } from './scenes/battle-scene';
import { BootScene } from './scenes/boot-scene';
import { UiScene } from './scenes/ui-scene';

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  title: 'Dragon Battle',
  width: 320,
  height: 240,
  type: Phaser.AUTO,
  parent: 'game',
  zoom: 2,
  render: { pixelArt: true },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [BootScene, BattleScene, UiScene]
  // scene: [BootScene, WorldScene, BattleScene]
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener('load', () => {
  const game = new Game(config);
});
