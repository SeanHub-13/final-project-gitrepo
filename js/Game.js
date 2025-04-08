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
        this.load.image('instructions', 'resources/images/instructions.png');
        this.load.spritesheet('playerIMG', 'resources/images/soulflame.png', { frameWidth: 81, frameHeight: 89, spacing: 9 });
        this.load.spritesheet('soulPiece', 'resources/images/soulpiece.png', { frameWidth: 75, frameHeight: 90, spacing: 9 });
        this.load.spritesheet('lichen', 'resources/images/lichen.png', { frameWidth: 475, frameHeight: 750, spacing: 9 });
        this.load.spritesheet('lotus', 'resources/images/lotus.png', { frameWidth: 637.5, frameHeight: 521, spacing: 9 });
        this.load.spritesheet('crowbush', 'resources/images/crowbush.png', { frameWidth: 636, frameHeight: 630, spacing: 9 });
        this.load.spritesheet('eye', 'resources/images/eye.png', { frameWidth: 373.5, frameHeight: 399, spacing: 9 });
        this.load.spritesheet('snake', 'resources/images/snake.png', { frameWidth: 463, frameHeight: 428, spacing: 9 });
        this.load.spritesheet('tree', 'resources/images/tree.png', { frameWidth: 542.5, frameHeight: 703, spacing: 9 });
        this.load.spritesheet('question', 'resources/images/question.png', { frameWidth: 294, frameHeight: 529, spacing: 9 });
        this.load.audio('mystery', 'resources/audio/mystery.mp3');
        this.load.audio('rumble', 'resources/audio/rumble.mp3');
        this.load.audio('riser', 'resources/audio/riser.mp3');
    }

    create() {
        this.zPressed = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear();
        // this.camera = this.cameras.main;
        // this.camera.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.levels = this.cache.json.get('levels');
        this.player = new Player(this, 1030, 2000, 450);
        this.level = new Level(this, this.levels[this.levelCode], this.player);
        this.newCamera = new Camera(this, this.player, 0, 0, this.levels[this.levelCode].config[0].worldWidth, this.levels[this.levelCode].config[0].worldHeight);
        this.newInstructions = new Instructions(this);
        this.level.setupLevel();
        // this.vignette = this.camera.postFX.addVignette(0.5, 0.5, 0.6, 0.5);
        // this.camera.startFollow(this.player, true);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.zPressed)) {
            console.log(this.physics.world.drawDebug)
            this.physics.world.drawDebug = !this.physics.world.drawDebug

            this.physics.world.debugGraphic.clear();

        }
        if (this.changeLevel === true) {

            this.riser = this.sound.add('riser');
            this.riser.setRate(4);
            this.riser.play();

            this.newCamera.openVignette(() => {
                this.rumble = this.sound.add('rumble');
                this.rumble.setRate(2);
                this.rumble.play();

            });
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
        this.newInstructions.update();
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
            debug: true
        }
    },
    scene: [Game]
};

const game = new Phaser.Game(config);