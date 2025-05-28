class BottleBar extends DrawableObject {

    IMAGES_BOTTLES = [

        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    percentage = 0;

    constructor(){
        super().loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.width = 180;
        this.height = 45;
        this.x = 30;
        this.y = 70;
        this.setPercentage(0); // startBild setzten
    }
    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGES_BOTTLES[this.resolveBottleImageIndex()]; // path = array bild[0]
        this.img = this.imageCash[path]; // Bild laden
    }

    resolveBottleImageIndex() {
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

