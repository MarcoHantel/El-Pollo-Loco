class Chicken extends MovablePobject {

    y = 330;

    height = 100;
    width = 80;
    sound;
    enemiesDie = this.enemiesDie;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ] 

    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 5
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);

        this.x = 200 + Math.random() * 1400; // checiek startet bei 200px x dann erstelle ich eine Zahl zwischen 0 und 1 und diese Multipliziere ich mit 1400 damit die chickes immer wo anders starten
        this.speed = 0.15 + Math.random() * 2.5;
        this.animate();        
    }

    animate() {

        setInterval(() => {
            if (world.isPaused) { // prüft ob die Anwendung pausiert wurde (siehe world.class.js und game.js pausGame() und startGame() )
                return
            } else {
                this.moveLeft();
            }
        }, 1000 / 60)


        setInterval(() => {
            if (world.isPaused) {
                return
            } else {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 200);

        setInterval(() => {
            if (world.isPaused) {
                return
            } else if (this.enemiesDie) {
                this.playAnimation(this.IMAGES_DEATH)
            }
        }, 200);

    };
}

