class DrawableObject {

    x = 120;
    y = 280;

    height = 150;
    width = 100;
    currentImage = 0;
    img;
    imageCash = {};


    loadImage(path) {
        this.img = new Image(); // new Image() ist out of the box
        this.img.src = path;
    }

    draw(ctx) {

        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        } catch (e) {
            console.warn('Error loading Image', e);
            console.log('cound not load image', this.img);

        }
    }

    // drawFrame(ctx) {


    //     if ((this instanceof Character || this instanceof Chicken || this instanceof Endboss ||
    //         this instanceof Coins || this instanceof Bottles)) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof BabyChicken ||
            this instanceof Endboss ||
            this instanceof Coins ||
            this instanceof Bottles
        ) {
            // === Blauer Rahmen (äußere Umrandung des Objekts) ===
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
    
            // === Roter Rahmen (Offset-Hitbox) ===
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
 * 
 * @param {Array} arr - ['img/image1.png, 'img/image2.png'] 
 */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCash[path] = img;
        });
    }
}