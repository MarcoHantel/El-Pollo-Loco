let canvas;
let world;
let keyboard = new Keyboard();
let sound = new Sound();
let soundPlaying = true;
let playGame = true


// HIER STIMMT WAS NICHT, WIN screen wird auch dann angezeigt, wenn ich verlohren hab und
// wenn ich verlohren habe, muss ich noch den start-img-wrapper wegbekommen.
function upadteScreen() {
    document.getElementById('start-overlay').classList.remove("start-container");
    document.getElementById('imgCanvas').classList.remove("none");//NEW
    document.getElementById('start-overlay').classList.add("none");
    document.getElementById('canvas').classList.remove("none");

    document.getElementById('start-overlay').classList.remove("end-container");
    document.getElementById('start-overlay').classList.remove("end-container-win");
    // document.getElementById('start-img-wrapper').classList.add("none"); //NEW


    init();
    startGame(); // Game wird bei sterben pausiert und muss dann wieder auf start gesetzt werden
}

function fullScreen() {
    canvas.requestFullscreen();
}

function fullScreenEnd() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function soundOn() {
    soundPlaying = world.soundPlaying = true;
    world.checkSound(soundPlaying); // lässt World entscheiden, was gemacht wird
}

function soundOff() {
    soundPlaying = world.soundPlaying = false;
    world.checkSound(soundPlaying); // Sound aus
}

function startGame() {
    world.isPaused = false;
    world.draw()
}
function pauseGame() {
    world.isPaused = true;
    world.draw()
}


function init() {

    sound = new Sound();
    canvas = document.getElementById('canvas');
    setLevel(sound);
    world = new World(canvas, keyboard, sound);
    MobileKeyboardPress();
}

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }

    if (e.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }

    if (e.key == "ArrowUp") {
        keyboard.UP = true;
    }

    if (e.key == "ArrowDown") {
        keyboard.DOWN = true;
    }

    if (e.key == " ") {
        keyboard.SPACE = true;
    }

    if (e.key == "d") {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }

    if (e.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }

    if (e.key == "ArrowUp") {
        keyboard.UP = false;
    }

    if (e.key == "ArrowDown") {
        keyboard.DOWN = false;
    }

    if (e.key == " ") {
        keyboard.SPACE = false;
    }

    if (e.key == "d") {
        keyboard.D = false;
    }
});


function MobileKeyboardPress() {
    document.getElementById('jumpUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jumpUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('turnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('turnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('turnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('turnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('throwObject').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('throwObject').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}






