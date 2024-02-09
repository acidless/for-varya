const MIN_SIZE = 50;
const MAX_SIZE = 200;
const START_TIME = 63.5;

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

let played = [];
const audio = new Audio("./assets/audio.mp3");
setInterval(() => {
    const time = Math.round(audio.currentTime * 10);
    const funcData = timings[time];
    if (funcData && (!funcData[1] || (funcData[1] && !played.includes(time)))) {
        funcData[0]();
        played.push(time);
    }
});

let isPlaying = false;
let started = false;
const btn = document.querySelector(".player__toggle");
btn.style.opacity = 1;
btn.addEventListener("click", (e) => {
    btn.style = "";
    if (isPlaying) {
        btn.querySelector("img").src = "./assets/play.svg";
        audio.pause();
    } else {
        btn.querySelector("img").src = "./assets/pause.svg";
        audio.play();

        if (audio.currentTime === 0) {
            played = [];
            audio.currentTime = START_TIME;
        }

        if (!started) {
            started = true;
            onStart();
        }
    }

    isPlaying = !isPlaying;
});
audio.addEventListener("ended", (e) => {
    btn.querySelector("img").src = "./assets/play.svg";
    isPlaying = false;
})


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

async function onStart() {
    audio.load();
    audio.volume = 0.25;
    audio.currentTime = START_TIME;
    await audio.play();

    const player = document.querySelector(".player");
    player.style.bottom = "50px";
    player.style.transform = "translateX(-50%)";
}

setInterval(drawing, 500);

function drawing() {
    const size = randomNumber(25, 50);

    const boundsX = 50 * size / 100 * 2;
    const boundsY = 104 * size / 100 + 50 * size / 100;


    const x = randomNumber(boundsX / 2, canvas.clientWidth - boundsX / 2);
    const y = randomNumber(boundsY, canvas.clientHeight - boundsY);
    const angle = randomNumber(-30, 30);

    drawHeart(x, y, angle, size);
}

const timings = {
    635: [() => drawText("Ты самая красивая")],
    655: [() => drawText("Ты самая желанная")],
    680: [() => drawText("Ты самая любимая")],
    705: [() => drawText("Ты солнце прекрасное")],
    717: [() => {
        jsConfetti.addConfetti({
            emojis: ['💘', '💖', '🩷', '💗', '💓', '💞'],
        });
        jsConfetti.addConfetti({confettiNumber: 1000});
    }, true],
    730: [() => drawText("Ты самая красивая")],
    750: [() => drawText("Ты самая желанная")],
    775: [() => drawText("Ты самая любимая")],
    795: [() => drawText("Ты счастье долгожданное")],
    820: [() => drawText("Ты самая красивая")],
    840: [() => drawText("Ты самая желанная")],
    865: [() => drawText("Ты самая любимая")],
    885: [() => drawText("Ты солнце прекрасное")],
    910: [() => drawText("Улыбайся почаще")],
    930: [() => drawText("Будто солнце наше")],
    955: [() => drawText("А ты с каждым разом краше")],
    975: [() => drawText("И ты та, кто ночь уложит")],
    1000: [() => drawText("Ты самая прекрасная")],
    1025: [() => drawText("Сегодня солнце ясное, и ты")],
    1065: [() => drawText("Та, кем всегда хотела быть")],
    1095: [() => drawText("Запомни")],
    1105: [() => drawText("Ты самая красивая")],
    1115: [() => drawText("Ты самая желанная")],
    1135: [() => drawText("Ты самая любимая")],
    1160: [() => drawText("Ты счастье долгожданное")],
    1185: [() => drawText("Ты самая красивая")],
    1205: [() => drawText("Ты самая желанная")],
    1230: [() => drawText("Ты самая любимая")],
    1250: [() => drawText("Ты солнце прекрасное")],
    1265: [() => {
        jsConfetti.addConfetti({
            emojis: ['💘', '💖', '🩷', '💗', '💓', '💞'],
        });
        jsConfetti.addConfetti({confettiNumber: 1000});
    }, true],
}

function drawText(text) {
    const container = document.querySelector(".text-container");
    const textNode = container.querySelector(".text");
    if (textNode.textContent === text) {
        return;
    }

    container.removeChild(textNode);

    const node = document.createElement("p");
    node.classList.add('text');
    node.textContent = text;
    container.appendChild(node);
}



