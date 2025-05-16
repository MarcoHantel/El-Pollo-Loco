class World {

    character = new Character();
    endboss = new Endboss();
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();

    throwableObjects = []; //eingesammelte Flaschen

    level = level1; // somit kann ich mit level auf alle variablen aus level1 zugreifen enemies, clouds,backgroundObjects etc
    isMuted = false;
    canvas;
    ctx;
    keyboard;
    sound;
    soundPlaying = true; //nur noch umstellen true oder false mit button click 
    camera_x = 0; // brauch ich für die camera verschiebung
    isPaused = false;
    isFromTop = false; // Pepe springt von oben auf gegner

    constructor(canvas, keyboard, sound) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; // hier schreibe ich canvas, was ich über den constructor bekomme wieder in canvas um es hier verwenden zu können (Variable oben canvas)
        this.keyboard = keyboard;
        this.sound = sound;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkSound();
    }

    // Sound stimmt noch nicht
    checkSound(soundPlaying) {
        if (soundPlaying || this.soundPlaying) {
            this.setBackgroundSound();
            this.setChickenSound();
        } else {
            this.soundPlaying = false;
            this.sound.audioBackround.pause();
            this.sound.audioGetCoin.pause();
            this.sound.audioGetBottle.pause();
            this.sound.audioChicken.pause();
            this.sound.audioChickenDeath.pause();
            this.sound.audioEndbossHurt.pause();
            this.sound.audioGameOver.pause();
            this.sound.audioGameOverWin.pause();
            this.sound.audioPepeSleep.pause();
        }
    }

    setBackgroundSound() {
        this.sound.audioBackround.loop = true; // Endlosschleife für meinen Sound
        this.sound.audioBackround.volume = 0.1; // Lautstärke für Hintergrund Music
        this.sound.audioBackround.play();
    }

    setCoinSound() {
        this.sound.audioGetCoin.play();
    }

    setEndBossSound() {
        this.sound.audioEndbossHurt.play();
    }

    setBottleSound() {
        this.sound.audioGetBottle.play();
    }

    setChickenDeatheSound() {
        this.sound.audioChickenDeath.play();
    }

    setChickenSound() {
        this.sound.audioChicken.loop = true;
        this.sound.audioChicken.volume = 0.2;
        this.sound.audioChicken.play();
    }

    setGameOverSound() {
        this.sound.audioGameOver.play();
    }

    setGameOverSoundWin() {
        this.sound.audioGameOverWin.play();
    }

    setWorld() { // hier wird der Character mit der world verknüpft
        this.character.world = this;
    }

    // Siehe auch function isColliding(mo)in movable.object.class.js 
    checkCollisions() {
        this.collisionWithEnemy();
        this.collisionWithCoin();
        this.collisionWithBottle();
        this.checkThrowObjects();
        this.collisionWithEndboss();
        this.collisionEnemyBottle();
    }

    collisionWithEnemy() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss) return; // Endboss ausschließen 
                //ICh muss unbedingt isHurt bzw hit rausnehmen, wenn Pepe auf ein Hunh springt, sonst kommt das mit dem Endboss durcheinander
                if (this.character.isColliding(enemy)) {
                    const pepeBottom = this.character.y + this.character.height - this.character.offset.bottom;
                    const enemyTop = enemy.y + enemy.offset.top;

                    const isFromAbove = pepeBottom > enemyTop && this.character.speedY < 0 && this.character.isAboveGround();

                    if (isFromAbove) {
                        this.pepeAttackTop(enemy)
                    } else if (!this.character.isHurt()) {
                        this.pepeGetHurt()
                    }
                }
            });
        }, 32);
    }

    pepeAttackTop(enemy) {
        world.isFromTop = true;
        this.character.enemyDie(enemy);
        if (this.soundPlaying) this.setChickenDeatheSound();;
        this.character.speedY = +28;
    }

    pepeGetHurt() {
        world.isFromTop = false;
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    collisionWithEndboss() {
        setInterval(() => {
            // Endboss aus dem enemies-Array raussuchen
            const boss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            if (boss && !boss.bossKilled && this.character.isColliding(boss)) {

                const pepeBottom = this.character.y + this.character.height - this.character.offset.bottom;
                const bossTop = boss.y - boss.offset.top;
                const isFromAbove = pepeBottom > bossTop && this.character.speedY < 0 && this.character.isAboveGround();

                if (isFromAbove) {
                    this.collisionFromAbove(boss)
                } else if (!isFromAbove) {
                    this.collisionIsntFromAbove()
                }
            }
        }, 32);
    }

    collisionFromAbove(boss) {
        world.isFromTop = false;
        boss.hit();
        this.character.speedY = 28; // Rückstoß Pepe
        this.endbossBar.setPercentage(boss.energy); //Abzuge der % bei Boss energy
    }

    collisionIsntFromAbove() {
        world.isFromTop = false;
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    collisionEnemyBottle() {
        setInterval(() => {
            this.throwableObjects.forEach((bottle) => {
                if (!bottle.isBreaking || bottle.isBroken)
                    return;
                // Endboss part 
                const boss = this.level.enemies.find(e => e instanceof Endboss);

                if (boss && bottle.isColliding(boss)) {
                    this.bottleOnBoss(boss);
                    return; // keine weiteren Checks
                }
                // alle Gegner außer der Endboss
                this.level.enemies.forEach((enemy) => {
                    if (!(enemy instanceof Endboss) && bottle.isColliding(enemy)) {
                        this.bottleOnChicken(enemy)
                    }
                });
            });
        }, 100);
    }

    bottleOnBoss(boss) {
        world.isFromTop = false;
        boss.hit();
        this.endbossBar.setPercentage(boss.energy);
        if (this.soundPlaying) this.setEndBossSound();
        bottle.break();
    }

    bottleOnChicken(enemy) {
        this.character.enemyDie(enemy);
        if (this.soundPlaying) this.setChickenDeatheSound();
        bottle.break();
    }

    collisionWithCoin() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.character.collectCoin(coin)
                    if (this.soundPlaying) this.setCoinSound();
                    this.coinBar.setPercentage(this.character.coins)
                }
            });
        }, 200);
    }

    collisionWithBottle() {
        setInterval(() => {
            this.level.bottles.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character.collectBottle(bottle)
                    if (this.soundPlaying) this.setBottleSound();
                    this.bottleBar.setPercentage(this.character.bottles)
                }
            });
        }, 200);
    }

    checkThrowObjects() {
        setInterval(() => {
            if (this.keyboard.D && this.character.bottles > 0) {
                let bottle = new ThrowableObjects(this.character.x + 50, this.character.y + 100);
                bottle.otherDirection = this.character.otherDirection; // ← das ist der Schlüssel!
                // bottle.throweBottle(); // ← nicht vergessen, sonst bewegt sie sich nicht
                this.throwableObjects.push(bottle);
                this.character.bottles--;
                this.bottleBar.setPercentage(this.character.bottles);
            }
        }, 200);
    }

    // draw() wird immer wieder aufgerufen. Hier werden alle Elemnte in das Canvas gemalt
    // (nicht vergessen das Element oben zu definieren zB character = new Character)
    // Reihenfolge ist wichtig, was wird zuerst gemalt 
    draw() {

        if (this.isPaused) return // Hier pausiere ich das Spiel, allerdings läuft sound noch weiter(finde ich okay)
        // Warum läuft Pepe noch

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // alles löschen, nachdem gemald wurde und wieder neu malen

        this.ctx.translate(this.camera_x, 0); // verschiebt den gecamten Context nach links (Siehe Level1, deshalb wird der Hintrgund mehrfach gezeichnet und verschoben um ein größeres Bild zu haben)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character); // adding Pepe

        this.ctx.translate(-this.camera_x, 0); // Back (fix Objects)
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addObjectsToMap(this.level.coins); // adding coins
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0); // zurückschieben von der camera
        let self = this;
        requestAnimationFrame(function () { // wiederholt immer wieder draw() so oft es die Grafikkarte hergibt
            self.draw();
        });
    }

    addObjectsToMap(objects) { // adding the objects (like array)
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { //mo ist das movable Object, was ich oben bei draw übergebe
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    gameOverScreen(status) {
        let endScreen = document.getElementById('start-overlay');
        let CanvasImage = document.getElementById('imgCanvas');
        let startImg = document.querySelector('.start-img-wrapper');;
        


        if (status == 'lose') {
            //Zeigt den GameOver screen an (siehe auch character.class.js zweiter Interval)
            fullScreenEnd(); // beändet den fullscreen
            this.lostTheGame(endScreen, CanvasImage, startImg);
        } else if (status == 'win') {
            fullScreenEnd();
            this.WonTheGame(endScreen, CanvasImage, startImg);
        } else {
            return
        }
    }

    lostTheGame(endScreen, CanvasImage, startImg) {
        //Zeigt den GameOver screen an (siehe auch character.class.js zweiter Interval)       
        endScreen.classList.remove("start-container");
        CanvasImage.classList.add("none");
        endScreen.classList.add("end-container");
        startImg.style.boxShadow = 'none';
        this.setGameOverSound();
        this.showEndScreen(endScreen);
        this.endSound();
        return;
    }

    WonTheGame(endScreen, CanvasImage, startImg) {
        endScreen.classList.remove("start-container");
        endScreen.classList.add("end-container-win");
        CanvasImage.classList.add("none");
        startImg.style.boxShadow = 'none';
   

        this.setGameOverSoundWin();
        this.showEndScreen(endScreen);
        this.endSound();
        return;
    }

    showEndScreen(endScreen) {
        setTimeout(() => {
            endScreen.classList.add("show");
        }, 100);
    }

    endSound() {
        setTimeout(() => {
            soundOff();
        }, 2700);
    }
}




