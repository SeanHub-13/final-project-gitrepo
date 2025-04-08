class Door extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, width, height, level, player, playerX, playerY) {
        super(scene, x, y, null);

        scene.add.existing(this) // Add this game object to the main scene
        scene.physics.add.existing(this); // Basically include the physics

        this.width = width;
        this.height = height;
        this.player = player;
        this.playerX = playerX;
        this.playerY = playerY;
        this.level = level;

        this.particleEmitter = null;

        this.setSize(width, height);
        this.setImmovable(true);
        this.setVisible(false);
        this.setOrigin(0.5);
    }

    doorEffect() {
        console.log("doorEffect() called for Door at", this.x, this.y);
        this.particleEmitter = this.scene.add.particles(0, 0, 'smallbang', {
            x: { min: this.x - this.width / 2, max: this.x + this.width / 2 },
            y: { min: this.y - this.height / 2, max: this.y + this.height / 2 },
            frequency: 350,
            // maxAliveParticles: this.levelData.config[0].starAmount,
            lifespan: { min: 3000, max: 5000 },
            // alpha: { start: 0, end: 0.5, steps: 10, yoyo: true },
            scaleX: { start: 0.01, end: 0.075, ease: 0.001 },
            scaleY: { start: 0.01, end: 0.075, ease: 0.001 },
            tint: [0xa6253f],
            blendMode: 'MULTIPLY'

        });
    }

    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.doorAction, null, this);

    }

    doorAction() {
        this.scene.levelCode = this.level;
        this.scene.changeLevel = true;
        console.log(this.playerX + " " + this.playerY)
        this.player.setPosition(this.playerX, this.playerY);
        this.particleEmitter.stop();
    }

    update() {


    }
}