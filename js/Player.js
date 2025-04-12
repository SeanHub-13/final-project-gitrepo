// A class for creating a player
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {
        super(scene, x, y);

        scene.add.existing(this).setDepth(0.5) // Adds this player sprite to the scene at specified depth (z) level
        scene.physics.add.existing(this); // Include physics

        // Sets a circular hitbox, centered within the sprite
        this.setCircle(Math.min(this.width, this.height), this.width / 4, this.height / 2);

        // Prevents the player from moving out of bounds
        this.setCollideWorldBounds(true);

        this.speed = speed;

        // Creates directional animations using frames from the playerIMG spritesheet
        this.anims.create({
            key: "left",
            frames: [{ key: "playerIMG", frame: 0 }],
            frameRate: 10
        });

        this.anims.create({
            key: "up_left",
            frames: [{ key: "playerIMG", frame: 1 }],
            frameRate: 10
        });

        this.anims.create({
            key: "right",
            frames: [{ key: "playerIMG", frame: 4 }],
            frameRate: 10
        });

        this.anims.create({
            key: "down_left",
            frames: [{ key: "playerIMG", frame: 1 }],
            frameRate: 10
        });

        this.anims.create({
            key: "up_right",
            frames: [{ key: "playerIMG", frame: 3 }],
            frameRate: 10
        });

        this.anims.create({
            key: "down_right",
            frames: [{ key: "playerIMG", frame: 3 }],
            frameRate: 10
        });

        this.anims.create({
            key: "still",
            frames: [{ key: "playerIMG", frame: 2 }],
            frameRate: 10
        })

        this.cursors = scene.input.keyboard.createCursorKeys(); // Stores keyboard arrow input controls
        this.setScale(0.5); // Makes the player sprite half as big
    }

    // This update function pretty much just control player movement
    update() {
        this.setVelocity(0); // Resets any existing movement before processing input, basically 100% friction for the player

        let moving = false; // Tracks any movement
        let movingHorizontally = false; // Tracks left/right movement
        let movingVertically = false; // Tracks up/down movement

        // Handles horizontal movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            movingHorizontally = true;
        }

        else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            movingHorizontally = true;
        }

        // Handles vertical movement
        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
            movingVertically = true;
        }

        else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
            movingVertically = true;
        }

        // Handles diagonal movement animations
        if (movingHorizontally && movingVertically) {
            if (this.cursors.up.isDown && this.cursors.left.isDown) {
                this.anims.play("up_left");
            }
            else if (this.cursors.up.isDown && this.cursors.right.isDown) {
                this.anims.play("up_right");
            }

            else if (this.cursors.down.isDown && this.cursors.left.isDown) {
                this.anims.play("down_left");
            }

            else if (this.cursors.down.isDown && this.cursors.right.isDown) {
                this.anims.play("down_right");
            }
            moving = true;
        }

        // Handles straight horizontal movement animations
        else if (movingHorizontally && this.cursors.left.isDown) {
            this.anims.play("left");
            moving = true;
        }

        else if (movingHorizontally && this.cursors.right.isDown) {
            this.anims.play("right");
            moving = true;
        }

        // If no input detected, play idle animation
        if (!moving) {
            this.anims.play('still');
        }
    }
}