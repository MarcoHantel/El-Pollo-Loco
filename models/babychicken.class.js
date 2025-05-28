class BabyChicken extends MovablePobject {

    y = 350;
    direction = 'left';
    height = 80;
    width = 65;
    xMin = 200 + Math.random() * 800
    xMax = 800 + Math.random() * 1000
    // xMax = xMin + 100 + Math.random() * 300; // Mindestens 100px größer, maximal 400px größer


    IMAGE_BABYCHICKEN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGE_BABYCHICKEN);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 300 + Math.random() * 1400; // cheicken startet bei 200px x dann erstelle ich eine Zahl zwischen 0 und 1 und diese Multipliziere ich mit 1400 damit die chickes immer wo anders starten
        this.speed = 0.35 + Math.random() * 2.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (world.isPaused) {
                return
            } else {
                this.playAnimation(this.IMAGE_BABYCHICKEN)
            }
        }, 200);

        setInterval(() => {
            if (world.isPaused) {
                return
            } else if (this.enemiesDie) {
                this.playAnimation(this.IMAGES_DEATH)
            }
        }, 200);

        let xMin = this.xMin;
        let xMax = this.xMax;
        // let xMax = this.xMin + 100 + Math.random() * 300;
        this.randomChangeDirection(xMin, xMax); // lässt die chickens random von links nach rechts laufen

    };
}