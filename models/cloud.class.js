class Cloud extends MovablePobject {
    y = 20;
    width = 500;
    height = 300;


    IMAGE_CLOUDES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ]

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 1000;
        this.y = Math.random() * 10;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    };

}