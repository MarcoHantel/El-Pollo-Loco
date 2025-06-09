/**
 * Represents a cloud background object that slowly moves to the left.
 * Inherits from {@link MovablePobject}.
 */
class Cloud extends MovablePobject {

    /** Y position of the cloud */
    y = 20;

    /** Width of the cloud */
    width = 500;

    /** Height of the cloud */
    height = 300;

    /**
     * Array of image paths for cloud variations.
     * @type {string[]}
     */
    IMAGE_CLOUDES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    /**
     * Creates a new cloud at a random X and Y position and starts moving it left.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 1000;
        this.y = Math.random() * 10;

        this.animate();
    }

    /**
     * Continuously moves the cloud to the left at ~60 FPS.
     */
    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}