// Class that represents a dialog textbox which displays hints and can be cycled through using the R key
class Textbox {
    constructor(scene, text, question) {
        this.scene = scene; // Reference to the Phaser scene
        this.text = text; // The specific text object specified
        this.currentText = 0; // Which part of the text object to show
        this.question = question;
        this.boxMade = false;
        this.rPressed = this.scene.input.keyboard.addKey('r'); // Add keyboard input for the R key
    }

    // Creates the textbox UI elements and sets their properties
    textBox() {
        this.boxMade = true;
        this.cam = this.scene.cameras.main; // Reference to the main camera

        this.boxWindow = this.scene.physics.add.group(); // Create a physics group for textbox elements

        this.box = this.scene.add.rectangle(this.cam.width / 2, this.cam.height * 0.70, this.cam.width / 2, this.cam.height / 4, 0xfff3d4).setDepth(1000).setStrokeStyle(4, 0xada41a); // Create the textbox background rectangle
        this.box.setScrollFactor(0); // Sets its scroll factor to 0 so that it can stay with the camera

        this.textWrite = this.scene.add.text(0, 0, this.text[this.currentText]["hint"], { fontFamily: "Palatino Linotype", fontSize: 20, color: '#ada41a', stroke: '#635d09', strokeThickness: 2, align: 'center', wordWrap: { width: this.box.width * 0.90 } }).setDepth(1001); // Create the main text element
        this.textWrite.setScrollFactor(0); // Sets its scroll factor to 0 so that it can stay with the camera

        this.boxWindow.add(this.box); // Add the box to the physics group
        this.boxWindow.add(this.textWrite); // Add the main text to the physics group

        // Centers the text within the box
        this.textWrite.setX(this.box.x - this.textWrite.width / 2);
        this.textWrite.setY(this.box.y - this.textWrite.height / 2);

        // If there’s more than one hint
        if (this.text.length > 1) {
            this.nextR = this.scene.add.text(0, 0, "(R)", { fontFamily: "Palatino Linotype", fontSize: 22, color: '#ada41a', stroke: '#4287f5', strokeThickness: 3, align: 'center', wordWrap: { width: this.box.width * 0.90 } }).setDepth(1001); // Add the “(R)” text prompt
            this.nextR.setScrollFactor(0); // Sets its scroll factor to 0 so that it can stay with the camera
            // Centers the (R) within the box
            this.nextR.setX(this.box.x + 160 - this.nextR.width / 2);
            this.nextR.setY(this.box.y + 45 - this.nextR.height / 2);
            this.tweenAdd(); // Start animation loop for blinking "(R)"
        }
    }

    questionBox() {
        this.boxMade = true;
        this.cam = this.scene.cameras.main;

        this.boxWindow = this.scene.physics.add.group();

        // Main background box
        this.box = this.scene.add.rectangle(this.cam.width / 2, this.cam.height * 0.70, this.cam.width / 2, this.cam.height / 3, 0xfff3d4).setDepth(1000).setStrokeStyle(4, 0xada41a);
        this.box.setScrollFactor(0);

        // Add the main box to the group
        this.boxWindow.add(this.box);

        // Add the question text near the top of the box
        this.questionText = this.scene.add.text(0, 0, this.text[this.currentText]["question"], { fontFamily: "Palatino Linotype", fontSize: 22, color: '#5a4e10', stroke: '#ada41a', strokeThickness: 2, align: 'center', wordWrap: { width: this.box.width * 0.9 } }).setDepth(1001);
        this.questionText.setScrollFactor(0);
        this.questionText.setX(this.box.x - this.questionText.width / 2);
        this.questionText.setY(this.box.y - this.box.height / 2 + 20);
        this.boxWindow.add(this.questionText);

        this.choiceBoxes = [];
        this.choiceTextBoxes = [];
        this.boxPadding = 10;
        this.boxWidth = this.box.width / 2 - this.boxPadding * 2;
        this.boxHeight = 40;

        for (let i = 0; i < 4; i++) {
            this.isTop = i < 2;
            this.offsetX = (i % 2 === 0) ? -this.boxWidth / 2 - this.boxPadding : this.boxWidth / 2 + this.boxPadding;
            this.offsetY = this.isTop ? 90 : 150;

            this.choiceBox = this.scene.add.rectangle(this.box.x + this.offsetX, this.box.y - this.box.height / 2 + this.offsetY, this.boxWidth, this.boxHeight, 0xffffff).setStrokeStyle(2, 0xada41a).setDepth(1001);
            this.choiceBox.setScrollFactor(0);
            this.boxWindow.add(this.choiceBox);
            this.choiceBoxes.push(this.choiceBox);

            console.log(this.text[1]["choices"][i])
            this.choiceText = this.scene.add.text(this.choiceBox.x, this.choiceBox.y, this.text[1]["choices"][i], { fontFamily: "Palatino Linotype", fontSize: 18, color: '#5a4e10', align: 'center', wordWrap: { width: this.boxWidth - 10 } }).setOrigin(0.5).setDepth(1002);
            this.choiceText.setScrollFactor(0);
            this.boxWindow.add(this.choiceText);
            this.choiceTextBoxes.push(this.choiceText);
        }
    }

    // Adds a tween that fades out the "(R)" text, then calls tweenSubtract
    tweenAdd() {
        // Basically says that it should fade "(R)" out to a value of 0 over 600 milliseconds, then call this.tweenSubtract() on completion
        this.scene.tweens.add({
            targets: this.nextR,
            alpha: 0,
            duration: 600,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.tweenSubtract();
            }
        });
    }

    // Adds a tween that fades in the "(R)" text, then calls tweenAdd
    tweenSubtract() {
        // Basically says that it should fade "(R)" in to a value of 1 over 600 milliseconds, then call this.tweenAdd() on completion
        this.scene.tweens.add({
            targets: this.nextR,
            alpha: 1,
            duration: 600,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.tweenAdd();
            }
        });
    }

    // Update method that handles user input for cycling through the text
    update() {
        if (this.question === false) {
            if (this.boxMade === false) {
                this.textBox(); // Calls textbox
            }
            if (this.boxMade === true) {
                // If r is pressed
                if (Phaser.Input.Keyboard.JustDown(this.rPressed)) {
                    this.currentText++; // Move onto the next text

                    // If the next texts value is beyond the amount of texts
                    if (this.currentText >= this.text.length) {
                        this.currentText = 0; // Move back to the start
                    }

                    // Update displayed text to new text
                    this.textWrite.setText(this.text[this.currentText]["hint"]);

                    // Centers the text within the box
                    this.textWrite.setX(this.box.x - this.textWrite.width / 2);
                    this.textWrite.setY(this.box.y - this.textWrite.height / 2);
                }
            }

        }
        else {
            if (this.boxMade === false) {
                this.questionBox()
            }
        }
    }

    // Function to remove/destroy all textbox elements and input listeners
    remove() {
        if (this.box) {
            this.box.destroy();
        }

        if (this.textWrite) {
            this.textWrite.destroy();
        }

        if (this.nextR) {
            this.nextR.destroy();
        }

        if (this.rPressed) {
            this.rPressed.off('down');
        }

        if (this.questionText) {
            this.questionText.destroy();
        }

        if (this.choiceBoxes) {
            this.choiceBoxes.forEach(box => box.destroy());
        }

        if (this.choiceText) {
            this.choiceText.destroy();
        }

    }
}