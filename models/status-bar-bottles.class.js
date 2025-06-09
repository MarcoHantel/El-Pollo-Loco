/**
 * Represents the status bar that displays the number of collected bottles.
 * Inherits from DrawableObject.
 */
class BottleBar extends DrawableObject {

    /**
     * Array of image paths corresponding to different bottle fill levels.
     * Index 0 to 5 represent 0% to 100% in 20% increments.
     * @type {string[]}
     */
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /**
     * Current fill percentage, used to determine which image to show.
     * Treated as an integer value from 0 to 5.
     * @type {number}
     */
    percentage = 0;

    /**
     * Initializes the BottleBar by loading images and setting dimensions/position.
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.width = 180;
        this.height = 45;
        this.x = 30;
        this.y = 70;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage (0–5) and updates the bottle bar image accordingly.
     * @param {number} percentage - Value between 0 (empty) and 5 (full)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        const path = this.IMAGES_BOTTLES[this.resolveBottleImageIndex()];
        this.img = this.imageCash[path];
    }

    /**
     * Resolves which image index to use based on the current percentage.
     * @returns {number} Index in the IMAGES_BOTTLES array
     */
    resolveBottleImageIndex() {
        if (this.percentage >= 5) return 5;
        if (this.percentage === 4) return 4;
        if (this.percentage === 3) return 3;
        if (this.percentage === 2) return 2;
        if (this.percentage === 1) return 1;
        return 0;
    }
}