/**
 * Represents any object that can move within the game world.
 * Inherits from DrawableObject.
 */
class MovablePobject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    direction = 'left';
    speedY = 0;
    groundY = 165;
    acceleration = 2.3;
    energy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
    lastMove = new Date().getTime();
    animationPaused = false;

    /** Hitbox offset configuration */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Gets the Y coordinate representing the ground level for the object.
     * @returns {number} Ground Y position
     */
    getGroundY() {
        if (this instanceof ThrowableObjects) {
            return 330;
        } else {
            return 165;
        }
    }

    /**
     * Applies gravity to the object. Causes it to fall or land.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = this.getGroundY();
                this.speedY = 0;
            }
        }, 1000 / 50);
    }

    /**
     * Checks whether the object is above the ground.
     * @returns {boolean} True if object is above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return this.y < 330;
        } else {
            return this.y < 150;
        }
    }

    /**
     * Plays an animation by cycling through image paths.
     * @param {string[]} images - Array of image paths
     */
    playAnimation(images) {
        if (this.animationPaused) return;
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCash[path];
        this.currentImage++;
    }

    /** Moves the object to the right */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object to the left */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Makes the object jump by giving it upward speed */
    jump() {
        this.speedY = 30;
    }

    /**
     * Collects a coin and removes it from the level.
     * @param {Coins} coin - The coin object to collect
     */
    collectCoin(coin) {
        this.coins++;
        let index = level1.coins.indexOf(coin);
        if (index !== -1) {
            level1.coins.splice(index, 1);
        }
    }

    /**
     * Collects a bottle and removes it from the level.
     * @param {Bottles} bottle - The bottle object to collect
     */
    collectBottle(bottle) {
        this.bottles++;
        let index = level1.bottles.indexOf(bottle);
        if (index !== -1) {
            level1.bottles.splice(index, 1);
        }
    }

    /**
     * Kills an enemy (chicken) and removes it from the level after a delay.
     * @param {Chicken} chicken - The enemy object to be removed
     */
    enemyDie(chicken) {
        chicken.enemiesDie = true;
        chicken.speed = 0;
        setTimeout(() => {
            const index = level1.enemies.indexOf(chicken);
            if (index !== -1) {
                level1.enemies.splice(index, 1);
            }
        }, 500);
    }

    /**
     * Checks collision between this object and another movable object.
     * @param {MovablePobject} mo - Another object to check collision with
     * @returns {boolean} True if there is a collision
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces energy if the character is hit from the side.
     */
    hit() {
        if (!world.isFromTop) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Checks if the character is currently in the "hurt" state.
     * @returns {boolean} True if recently hit
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the character is dead (energy is zero).
     * @returns {boolean}
     */
    dead() {
        return this.energy == 0;
    }

    /**
     * Starts a counter to track how long the character has been idle.
     */
    startIdleCounter() {
        setInterval(() => {
            if (!this.world.isPaused) {
                this.idleCounter++;
            }
        }, 1000);
    }

    /**
     * Checks if the object is within a boss zone.
     * @param {number} bossZoneLeft - Left boundary
     * @param {number} bossZoneRight - Right boundary
     * @returns {boolean}
     */
    isInBossZone(bossZoneLeft, bossZoneRight) {
        return this.x >= bossZoneLeft && this.x <= bossZoneRight;
    }

    /**
     * Starts a loop where the enemy randomly changes walking direction.
     * @param {number} xMin - Left boundary
     * @param {number} xMax - Right boundary
     * @returns {NodeJS.Timeout} Interval ID
     */
    randomChangeDirection(xMin, xMax) {
        const moveInterval = setInterval(() => {
            if (world.isPaused) return;
            if (this.direction === 'left') {
                this.randomChickenMoveLeft(xMin);
            } else {
                this.randomChickenMoveRight(xMax);
            }
        }, 1000 / 60);
        return moveInterval;
    }

    /**
     * Moves left and flips direction if minimum boundary is reached.
     * @param {number} xMin - Left boundary
     */
    randomChickenMoveLeft(xMin) {
        if (this.x > xMin) {
            this.moveLeft();
        } else {
            this.direction = 'right';
            this.otherDirection = true;
        }
    }

    /**
     * Moves right and flips direction if maximum boundary is reached.
     * @param {number} xMax - Right boundary
     */
    randomChickenMoveRight(xMax) {
        if (this.x < xMax) {
            this.moveRight();
        } else {
            this.direction = 'left';
            this.otherDirection = false;
        }
    }

    /**
     * Starts the boss walk animation and movement logic.
     */
    startBossAnimationWalk() {
        if (!this.endbossPlayed) {
            this.endbossPlayed = true;
            if (world.soundPlaying) {
                this.sound.audioEndbossAlert.play();
            } else {
                this.sound.audioEndbossAlert.pause();
            }
            this.animationBossWalk();
            this.animationBossChangeDirection();
        }
    }

    /**
     * Starts the walking animation for the boss.
     */
    animationBossWalk() {
        this.bossWalkInterval = setInterval(() => {
            if (world.isPaused) return;
            this.playAnimation(this.IMAGES_WALK);
        }, 200);
    }

    /**
     * Controls boss movement direction within boundaries.
     */
    animationBossChangeDirection() {
        let xMax = this.xMax;
        let xMin = this.xMin;
        this.bossMoveInterval = this.randomChangeDirection(xMin, xMax);
    }
}