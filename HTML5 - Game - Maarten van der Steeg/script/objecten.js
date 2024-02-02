class Sprite {
    constructor(posX, posY, speedX, speedY, width, height, url) {
        this.X = posX;
        this.Y = posY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.width = width;
        this.height = height;
        this.rotation = 0.0;
        this.url = url;
        this.image = new Image();
        if (typeof(url) != 'undefined') {
            this.image.src = url;
        }
    }
    update() {
        this.X += this.speedX;
        this.Y += this.speedY;
    }
    draw() {
        ctx.save();
        ctx.translate(this.X + this.width / 2, this.Y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}