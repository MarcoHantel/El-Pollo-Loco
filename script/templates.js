// templates.js

/**
 * Returns the HTML string for the Impressum overlay.
 * @returns {string} HTML content
 */
function returnImpressumHTML() {
    return /*html*/`
        <div class="impressum-wrapper">
            <h2>Impressum</h2>
            <div class="text-impressum">
                Impressum Angaben gemäß § 5 TMG Verantwortlich für den Inhalt dieser Seite:
                Marco Hantel Flurstr. 12, 82194 Gröbenzell E-Mail: <br>hantelmarco[at]gmail.com<br>
                Für die Grafiken verantwortlich:
                <a href="https://developerakademie.com/">Developer Akademie GmbH</a>
                Tassiloplatz 25 81541 München HRB 269921, AG München Datenschutz:
                Diese Seite erhebt keine personenbezogenen Daten und verwendet keine Cookies.
                <button onclick="closeImpressum()" class="close-impressum-button">Schließen</button>
            </div>
        </div>
    `;
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
