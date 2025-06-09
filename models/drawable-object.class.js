/**
 * Base class for drawable objects on the canvas.
 * Handles image loading and drawing with optional debug frames.
 */
class DrawableObject {

    /** X position on the canvas (default: 120). */
    x = 120;

    /** Y position on the canvas (default: 280). */
    y = 280;

    /** Height of the drawable object (default: 150). */
    height = 150;

    /** Width of the drawable object (default: 100). */
    width = 100;

    /** Index of the current image in an animation sequence. */
    currentImage = 0;

    /** Image object representing the currently displayed image. */
    img;

    /** Cache for preloaded images to optimize rendering. */
    imageCash = {};

    /**
     * Loads a single image from the specified path.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current image on the provided canvas rendering context.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading Image', e);
            console.log('Could not load image:', this.img);
        }
    }

    /**
     * Draws debugging frames around the object and its collision box if applicable.
     * Only draws for instances of certain classes.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    drawFrame(ctx) {
        if (
            this instanceof Character || this instanceof Chicken || this instanceof BabyChicken ||
            this instanceof Endboss || this instanceof Coins || this instanceof Bottles
        ) {
            // Draw blue rectangle around the object boundary
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            // Draw red rectangle for the collision box, if defined
            if (this.offset) {
                ctx.beginPath();
                ctx.lineWidth = '2';
                ctx.strokeStyle = 'red';
                ctx.rect(
                    this.x + this.offset.left,
                    this.y + this.offset.top,
                    this.width - this.offset.left - this.offset.right,
                    this.height - this.offset.top - this.offset.bottom
                );
                ctx.stroke();
            }
        }
    }

    /**
     * Preloads multiple images from an array of paths and caches them for quick use.
     * @param {string[]} arr - Array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });
    }
}