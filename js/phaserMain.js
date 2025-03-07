const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Assets
    this.load.image('sky', 'resources/images/sky.png');
    this.load.image('ground', 'resources/images/platform.png');
    this.load.image('star', 'resources/images/star.png');
    this.load.image('bomb', 'resources/images/bomb.png');
    this.load.image('test', 'resources/images/test.png');
    this.load.image('flower', 'resources/images/lilflower_sprite.png');
    this.load.spritesheet('dude_template', 'resources/images/dude.png', { frameWidth: 32, frameHeight: 42 });
    this.load.spritesheet('dude', 'resources/images/lildude_sprite-export.png', { frameWidth: 54, frameHeight: 54 });
}

function create() {
    // Game objects

    const camera = this.cameras.main;

    camera.setBounds(0, 0, 1920 * 2, 1080 * 2);

    this.add.image(400, 300, 'sky');

    this.add.image(400, 300, 'test');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    flower = this.physics.add.staticGroup();

    flower.create(400, 300, 'flower');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setCollideWorldBounds(true);

    player.setCircle(player.width / 4, player.height / 4, player.width / 4, player.height / 4);

    this.physics.add.collider(player, platforms);

    this.physics.add.overlap(player, flower, consoleLog, null, this);

    this.anims.create({
        key: 'left',
        // frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frames: [{ key: 'dude', frame: 0 }],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: [{ key: 'dude', frame: 1 }],
        frameRate: 10
    });

    this.anims.create({
        key: 'right',
        frames: [{ key: 'dude', frame: 2 }],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: [{ key: 'dude', frame: 3 }],
        frameRate: 10
    });
    cursors = this.input.keyboard.createCursorKeys();

    // camera.postFX.addVignette(0.5, 0.5, 0.7);
    // camera.postFX.addPixelate(2);
    // camera.postFX.addShine(0.5, 0.1, 1);
    // camera.postFX.addTiltShift(0.25);

    camera.startFollow(player, true);

}

function update() {
    // Game loop logic

    player.setVelocity(0);

    let moving = false;

    // Horizontal movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
        moving = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
        moving = true;
    }

    // Vertical movement
    if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.anims.play('up', true);
        moving = true;
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.anims.play('down', true);
        moving = true;
    }

    if (!moving) {
        player.anims.play('down');
    }
}

function consoleLog() {
    console.log("Star COLLISION!!!!")
}