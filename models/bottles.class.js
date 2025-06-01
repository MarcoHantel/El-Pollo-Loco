class Bottles extends MovablePobject {

    BOTTLE_IMAGE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    bottles = 0;

    offset = {
        top: 15,
        left: 25,
        right: 25,
        bottom: 15
    };

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.BOTTLE_IMAGE);
        this.x = Math.random() * 1400;
        this.y = 350;
        this.width = 100;
        this.height = 100;
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGE)
        }, 400);
    };

}