let canvas;
let world;
let keyboard = new Keyboard();
let sound = new Sound();
let soundPlaying = true;
let playGame = true
let gameIsRunning = false;


function upadteScreen() {
    document.getElementById('start-overlay').classList.remove("start-container");
    document.getElementById('imgCanvas').classList.remove("none");//NEW
    document.getElementById('start-overlay').classList.add("none");
    document.getElementById('canvas').classList.remove("none");
    document.getElementById('start-overlay').classList.remove("end-container");
    document.getElementById('start-overlay').classList.remove("end-container-win");
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
    world.draw();
    gameIsRunning = true; // Spiel läuft jetzt
}

function pauseGame() {
    if (gameIsRunning) {  // Nur pausieren, wenn das Spiel läuft
        world.isPaused = true;
        world.draw();
    }
}

function init() {
    sound = new Sound();
    canvas = document.getElementById('canvas');
    setLevel(sound);
    world = new World(canvas, keyboard, sound);
    MobileKeyboardPress();
}

function openImpressum() {
    if (gameIsRunning && !world.isPaused) {
        pauseGame();
    }
    updateImpressumContent();
}

function updateImpressumContent() {
    let impressum = document.getElementById('impressumPage');
    impressum.classList.remove('none');
    impressum.innerHTML = returnImpressumHTML();
}

function returnImpressumHTML() {
    return /*html*/`
        <div class="impressum-wrapper">
            <h2>Impressum</h2>
            <div class="text-impressum"><p>
                Impressum Angaben gemäß § 5 TMG Verantwortlich für den Inhalt dieser Seite:
                Marco Hantel Max-MustermannStr. 99 81541 München E-Mail: <br>mh@test.de<br>
                Für die Grafiken verantwortlich:
                <a href="https://developerakademie.com/">Developer Akademie GmbH</a>
                Tassiloplatz 25 81541 München HRB 269921, AG München Datenschutz:
                Diese Seite erhebt keine personenbezogenen Daten und verwendet keine Cookies.</p>
                <button onclick="closeImpressum()" class="close-impressum-button">Schließen</button>
            </div>
        </div>
    `;
}

function closeImpressum() {
    if (gameIsRunning) {
        startGame(); // Nur neu starten, wenn Spiel vorher lief
    }
    updateImpressumContentclose();
}

function updateImpressumContentclose() {
    let impressum = document.getElementById('impressumPage');
    impressum.classList.add('none');
    impressum.innerHTML = '';
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