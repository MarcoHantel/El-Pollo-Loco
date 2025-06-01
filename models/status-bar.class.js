class StatusBar extends DrawableObject {

    IMAGES_STATUS_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', // image 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png' // image 5
    ];

    percentage = 100;

    constructor() {
        super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'); // initialisierung der Übergeordneten Objekte bz Methoden in diesem Fall von DrawableOjects 
        this.loadImages(this.IMAGES_STATUS_HEALTH)
        this.width = 180;
        this.height = 45;
        this.x = 30; // platzierung des Images
        this.y = 35;
        this.setPercentage(100); // startBild setzten
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGES_STATUS_HEALTH[this.resolveImageIndex()]; // path = array bild[0]
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

};
