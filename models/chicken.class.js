/**
 * Represents a normal chicken enemy that moves left and animates walking and death states.
 * Inherits from {@link MovablePobject}.
 */
class Chicken extends MovablePobject {

    /** Y position of the chicken on the canvas */
    y = 330;

    /** Height of the chicken */
    height = 100;

    /** Width of the chicken */
    width = 80;

    /** Sound object for chicken (currently unused) */
    sound;

    /** Flag indicating if the chicken is dead */
    enemiesDie = this.enemiesDie;

    /**
     * Images used for walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Images used for death animation.
     * @type {string[]}
     */
    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Collision offset for the chicken.
     */
    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 5
    };

    /**
     * Constructs a new chicken, loads images, sets initial position and speed, and starts animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 200 + Math.random() * 1400;
        this.speed = 0.15 + Math.random() * 2.5;
        this.animate();
    }

    /**
     * Starts movement and animation intervals.
     * Movement updates every frame (~60 FPS).
     * Walking and death animations update every 200ms.
     */
    animate() {
        setInterval(() => {
            this.animationChickenMoveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.animationChickenWalk();
        }, 200);

        setInterval(() => {
            this.animationChickenDeath();
        }, 200);
    }

    /**
     * Moves the chicken to the left if the game is not paused.
     */
    animationChickenMoveLeft() {
        if (world.isPaused) {
            return;
        } else {
            this.moveLeft();
        }
    }

    /**
     * Plays the walking animation if the game is not paused.
     */
    animationChickenWalk() {
        if (world.isPaused) {
            return;
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Plays the death animation if the game is not paused and the chicken is dead.
     */
    animationChickenDeath() {
        if (world.isPaused) {
            return;
        } else if (this.enemiesDie) {
            this.playAnimation(this.IMAGES_DEATH);
        }
    }
}