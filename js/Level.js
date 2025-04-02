class Level {
    constructor(scene, levelData, player) {
        this.scene = scene;
        this.levelData = levelData;
        this.player = player;
        this.newInter = [];
        this.newCirCol = [];
        this.newDoor = [];
        this.newEnemy = [];
        this.newLotus = [];
    }

    setupLevel() {
        console.log("setting up!")
        this.text = this.scene.cache.json.get('text');
        this.walls = this.scene.physics.add.staticGroup();
        this.images = this.scene.physics.add.staticGroup();
        this.interactables = this.scene.physics.add.staticGroup();
        this.cirCols = this.scene.physics.add.staticGroup();
        this.doors = this.scene.physics.add.staticGroup();
        this.enemies = this.scene.physics.add.group();
        this.lotuses = this.scene.physics.add.staticGroup();

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
            let newInter = new Interactable(this.scene, interactable.x, interactable.y, interactable.width, interactable.height, interactable.texture, interactable.textName, this.text, this.player);
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

        for (let l = 0; l < this.levelData.doors.length; l++) {
            let door = this.levelData.doors[l];
            let newDoor = new Door(this.scene, door.x, door.y, door.width, door.height, door.level, this.player);
            if (newDoor) {
                this.newDoor.push(newDoor);
                newDoor.doorEffect();
                newDoor.overlapped();
            };
        }

        for (let m = 0; m < this.levelData.enemies.length; m++) {
            let enemy = this.levelData.enemies[m];
            let newEnemy = new Enemy(this.scene, enemy.x, enemy.y, enemy.speed, enemy.health, enemy.attackDamage);
            if (newEnemy) {
                this.enemies.add(newEnemy);
                this.scene.physics.add.collider(this.player, this.enemies);
            };
        }

        for (let p = 0; p < this.levelData.lotuses.length; p++) { // Handles Interactable Objects
            let lotus = this.levelData.lotuses[p];
            let newLotus = new Lotus(this.scene, lotus.x, lotus.y, lotus.width, lotus.height, lotus.texture, lotus.xMove, lotus.yMove, this.player);
            if (newLotus) {
                this.newLotus.push(newLotus);
                newLotus.overlapped();
            };
        }

        let stars = new Stars(this.scene, this.levelData);
        stars.stars();
        this.displayName(this.levelData.config[0].levelName);
    }

    displayName(name) {
        this.displayNameText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY / 2, name, { fontFamily: "Palatino Linotype", fontSize: 46, color: '#ada41a', stroke: '#00000', strokeThickness: 4, align: 'center', }).setOrigin(0.5).setDepth(1000).setScrollFactor(0);
        this.scene.tweens.add({
            targets: this.displayNameText,
            alpha: 0,
            duration: 2000,
            delay: 1000,
            onComplete: () => {
                this.displayNameText.destroy();
            }
        });
    }

    destroy() {
        this.walls?.clear(true, true);
        this.images?.clear(true, true);
        this.interactables?.clear(true, true);
        this.cirCols?.clear(true, true);
        this.doors?.clear(true, true);

        this.newInter.forEach(interactable => interactable.destroy());
        this.newCirCol.forEach(cirCol => cirCol.destroy());
        this.newDoor.forEach(door => door.destroy());

        this.newInter = [];
        this.newCirCol = [];
        this.newDoor = [];

        this.scene = null;
        this.levelData = null;
        this.player = null;
    }

    levelChecker() {
        // Put stuff that we might check for in a level here, like a specific goal type
        // Maybe "collect X amount of stars", with X being a variable you get in the constructor
        if (this.tilesprite) {
            this.tilesprite.tilePositionY -= 0.025;
        }
        this.newInter.forEach(interactable => interactable.update());
        this.newCirCol.forEach(cirCol => cirCol.update());
    }

    // consoleLog(interactable) {
    //     console.log("Player has interacted with:", interactable.texture);
    // }
}