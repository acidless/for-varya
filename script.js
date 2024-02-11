/* Meet Window */
const MEET_DATE = new Date(2023, 5, 11, 16, 37);

let diffInTime = Date.now() - MEET_DATE.getTime();
let diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
document.querySelector(".meet-days strong").textContent = diffInDays;
const smallText = document.querySelector(".meet-modal__small-text");
smallText.style.fontSize = `${11 + (diffInDays.toString().length - 1) * 3}px`;

const modals = document.querySelectorAll(".modal");
document.querySelectorAll(".modal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        document.getElementById(btn.getAttribute("data-modal")).classList.add("active");
    })
})

modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (!modal.querySelector(".modal-content").contains(e.target)) {
            modal.classList.remove("active");
        }
    });
})

/* Confetti */

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

function confetti() {
    jsConfetti.addConfetti({
        emojis: ['💘', '💝', '💓', '💖', '💕', '💗', '❤'],
    });
    jsConfetti.addConfetti({confettiNumber: 1000});
}

/* Events */

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

const timings = {
    635: [() => drawText("Ты самая красивая 💘")],
    655: [() => drawText("Ты самая желанная")],
    680: [() => drawText("Ты самая любимая")],
    705: [() => drawText("Ты солнце прекрасное ✨")],
    717: [() => {
        confetti();
        document.querySelector(".text-container div").classList.add("increase-animation");
    }, true],
    730: [() => drawText("Ты самая красивая")],
    750: [() => drawText("Ты самая желанная")],
    775: [() => drawText("Ты самая любимая")],
    795: [() => drawText("Ты счастье долгожданное")],
    820: [() => drawText("Ты самая красивая")],
    840: [() => drawText("Ты самая желанная")],
    865: [() => drawText("Ты самая любимая")],
    885: [() => drawText("Ты солнце прекрасное ✨")],
    910: [() => drawText("Улыбайся почаще")],
    930: [() => drawText("Будто солнце наше")],
    955: [() => drawText("А ты с каждым разом краше")],
    975: [() => drawText("И ты та, кто ночь уложит")],
    1000: [() => drawText("Ты самая прекрасная ✨")],
    1025: [() => drawText("Сегодня солнце ясное, и ты")],
    1065: [() => drawText("Та, кем всегда хотела быть")],
    1090: [() => drawText("Запомни")],
    1105: [() => drawText("Ты самая красивая")],
    1120: [() => drawText("Ты самая желанная")],
    1140: [() => drawText("Ты самая любимая")],
    1160: [() => drawText("Ты счастье долгожданное")],
    1185: [() => drawText("Ты самая красивая")],
    1205: [() => drawText("Ты самая желанная")],
    1230: [() => drawText("Ты самая любимая")],
    1250: [() => drawText("Ты солнце прекрасное ✨")],
    1270: [() => {
        confetti();
        document.querySelector(".text-container div").classList.add("increase-animation");
    }, true],
}

/* Player */

let isPlaying = false;
let started = false;
let drawHearts = false;

const btn = document.querySelector(".player__toggle");
btn.style.opacity = 1;
btn.addEventListener("click", (e) => {
    btn.style = "";
    if (isPlaying) {
        btn.querySelector("img").src = "./assets/play.svg";
        audio.pause();
        drawHearts = false;
    } else {
        btn.querySelector("img").src = "./assets/pause.svg";
        audio.play();
        drawHearts = true;

        if (audio.currentTime === 0) {
            started = true;
            onStart();
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
    drawHearts = false;
})

async function onStart() {
    played = [];
    try {
        await turtle.clear();
    } catch (e) {

    }

    audio.volume = 0.25;
    audio.currentTime = START_TIME;
    await audio.play();

    const player = document.querySelector(".player");
    player.classList.add("bottom");

    drawHearts = true;
    drawing();
}

/* Drawing */

const MIN_SIZE = 50;
const MAX_SIZE = 200;
const START_TIME = 63.4;

const canvas = document.querySelector("#real-turtle");
turtle.options.async = true;
turtle.setSize(0);

const colors = ["#FF0000", "#FF69B4", "#FF1493", "#FF00FF", "#DA70D6"];

async function drawHeart(x, y, angle, size) {
    const color = colors[randomNumber(0, colors.length)];

    await turtle.penUp();
    await turtle.resetPosition();
    await turtle.setPosition(x, y);
    await turtle.setSpeed(map(size, MIN_SIZE, MAX_SIZE, 0.5, 0.7));
    await turtle.left(angle);
    await turtle.beginPath();
    await turtle.penDown();
    await turtle.setStrokeStyle(color);
    await turtle.setLineWidth(3);
    await turtle.left(50);
    await turtle.forward(104 * size / 100);
    await turtle.arc(50 * size / 100, 210);
    await turtle.left(140);
    await turtle.arc(50 * size / 100, 210);
    await turtle.forward(104 * size / 100);
    await turtle.closePath();
}

const hearts = [];

async function drawing() {
    while (true) {
        if (drawHearts) {
            const size = randomNumber(25, 50);

            const boundsX = size * 2;
            const boundsY = size * 1.6;

            while (true) {
                try {
                    let isValidPosition = true;
                    const x = randomNumber(boundsX / 2, canvas.clientWidth - boundsX / 2);
                    const y = randomNumber(boundsY, canvas.clientHeight - boundsY);

                    const angle = randomNumber(-30, 30);

                    hearts.forEach((heart) => {
                        if (!(x - boundsX / 2 > heart[1] || x + boundsX / 2 < heart[0] || y < heart[2] || y - boundsY > heart[3])) {
                            isValidPosition = false;
                        }
                    })

                    if (isValidPosition) {
                        await drawHeart(x, y, angle, size);
                        hearts.push([x - boundsX / 2, x + boundsX / 2, y - boundsY, y]);
                        await wait(500);
                        break;
                    } else {
                        await wait(50);
                    }
                } catch (e) {
                    await wait(50);
                }

            }
        } else {
            await wait(200);
        }
    }
}

function drawText(text) {
    const container = document.querySelector(".text-container");
    const textNodeWrapper = container.querySelector("div");
    const textNode = container.querySelector(".text");
    if (textNode.textContent === text) {
        return;
    }
    container.removeChild(textNodeWrapper);

    const nodeParent = document.createElement("div");
    const node = document.createElement("p");
    node.classList.add('text');
    node.textContent = text;
    nodeParent.appendChild(node)
    container.appendChild(nodeParent);
}

/* Utils */

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function wait(ms) {
    return new Promise((res) => setTimeout(() => res(), ms));
}

function map(val, prevMin, prevMax, newMin, newMax) {
    return newMin + ((newMax - newMin) / (prevMax - prevMin)) * (val - prevMin);
}

