class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height, texture, player) {
        super(scene, x, y, texture);

        scene.add.existing(this).setDepth(-1); // Add this game object to the main scene
        scene.physics.add.existing(this); // Basically include the physics

        this.width = width;
        this.height = height;
        this.player = player;
        this.hoverText = null;
    }

    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.hoverAction, null, this);
    }

    hoverAction() {
        // console.log("Player has interacted with:", this.texture);
        if (!this.hoverText) {
            this.hoverText = this.scene.add.text(this.x - this.width * 1.5, this.y - this.height * 1.5, 'Press E to Interact', { fontFamily: "Arial", fontSize: 13 });
        }
    }
    update() {
        if (this.scene.physics.overlap(this.player, this) === false && this.hoverText) {
            if (this.hoverText) {
                this.hoverText.destroy();
                this.hoverText = null;
            }
        }
        // console.log(this.scene.physics.overlap(this.player, this))
    }
}