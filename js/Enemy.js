// Unfinished class, meant to be the enemy in level 3 - I won't comment this as its just basically a stripped down Player.js
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed, health, attackDamage) {

        super(scene, x, y, "playerIMG");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCircle(Math.min(this.width / 2, this.height / 2), this.width / 8, this.height / 8);
        this.setCollideWorldBounds(true);
        this.speed = speed;


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
        this.setScale(0.5);
    }

    update() {
        this.anims.play('still');
    }
}