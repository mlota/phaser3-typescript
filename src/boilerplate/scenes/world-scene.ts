export class WorldScene extends Phaser.Scene {
  private _player: Phaser.Physics.Arcade.Sprite;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _spawns: Phaser.Physics.Arcade.Group;

  constructor() {
    super({
      key: 'WorldScene'
    });
  }

  preload(): void {}

  create(): void {
    // Create the map
    const map = this.make.tilemap({ key: 'map' });

    // First parameter is the name of the tilemap in tiled
    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    // Creating the layers
    const grass = map.createStaticLayer('Grass', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

    // Make all the tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    // Animation with key 'left', we don't need left and right as we
    // will use one and flip the sprite
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 7, 1, 13]
      }),
      frameRate: 10,
      repeat: -1
    });

    // Animation key with 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 7, 1, 13]
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [2, 8, 2, 14]
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        frames: [0, 6, 0, 12]
      }),
      frameRate: 10,
      repeat: -1
    });

    // Our player sprite created through the physics system
    this._player = this.physics.add.sprite(50, 100, 'player', 6);

    // Don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this._player.setCollideWorldBounds(true);

    // Don't walk on trees
    this.physics.add.collider(this._player, obstacles);

    // Limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this._player);
    this.cameras.main.roundPixels = true; // Avoid tile bleed

    // User input
    this._cursors = this.input.keyboard.createCursorKeys();

    // Where the enemies will be
    this._spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // Parameters are x, y, width, height
      this._spawns.create(x, y);
    }

    this.physics.add.overlap(
      this._player,
      this._spawns,
      this.onMeetEnemy,
      null,
      this
    );
  }

  update(): void {
    this._player.setVelocity(0);

    // Horizontal movement
    if (this._cursors.left.isDown) {
      this._player.setVelocityX(-160);
    } else if (this._cursors.right.isDown) {
      this._player.setVelocityX(160);
    }

    // Vertical movement
    if (this._cursors.up.isDown) {
      this._player.setVelocityY(-160);
    } else if (this._cursors.down.isDown) {
      this._player.setVelocityY(160);
    }

    // Update the animation last and give left / right animations precedence
    // over up / down animations
    if (this._cursors.left.isDown) {
      this._player.anims.play('left', true);
      this._player.flipX = true;
    } else if (this._cursors.right.isDown) {
      this._player.anims.play('right', true);
      this._player.flipX = false;
    } else if (this._cursors.up.isDown) {
      this._player.anims.play('up', true);
    } else if (this._cursors.down.isDown) {
      this._player.anims.play('down', true);
    } else {
      this._player.anims.stop();
    }
  }

  onMeetEnemy = (player, zone) => {
    console.log('MET AN ENEMY!!!!');

    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    this.cameras.main.shake(300);
  };
}
