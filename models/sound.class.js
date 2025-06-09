/**
 * The Sound class manages all game-related audio effects and music.
 */
class Sound {
    /** @type {HTMLAudioElement} Coin collection sound */
    audioGetCoin = new Audio('audio/getCoin.mp3');

    /** @type {HTMLAudioElement} Bottle collection sound */
    audioGetBottle = new Audio('audio/getBottle.mp3');

    /** @type {HTMLAudioElement} Jump sound for the main character */
    audioPepeJump = new Audio('audio/jumpPepe.mp3');

    /** @type {HTMLAudioElement} Sleep/idle sound for the main character */
    audioPepeSleep = new Audio('audio/sleepPepe.mp3');

    /** @type {HTMLAudioElement} Hurt sound for the main character */
    audioPepeHurt = new Audio('audio/hurtPepe.mp3');

    /** @type {HTMLAudioElement} Background music */
    audioBackround = new Audio('audio/mexico_background.mp3');

    /** @type {HTMLAudioElement} Sound alerting the start of the end boss fight */
    audioEndbossAlert = new Audio('audio/endbossAlert.mp3');

    /** @type {HTMLAudioElement} Sound when the end boss is hurt */
    audioEndbossHurt = new Audio('audio/jumpOnEndboss.mp3');

    /** @type {HTMLAudioElement} Sound made by chickens */
    audioChicken = new Audio('audio/chicken.mp3');

    /** @type {HTMLAudioElement} Sound when a chicken dies */
    audioChickenDeath = new Audio('audio/chicken_death.mp3');

    /** @type {HTMLAudioElement} Sound played when the game is lost */
    audioGameOver = new Audio('audio/gameOver.mp3');

    /** @type {HTMLAudioElement} Sound played when the game is won */
    audioGameOverWin = new Audio('audio/gameOverWin.mp3');

    /**
     * Initializes the sound system and sets a default volume for all sounds.
     */
    constructor() {
        this.setAllVolumes(0.04);
    }

    /**
     * Sets the volume for all audio elements in the class.
     * @param {number} volume - A value between 0.0 (mute) and 1.0 (full volume)
     */
    setAllVolumes(volume) {
        for (let key in this) {
            if (this[key] instanceof Audio) {
                this[key].volume = volume;
            }
        }
    }
}