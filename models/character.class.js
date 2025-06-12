/**
 * Represents the playable character in the game (Pepe).
 * Inherits from {@link MovablePobject}.
 */
class Character extends MovablePobject {

    /** Starting X coordinate. */
    x = 120;

    /** Starting Y coordinate. */
    y = 20;

    /** Movement speed of the character. */
    speed = 6;

    /** Height of the character. */
    height = 280;

    /** Width of the character. */
    width = 130;

    /** Sound object containing audio for actions. */
    sound;

    /** Reference to the world where the character moves. */
    world;

    /** Counter for inactivity used to control the idle animation. */
    idleCounter = 0;

    /** Images for walking animation. */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** Images for jumping animation. */
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

    /** Images for hurt animation. */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /** Images for dead animation. */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /** Images for idle animation. */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /** Images for long idle/sleep animation. */
    IMAGES_SLEEP_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png'
    ];

    /** Collision offsets. */
    offset = {
        top: 100,
        left: 25,
        right: 25,
        bottom: 5        
    };
/**
     * Creates a new Character instance and initializes animation and gravity.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SLEEP_LONG);
        this.loadImages(this.IMAGES_IDLE);
        this.sound = sound;
        this.applyGravity();
        this.animate();
        this.startIdleCounter();        
    }

    /**
     * Starts the game loops for character movement and animation.
     */
    animate() {
        setInterval(() => this.checkMovePepe(), 1000 / 60);
        setInterval(() => this.checkAnimationPepe(), 1000 / 10);
    }

    /**
     * Handles movement logic based on keyboard input.
     */
    checkMovePepe() {
        let moved = false;
        if (this.world.isPaused) return;

        if (this.canMoveRight())
            this.pepeMoveRight();
        if (this.canMoveLeft()) 
            this.pepeMoveLeft();
        if (this.canJump())
            this.jump();

        moved = true;
        if (moved) this.lastMove = new Date().getTime();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} True if the right key is pressed and within level bounds.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x * 2;
    }

    /**
     * Moves the character to the right and updates state.
     */
    pepeMoveRight() {
        this.otherDirection = false;
        this.moveRight();
        this.moved = true;
        this.idleCounter = 0; 
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} True if the left key is pressed and not at the far left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left and updates state.
     */
    pepeMoveLeft() {
        this.otherDirection = true;
        this.moveLeft();
        this.moved = true;
        this.idleCounter = 0; 
    }

    /**
     * Checks if the character is allowed to jump.
     * @returns {boolean} True if space is pressed and character is on the ground.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Handles the logic to choose the correct animation state.
     */
    checkAnimationPepe() {
        if (this.world.isPaused) return;

        if (this.dead()) {
            this.animationPepeDead();
            this.animationGameOver();
        } else if (this.isHurt()) {
            this.animationPepeHurt();
        } else if (this.idleCounter > 14) { 
            this.animationPepeSleep();
        } else if (this.idleCounter > 0.1) {
            this.animationPepeIsIdle();
        } else if (this.isAboveGround()) {
            this.animationPepeJump();
        } else if (this.isPepeMoving()) {
            this.animationPepeMove();
        }
    }

    /**
     * Plays the death animation and pauses the game after a short delay.
     */
    animationPepeDead() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            pauseGame();
        }, 1000); 
    }

    /**
     * Plays the idle animation.
     */
    animationPepeIsIdle() {
        this.playAnimation(this.IMAGES_IDLE); 
        this.sound.audioPepeSleep.pause();
    }

    /**
     * Plays the long idle (sleep) animation.
     */
    animationPepeSleep() {
        this.playAnimation(this.IMAGES_SLEEP_LONG);
        if (this.world.soundPlaying) {
            this.sound.audioPepeSleep.play();
        } else {
            this.sound.audioPepeSleep.pause();
        }
    }

    /**
     * Triggers the game over screen after the death animation finishes.
     */
    animationGameOver() {
        setTimeout(() => {
            this.world.gameOverScreen('lose');
        }, 2000);
    }

    /**
     * Plays the hurt animation and associated sound.
     */
    animationPepeHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (this.world.soundPlaying) {
            this.sound.audioPepeHurt.play();
        } else {
            this.sound.audioPepeHurt.pause();
        }
    }

    /**
     * Plays the jump animation and sound effect.
     */
    animationPepeJump() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.sound.audioPepeSleep.pause();
        if (this.world.soundPlaying) {
            this.sound.audioPepeJump.play();
        } else {
            this.sound.audioPepeJump.pause();
        }
    }

    /**
     * Checks if any horizontal movement key is currently pressed.
     * @returns {boolean} True if LEFT or RIGHT is pressed.
     */
    isPepeMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Plays the walking animation and stops the sleep sound.
     */
    animationPepeMove() {
        this.playAnimation(this.IMAGES_WALKING);
        this.sound.audioPepeSleep.pause(); 
        this.sound.audioPepeSleep.currentTime = 0; 
    }
}