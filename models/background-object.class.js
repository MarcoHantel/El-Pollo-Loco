/**
 * Represents a background object displayed in the game world.
 * Inherits from {@link MovablePobject}, but usually does not move.
 */
class BackgroundObject extends MovablePobject {

    /** Width of the background object (default: 720px). */
    width = 720;

    /** Height of the background object (default: 480px). */
    height = 480;

    /**
     * Creates a new background object.
     * @param {string} imagePath - The path to the background object's image.
     * @param {number} x - The X-position of the background object.
     * @param {number} y - (Optional) Y-position – ignored, as the object is automatically aligned to the bottom.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Position the object at the bottom of the canvas
    }
}