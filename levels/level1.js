/**
 * Global level object that holds the current game level.
 * @type {Level}
 */
let level;

/**
 * Initializes the first level of the game, including enemies, background, objects, and items.
 * 
 * @param {Sound} sound - The sound object passed to enemies to enable sound effects.
 */
function setLevel(sound) {
    level1 = new Level(
        /** @type {Enemy[]} */ [
            new Chicken(sound),
            new Chicken(sound),
            new BabyChicken(sound),
            new BabyChicken(sound),
            new BabyChicken(sound),
            new Endboss(sound)
        ],

        /** @type {Cloud[]} */ [
            new Cloud(),
            new Cloud()
        ],

        /** @type {BackgroundObject[]} */ [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        ],

        /** @type {Coins[]} */ [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],

        /** @type {Bottles[]} */ [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles()
        ]
    );
}