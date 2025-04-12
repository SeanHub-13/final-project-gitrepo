// A class that creates a circular object with a collider that needs to be overlapped by the player, or they are teleported to the specified location
class CircleCollider extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, radius, teleportX, teleportY, player) {
        super(scene, x, y);

        this.radius = radius;
        this.player = player;
        this.teleportX = teleportX;
        this.teleportY = teleportY;
        this.overlapping = true;

        scene.add.existing(this); // Add this game object to the main scene
        this.circlePhysics = scene.physics.add.existing(this); // Include physics

        // Set a circular physics body with the given radius
        this.setCircle(this.radius, 0, 0);

        this.overlapped();
    }

    // Starts checking for player overlap
    overlapped() {
        this.overlapping = this.scene.physics.add.overlap(this.player, this, this.overlap, null, this);
    }

    // Intentionally empty as its designed to only keep the player within range
    overlap() {
    }

    // Sends the player to its set position when they aren't overlapping with this object
    noOverlap() {
        this.player.setPosition(this.teleportX, this.teleportY);
    }

    // This update checks if the player is no longer overlapping the circle and if so triggers this.noOverlap()
    update() {
        // If the player is not overlapping with this object
        if (this.scene.physics.overlap(this.player, this) === false) {
            this.noOverlap();
        }
    }
}