class CircleCollider extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, radius, player) {
        super(scene, x, y);

        // this.circle = scene.add.circle(this.x, this.y, this.radius, 30, 255);

        this.radius = radius;
        this.player = player;
        this.overlapping = true;

        scene.add.existing(this);
        this.circlePhysics = scene.physics.add.existing(this);
        this.setCircle(this.radius, 0, 0);
    }

    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.overlap, null, this);
    }

    overlap() {

        console.log("Overlapping")
    }

    noOverlap() {
        this.player.setPosition(1030, 2000);

        console.log("Not Overlapping")
    }

    update() {
        if (this.scene.physics.overlap(this.player, this) === false) {
            this.noOverlap();
        }
    }

}