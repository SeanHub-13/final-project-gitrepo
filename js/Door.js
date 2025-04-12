// A class that creates a door shown by a particle emitter that only appears if you collect enough lotuses and leads to the specified level 
class Door extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, width, height, level, counterNeeds, player, playerX, playerY) {
        super(scene, x, y, null);

        scene.add.existing(this) // Add this game object to the main scene
        scene.physics.add.existing(this); // Include physics

        this.width = width;
        this.height = height;
        this.player = player;
        this.playerX = playerX;
        this.playerY = playerY;
        this.level = level; // The key of the specified next level
        this.counterNeeds = counterNeeds; // The specified amount of lotuses needed to appear
        this.doorMade = false; // Whether the door has been made
        this.particleEmitter = null; // Particle emitter variable initialization

        // Configured physics body and appearance for proper displaying
        this.setSize(width, height);
        this.setImmovable(true);
        this.setVisible(false);
        this.setOrigin(0.5);
    }

    // Checks if player needs to collect for this door, if so then checks if they have collected enough to activate the door
    doorCheck() {
        // If the counter needs more than 0 lotuses
        if (this.counterNeeds > 0) {
            // If the current amount in the counter is equal to what the counter needs
            if (this.scene.counterCurrent === this.counterNeeds) {
                this.doorEffect();
                this.overlapped();
                this.doorMade = true;
            }
        }
        else {
            this.doorEffect();
            this.overlapped();
            this.doorMade = true;
        }
    }

    // Creates a particle effect to represent the door appearing
    doorEffect() {
        this.particleEmitter = this.scene.add.particles(0, 0, 'smallbang', {
            x: { min: this.x - this.width / 2, max: this.x + this.width / 2 },
            y: { min: this.y - this.height / 2, max: this.y + this.height / 2 },
            frequency: 350,
            lifespan: { min: 3000, max: 5000 },
            scaleX: { start: 0.01, end: 0.075, ease: 0.001 },
            scaleY: { start: 0.01, end: 0.075, ease: 0.001 },
            tint: [0xa6253f],
            blendMode: 'MULTIPLY'

        });
    }

    // Starts checking for player overlap
    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.doorAction, null, this);
    }

    // Transition to the new level, set the players new position, and reset the counter
    doorAction() {
        this.scene.levelCode = this.level;
        this.scene.changeLevel = true;
        this.scene.counterCurrent = 0;
        this.player.setPosition(this.playerX, this.playerY);
        this.particleEmitter.stop();
    }

    // This update checks whether the door has been made before running the function that could potentially make a new door
    update() {
        // If the door has not been made
        if (this.doorMade === false) {
            this.doorCheck();
        }
    }
}