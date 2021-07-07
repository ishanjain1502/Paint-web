window.addEventListener('load', () => {
    console.log("Hello");
    const canvas = document.querySelector("canvas");
    const cntxt = canvas.getContext('2d');


    // RESIZING--------------------
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let paint = false;

    function startPosition(e) {
        paint = true;
        draw(e);
    }
    function finishedPoint() {
        paint = false;
        cntxt.beginPath();
    }

    function draw(e) {
        if (!paint) return;
        cntxt.lineWidth = 10;
        cntxt.lineCap = "round";
        cntxt.strokeStyle = "red"

        cntxt.lineTo(e.clientX, e.clientY)
        cntxt.stroke();
        cntxt.beginPath();
        cntxt.moveTo(e.clientX, e.clientY);
    }

    //EVENT LISTENER---------
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPoint);
    canvas.addEventListener("mousemove", draw);
});


window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

