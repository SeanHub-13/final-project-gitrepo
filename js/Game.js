class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    preload() {
        this.load.image('sky', 'resources/images/sky.png');
        this.load.image('ground', 'resources/images/platform.png');
        this.load.image('star', 'resources/images/star.png');
        this.load.image('bomb', 'resources/images/bomb.png');
        this.load.image('test', 'resources/images/test.png');
        this.load.image('flower', 'resources/images/lilflower_sprite.png');
        this.load.json('levels', 'json/levels.json');
        this.load.spritesheet('playerIMG', 'resources/images/lildude_sprite-export.png', { frameWidth: 54, frameHeight: 54 });
    }

    create() {
        this.levels = this.cache.json.get('levels');
        this.player = new Player(this, 100, 100, 20);
        this.level = new Level(this, this.levels.level0, this.player)
        this.level.setupLevel();
    }

    update() {
        this.player.update();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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