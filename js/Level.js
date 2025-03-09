class Level {
    constructor(scene, levelData, player) {
        this.scene = scene;
        this.levelData = levelData;
        this.player = player;
        this.newInter = [];
    }

    setupLevel() {
        this.walls = this.scene.physics.add.staticGroup();
        this.interactables = this.scene.physics.add.staticGroup();

        this.scene.physics.add.collider(this.player, this.walls);
        // this.scene.physics.add.overlap(this.player, this.interactables, this.consoleLog, null, this);
        this.scene.physics.world.setBounds(0, 0, this.levelData.config[0].worldWidth, this.levelData.config[0].worldHeight);
        this.tilesprite = this.scene.add.tileSprite(0, 0, this.levelData.config[0].worldWidth, this.levelData.config[0].worldHeight, this.levelData.config[0].backgroundImage).setOrigin(0, 0).setDepth(-1);

        for (let i = 0; i < this.levelData.walls.length; i++) { // Handles Static Objects (Walls Mostly =] )
            let wall = this.levelData.walls[i];
            this.walls.create(wall.x, wall.y, wall.texture);
        }

        for (let j = 0; j < this.levelData.interactables.length; j++) { // Handles Interactable Objects
            let interactable = this.levelData.interactables[j];
            // this.interactables.create(interactable.x, interactable.y, interactable.texture);
            let newInter = new Interactable(this.scene, interactable.x, interactable.y, interactable.width, interactable.height, interactable.texture, this.player);
            if (newInter) {
                this.newInter.push(newInter);
                newInter.overlapped();
            } else {
                console.error("Flower object not created properly");
            }
        }
    }

    levelChecker() {
        // Put stuff that we might check for in a level here, like a specific goal type
        // Maybe "collect X amount of stars", with X being a variable you get in the constructor
        this.tilesprite.tilePositionY -= 1;
        this.newInter.forEach(interactable => interactable.update());
    }

    // consoleLog(interactable) {
    //     console.log("Player has interacted with:", interactable.texture);
    // }
}