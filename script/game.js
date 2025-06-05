let canvas;
let world;
let keyboard = new Keyboard();
let sound = new Sound();
let soundPlaying = true;
let playGame = true;
let gameIsRunning = false;


function upadteScreen() {
    document.getElementById('startOverlayWrapper').classList.add("none");
    document.getElementById('start-overlay').classList.remove("start-container");
    // document.getElementById('imgCanvas').classList.remove("none");
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
    saveToLocalStorage(true);
}

function soundOff() {
    soundPlaying = world.soundPlaying = false;
    world.checkSound(soundPlaying); // Sound aus
    saveToLocalStorage(false);
}

function saveToLocalStorage(value) {
    localStorage.setItem("sound", value);
}

function reloadPage() {
    window.location.reload();
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
    removeImpressum();
    addPlaybuttonsForMobile()
    canvas = document.getElementById('canvas');
    setLevel(sound);
    world = new World(canvas, keyboard, sound);
    MobileKeyboardPress();
    addPlaybuttonsForMobile();

}

function removeImpressum() {
    let impressum = document.getElementById('footer-class');
    impressum.classList.add('none');
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

function addPlaybuttonsForMobile() {
    let mobileplay = document.getElementById('mobilePlayPad');
    mobileplay.classList.remove('none')
    mobileplay.classList.add('d-flex')
}

function returnImpressumHTML() {
    return /*html*/`
        <div class="impressum-wrapper">
            <h2>Impressum</h2>
            <div class="text-impressum">
                Impressum Angaben gemäß § 5 TMG Verantwortlich für den Inhalt dieser Seite:
                Marco Hantel Max-MustermannStr. 99 81541 München E-Mail: <br>mh@test.de<br>
                Für die Grafiken verantwortlich:
                <a href="https://developerakademie.com/">Developer Akademie GmbH</a>
                Tassiloplatz 25 81541 München HRB 269921, AG München Datenschutz:
                Diese Seite erhebt keine personenbezogenen Daten und verwendet keine Cookies.
                <button onclick="closeImpressum()" class="close-impressum-button">Schließen</button>
            </div>
        </div>
    `;
}

function handleDeviceBlocker() {
    const blockerPage = document.getElementById('turnDevice');

    function checkDevice() {
        const isSmall = window.innerWidth < 1159;
        const isPortrait = window.innerHeight > window.innerWidth;

        if (isSmall && isPortrait) {
            blockerPage.classList.remove('none');
            blockerPage.innerHTML = returnBlockerPageHTML();
        } else {
            blockerPage.classList.add('none');
            blockerPage.innerHTML = '';
        }
    }

    // Direkt beim Laden prüfen
    checkDevice();

    // Bei Änderung der Fenstergröße oder Ausrichtung prüfen und dann ändern
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
}

function returnBlockerPageHTML() {
    return /*html*/`
        <div class="blocker-wrapper blocker-position">
            <h2 class="text-blocker">turn device</h2>
            <div class="text-blocker">
                <img src="img/10_icon/turnphone.png">
                <p>Dieses Spiel funktioniert nur im Querformat!.</p>
            </div>
        </div>
    `;
}

window.addEventListener('load', () => {
    handleDeviceBlocker();
});

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