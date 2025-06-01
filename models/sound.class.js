class Sound {
    audioGetCoin = new Audio('audio/getCoin.mp3');
    audioGetBottle = new Audio('audio/getBottle.mp3');
    audioPepeJump = new Audio('audio/jumpPepe.mp3');
    audioPepeSleep = new Audio('audio/sleepPepe.mp3');
    audioPepeHurt = new Audio('audio/hurtPepe.mp3');
    audioBackround = new Audio('audio/mexico_background.mp3');
    audioEndbossAlert = new Audio('audio/endbossAlert.mp3');
    audioEndbossHurt = new Audio('audio/jumpOnEndboss.mp3');
    audioChicken = new Audio('audio/chicken.mp3');
    audioChickenDeath = new Audio('audio/chicken_death.mp3');
    audioGameOver = new Audio('audio/gameOver.mp3')
    audioGameOverWin = new Audio('audio/gameOverWin.mp3')

    constructor() {
        this.setAllVolumes(0.04); // zentrale Lautstärke hier einstellen
    }

    setAllVolumes(volume) {
        for (let key in this) {
            if (this[key] instanceof Audio) {
                this[key].volume = volume;
            }
        }
    }

}