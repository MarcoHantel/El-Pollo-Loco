/**
 * Represents the Endboss enemy character in the game.
 * The Endboss has different animation states (alert, walk, hurt, dead),
 * reacts when the character enters certain zones, and controls the game end.
 */
class Endboss extends MovablePobject {

    /** Y position of the Endboss */
    y = 80;

    /** X position where Endboss starts */
    x = 1500;

    /** Dimensions of the Endboss */
    height = 380;
    width = 230;

    /** Movement speed of the Endboss */
    speed = 5;

    /** Reference to sound effects */
    sound;

    /** Flag to track if the Endboss has started playing */
    endbossPlayed = false;

    /** Flag to track if alert animation is currently active */
    alertActive = false;

    /** Current X position of the character */
    pepeX;

    /** Flag to check if the Endboss has been killed */
    bossKilled = false;

    /** Minimum and maximum x-coordinates for Endboss zone */
    xMin = 900;
    xMax = 1600;

    /** Activation zone boundaries for triggering Endboss alert */
    bossZoneLeft = 1550;
    bossZoneRight = 700;

    /** Image arrays for Endboss animation states */
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

    /** Collision box offset */
    offset = {
        top: 150,
        left: 10,
        right: 10,
        bottom: 5
    };

    /**
     * Creates an instance of Endboss and preloads images.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.sound = sound;
        this.animate();
    }

    /**
     * Starts main animation intervals for the Endboss.
     * Handles alert detection, damage, and death transitions.
     */
    animate() {
        setInterval(() => {
            if (world.isPaused) return;
            this.checkEnbossAlerting();
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

    /**
     * Checks if the character enters the alert zone and starts alert animation.
     */
    checkEnbossAlerting() {
        if (this.checkEnterEndbosszone900()) {
            this.alertActive = true;

            let animationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_ALERT);
            }, 200);

            let checkInterval = setInterval(() => {
                if (this.checkEnterEndbosszone1200()) {
                    this.clearIntervalForBoss(animationInterval, checkInterval);
                    this.startBossAnimationWalk(); // <-- This method needs to be defined somewhere
                }
            }, 200);
        }
    }

    /**
     * Plays the hurt animation and sound if available.
     */
    animationEndbossGetHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (world.soundPlaying) {
            this.sound.audioEndbossHurt.play();
        } else {
            this.sound.audioEndbossHurt.pause();
        }
    }

    /**
     * Checks if the character enters the 900px zone to start alerting.
     * @returns {boolean}
     */
    checkEnterEndbosszone900() {
        return world.character.x > 900 && !this.alertActive;
    }

    /**
     * Checks if the character has entered the 1200px zone or Endboss is hurt.
     * @returns {boolean}
     */
    checkEnterEndbosszone1200() {
        return world.character.x > 1200 || this.isHurt();
    }

    /**
     * Clears both the alert animation and zone check intervals.
     * @param {number} animationInterval - ID of the alert animation interval.
     * @param {number} checkInterval - ID of the zone check interval.
     */
    clearIntervalForBoss(animationInterval, checkInterval) {
        clearInterval(animationInterval);
        clearInterval(checkInterval);
    }

    /**
     * Stops all Endboss movement and animation after death.
     * @param {number} deadAnimationDuration - Time to wait before stopping intervals.
     */
    stopBossAnimation(deadAnimationDuration) {
        setTimeout(() => {
            clearInterval(this.bossWalkInterval);  // These should be defined when walk starts
            clearInterval(this.bossMoveInterval);
        }, deadAnimationDuration);
    }

    /**
     * Pauses the game and displays the "win" screen after a delay.
     * @param {number} deadAnimationDuration - Time to wait before showing win screen.
     */
    stopTheGame(deadAnimationDuration) {
        setTimeout(() => {
            pauseGame();
            world.gameOverScreen('win');
        }, deadAnimationDuration + 5000);
    }

    /**
     * Plays the death animation frame by frame, then pauses all animations.
     */
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
}
