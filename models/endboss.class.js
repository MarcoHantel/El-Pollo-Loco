class Endboss extends MovablePobject {

    y = 80;
    x = 1500;
    height = 380;
    width = 230;
    speed = 5;
    sound;
    endbossPlayed = false;
    alertActive = false;
    pepeX;
    bossKilled = false;
    xMin = 900;
    xMax = 1600;
    bossZoneLeft = 1550;
    bossZoneRight = 700;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: 150,
        left: 10,
        right: 10,
        bottom: 5
    };

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.sound = sound;
        this.animate();
    }

    // Lauf-Animation kontinuierlich läuft
    animate() {
        setInterval(() => {
            if (world.isPaused) {
                return
            } else {
                this.checkEnbossAlerting()
            }
        }, 200);

        setInterval(() => {
            if (this.dead() && !this.bossKilled) {
                this.bossKilled = true;
                this.playDeathAnimation(); // statt playAnimation()
                const deadAnimationDuration = this.IMAGES_DEAD.length * 200; // Zeit anpassen für Animation 
                this.stopBossAnimation(deadAnimationDuration);
                this.stopTheGame(deadAnimationDuration);
            } else if (this.isHurt()) {
                this.animationEndbossGetHurt();
            }
        }, 64);
    }

    checkEnbossAlerting() {
        if (this.checkEnterEndbosszone900()) {
            this.alertActive = true; // Verhindert mehrfaches Starten
            let animationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_ALERT); // boss ALERT
            }, 200);
            let checkInterval = setInterval(() => {
                if (this.checkEnterEndbosszone1200()) { // Wenn Pepe unter 1200 oder Boss beworfen wird dann Angriff
                    this.clearIntervalForBoss(animationInterval, checkInterval)
                    this.startBossAnimationWalk(); // Startet die nächste Animation
                }
            }, 200); // Prüft alle 200ms, ob Charakter >1200px ist
        }
    }

    animationEndbossGetHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (world.soundPlaying) {
            this.sound.audioEndbossHurt.play();
        } else {
            this.sound.audioEndbossHurt.pause();
        }
    }

    checkEnterEndbosszone900() {
        return world.character.x > 900 && !this.alertActive
    }

    checkEnterEndbosszone1200() {
        return world.character.x > 1200 || this.isHurt()
    }

    clearIntervalForBoss(animationInterval, checkInterval) {
        clearInterval(animationInterval); // Stoppt die ALERT-Animation
        clearInterval(checkInterval); // Beendet die Überprüfung
    }

    stopBossAnimation(deadAnimationDuration) {
        setTimeout(() => {
            clearInterval(this.bossWalkInterval);
            clearInterval(this.bossMoveInterval);
        }, deadAnimationDuration);
    }

    stopTheGame(deadAnimationDuration) {
        setTimeout(() => {
            pauseGame();
            world.gameOverScreen('win');
        }, deadAnimationDuration + 5000);
    }

    playDeathAnimation() {
        let i = 0;
        this.deathAnimationInterval = setInterval(() => {
            if (this.animationPaused) {
                clearInterval(this.deathAnimationInterval);
                return;
            }
            if (i < this.IMAGES_DEAD.length) {
                namiationEnbossDead(i);
            } else {
                clearInterval(this.deathAnimationInterval);
                this.animationPaused = true; // Danach Animation anhalten
            }
        }, 300); // Animationstempo kann ich hier anpassen (langsamer = höhere Zahl)
    }

    namiationEnbossDead(i) {
        let path = this.IMAGES_DEAD[i];
        this.img = this.imageCash[path];
        i++;
    }
};


