class Food {
    constructor(id,position,r,g,b) {
        this.id = id;

        this.posX = position.x;
        this.posY = position.y;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

module.exports = Food;