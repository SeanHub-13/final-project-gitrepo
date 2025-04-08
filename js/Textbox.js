class Textbox {
    constructor(scene, text) {
        this.scene = scene;
        this.text = text;
        this.currentText = 0;
        this.textBox();
        this.rPressed = this.scene.input.keyboard.addKey('r');
    }

    textBox() {
        this.cam = this.scene.cameras.main;

        this.boxWindow = this.scene.physics.add.group();

        this.box = this.scene.add.rectangle(this.cam.width / 2, this.cam.height * 0.70, this.cam.width / 2, this.cam.height / 4, 0xfff3d4).setDepth(1000).setStrokeStyle(4, 0xada41a);
        this.box.setScrollFactor(0);

        this.textWrite = this.scene.add.text(0, 0, this.text[this.currentText]["hint"], { fontFamily: "Palatino Linotype", fontSize: 20, color: '#ada41a', stroke: '#635d09', strokeThickness: 2, align: 'center', wordWrap: { width: this.box.width * 0.90 } }).setDepth(1001);
        this.textWrite.setScrollFactor(0);

        this.boxWindow.add(this.box);
        this.boxWindow.add(this.textWrite);

        this.textWrite.setX(this.box.x - this.textWrite.width / 2);
        this.textWrite.setY(this.box.y - this.textWrite.height / 2);

        if (this.text.length > 1) {
            this.nextR = this.scene.add.text(0, 0, "(R)", { fontFamily: "Palatino Linotype", fontSize: 22, color: '#ada41a', stroke: '#4287f5', strokeThickness: 3, align: 'center', wordWrap: { width: this.box.width * 0.90 } }).setDepth(1001);
            this.nextR.setScrollFactor(0);
            this.nextR.setX(this.box.x + 160 - this.nextR.width / 2);
            this.nextR.setY(this.box.y + 45 - this.nextR.height / 2);
            this.tweenAdd();
        }
    }

    tweenAdd() {
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

    tweenSubtract() {
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

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.rPressed)) {
            this.currentText++;

            if (this.currentText >= this.text.length) {
                this.currentText = 0;
            }

            this.textWrite.setText(this.text[this.currentText]["hint"]);

            this.textWrite.setX(this.box.x - this.textWrite.width / 2);
            this.textWrite.setY(this.box.y - this.textWrite.height / 2);

        }
    }

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
    }
}