let ctx, canvasWidth, canvasHeight;
canvasWidth = 800;
canvasHeight = 600;
const fps = 60;
const interval = 1000 / fps;
let leftPressed = false;
let rightPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
sprite1 = new Sprite(10, 800, 4, 0, 180, 240, 'images/Stitch.png');
Coffee2 = new Sprite(375, 250, 4, 0, 45, 60, 'images/coffee.png');
let score = 0;
let levens = 10;

function start() {
    let volgende;
    (function gameloop(timestamp) {
        if (volgende === undefined) {
            volgende = timestamp;
        }
        const verschil = timestamp - volgende;
        if (verschil > interval) {
            volgende = timestamp - (verschil % interval);
            update();
            draw();
        }
        requestAnimationFrame(gameloop);
    })();
}

function init() {
    const canvas = document.getElementById("myCanvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    image = new Image();
    image.src = 'images/Stitch.png';
    ctx.drawImage(image, 30, 50, 40, 40);
    start();
}

function keyDownHandler(e) {
    if (e.key === "ArrowRight" || e.key === "D") {
        rightPressed = true;
    } else if (e.key === "ArrowLeft" || e.key === "A") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "ArrowRight" || e.key === "D") {
        rightPressed = false;
    } else if (e.key === "ArrowLeft" || e.key === "A") {
        leftPressed = false;
    }
}

function update() {
    if (rightPressed) {
        sprite1.speedX = 8;
    } else if (leftPressed) {
        sprite1.speedX = -8;
    } else {
        sprite1.speedX = 0;
    }
    sprite1.update();
    if (sprite1.X < 0) {
        sprite1.X = 0;
    } else if (sprite1.X + sprite1.width > canvasWidth) {
        sprite1.X = canvasWidth - sprite1.width;
    }
    if (sprite1.Y < 0) {
        sprite1.Y = 0;
    } else if (sprite1.Y + sprite1.height > canvasHeight) {
        sprite1.Y = canvasHeight - sprite1.height;
    }
    if (sprite1.X + sprite1.width < 0) {
        sprite1.X = canvasWidth;
    } else if (sprite1.X > canvasWidth) {
        sprite1.X = -sprite1.width;
    }
    Coffee2.rotation += 0.1;
}

let CoffeeArray = [];
let maxCoffee = 4;

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    sprite1.draw();
    let snelleCoffee = false;
    let removeCoffees = [];
    if (levens > 0) {
        if (score % 10 === 0 && maxCoffee < 10) {
            maxCoffee += 1;
        }
        for (let i = 0; i < CoffeeArray.length; i++) {
            CoffeeArray[i].update();
            CoffeeArray[i].draw();

            if (CoffeeArray[i].snelheidY > 4) {
                snelleCoffee = true;
            }
            if (
                sprite1.X < CoffeeArray[i].X + CoffeeArray[i].width &&
                sprite1.X + sprite1.width > CoffeeArray[i].X &&
                sprite1.Y < CoffeeArray[i].Y + CoffeeArray[i].height &&
                sprite1.Y + sprite1.height > CoffeeArray[i].Y
            ) {
                removeCoffees.push(i);
                score++;
                document.getElementById("Coffeetext").innerHTML = "Coffees: " + score;
            }
            if (CoffeeArray[i].Y > canvasHeight) {
                removeCoffees.push(i);
                levens--;
                document.getElementById("levens").innerHTML = "Levens: " + levens;
                if (levens === 0) {
                    document.getElementById("gameover").style.display = "block";
                    toonEindscore();
                    return;
                }
            }
        }
        for (let i = removeCoffees.length - 1; i >= 0; i--) {
            CoffeeArray.splice(removeCoffees[i], 1);
        }
        if (!snelleCoffee && Math.random() < 0.01 && CoffeeArray.length < maxCoffee) {
            const speedX = Math.random() * (canvasWidth - 35);
            const speedY = 2 + Math.random() * 3;
            const nieuweCoffee = new Sprite(speedX, 0, 0, speedY, 35, 40, 'images/coffee.png');
            CoffeeArray.push(nieuweCoffee);
        }
    }
}

function toonEindscore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Eindscore: " + score, canvasWidth / 2 - 100, canvasHeight / 2);
}
