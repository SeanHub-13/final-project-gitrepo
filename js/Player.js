class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {

        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCircle(Math.min(this.width, this.height), this.width / 4, this.height / 2);
        this.setCollideWorldBounds(true);
        this.speed = speed;

        this.anims.create({
            key: "left",
            // frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
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

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.setScale(0.5);
    }

    update() {

        this.setVelocity(0);

        let moving = false;
        let movingHorizontally = false;
        let movingVertically = false;

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            movingHorizontally = true;
        }

        else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            movingHorizontally = true;
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
            movingVertically = true;
        }

        else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
            movingVertically = true;
        }

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

        else if (movingHorizontally && this.cursors.left.isDown) {
            this.anims.play("left");
            moving = true;
        }

        else if (movingHorizontally && this.cursors.right.isDown) {
            this.anims.play("right");
            moving = true;
        }

        if (!moving) {
            this.anims.play('still');
        }
    }
}