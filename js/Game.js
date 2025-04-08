class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
        this.levelCode = "level1";
        this.changeLevel = false;
        this.xPressed = null;
    }

    preload() {
        this.load.image('sky', 'resources/images/sky.png');
        this.load.image('ground', 'resources/images/platform.png');
        this.load.image('star', 'resources/images/star.png');
        this.load.image('bomb', 'resources/images/bomb.png');
        this.load.image('flower', 'resources/images/lilflower_sprite.png');
        this.load.json('levels', 'json/levels.json');
        this.load.json('text', 'json/text.json');
        this.load.image('underback', 'resources/images/underworld_back.png');
        this.load.image('smallstar', 'resources/images/small_star.png');
        this.load.image('smallbang', 'resources/images/small_bang.png');
        this.load.image('road', 'resources/images/road.png');
        this.load.image('road_continuous', 'resources/images/road_continuous.png');
        this.load.image('darkness', 'resources/images/darkness.png');
        this.load.image('castle', 'resources/images/castle.png');
        this.load.spritesheet('playerIMG', 'resources/images/soulflame.png', { frameWidth: 81, frameHeight: 89, spacing: 9 });
        this.load.spritesheet('soulPiece', 'resources/images/soulpiece.png', { frameWidth: 75, frameHeight: 90, spacing: 9 });
        this.load.spritesheet('lichen', 'resources/images/lichen.png', { frameWidth: 475, frameHeight: 750, spacing: 9 });
        this.load.spritesheet('lotus', 'resources/images/lotus.png', { frameWidth: 637.5, frameHeight: 521, spacing: 9 });
        this.load.spritesheet('crowbush', 'resources/images/crowbush.png', { frameWidth: 636, frameHeight: 630, spacing: 9 });
        this.load.spritesheet('eye', 'resources/images/eye.png', { frameWidth: 373.5, frameHeight: 399, spacing: 9 });
        this.load.spritesheet('snake', 'resources/images/snake.png', { frameWidth: 463, frameHeight: 428, spacing: 9 });
        this.load.spritesheet('tree', 'resources/images/tree.png', { frameWidth: 542, frameHeight: 626, spacing: 9 });
    }

    create() {
        this.xPressed = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        // this.camera = this.cameras.main;
        // this.camera.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.levels = this.cache.json.get('levels');
        this.player = new Player(this, 1030, 2000, 600);
        this.level = new Level(this, this.levels[this.levelCode], this.player);
        this.newCamera = new Camera(this, this.player, 0, 0, this.levels[this.levelCode].config[0].worldWidth, this.levels[this.levelCode].config[0].worldHeight);
        this.level.setupLevel();
        // this.vignette = this.camera.postFX.addVignette(0.5, 0.5, 0.6, 0.5);
        // this.camera.startFollow(this.player, true);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.xPressed)) {
            this.physics.world.drawDebug = !this.physics.world.drawDebug
            this.physics.world.debugGraphic.clear();
        }
        if (this.changeLevel === true) {


            this.newCamera.openVignette();
            this.newCamera.flash();
            this.newCamera.shake();


            if (this.level) {
                this.level.destroy();
            }

            this.level = new Level(this, this.levels[this.levelCode], this.player);
            this.level.setupLevel();
            this.changeLevel = false;

        }
        this.player.update();
        this.level.levelChecker();

        // this.input.on('pointermove', (pointer) => {
        //     console.log('Mouse X:', pointer.x, 'Mouse Y:', pointer.y);
        // });

    }
}

const config = {
    type: Phaser.AUTO,
    width: 800, // Aspect ratio that keeps players seeing the same thing
    height: 600, // Aspect ratio that keeps players seeing the same thing
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Game]
};

const game = new Phaser.Game(config);