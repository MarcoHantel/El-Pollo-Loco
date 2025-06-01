class ThrowableObjects extends MovablePobject {

    IMAGE_THROW_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGE_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_THROW_BOTTLE);
        this.loadImages(this.IMAGE_SPLASH_BOTTLE);
        this.width = 100;
        this.height = 100;
        this.x = x;
        this.y = y;
        this.isBreaking = true;   // wurde geworfen
        this.isBroken = false;    // noch nicht getroffen/gelandet
        this.offset = { top: 0, left: 0, right: 0, bottom: 0 };
        this.throweBottle();
    }

    throweBottle() {
        this.speedY = 30;
        this.applyGravity();        
        this.throwBottleInterval()
        this.animationThroweBottle()
    }

    throwBottleInterval(){
        const speedX = world.character.otherDirection ? -20 : 20; // Richtung abhängig von Blickrichtung (schaut Pepe nach links, alles spiegeln world.character.otherDirection)
        this.throwInterval = setInterval(() => {
            this.x += speedX;
        }, 30);
    }

    animationThroweBottle(){
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGE_THROW_BOTTLE);
            // Wenn Flasche Boden berührt, zerbrechen
            if (this.y >= 330 && !this.isBroken) {
                this.break();
            }
        }, 40);
    }

    break() {
        this.isBreaking = false;
        this.isBroken = true;
        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);
        this.playAnimation(this.IMAGE_SPLASH_BOTTLE);
        setTimeout(() => { // splash nach 500ms entfernen
            world.throwableObjects = world.throwableObjects.filter(obj => obj !== this);
        }, 500);
    }
}