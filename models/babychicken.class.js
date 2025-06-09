/**
 * Class representing a baby chicken (small enemy) that moves randomly within a range.
 * Inherits from {@link MovablePobject}.
 */
class BabyChicken extends MovablePobject {

    /** Y-position of the baby chicken in the game. */
    y = 350;

    /** Movement direction of the baby chicken (e.g., 'left' or 'right'). */
    direction = 'left';

    /** Height of the baby chicken. */
    height = 80;

    /** Width of the baby chicken. */
    width = 65;

    /** Minimum X-position where the direction can change. */
    xMin = 200 + Math.random() * 800;

    /** Maximum X-position where the direction can change. */
    xMax = 800 + Math.random() * 1000;

    /**
     * Images for the baby chicken walking animation.
     * @type {string[]}
     */
    IMAGE_BABYCHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Image for the baby chicken's death state.
     * @type {string[]}
     */
    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a new baby chicken, sets its start position and speed randomly,
     * loads all images, and starts animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGE_BABYCHICKEN);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 300 + Math.random() * 1400;
        this.speed = 0.35 + Math.random() * 2.5;
        this.animate();
    }

    /**
     * Runs the walking and death animations, and randomly changes direction
     * within a defined horizontal range.
     */
    animate() {
        setInterval(() => {
            if (world.isPaused) {
                return;
            } else {
                this.playAnimation(this.IMAGE_BABYCHICKEN);
            }
        }, 200);

        setInterval(() => {
            if (world.isPaused) {
                return;
            } else if (this.enemiesDie) {
                this.playAnimation(this.IMAGES_DEATH);
            }
        }, 200);

        let xMin = this.xMin;
        let xMax = this.xMax;
        this.randomChangeDirection(xMin, xMax);
    }
}