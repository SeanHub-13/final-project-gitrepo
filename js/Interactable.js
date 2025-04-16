// A class for creating interactive game objects the player can interact with using the E key
class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height, texture, textName, animated, canInteract, text, noMSG, question, player) {
        super(scene, x, y, texture); // Calls the parent class (Sprite)

        scene.add.existing(this).setDepth(0.4); // Add this game object to the main scene
        scene.physics.add.existing(this); // Include physics

        this.text = text; // Collection of all possible dialogues
        this.textName = textName; // Key for the specific dialogue of this interactable
        this.width = width;
        this.height = height;
        this.player = player; // Reference to the player object
        this.hoverText = null; // Initializer for text shown when player is near
        this.animated = animated; // Whether this object has a looping animation
        this.canInteract = canInteract; // Whether interaction is currently allowed
        this.noMSG = noMSG; // Message shown if interaction is not allowed
        this.question = question;
        this.ePressed = this.scene.input.keyboard.addKey('e'); // Add keyboard input for the E key
        this.setup(); // Calls this.setup()
        this.overlapped();
    };

    // Setup display size and animation
    setup() {
        this.setDisplaySize(this.width, this.height);

        // If the object should be animated, create and play its animation
        if (this.animated === true) {
            // Create it only if the animation doesn't exist yet
            if (!this.scene.anims.exists(this.texture.key)) {
                this.scene.anims.create({
                    key: this.texture.key,
                    frames: this.scene.anims.generateFrameNumbers(this.texture.key, { start: 0, end: 1 }),
                    frameRate: 1,
                    repeat: -1
                });
            };
            this.anims.play(this.texture.key, true);
        };
    };

    // Starts checking for player overlap
    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.hoverAction, null, this);
    };

    // When the player overlaps the object, display the "Press E" prompt and enable interaction
    hoverAction() {
        // If interaction has been allowed
        if (this.canInteract) {
            // If hoverText is not in existence
            if (!this.hoverText) {
                this.hoverText = this.scene.add.text(this.x, this.y - this.displayHeight + 15, 'Press E to Interact', { fontFamily: "Palatino Linotype", fontSize: 16, color: '#ada41a', stroke: '#00000', strokeThickness: 4, align: 'center', }).setDepth(1000); // Add the interaction text to scene
                this.hoverText.setX(this.x - this.hoverText.width / 2); // Sets its x value
            }
        }
        // If the listener hasn't already been added, add the E key event listener
        if (!this.listenerAdded) {
            this.listener = () => this.showText();
            this.ePressed.on('down', this.listener);
            this.listenerAdded = true;
        }
    };

    // Update method that checks if player leaves the object
    update() {
        // If the player is no longer overlapping the object
        if (!this.scene.physics.overlap(this.player, this)) {
            if (this.hoverText) {
                this.hoverText.destroy();
                this.hoverText = null;
            }
            // Remove the key listener
            if (this.listenerAdded) {
                this.ePressed.off('down', this.listener);
                this.listenerAdded = false;
            }
            // Remove textbox if it's active
            if (this.textBox) {
                this.textBox.remove();
                this.textBox = null;
            }
            // Remove the non-interaction message
            if (this.noTalk) {
                this.noTalk = null;
            }
        }
        // Update the textbox if it's open (so text cycling works)
        if (this.textBox) {
            this.textBox.update();
        }
    }

    // Show the textbox or other message when pressing E
    showText() {
        // If you can interact with the interactable
        if (this.canInteract) {
            // If there is no textbox, make a new textbox
            if (!this.textBox) {
                this.textBox = new Textbox(this.scene, this.text[this.textName], this.question);
            }
            // Otherwise, remove the textbox
            else {
                this.textBox.remove();
                this.textBox = null;
            }
        }
        // Shows a brief floating message if player can't interact with this object
        else {
            this.noTalk = this.scene.add.text(this.x, this.y - this.displayHeight / 1.75, this.noMSG, { fontFamily: "Palatino Linotype", fontSize: 18, color: '#ada41a', stroke: '#00000', strokeThickness: 4, align: 'center', }).setDepth(1000);
            this.noTalk.setX(this.x - this.noTalk.width / 2);
            this.scene.tweens.add({
                targets: this.noTalk,
                y: this.noTalk.y - 25,
                alpha: 0,
                duration: 1200,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    if (this.noTalk) {
                        this.noTalk.destroy();
                        this.noTalk = null;
                    }
                }
            });
        }
    };
}