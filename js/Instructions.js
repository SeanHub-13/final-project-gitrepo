class Instructions extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height, texture, textName, text, player) {
        super(scene, x, y, texture);

        scene.add.existing(this).setDepth(0.4); // Add this game object to the main scene
        scene.physics.add.existing(this); // Basically include the physics

        this.text = text;
        this.textName = textName;
        this.width = width;
        this.height = height;
        this.player = player;
        this.hoverText = null;
        this.ePressed = this.scene.input.keyboard.addKey('e');
    };

    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.hoverAction, null, this);
    };

    hoverAction() {
        let self = this
        // console.log("Player has interacted with:", this.texture);
        if (!this.hoverText) {
            this.hoverText = this.scene.add.text(this.x - this.width * 1.5, this.y - this.height * 1.5, 'Press E to Interact', { fontFamily: "Arial", fontSize: 13 });
        }
        if (!this.pressedText) {
            console.log("CREATED!!!")
            this.pressedText = this.ePressed.on('down', () => { self.consoleFunc() });
            console.log(this.text[this.textName])
        }
    };

    update() {
        if (this.scene.physics.overlap(this.player, this) === false && this.hoverText) {
            if (this.hoverText) {
                this.hoverText.destroy();
                this.hoverText = null;
            }
            if (this.pressedText) {
                console.log("DESTROYED!!!")
                this.ePressed.off('down', this.pressedText);
            }
        }
        // console.log(this.scene.physics.overlap(this.player, this))
    };

    consoleFunc() {
        console.log(this.text[this.textName]);
    };
}