/**
 * Represents a throwable bottle object with animation and physics.
 * Inherits from MovablePobject.
 */
class ThrowableObjects extends MovablePobject {

    /** Bottle rotation images. */
    IMAGE_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /** Bottle splash images. */
    IMAGE_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * @param {number} x - Initial X coordinate
     * @param {number} y - Initial Y coordinate
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGE_THROW_BOTTLE[0]);
        this.loadImages(this.IMAGE_THROW_BOTTLE);
        this.loadImages(this.IMAGE_SPLASH_BOTTLE);
        this.width = 100;
        this.height = 100;
        this.x = x;
        this.y = y;

        this.isBreaking = true;
        this.isBroken = false;

        this.offset = { top: 0, left: 0, right: 0, bottom: 0 };

        this.throwBottle();
    }

    /** Initiates the bottle's throw motion, gravity, and animation. */
    throwBottle() {
        this.speedY = 30;
        this.applyGravity();
        this.initHorizontalMovement();
        this.startThrowAnimation();
    }

    /** Moves the bottle horizontally in the direction the character is facing. */
    initHorizontalMovement() {
        const speedX = world.character.otherDirection ? -20 : 20;
        this.throwInterval = setInterval(() => {
            this.x += speedX;
        }, 30);
    }

    /** Starts the rotation animation and triggers breaking when bottle hits ground. */
    startThrowAnimation() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGE_THROW_BOTTLE);

            // Check for collision with the ground
            if (this.y >= 330 && !this.isBroken) {
                this.break();
            }
        }, 40);
    }

    /** Handles the bottle breaking on impact and splash animation. */
    break() {
        this.isBreaking = false;
        this.isBroken = true;

        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);

        this.playAnimation(this.IMAGE_SPLASH_BOTTLE);

        // Remove bottle from game world after splash
        setTimeout(() => {
            world.throwableObjects = world.throwableObjects.filter(obj => obj !== this);
        }, 500);
    }
}