/**
 * Represents a game level with all its elements.
 */
class Level {

    /** @type {MovablePobject[]} List of all enemy objects in the level */
    enemies;

    /** @type {Cloud[]} List of cloud objects for background animation */
    clouds;

    /** @type {BackgroundObject[]} Static background objects like scenery */
    backgroundObjects;

    /** @type {Coins[]} List of coin objects to be collected */
    coins;

    /** @type {Bottles[]} List of throwable bottle objects */
    bottles;

    /** @type {number} Defines the end point of the level (x-coordinate) */
    level_end_x = 700;

    /**
     * Creates a new level instance.
     * 
     * @param {MovablePobject[]} enemies - All enemies present in the level.
     * @param {Cloud[]} clouds - Cloud elements for visual atmosphere.
     * @param {BackgroundObject[]} backgroundObjects - Static background visuals.
     * @param {Coins[]} coins - Collectible coins in the level.
     * @param {Bottles[]} bottles - Throwable or collectible bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
};
