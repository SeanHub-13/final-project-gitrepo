class Camera {
    constructor(scene, player, cameraX, cameraY, cameraWidth, cameraHeight) {
        this.scene = scene;
        this.camera = this.scene.cameras.main;
        this.player = player;

        this.cameraX = cameraX;
        this.cameraY = cameraY;
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;

        this.cameraConfig();
    }

    cameraConfig() {
        this.camera.setBounds(this.cameraX, this.cameraY, this.cameraWidth, this.cameraHeight); // Sets camera bounds, meaning camera cannot move past this area
        this.vignette = this.camera.postFX.addVignette(0.5, 0.5, 0.6, 0.5);
        this.camera.startFollow(this.player, true);
    }

    closeVignette(callback) {
        this.scene.tweens.add({
            targets: this.vignette,
            radius: 0,
            duration: 600,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                if (callback) callback();
            }
        });
    }

    openVignette(callback) {

        this.vignette.radius = 0.0;
        this.scene.tweens.add({
            targets: this.vignette,
            radius: 0.6,
            duration: 600,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                if (callback) callback();
            }
        });
    }

    flash() {
        this.camera.flash(1000, 255, 255, 255);
    }

    shake() {
        this.camera.shake(1000, 0.002);
    }
}