class Coins extends MovablePobject {

    IMAGE_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    coins = 0;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGE_COINS);
        this.x = Math.random() * 1400;
        this.y = Math.random() * 400;
        this.width = 80;
        this.height = 80;
        this.animate();
    }

        offset = {
        top: 25,
        left: 25,
        right: 25,
        bottom: 25        
    };

    animate() {

         setInterval(() => {
            this.playAnimation(this.IMAGE_COINS)
        }, 400);

    };
} 