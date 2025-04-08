class Instructions extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);
        this.instructionCreate();
        this.xPressed = this.scene.input.keyboard.addKey('x');
    }

    instructionCreate() {
        this.cam = this.scene.cameras.main;

        this.instructIMG = this.scene.add.image(this.cam.width / 2, this.cam.height / 2, 'instructions').setDepth(999)
        this.instructIMG.setDisplaySize(434.1, 614.4);
        this.instructIMG.setScrollFactor(0);


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.xPressed)) {
            if (this.instructIMG.alpha === 1) {
                this.scene.tweens.add({
                    targets: this.instructIMG,
                    alpha: 0,
                    duration: 600,
                    ease: 'Sine.easeInOut',
                });
                // this.instructIMG.setAlpha(0)
            }
            else {
                this.scene.tweens.add({
                    targets: this.instructIMG,
                    alpha: 1,
                    duration: 600,
                    ease: 'Sine.easeInOut',
                });
                // this.instructIMG.setAlpha(1)
            }

        }
    }
}