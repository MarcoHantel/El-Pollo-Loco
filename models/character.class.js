class Character extends MovablePobject {

    x = 120;
    y = 90;
    speed = 6;
    height = 280;
    width = 130;
    sound;
    world; //brauch ich die?


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_SLEEP_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',

    ];

    offset = {
        top: 50,
        left: 20,
        right: 20,
        bottom: 5
    };

    constructor() {

        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEP_LONG);
        this.sound = sound;
        this.applyGravity();
        this.animate();
    }


    animate() {
        // Pepe is moving
        setInterval(() => {
            let moved = false;

            if (this.world.isPaused) { // prüft ob die Anwendung pausiert wurde (siehe world.class.js und game.js pausGame() und startGame() )
                return
            } else {

                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 2) {
                    this.otherDirection = false;
                    this.moveRight();
                    //this.alertBoss(this.x); // checken ob Pepe beim Endboss ist. 
                    moved = true;
                }

                if (this.world.keyboard.LEFT && this.x > 0) { // wen x größer ist als 0 läuft Pepe aus dem Bildschirm 
                    this.otherDirection = true;
                    this.moveLeft();
                    moved = true;
                }

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                    moved = true;
                }

                if (moved) {
                    this.lastMove = new Date().getTime();
                }

                this.world.camera_x = -this.x + 100; // verschieben der Map/Background +100 verschiebe ich das noch, damit Pepe nicht am Rand steht
            }
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.isPaused) { // prüft ob die Anwendung pausiert wurde (siehe world.class.js und game.js pausGame() und startGame() )
                return
            } else {

                this.checkSleep(); //check ob Pepe schläft

                if (this.dead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                    setTimeout(() => {
                        pauseGame();   
                    }, 1000); // Nach 1 Sekunde pausieren
                
                    setTimeout(() => {
                        this.world.gameOverScreen('lose');
                    }, 2000); // Nach 2 Sekunden Game Over anzeigen


                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    if (this.world.soundPlaying) {
                        this.sound.audioPepeHurt.play();
                    } else {
                        this.sound.audioPepeHurt.pause()
                    }
                } else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                    this.sound.audioPepeSleep.pause();
                    if (this.world.soundPlaying) {
                        this.sound.audioPepeJump.play();
                    } else {
                        this.sound.audioPepeJump.pause();
                    }
                } else if (this.sleeping) {
                    this.playAnimation(this.IMAGES_SLEEP_LONG);
                    this.checkSleep();
                    if (this.world.soundPlaying) {
                        this.sound.audioPepeSleep.play(); // Schlafanimation
                    } else {
                        this.sound.audioPepeSleep.pause();
                    }
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.sound.audioPepeSleep.pause(); // hier wird der Sound angehalten
                    this.sound.audioPepeSleep.currentTime = 0; // Wieder zurücksetzen
                }
            }
        }, 100);
    };
}