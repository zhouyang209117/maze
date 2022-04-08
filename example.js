var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
var point_x = 0
var t_start = new Date().getTime();

function update() {
    let escape = new Date().getTime() - t_start;
    if (escape < 5000) {
        w = context.canvas.width
        point_x = escape / 5000 * w
    }
}

function draw() {
    context.fillStyle = "red";
    context.fillRect(point_x, 0, 50, 50);
}


function animate(time) {
    context.clearRect(0,0,canvas.width,canvas.height);
    update();
    draw();
    window.requestNextAnimationFrame(animate);
}

window.requestNextAnimationFrame(animate);