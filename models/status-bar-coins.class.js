/**
 * Represents the status bar that shows how many coins the player has collected.
 * Inherits from DrawableObject.
 */
class CoinBar extends DrawableObject {

    /**
     * Image paths corresponding to different coin collection levels (0% to 100%).
     * @type {string[]}
     */
    IMAGE_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Current coin bar level (0 to 5).
     * @type {number}
     */
    percentage = 0;

    /**
     * Constructs the CoinBar and initializes dimensions, position, and image.
     */
    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGE_COINS);
        this.width = 180;
        this.height = 45;
        this.x = 30;
        this.y = 0;
        this.setPercentage(0);
    }

    /**
     * Sets the coin bar to the appropriate image based on collected coin count.
     * @param {number} percentage - Value from 0 (empty) to 5 (full).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        const path = this.IMAGE_COINS[this.resolveCoinImageIndex()];
        this.img = this.imageCash[path];
    }

    /**
     * Determines the index of the image to use based on the percentage.
     * @returns {number} Index of the image for the current coin level.
     */
    resolveCoinImageIndex() {
        if (this.percentage >= 5) return 5;
        if (this.percentage === 4) return 4;
        if (this.percentage === 3) return 3;
        if (this.percentage === 2) return 2;
        if (this.percentage === 1) return 1;
        return 0;
    }
}
