class CoinBar extends DrawableObject {

    IMAGE_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentage = 0; 

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.IMAGE_COINS)
        this.width = 180;
        this.height = 45;
        this.x = 30; // platzierung des Images
        this.y = 0;
        this.setPercentage(0); // startBild setzten
    };

    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGE_COINS[this.resolveCoinImageIndex()]; // path = array bild[0]
        this.img = this.imageCash[path]; // Bild laden
    }

    resolveCoinImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage > 4) {
            return 4;
        } else if (this.percentage > 3) {
            return 3;
        } else if (this.percentage > 2) {
            return 2;
        } else if (this.percentage > 1) {
            return 1;
        } else {

            return 0;
        }
    };

}
