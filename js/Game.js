class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
        this.levelCode = "level1";
        this.changeLevel = false;
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
        this.load.image('darkness', 'resources/images/darkness.png');
        // this.load.spritesheet('playerIMG', 'resources/images/lildude_sprite-export.png', { frameWidth: 54, frameHeight: 54 });
        this.load.spritesheet('playerIMG', 'resources/images/soulflame.png', { frameWidth: 81, frameHeight: 89, spacing: 9 });
        this.load.spritesheet('soulPiece', 'resources/images/soulpiece.png', { frameWidth: 75, frameHeight: 90, spacing: 9 });
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 1920 * 2, 1080 * 2); // Sets camera bounds, meaning camera cannot move past this area
        this.levels = this.cache.json.get('levels');
        this.player = new Player(this, 1030, 2000, 600);
        this.level = new Level(this, this.levels[this.levelCode], this.player);
        this.level.setupLevel();
        this.vignette = this.camera.postFX.addVignette(0.5, 0.5, 0.6, 0.5);
        this.camera.startFollow(this.player, true);
    }

    update() {
        if (this.changeLevel === true) {
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