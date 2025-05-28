class EndbossBar extends DrawableObject {

    ENBOSS_BAR_IMAG = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percentage = 100;

    constructor() {
        super().loadImage('img/7_statusbars/2_statusbar_endboss/green/green100.png');
        this.loadImages(this.ENBOSS_BAR_IMAG)
        this.width = 180;
        this.height = 45;
        this.x = 510; // platzierung des Images
        this.y = 0;
        this.setPercentage(100)
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.ENBOSS_BAR_IMAG[this.resolveImageIndex()]; // path = array bild[0]
        this.img = this.imageCash[path]; // Bild aus dem iageCash laden laden
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