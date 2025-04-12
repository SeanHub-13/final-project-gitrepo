// A class that creates a lotus player collectible that follows a specific pattern
class Lotus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height, texture, xMove, yMove, circular, spinAngle, radius, speed, player) {
        super(scene, x, y, texture);

        scene.add.existing(this); // Add this game object to the main scene
        scene.physics.add.existing(this); // Include physics

        this.width = width;
        this.height = height;
        this.player = player;
        this.centralX = x; // Saves the X position as it was initialized
        this.centralY = y; // Saves the Y position as it was initialized
        this.xMove = xMove; // The X Movement as defined for the default pattern
        this.yMove = yMove; // The Y Movement as defined for the default pattern
        this.circular = circular; // Boolean that defines whether movement should follow the circular pattern
        this.spinAngle = spinAngle; // Angle of the spin
        this.radius = radius; // The spins radius
        this.speed = speed;
        this.overlapped();
    };

    // Starts checking for player overlap
    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.collision, null, this);
    };

    // Increases the collectible counter in scene and destroys the Lotus on collision
    collision() {
        this.scene.counterCurrent += 1;
        this.destroy();
    };

    // Update function that essentially figures out the right animation and plays it
    update() {
        // If the animation is circular
        if (this.circular) {
            this.circlePattern();
        }
        else {
            this.defaultPattern();
        }
    };

    // The default animations movement pattern
    defaultPattern() {
        this.x += this.xMove;
        this.y += this.yMove;
    }

    // The circular pattern
    circlePattern() {
        this.spinAngle += this.speed;
        this.x = this.centralX + Math.cos(this.spinAngle) * this.radius;
        this.y = this.centralY + Math.sin(this.spinAngle) * this.radius;
    }
}