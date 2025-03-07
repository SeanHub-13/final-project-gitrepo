class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed) {

        super(scene, x, y, "player");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCircle(this.width / 2, this.height / 3, this.width / 3, this.height / 2);
        this.setCollideWorldBounds(true);
        this.speed = speed;

        this.anims.create({
            key: "left",
            // frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frames: [{ key: "playerIMG", frame: 0 }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "up",
            frames: [{ key: "playerIMG", frame: 1 }],
            frameRate: 10
        });

        this.anims.create({
            key: "right",
            frames: [{ key: "playerIMG", frame: 2 }],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "down",
            frames: [{ key: "playerIMG", frame: 3 }],
            frameRate: 10
        });

        this.cursors = scene.input.keyboard.createCursorKeys();

    }

    update() {

        this.setVelocity(0);
        this.moving = false;

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-300);
            this.anims.play('left', true);
            this.moving = true;
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(300);
            this.anims.play('right', true);
            this.moving = true;
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.setVelocityY(-300);
            this.anims.play('up', true);
            this.moving = true;
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(300);
            this.anims.play('down', true);
            this.moving = true;
        }

        if (!this.moving) {
            this.anims.play('down');
        }
    }
}