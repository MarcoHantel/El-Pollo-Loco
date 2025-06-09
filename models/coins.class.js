/**
 * Represents collectible coins in the game.
 * Inherits from {@link MovablePobject}.
 */
class Coins extends MovablePobject {

    /**
     * Array of image paths for coin animation frames.
     * @type {string[]}
     */
    IMAGE_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /** Number of coins collected (default 0). */
    coins = 0;

    /** Collision offset to fine-tune hitbox */
    offset = {
        top: 25,
        left: 25,
        right: 25,
        bottom: 25        
    };

    /**
     * Creates a new coin at a random position with specified size and starts its animation.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGE_COINS);
        this.x = Math.random() * 1400;
        this.y = Math.random() * 400;
        this.width = 80;
        this.height = 80;
        this.animate();
    }

    /**
     * Animates the coin by cycling through its images every 400ms.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGE_COINS);
        }, 400);
    }
}