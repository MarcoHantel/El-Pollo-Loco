/**
 * Represents the current state of keyboard inputs.
 * Used to track which keys are actively pressed.
 */
class Keyboard {

    /** Indicates if the RIGHT arrow key is pressed */
    RIGHT = false;

    /** Indicates if the LEFT arrow key is pressed */
    LEFT = false;

    /** Indicates if the UP arrow key is pressed */
    UP = false;

    /** Indicates if the DOWN arrow key is pressed */
    DOWN = false;

    /** Indicates if the SPACE key is pressed */
    SPACE = false;

    /** Indicates if the "D" key is pressed (often for throwing or action) */
    D = false;

    /**
     * Creates a new Keyboard input state object.
     */
    constructor() {
        // No initialization logic needed for now
    }
}
