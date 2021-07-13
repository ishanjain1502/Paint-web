const canvas = document.querySelector("canvas");
const cntxt = canvas.getContext('2d');


// RESIZING--------------------
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth - 100;

let paint = false;
let col = "black";
let wide = "50";
let history = [];
let index = -1;

// EVENT LISTENER FOR TOUCH and MOUSE----------------
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
    paint = true;
    cntxt.beginPath();
    cntxt.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);

    event.preventDefault();

    if (event.type != 'mouseout') {
        history.push(cntxt.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        console.log("array restored");
    }
}

function draw(event) {
    if (paint) {
        cntxt.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        cntxt.strokeStyle = col;
        cntxt.lineWidth = wide;
        cntxt.lineCap = "round";
        cntxt.lineJoin = "round";
        cntxt.stroke();
    }
}

function stop(event) {
    if (paint) {
        cntxt.stroke();
        cntxt.closePath();
        paint = false;
    }
    event.preventDefault();
}

function change_color(element) {
    col = element.style.background;
}

function clear_canvas() {
    cntxt.fillStyle = "white";
    cntxt.clearRect(0, 0, canvas.width, canvas.height);
    cntxt.fillRect(0, 0, canvas.width, canvas.height);
    history = [];
    index = -1;
}

function undo_last() {
    if (index <= 0) {
        clear_canvas();
    } else {
        index -= 1;
        history.pop();
        cntxt.putImageData(history[index], 0, 0);
    }

}

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth - 100;
})


