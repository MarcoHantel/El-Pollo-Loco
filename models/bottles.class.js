/**
 * Represents a bottle that can be collected in the game.
 * Inherits from {@link MovablePobject}.
 */
class Bottles extends MovablePobject {

    /** Array of image paths for the bottle animation. */
    BOTTLE_IMAGE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /** Number of collected bottles (default is 0). */
    bottles = 0;

    /**
     * Defines the collision offsets of the bottle.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 15,
        left: 25,
        right: 25,
        bottom: 15
    };

    /**
     * Creates a new bottle at a random X position.
     * Initializes size, position, and animation.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.BOTTLE_IMAGE);
        this.x = Math.random() * 1400;
        this.y = 350;
        this.width = 100;
        this.height = 100;
        this.animate();
    }

    /**
     * Starts the bottle animation by cyclically switching images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGE);
        }, 400);
    }
}