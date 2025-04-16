// A class that creates a particle emitter meant to create little stars around the whole level
class Stars extends Level {
    constructor(scene, levelData) {
        super(scene, levelData);
    }

    // This just creates stars around the whole level
    stars() {
        this.scene.add.particles(0, 0, 'smallstar', {
            x: { min: 0, max: this.levelData.config[0].worldWidth },
            y: { min: 0, max: this.levelData.config[0].worldHeight },
            frequency: 100,
            maxAliveParticles: this.levelData.config[0].starAmount,
            lifespan: { min: 3000, max: 5000 },
            scaleX: 0.25,
            scaleY: 0.25,
            speedY: -5,
            blendMode: 'SCREEN'

        });
    }

}