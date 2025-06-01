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

    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGE_COINS[this.resolveImageIndex()]; // path = array bild[0]
        this.img = this.imageCash[path]; // Bild laden
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    };
} 