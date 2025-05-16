let level;

function setLevel(sound) {
    // Auf reihenfolge achten
    // alle arrayes werden an Level übergeben Level([new Chicken(sound)], [new Cloud, new Cloud], etc)

    level1 = new Level(
        [
            new Chicken(sound),
            // new Chicken(sound),

            // new BabyChicken(sound),
            // new BabyChicken(sound),
            new BabyChicken(sound),

            new Endboss(sound)
        ],

        [
            new Cloud(),
            new Cloud()
        ],



        [
            new BackgroundObject('img/5_background/layers/air.png', -719,),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0,),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719,),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        ],

        [
            // new Coins(),
            // new Coins(),
            // new Coins(),
            // new Coins(),
            new Coins()
        ],

        [
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles(),
            new Bottles()
        ],
    );
}
