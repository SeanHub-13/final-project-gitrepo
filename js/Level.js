class Level {
    constructor(scene, levelData, player) {
        this.scene = scene;
        this.levelData = levelData;
        this.player = player;
    }

    setupLevel() {
        this.walls = this.scene.physics.add.staticGroup();
        this.interactables = this.scene.physics.add.staticGroup();

        this.scene.physics.add.collider(this.player, this.walls);
        this.scene.physics.add.overlap(this.player, this.interactables, this.consoleLog, null, this);

        for (let i = 0; i < this.levelData.walls.length; i++) { // Handles Static Objects (Walls Mostly =] )
            let wall = this.levelData.walls[i];
            this.walls.create(wall.x, wall.y, wall.texture);
        }

        for (let j = 0; j < this.levelData.interactables.length; j++) { // Handles Interactable Objects
            let interactable = this.levelData.interactables[j];
            this.interactables.create(interactable.x, interactable.y, interactable.texture);
        }
    }

    levelChecker() {
        // Put stuff that we might check for in a level here, like a specific goal type
        // Maybe "collect X amount of stars", with X being a variable you get in the constructor
    }

    consoleLog(interactable) {
        console.log("Player has interacted with:", interactable.texture);
    }
}