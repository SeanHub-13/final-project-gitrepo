// A class for creating an instruction flyer that displays controls and basic premise, and can be opened / closed with X
class Instructions extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);
        this.instructionCreate(); // Calls instructionCreate()
        this.xPressed = this.scene.input.keyboard.addKey('x'); // Add keyboard input for the X key
    }

    // Creates and displays the instruction image
    instructionCreate() {
        this.cam = this.scene.cameras.main; // References the main camera

        this.instructIMG = this.scene.add.image(this.cam.width / 2, this.cam.height / 2, 'instructions').setDepth(999) // Adds instruction image to the center of the screen
        this.instructIMG.setDisplaySize(434.1, 614.4); // Modifies their size when displayed
        this.instructIMG.setScrollFactor(0); // Sets their scroll factor to 0 so that it can stay with the camera


    }

    // Update function to listen for X key and toggle visibility with a fade
    update() {
        // If the X key is pressed
        if (Phaser.Input.Keyboard.JustDown(this.xPressed)) {
            // If the instructions are visible
            if (this.instructIMG.alpha === 1) {
                this.scene.tweens.add({
                    targets: this.instructIMG,
                    alpha: 0,
                    duration: 600,
                    ease: 'Sine.easeInOut',
                });
            }
            else {
                this.scene.tweens.add({
                    targets: this.instructIMG,
                    alpha: 1,
                    duration: 600,
                    ease: 'Sine.easeInOut',
                });
            }

        }
    }
}