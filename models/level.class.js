
class Level {

    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;


    level_end_x = 700;

// Verknüpft mit level1, da ich in level eins ein neues Level erzeuge level1 = new Level()
// duch this.enemies = enemies, bekommt die Variable (oben) das array zugewiesen.
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;

    }

};