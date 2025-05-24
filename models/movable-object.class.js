class MovablePobject extends DrawableObject {

    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.3;
    energy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
    lastMove = new Date().getTime();
    // sleeping = false;
    animationPaused = false;


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 50);
    }

    isAboveGround() {
        if (this instanceof ThrowableObjects) { // throwableObjects fallen durch und stoppen nicht bei
            // return true;
            return this.y < 330
        } else {
            return this.y < 150;
        }
    }

    playAnimation(images) {
        if (this.animationPaused) return;
        // walk animation
        let i = this.currentImage % images.length // let i = 6 % 6 -> 1, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0 usw %Modolu = Teilen mit Rest
        let path = images[i];
        this.img = this.imageCash[path];
        this.currentImage++ // hoch zählen von currentImage 
    }
    
    moveRight() {
        this.x += this.speed
    }

    moveLeft() {
        this.x -= this.speed
    }

    jump() {
        this.speedY = 30;
    }

    collectCoin(coin) {
        this.coins++;
        let index = level1.coins.indexOf(coin);

        if (index !== -1) {
            level1.coins.splice(index, 1);
        }
    }


    collectBottle(bottle) {
        this.bottles++;
        let index = level1.bottles.indexOf(bottle);

        if (index !== -1) {
            level1.bottles.splice(index, 1);
        }
    }


    enemyDie(chicken) {
        chicken.enemiesDie = true;
        chicken.speed = 0; // Huhn anhalten
        setTimeout(() => {
            const index = level1.enemies.indexOf(chicken);
            if (index !== -1) {
                level1.enemies.splice(index, 1); // aus array löschen
            }
        }, 500); // Death Bild bleibt 500ms stehen
    }


    // caracter.isColliding(chicken)
    // mo (das movableObject hat eine: Breite, höhe und auch x,y Kooridinaten) damit können alle anderen Punkte zB unten rechts auch berechnet werden
    // wenn also characterX + character.width = Punkt unten rechts kleiner ist < als checken.x (also chicken unten links) dann colliding 
    // offset ist eine kleine Variante on der Box die ich um das mo zeichne
    // siehe world.js this.checkCollisions();
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && //check ob unterseite Pepe größer als oberkante movableObject (bottomToTop)            
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    hit() {
        if (!world.isFromTop) {
            this.energy -= 5;

            if (this.energy < 0) {
                this.energy = 0;

            } else {
                this.lastHit = new Date().getTime(); // Zeitpunkt in Zahlenform speichern

            }
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference zwischen letzten hit und jetzt
        timepassed = timepassed / 1000; // in Sekunden umwandeln
        return timepassed < 0.5; // wenn timepassed kleiner als 0.5 sek dann return true (wir wurden getrofen) sonst automatisch false 
    }

    dead() {
        return this.energy == 0;
    }

    // NEW
    startIdleCounter() {
    setInterval(() => {
        if (!this.world.isPaused) { // Nur zählen, wenn Spiel nicht pausiert ist
            this.idleCounter++;
        }
    }, 1000); // alle 1000 ms hochzählen
}


    isInBossZone(bossZoneLeft, bossZoneRight) {
        return this.x >= bossZoneLeft && this.x <= bossZoneRight;
    }

    randomChangeDirection(xMin, xMax) {
        let direction = 'left';
    
        // Speichere das Interval in einer Variablen um später clearInterval zu setzten
        const moveInterval = setInterval(() => {
    
            if (world.isPaused) {
                return;
            } else {
                if (direction === 'left') {
                    if (this.x > xMin) {      // <- Hier xMin benutzen (nicht this.xMin)
                        this.moveLeft();
                    } else {
                        direction = 'right'; 
                        this.otherDirection = true; 
                    }
                } else {
                    if (this.x < xMax) {      // <- Hier xMax benutzen (nicht this.xMax)
                        this.moveRight();
                    } else {
                        direction = 'left'; 
                        this.otherDirection = false; 
                    }
                }
            }
        }, 1000 / 60); // 60 FPS
    
        return moveInterval; // <-- wichtig für clearInterval
    }
    
    startBossAnimationWalk() {
        if (!this.endbossPlayed) {
            this.endbossPlayed = true;
    
            if (world.soundPlaying) {
                this.sound.audioEndbossAlert.play(); // Sound abspielen wenn soundPlaying true ist
            } else {
                this.sound.audioEndbossAlert.pause();
            }
    
            // Boss Animation
            this.bossWalkInterval = setInterval(() => {
                if (world.isPaused) {
                    return;
                } else {
                    this.playAnimation(this.IMAGES_WALK); // Boss läuft los
                }
            }, 200);
    
            // Boss bewegt sich
            let xMax = this.xMax;
            let xMin = this.xMin;
            this.bossMoveInterval = this.randomChangeDirection(xMin, xMax); // Boss bewegt sich zufällig nach links und rechts
        } else {
            return;
        }
    }
    
    
}