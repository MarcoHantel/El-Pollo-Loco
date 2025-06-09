/**
 * Represents the status bar for the Endboss's health.
 * Inherits from DrawableObject.
 */
class EndbossBar extends DrawableObject {

    /**
     * Image paths for different health levels (0% to 100%) of the Endboss.
     * @type {string[]}
     */
    ENDBOSS_BAR_IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    /**
     * Current health percentage of the Endboss (0–100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructs the EndbossBar with default full health.
     */
    constructor() {
        super().loadImage('img/7_statusbars/2_statusbar_endboss/green/green100.png');
        this.loadImages(this.ENDBOSS_BAR_IMAGES);
        this.width = 180;
        this.height = 45;
        this.x = 510;
        this.y = 0;
        this.setPercentage(100);
    }

    /**
     * Updates the health bar based on the given percentage.
     * @param {number} percentage - Health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        const path = this.ENDBOSS_BAR_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCash[path];
    }

    /**
     * Determines which image index to use based on the percentage.
     * @returns {number} Index of the image to display.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }
}
