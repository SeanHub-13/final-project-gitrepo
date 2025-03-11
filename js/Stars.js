class Stars extends Level {
    constructor(scene, levelData) {
        super(scene, levelData);
    }

    stars() {
        this.scene.add.particles(0, 0, 'smallstar', {
            x: { min: 0, max: this.levelData.config[0].worldWidth },
            y: { min: 0, max: this.levelData.config[0].worldHeight / 2 },
            frequency: 100,
            maxAliveParticles: this.levelData.config[0].starAmount,
            lifespan: { min: 3000, max: 5000 },
            alpha: { start: 0, end: 0.5, steps: 10, yoyo: true },
            scaleX: 0.25,
            scaleY: 0.25,
            blendMode: 'ADD'

        });
    }

}