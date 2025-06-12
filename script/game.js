/** @type {HTMLCanvasElement} The main game canvas element */
let canvas;

/** @type {World} The game world instance */
let world;

/** @type {Keyboard} Keyboard input handler */
let keyboard = new Keyboard();

/** @type {Sound} Sound manager */
let sound = new Sound();

/** @type {boolean} Flag indicating if sound is enabled */
let soundPlaying = true;

/** @type {boolean} Flag indicating if the game should be playing */
let playGame = true;

/** @type {boolean} Flag indicating if the game is currently running */
let gameIsRunning = false;

/**
 * Hides the start overlay, shows the game canvas, initializes the game, and starts it.
 */
function upadteScreen() {
    document.getElementById('startOverlayWrapper').classList.add("none");
    document.getElementById('start-overlay').classList.remove("start-container");
    document.getElementById('start-overlay').classList.add("none");
    document.getElementById('canvas').classList.remove("none");
    document.getElementById('start-overlay').classList.remove("end-container");
    document.getElementById('start-overlay').classList.remove("end-container-win");
    init();
    startGame();
}

/**
 * Requests fullscreen mode for the game canvas.
 */
function fullScreen() {
    canvas.requestFullscreen();
}

/**
 * Exits fullscreen mode if currently active.
 */
function fullScreenEnd() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.fullscreenElement && window.screen.width > 1179) {
        let mobileplay = document.getElementById('mobilePlayPad');
        mobileplay.classList.add("z-index")
    }
}

/**
 * Enables sound and updates the game world accordingly.
 */
function soundOn() {
    soundPlaying = world.soundPlaying = true;
    world.checkSound(soundPlaying);
    saveToLocalStorage(true);
}

/**
 * Disables sound and updates the game world accordingly.
 */
function soundOff() {
    soundPlaying = world.soundPlaying = false;
    world.checkSound(soundPlaying);
    saveToLocalStorage(false);
}

/**
 * Saves the sound setting to localStorage.
 * @param {boolean} value Whether sound should be enabled or disabled.
 */
function saveToLocalStorage(value) {
    localStorage.setItem("sound", value);
}

/**
 * Reloads the current webpage.
 */
function reloadPage() {
    window.location.reload();
}

/**
 * Starts the game by unpausing the world and starting the draw loop.
 */
function startGame() {
    world.isPaused = false;
    world.draw();
    gameIsRunning = true;
}

/**
 * Pauses the game by setting the world to paused state and redrawing.
 */
function pauseGame() {
    if (gameIsRunning) {
        world.isPaused = true;
        world.draw();
    }
}

/**
 * Initializes game state: creates sound, removes footer, sets up canvas, level, and mobile controls.
 */
function init() {
    sound = new Sound();
    removeImpressum();
    addPlaybuttonsForMobile();
    canvas = document.getElementById('canvas');
    setLevel(sound);
    world = new World(canvas, keyboard, sound);
    MobileKeyboardPress();
    addPlaybuttonsForMobile();
}

/**
 * Hides the impressum/footer element.
 */
function removeImpressum() {
    let impressum = document.getElementById('footer-class');
    impressum.classList.add('none');
}

/**
 * Opens the impressum modal and pauses the game if running.
 */
function openImpressum() {
    if (gameIsRunning && !world.isPaused) {
        pauseGame();
    }
    updateImpressumContent();
}

/**
 * Updates the content of the impressum modal with HTML.
 */
function updateImpressumContent() {
    const impressum = document.getElementById('impressumPage');
    if (impressum) {
        impressum.classList.remove('none');
        impressum.innerHTML = returnImpressumHTML();
    }
}

// function updateImpressumContent() {
//     let impressum = document.getElementById('impressumPage');
//     impressum.classList.remove('none');
//     impressum.innerHTML = returnImpressumHTML();
// }

/**
 * Shows the play buttons for mobile devices.
 */
function addPlaybuttonsForMobile() {
    let mobileplay = document.getElementById('mobilePlayPad');
    mobileplay.classList.remove('none');
    mobileplay.classList.add('d-flex');
}

/**
 * Returns the HTML string for the impressum content.
 * @returns {string} HTML content for the impressum.
 */
// function returnImpressumHTML() {
//     return /*html*/`
//         <div class="impressum-wrapper">
//             <h2>Impressum</h2>
//             <div class="text-impressum">
//                 Impressum Angaben gemäß § 5 TMG Verantwortlich für den Inhalt dieser Seite:
//                 Marco Hantel Flurstr. 12, 82194 Gröbenzell E-Mail: <br>hantelmarco[at]gmail.com<br>
//                 Für die Grafiken verantwortlich:
//                 <a href="https://developerakademie.com/">Developer Akademie GmbH</a>
//                 Tassiloplatz 25 81541 München HRB 269921, AG München Datenschutz:
//                 Diese Seite erhebt keine personenbezogenen Daten und verwendet keine Cookies.
//                 <button onclick="closeImpressum()" class="close-impressum-button">Schließen</button>
//             </div>
//         </div>
//     `;
// }

/**
 * Handles the device orientation and screen size to display a blocker page if in portrait or small screen.
 */
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
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
}

/**
 * Returns the HTML string for the device blocker page.
 * @returns {string} HTML content for the blocker page.
 */
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

// Set up device blocker on page load
window.addEventListener('load', () => {
    handleDeviceBlocker();
});

/**
 * Closes the impressum modal and resumes the game if running.
 */
function closeImpressum() {
    if (gameIsRunning) {
        startGame();
    }
    updateImpressumContentclose();
}

/**
 * Hides and clears the impressum modal content.
 */
function updateImpressumContentclose() {
    let impressum = document.getElementById('impressumPage');
    impressum.classList.add('none');
    impressum.innerHTML = '';
}

// Keyboard keydown event listeners for controlling the keyboard state
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") keyboard.RIGHT = true;
    if (e.key == "ArrowLeft") keyboard.LEFT = true;
    if (e.key == "ArrowUp") keyboard.UP = true;
    if (e.key == "ArrowDown") keyboard.DOWN = true;
    if (e.key == " ") keyboard.SPACE = true;
    if (e.key == "d") keyboard.D = true;
});

// Keyboard keyup event listeners to reset keys
window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight") keyboard.RIGHT = false;
    if (e.key == "ArrowLeft") keyboard.LEFT = false;
    if (e.key == "ArrowUp") keyboard.UP = false;
    if (e.key == "ArrowDown") keyboard.DOWN = false;
    if (e.key == " ") keyboard.SPACE = false;
    if (e.key == "d") keyboard.D = false;
});

/**
 * Sets up touch event listeners for mobile control buttons.
 */
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