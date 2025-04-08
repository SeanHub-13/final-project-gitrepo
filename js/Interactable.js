class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height, texture, textName, animated, canInteract, text, noMSG, player) {
        super(scene, x, y, texture);

        scene.add.existing(this).setDepth(0.4); // Add this game object to the main scene
        scene.physics.add.existing(this); // Basically include the physics

        this.text = text;
        this.textName = textName;
        this.width = width;
        this.height = height;
        this.player = player;
        this.hoverText = null;
        this.animated = animated;
        this.canInteract = canInteract;
        this.noMSG = noMSG;
        this.ePressed = this.scene.input.keyboard.addKey('e');
        this.setup();
    };

    setup() {
        this.setDisplaySize(this.width, this.height);

        if (this.animated === true) {
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

    overlapped() {

        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.hoverAction, null, this);

    };

    hoverAction() {
        // console.log("Player has interacted with:", this.texture);
        if (this.canInteract) {
            if (!this.hoverText) {
                this.hoverText = this.scene.add.text(this.x, this.y - this.displayHeight + 15, 'Press E to Interact', { fontFamily: "Palatino Linotype", fontSize: 16, color: '#ada41a', stroke: '#00000', strokeThickness: 4, align: 'center', }).setDepth(1000);
                this.hoverText.setX(this.x - this.hoverText.width / 2);
            }
        }
        if (!this.listenerAdded) {
            this.listener = () => this.consoleFunc();
            this.ePressed.on('down', this.listener);
            this.listenerAdded = true;
            console.log("CREATED!!!");
        }
        // if (!this.pressedText) {
        //     console.log("CREATED!!!")
        //     this.pressedText = this.ePressed.on('down', () => { self.consoleFunc() });
        //     console.log(this.text[this.textName])
        // }
    };

    update() {
        if (!this.scene.physics.overlap(this.player, this)) {
            if (this.hoverText) {
                this.hoverText.destroy();
                this.hoverText = null;
            }
            if (this.listenerAdded) {
                console.log("DESTROYED!!!");
                this.ePressed.off('down', this.listener);
                this.listenerAdded = false;
            }
            if (this.textBox) {
                this.textBox.remove();
                this.textBox = null;
            }
            if (this.noTalk) {
                this.noTalk.destroy();
                this.noTalk = null;
            }
        }
        if (this.textBox) {
            this.textBox.update();
        }
    }

    consoleFunc() {
        if (this.canInteract) {
            console.log(this.text[this.textName]);

            if (!this.textBox) {
                this.textBox = new Textbox(this.scene, this.text[this.textName]);
            }
            else {
                this.textBox.remove();
                this.textBox = null;
            }
        }
        else {
            this.noTalk = this.scene.add.text(this.x, this.y - this.displayHeight + 15, this.noMSG, { fontFamily: "Palatino Linotype", fontSize: 16, color: '#ada41a', stroke: '#00000', strokeThickness: 4, align: 'center', }).setDepth(1000);
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