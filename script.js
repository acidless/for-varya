const MIN_SIZE = 50;
const MAX_SIZE = 200;

window.addEventListener("resize", onWindowResize);
onWindowResize();

function onWindowResize() {
    document.querySelectorAll("canvas").forEach(canvas => {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    })
}

const confettiCanvas = document.querySelector('.confetti-canvas');
const jsConfetti = new JSConfetti({canvas: confettiCanvas})

const audio = new Audio("./assets/audio.mp3");
const interval = setInterval(()=>{
    if (Math.round(audio.currentTime * 10) === 717) {
        jsConfetti.addConfetti({
            emojis: ['💘', '💖', '🩷', '💗', '💓', '💞'],
        });
        jsConfetti.addConfetti({confettiNumber: 500});
        clearInterval(interval);
    }
});

document.addEventListener("click", () => {
    audio.load();
    audio.volume = 0.25;
    audio.currentTime = 63;
    audio.play();
}, {once: true});

let isPlaying = true;
const btn = document.querySelector(".player__toggle");
btn.style.opacity = 1;
btn.addEventListener("click", (e) => {
    event.stopPropagation();
    btn.style = "";
    if (isPlaying) {
        btn.querySelector("img").src = "./assets/play.svg";
        audio.pause();
    } else {
        btn.querySelector("img").src = "./assets/pause.svg";
        audio.play();
    }

    isPlaying = !isPlaying;
});

const colors = ["#FF0000", "#FF69B4", "#FF1493", "#FF00FF", "#DA70D6"];

function map(val, prevMin, prevMax, newMin, newMax) {
    return newMin + ((newMax - newMin) / (prevMax - prevMin)) * (val - prevMin);
}

function drawHeart(x, y, angle, size) {
    const color = colors[randomNumber(0, colors.length)];

    turtle.penUp();
    turtle.resetPosition();
    turtle.setPosition(x, y);
    turtle.setSpeed(map(size, MIN_SIZE, MAX_SIZE, 0.5, 0.7));
    turtle.left(angle);
    turtle.beginPath();
    turtle.penDown();
    turtle.setStrokeStyle(color);
    turtle.setFillStyle(color);
    turtle.setLineWidth(3);
    turtle.left(50);
    turtle.forward(104 * size / 100);
    turtle.arc(50 * size / 100, 210);
    turtle.left(140);
    turtle.arc(50 * size / 100, 210);
    turtle.forward(104 * size / 100);
    turtle.closePath();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


const canvas = document.querySelector("#real-turtle");
turtle.setSize(0);

setInterval(async () => {
    const windoProportions = document.body.clientWidth / 100 * document.body.clientHeight / 100;
    const size = randomNumber(windoProportions / 4, windoProportions);


    const boundsX = 50 * size / 100 * 2;
    const boundsY = 104 * size / 100 + 50 * size / 100;


    const x = randomNumber(boundsX / 2, canvas.clientWidth - boundsX / 2);
    const y = randomNumber(boundsY, canvas.clientHeight - boundsY);
    const angle = randomNumber(-30, 30);

    drawHeart(x, y, angle, size);
}, 500);
