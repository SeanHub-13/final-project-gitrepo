// A class for creating levels that set any instances of objects definied in the level.json
class Level {
    constructor(scene, levelData, player) {
        this.scene = scene;
        this.levelData = levelData; // JSON data containing level setup
        this.player = player; // Reference to the player object

        // Arrays to store dynamically created game objects
        this.newInter = [];
        this.newCirCol = [];
        this.newDoor = [];
        this.newEnemy = [];
        this.newLotus = [];
    }

    // Sets up / Creates everything in the level
    setupLevel() {
        this.music = this.scene.sound.add('mystery'); // Add a new sound of ID "mystery"
        this.music.play(); // Play it
        this.music.setLoop(true); // Make it loop
        this.music.setRate(0.8); // Set its playrate to 0.8 (slow it down)
        this.music.setDetune(500); // Detune it by 500
        this.music.setVolume(0.3); // Set its volume to 30%

        this.text = this.scene.cache.json.get('text'); // Load level text content from the "text" json

        // Creates static and dynamic physics groups for various objects
        this.walls = this.scene.physics.add.staticGroup();
        this.images = this.scene.physics.add.staticGroup();
        this.interactables = this.scene.physics.add.staticGroup();
        this.cirCols = this.scene.physics.add.staticGroup();
        this.doors = this.scene.physics.add.staticGroup();
        this.enemies = this.scene.physics.add.group();
        this.lotuses = this.scene.physics.add.staticGroup();

        this.scene.physics.add.collider(this.player, this.walls); // Collides player with walls

        this.scene.physics.world.setBounds(0, 0, this.levelData.config[0].worldWidth, this.levelData.config[0].worldHeight); // Sets the worlds boundaries

        this.tilesprite = this.scene.add.tileSprite(0, 0, this.levelData.config[0].worldWidth, this.levelData.config[0].worldHeight, this.levelData.config[0].backgroundImage).setOrigin(0, 0).setDepth(-1); // Adds background tilesprite

        // For the amount of walls the level has, create a wall with specified instructions from levelData, and add it to any groups that it requires or that store it
        for (let i = 0; i < this.levelData.walls.length; i++) {
            let wall = this.levelData.walls[i];
            let newWall = this.scene.add.rectangle(wall.x, wall.y, wall.width, wall.height, 30, 255);
            this.scene.physics.add.existing(newWall, true);
            this.walls.add(newWall);
        }

        // For the amount of interactables the level has, create an interactable with specified instructions from levelData, add it to any groups that it requires or that store it
        for (let j = 0; j < this.levelData.interactables.length; j++) {
            let interactable = this.levelData.interactables[j];
            let newInter = new Interactable(this.scene, interactable.x, interactable.y, interactable.width, interactable.height, interactable.texture, interactable.textName, interactable.animated, interactable.canInteract, this.text, interactable.noMSG, interactable.question, this.player);
            if (newInter) {
                this.newInter.push(newInter);
            };
        }

        // For the amount of circular colliders the level has, create a circular collider with specified instructions from levelData, add it to any groups that it requires or that store it
        for (let k = 0; k < this.levelData.circleCols.length; k++) {
            let cirCol = this.levelData.circleCols[k];
            let newCirCol = new CircleCollider(this.scene, cirCol.x, cirCol.y, cirCol.radius, cirCol.teleportX, cirCol.teleportY, this.player);
            if (newCirCol) {
                this.newCirCol.push(newCirCol);
            };
        }

        // For the amount of images the level has, create an image with specified instructions from levelData, add it to any groups that it requires or that store it
        for (let n = 0; n < this.levelData.images.length; n++) {
            let image = this.levelData.images[n];
            let newIMG = this.images.create(image.x, image.y, image.texture).setDepth(-1);
            this.images.add(newIMG)
        }

        // For the amount of doors the level has, create a door with specified instructions from levelData, add it to any groups that it requires or that store it
        for (let l = 0; l < this.levelData.doors.length; l++) {
            let door = this.levelData.doors[l];
            let newDoor = new Door(this.scene, door.x, door.y, door.width, door.height, door.level, door.counterNeeds, this.player, door.playerX, door.playerY);
            if (newDoor) {
                this.newDoor.push(newDoor);
            };
        }

        // For the amount of enemies the level has, create an enemy with specified instructions from levelData, add it to any groups that it requires or that store it
        for (let m = 0; m < this.levelData.enemies.length; m++) {
            let enemy = this.levelData.enemies[m];
            let newEnemy = new Enemy(this.scene, enemy.x, enemy.y, enemy.speed, enemy.health, enemy.attackDamage);
            if (newEnemy) {
                this.enemies.add(newEnemy);
                this.scene.physics.add.collider(this.player, this.enemies);
            };
        }

        // For the amount of lotuses the level has, create a lotus with specified instructions from levelData, add it to any groups that it requires or that store it
        for (let p = 0; p < this.levelData.lotuses.length; p++) {
            let lotus = this.levelData.lotuses[p];
            let newLotus = new Lotus(this.scene, lotus.x, lotus.y, lotus.width, lotus.height, lotus.texture, lotus.xMove, lotus.yMove, lotus.circular, lotus.spinAngle, lotus.radius, lotus.speed, this.player);
            if (newLotus) {
                this.newLotus.push(newLotus);
            };
        }

        // Adds stars effect
        let stars = new Stars(this.scene, this.levelData);
        stars.stars();

        // Shows level name with animation
        this.displayName(this.levelData.config[0].levelName);

    }

    // Displays level name in the center of the screen and fade it out
    displayName(name) {
        this.displayNameText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY / 2, name, { fontFamily: "Palatino Linotype", fontSize: 46, color: '#ada41a', stroke: '#00000', strokeThickness: 4, align: 'center', }).setOrigin(0.5).setDepth(1000).setScrollFactor(0);
        this.displayed = this.scene.tweens.add({
            targets: this.displayNameText,
            alpha: 0,
            duration: 2500,
            delay: 1500,
            onComplete: () => {
                this.displayNameText.destroy();
            }
        });
    }

    // Cleans up all game objects and references when "leaving" the level
    destroy() {
        this.walls?.clear(true, true);
        this.images?.clear(true, true);
        this.interactables?.clear(true, true);
        this.cirCols?.clear(true, true);
        this.doors?.clear(true, true);
        this.enemies?.clear(true, true);
        this.lotuses?.clear(true, true);

        this.newInter.forEach(interactable => interactable.destroy());
        this.newCirCol.forEach(cirCol => cirCol.destroy());
        this.newDoor.forEach(door => door.destroy());
        this.newEnemy.forEach(enemy => enemy.destroy());
        this.newLotus.forEach(lotus => lotus.destroy());

        this.music?.destroy();
        this.displayNameText?.destroy();

        this.newInter = [];
        this.newCirCol = [];
        this.newDoor = [];
        this.newEnemy = [];
        this.newLotus = [];

        this.scene = null;
        this.levelData = null;
        this.player = null;
    }

    // Called every frame to update level state
    levelChecker() {
        // Scrolls background slowly for a sorta parallax effect
        if (this.tilesprite) {
            this.tilesprite.tilePositionY -= 0.025;
        }

        // Updates each object that requires per-frame behavior
        this.newInter.forEach(interactable => interactable.update());
        this.newCirCol.forEach(cirCol => cirCol.update());
        this.newDoor.forEach(door => door.update());
        this.newLotus.forEach(lotus => lotus.update());
    }
}