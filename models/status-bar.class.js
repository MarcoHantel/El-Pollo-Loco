/**
 * Represents the health bar for the main character.
 * Inherits from DrawableObject.
 */
class StatusBar extends DrawableObject {

    /**
     * Image paths for health bar states from 0% to 100%.
     * @type {string[]}
     */
    IMAGES_STATUS_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Current health percentage of the character (0–100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructs the status bar with full health by default.
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.IMAGES_STATUS_HEALTH);
        this.width = 180;
        this.height = 45;
        this.x = 30;
        this.y = 35;
        this.setPercentage(100);
    }

    /**
     * Sets the current health and updates the bar image accordingly.
     * @param {number} percentage - Health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        const path = this.IMAGES_STATUS_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCash[path];
    }

    /**
     * Determines which image index to use based on the health percentage.
     * @returns {number} Index of the corresponding image.
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
