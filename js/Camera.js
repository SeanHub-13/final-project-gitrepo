// A class that essentially configures / controls the main camera and gives it certain animations / effects
class Camera {
    // This sets up the class constraints as the scene, player and size of the camera as variables
    constructor(scene, player, cameraX, cameraY, cameraWidth, cameraHeight) {
        this.scene = scene;
        this.camera = this.scene.cameras.main;
        this.player = player;

        this.cameraX = cameraX;
        this.cameraY = cameraY;
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;

        this.cameraConfig(); // This is the main function for the camera
    }

    cameraConfig() {
        this.camera.setBounds(this.cameraX, this.cameraY, this.cameraWidth, this.cameraHeight); // Sets camera bounds, meaning camera cannot move past this area
        this.vignette = this.camera.postFX.addVignette(0.5, 0.5, 0.6, 0.5); // Creates an instance of phaser's built in vignette effect
        this.camera.startFollow(this.player, true); // Forces the camera to follow the player
    }

    // Closes the vignette, then calls the callback function specified
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

    // Opens the vignette, then calls the callback function specified
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

    // Flash effect built into phaser
    flash() {
        this.camera.flash(1000, 255, 255, 255);
    }

    // Shake effect built into phaser
    shake() {
        this.camera.shake(1000, 0.002);
    }
}