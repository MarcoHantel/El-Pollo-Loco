/**
 * Represents the game world containing the main character, enemies, UI bars, sounds, and collision logic.
 */
class World {
    /** @type {Character} Main character controlled by the player. */
    character = new Character();
    /** @type {Endboss} The final boss enemy in the level. */
    endboss = new Endboss();
    /** @type {StatusBar} Health bar for the main character. */
    statusBar = new StatusBar();
    /** @type {CoinBar} UI bar showing collected coins. */
    coinBar = new CoinBar();
    /** @type {BottleBar} UI bar showing collected bottles. */
    bottleBar = new BottleBar();
    /** @type {EndbossBar} UI bar showing the boss's health. */
    endbossBar = new EndbossBar();
    /** @type {Array<ThrowableObjects>} List of throwable objects like bottles. */
    throwableObjects = [];
    /** @type {Object} Current game level data, including enemies, coins, bottles, etc. */
    level = level1;
    /** @type {boolean} Indicates whether the sound is muted. */
    isMuted = false;
    /** @type {HTMLCanvasElement} Canvas element used for rendering the game. */
    canvas;
    /** @type {CanvasRenderingContext2D} 2D rendering context for drawing on the canvas. */
    ctx;
    /** @type {Object} Keyboard input handler object. */
    keyboard;

    /** @type {Object} Sound manager containing audio elements. */
    sound;
    /** @type {boolean} Indicates whether sound is currently enabled (from localStorage). */
    soundPlaying = JSON.parse(localStorage.getItem("sound"));
    /** 
     * Camera offset on the x-axis to simulate side-scrolling.
     * Note: In canvas coordinates, (0,0) is at the top-left corner.
     * @type {number} 
     */
    camera_x = 0;
    /** @type {boolean} Indicates if the game is currently paused. */
    isPaused = false;
    /** 
     * Helper flag indicating if the character attacked an enemy from above (e.g. by jumping).
     * @type {boolean} 
     */
    isFromTop = false;
    /**
     * Creates a new World instance.
     * @param {HTMLCanvasElement} canvas The canvas element where the game is rendered.
     * @param {Object} keyboard Keyboard input handler.
     * @param {Object} sound Sound manager object.
     */
    constructor(canvas, keyboard, sound) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sound = sound;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkSound();
    }
    /**
     * Checks if sound should be played or paused.
     * @param {boolean} [soundPlaying] Optional flag to override current sound state.
     */
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
    /** Starts and loops the background music. */
    setBackgroundSound() {
        this.sound.audioBackround.loop = true;
        this.sound.audioBackround.play();
    }
    /** Plays the coin collection sound effect. */
    setCoinSound() {
        this.sound.audioGetCoin.play();
    }
    /** Plays the endboss hurt sound effect. */
    setEndBossSound() {
        this.sound.audioEndbossHurt.play();
    }
    /** Plays the bottle collection sound effect. */
    setBottleSound() {
        this.sound.audioGetBottle.play();
    }
    /** Plays the chicken death sound effect. */
    setChickenDeatheSound() {
        this.sound.audioChickenDeath.play();
    }
    /** Starts and loops the chicken sound effect. */
    setChickenSound() {
        this.sound.audioChicken.loop = true;
        this.sound.audioChicken.play();
    }
    /** Plays the game over sound effect for losing. */
    setGameOverSound() {
        this.sound.audioGameOver.play();
    }
    /** Plays the game over sound effect for winning. */
    setGameOverSoundWin() {
        this.sound.audioGameOverWin.play();
    }
    /** Sets a reference from the character back to this world instance. */
    setWorld() {
        this.character.world = this;
    }
    /** Initializes all collision checks for enemies, coins, bottles, throwables, and the boss. */
    checkCollisions() {
        this.collisionWithEnemy();
        this.collisionWithCoin();
        this.collisionWithBottle();
        this.checkThrowObjects();
        this.collisionWithEndboss();
        this.collisionEnemyBottle();
    }
    /**
     * Periodically checks collisions between the character and normal enemies.
     * Detects whether character attacks from above or gets hurt.
     */
    collisionWithEnemy() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss) return;
                if (this.character.isColliding(enemy)) {
                    const pepeBottom = this.character.y + this.character.height - this.character.offset.bottom;
                    const enemyTop = enemy.y + enemy.offset.top;
                    const isFromAbove = pepeBottom > enemyTop && this.character.speedY < 0 && this.character.isAboveGround();
                    if (isFromAbove) {
                        this.pepeAttackTop(enemy);
                    } else if (!this.character.isHurt()) {
                        this.pepeGetHurt();
                    }
                }
            });
        }, 32);
    }
    /**
     * Handles the character attacking an enemy from above.
     * @param {Object} enemy Enemy object being attacked.
     */
    pepeAttackTop(enemy) {
        world.isFromTop = true;
        this.character.enemyDie(enemy);
        if (this.soundPlaying) this.setChickenDeatheSound();
        this.character.speedY = 28;
    }
    /** Handles the character getting hurt by an enemy. */
    pepeGetHurt() {
        world.isFromTop = false;
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }
    /**
     * Periodically checks collisions between the character and the endboss.
     * Detects whether character attacks from above or gets hurt.
     */
    collisionWithEndboss() {
        setInterval(() => {
            const boss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            if (boss && !boss.bossKilled && this.character.isColliding(boss)) {
                const pepeBottom = this.character.y + this.character.height - this.character.offset.bottom;
                const bossTop = boss.y - boss.offset.top;
                const isFromAbove = pepeBottom > bossTop && this.character.speedY < 0 && this.character.isAboveGround();
                if (isFromAbove) {
                    this.collisionFromAbove(boss)
                } else {
                    this.collisionIsntFromAbove()
                }
            }
        }, 32);
    }
    /**
     * Handles the character hitting the endboss from above.
     * @param {Endboss} boss The endboss object.
     */
    collisionFromAbove(boss) {
        world.isFromTop = false;
        boss.hit();
        this.character.speedY = 28;
        this.endbossBar.setPercentage(boss.energy);
    }
    /** Handles the character getting hurt by the endboss (not from above). */
    collisionIsntFromAbove() {
        world.isFromTop = false;
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }
    /**
     * Periodically checks collisions between throwable bottles and enemies or the endboss.
     * Ignores bottles that are not breaking or already broken.
     */
    collisionEnemyBottle() {
        setInterval(() => {
            this.throwableObjects.forEach((bottle) => {
                if (!bottle.isBreaking || bottle.isBroken)
                    return;
                const boss = this.level.enemies.find(e => e instanceof Endboss);
                if (boss && bottle.isColliding(boss)) {
                    this.bottleOnBoss(boss, bottle);
                    return;
                }
                this.level.enemies.forEach((enemy) => {
                    if (!(enemy instanceof Endboss) && bottle.isColliding(enemy)) {
                        this.bottleOnChicken(enemy, bottle)
                    }
                });
            });
        }, 100);
    }
    /**
     * Handles the bottle hitting the endboss.
     * @param {Endboss} boss The endboss object.
     * @param {ThrowableObjects} bottle The thrown bottle.
     */
    bottleOnBoss(boss, bottle) {
        world.isFromTop = false;
        boss.hit();
        this.endbossBar.setPercentage(boss.energy);
        if (this.soundPlaying) this.setEndBossSound();
        bottle.break();
    }
    /**
     * Handles the bottle hitting a normal enemy.
     * @param {Object} enemy The enemy hit by the bottle.
     * @param {ThrowableObjects} bottle The thrown bottle.
     */
    bottleOnChicken(enemy, bottle) {
        this.character.enemyDie(enemy);
        if (this.soundPlaying) this.setChickenDeatheSound();
        bottle.break();
    }
    /**
     * Periodically checks collisions between the character and coins to collect them.
     */
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
    /**
     * Periodically checks collisions between the character and bottles to collect them.
     */
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
    /**
     * Periodically checks if the player throws a bottle (presses 'D' key).
     * Throws a new bottle if the character has bottles left.
     */
    checkThrowObjects() {
        setInterval(() => {
            if (this.keyboard.D && this.character.bottles > 0) {
                let bottle = new ThrowableObjects(this.character.x + 50, this.character.y + 100);
                bottle.otherDirection = this.character.otherDirection;
                this.throwableObjects.push(bottle);
                this.character.bottles--;
                this.bottleBar.setPercentage(this.character.bottles);
            }
        }, 200);
    }
    /**
     * Main game drawing loop; clears canvas and draws all game objects.
     * Respects camera offset for scrolling.
     */
    draw() {
        if (this.isPaused) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    /**
     * Draws an array of movable objects to the map.
     * @param {Array<Object>} objects Array of game objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
    /**
     * Draws a single movable object on the canvas.
     * Handles flipping the image horizontally if needed.
     * @param {Object} mo Movable object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    /**
     * Flips the image horizontally to simulate character facing the other direction.
     * @param {Object} mo Movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    /**
     * Restores the canvas state after flipping and resets the object's x position.
     * @param {Object} mo Movable object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    /**
     * Displays the game over or victory screen depending on the status.
     * @param {'lose'|'win'} status The game end status.
     */
    gameOverScreen(status) {
        let endScreen = document.getElementById('start-overlay');
        let startImg = document.querySelector('.start-img-wrapper');
        if (status == 'lose') {
            fullScreenEnd();
            this.lostTheGame(endScreen, startImg);
        } else if (status == 'win') {
            fullScreenEnd();
            this.WonTheGame(endScreen, startImg);
        }
    }
    /**
     * Handles the lost game UI and sound effects.
     * @param {HTMLElement} endScreen The end screen element.
     * @param {HTMLElement} startImg The start image wrapper element.
     */
    lostTheGame(endScreen, startImg) {
        endScreen.classList.remove("start-container");
        endScreen.classList.add("end-container");
        startImg.style.boxShadow = 'none';
        this.setGameOverSound();
        this.showEndScreen(endScreen);
        this.endSound();
    }
    /**
     * Handles the won game UI and sound effects.
     * @param {HTMLElement} endScreen The end screen element.
     * @param {HTMLElement} startImg The start image wrapper element.
     */
    WonTheGame(endScreen, startImg) {
        endScreen.classList.remove("start-container");
        endScreen.classList.add("end-container-win");
        startImg.style.boxShadow = 'none';
        this.setGameOverSoundWin();
        this.showEndScreen(endScreen);
        this.endSound();
    }
    /**
     * Shows the end screen after a short delay.
     * @param {HTMLElement} endScreen The end screen element to display.
     */
    showEndScreen(endScreen) {
        setTimeout(() => {
            endScreen.classList.add("show");
        }, 100);
    }
    /** 
     * Turns off sounds after a delay to allow game over sounds to finish.
     */
    endSound() {
        setTimeout(() => {
            soundOff();
        }, 2700);
    }
}