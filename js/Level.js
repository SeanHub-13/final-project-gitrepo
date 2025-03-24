class Level {
    constructor(scene, levelData, player, road) {
        this.scene = scene;
        this.levelData = levelData;
        this.player = player;
        this.newInter = [];
        this.newCirCol = [];
        this.road = road;
    }

    setupLevel() {
        this.walls = this.scene.physics.add.staticGroup();
        this.images = this.scene.physics.add.staticGroup();
        this.interactables = this.scene.physics.add.staticGroup();
        this.cirCols = this.scene.physics.add.staticGroup();

        this.scene.physics.add.collider(this.player, this.walls);

        this.scene.physics.world.setBounds(0, 0, this.levelData.config[0].worldWidth, this.levelData.config[0].worldHeight);
        this.tilesprite = this.scene.add.tileSprite(0, 0, this.levelData.config[0].worldWidth, this.levelData.config[0].worldHeight, this.levelData.config[0].backgroundImage).setOrigin(0, 0).setDepth(-1);

        for (let i = 0; i < this.levelData.walls.length; i++) { // Handles Static Objects (Walls Mostly =] )
            let wall = this.levelData.walls[i];
            let newWall = this.scene.add.rectangle(wall.x, wall.y, wall.width, wall.height, 30, 255);
            this.scene.physics.add.existing(newWall, true); // 'true' makes it static
            this.walls.add(newWall);
            // this.walls.create(wall.x, wall.y, wall.texture);
        }

        for (let j = 0; j < this.levelData.interactables.length; j++) { // Handles Interactable Objects
            let interactable = this.levelData.interactables[j];
            // this.interactables.create(interactable.x, interactable.y, interactable.texture);
            let newInter = new Interactable(this.scene, interactable.x, interactable.y, interactable.width, interactable.height, interactable.texture, this.player);
            if (newInter) {
                this.newInter.push(newInter);
                newInter.overlapped();
            };
        }

        for (let k = 0; k < this.levelData.circleCols.length; k++) {
            let cirCol = this.levelData.circleCols[k];
            // let newCirCol = this.scene.add.circle(cirCol.x, cirCol.y, cirCol.radius, 0x000000, 0);
            let newCirCol = new CircleCollider(this.scene, cirCol.x, cirCol.y, cirCol.radius, this.player);
            if (newCirCol) {
                this.newCirCol.push(newCirCol);
                newCirCol.overlapped();
            };
        }

        for (let n = 0; n < this.levelData.images.length; n++) {
            let image = this.levelData.images[n];
            let newIMG = this.images.create(image.x, image.y, image.texture).setDepth(-1);
            this.images.add(newIMG)
        }
        let stars = new Stars(this.scene, this.levelData);
        stars.stars();
    }

    levelChecker() {
        // Put stuff that we might check for in a level here, like a specific goal type
        // Maybe "collect X amount of stars", with X being a variable you get in the constructor
        this.tilesprite.tilePositionY -= 0.025;
        this.newInter.forEach(interactable => interactable.update());
        this.newCirCol.forEach(cirCol => cirCol.update());
    }

    // consoleLog(interactable) {
    //     console.log("Player has interacted with:", interactable.texture);
    // }
}