class Lotus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height, texture, xMove, yMove, player) {
        super(scene, x, y, texture, xMove, yMove);

        scene.add.existing(this).setDepth(0.4); // Add this game object to the main scene
        scene.physics.add.existing(this); // Basically include the physics

        this.width = width;
        this.height = height;
        this.player = player;
    };

    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.hoverAction, null, this);
    };

    hoverAction() {

    };

    update() {


    };

    consoleFunc() {

    };
}