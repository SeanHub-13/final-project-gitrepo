/**
 * Spirit Search
 * Sean Verba & Kiana Rezaee
 * 
 * A game about a spirit travelling through the afterlife to find parts of its soul
 * 
 * Controls: 
 * - X to close / open tutorial page
 * - Arrow keys to move
 * - E to interact
 * - R to continue text (if displayed that you can)
 * - Z to enter debug view
 * 
 * Uses:
 * 
 * Phaser.js
 * https://phaser.io/
 * https://github.com/phaserjs/phaser
 * 
 * Music and Sounds from Pixabay
 * https://pixabay.com/music/fantasy-dreamy-childrens-let-the-mystery-unfold-122118/
 * https://pixabay.com/sound-effects/riser-hit-sfx-001-289802/
 * https://pixabay.com/sound-effects/rumble-fade-out-10s-85243/
 * 
 * Art by Kiana Rezaee
 * 
 */

class Game extends Phaser.Scene {
    // Basically initializes some important variables
    constructor() {
        super({ key: "Game" }); // The key for this scene
        this.levelCode = "level1"; // Identifier for current level
        this.changeLevel = false; // Whether the level should change
        this.counterCurrent = 0; // Current value of the collection counter
    }

    // Preloads all assets needed before the game starts
    preload() {
        // Loads images
        this.load.image('flower', 'resources/images/lilflower_sprite.png');
        this.load.image('underback', 'resources/images/underworld_back.png');
        this.load.image('smallstar', 'resources/images/small_star.png');
        this.load.image('smallbang', 'resources/images/small_bang.png');
        this.load.image('road', 'resources/images/road.png');
        this.load.image('road_continuous', 'resources/images/road_continuous.png');
        this.load.image('darkness', 'resources/images/darkness.png');
        this.load.image('castle', 'resources/images/castle.png');
        this.load.image('instructions', 'resources/images/instructions.png');
        // Loads sprite sheets
        this.load.spritesheet('playerIMG', 'resources/images/soulflame.png', { frameWidth: 81, frameHeight: 89, spacing: 9 });
        this.load.spritesheet('soulPiece', 'resources/images/soulpiece.png', { frameWidth: 75, frameHeight: 90, spacing: 9 });
        this.load.spritesheet('lichen', 'resources/images/lichen.png', { frameWidth: 475, frameHeight: 750, spacing: 9 });
        this.load.spritesheet('lotus', 'resources/images/lotus.png', { frameWidth: 637.5, frameHeight: 521, spacing: 9 });
        this.load.spritesheet('crowbush', 'resources/images/crowbush.png', { frameWidth: 636, frameHeight: 630, spacing: 9 });
        this.load.spritesheet('eye', 'resources/images/eye.png', { frameWidth: 373.5, frameHeight: 399, spacing: 9 });
        this.load.spritesheet('snake', 'resources/images/snake.png', { frameWidth: 463, frameHeight: 428, spacing: 9 });
        this.load.spritesheet('tree', 'resources/images/tree.png', { frameWidth: 542.5, frameHeight: 703, spacing: 9 });
        this.load.spritesheet('question', 'resources/images/question.png', { frameWidth: 294, frameHeight: 529, spacing: 9 });
        // Loads json files
        this.load.json('levels', 'json/levels.json');
        this.load.json('text', 'json/text.json');
        // Loads audio files
        this.load.audio('mystery', 'resources/audio/mystery.mp3');
        this.load.audio('rumble', 'resources/audio/rumble.mp3');
        this.load.audio('riser', 'resources/audio/riser.mp3');
    }

    // Creates the game scene
    create() {
        this.zPressed = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z); // Listens for Z key input
        this.physics.world.drawDebug = false; // Sets debug graphics to false by default, required for the Z key debug strategy to work properly
        this.physics.world.debugGraphic.clear(); // Clears the graphics for debug view
        this.levels = this.cache.json.get('levels'); // Loading level data
        this.player = new Player(this, 1030, 2000, 450); // Creates a new player
        this.level = new Level(this, this.levels[this.levelCode], this.player); // Creates a new level
        this.newCamera = new Camera(this, this.player, 0, 0, this.levels[this.levelCode].config[0].worldWidth, this.levels[this.levelCode].config[0].worldHeight); // Creates a camera that follows the player
        this.newInstructions = new Instructions(this); // Creates the intruction interface
        this.level.setupLevel(); // Makes the level set itself up
    }

    // Main update loop that runs every frame
    update() {
        // Toggles debug view if Z gets pressed
        if (Phaser.Input.Keyboard.JustDown(this.zPressed)) {
            this.physics.world.drawDebug = !this.physics.world.drawDebug
            this.physics.world.debugGraphic.clear();
        }
        // If the level is changing
        if (this.changeLevel === true) {
            this.riser = this.sound.add('riser'); // Add a new sound of ID "riser"
            this.riser.setRate(4); // Sets its rate to 4
            this.riser.play(); // Plays the sound
            // Plays the cameras openVignette animation, along with its callback function
            this.newCamera.openVignette(() => {
                this.rumble = this.sound.add('rumble'); // Add a new sound of ID "rumble"
                this.rumble.setRate(2); // Sets its rate to 2
                this.rumble.play(); // Plays the sound
            });
            this.newCamera.flash(); // Triggers a camera flash animation
            this.newCamera.shake(); // Triggers a camera shake animation

            // If this.level exists
            if (this.level) {
                this.level.destroy(); // Destroy this.level
            }

            this.level = new Level(this, this.levels[this.levelCode], this.player); // Create the new level
            this.level.setupLevel(); // Make the level set itself up
            this.changeLevel = false; // Reset level change flag

        }
        this.player.update(); // Make sure the players update function is updating
        this.newInstructions.update(); // Make sure the instructions update function is updating
        this.level.levelChecker(); // Make sure the players levelChecker function is updating
    }
}

// Phaser game configuration object
const config = {
    type: Phaser.AUTO, // Automatically use WebGL or Canvas
    width: 800, // Games width
    height: 600, // Games height
    physics: {
        default: "arcade", // Use simpler arcade physics engine
        arcade: {
            gravity: { y: 0 }, // No gravity since its top-down
            debug: true // Enables debug at the start
        }
    },
    scene: [Game] // Set Game scene as the only scene
};

// Create Phaser game instance with provided config
const game = new Phaser.Game(config);