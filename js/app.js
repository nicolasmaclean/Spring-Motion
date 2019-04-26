const canvas = document.getElementById('canvas');
const slidersDiv = document.getElementById("sliderContainer");

var drag = .7;
var springConstant = .1;
var trail = .5;

const dragSlider = document.getElementById("dragSlider");
const springConstantSlider = document.getElementById("SpringConstantSlider");
const trailSlider = document.getElementById("trailSlider");

const dragSpan = document.getElementById("drag");
const springConstantSpan = document.getElementById("springConstant");
const trailSpan = document.getElementById("trail");

dragSlider.oninput = () => {
    dragSpan.innerHTML = dragSlider.value/100;
    drag = dragSlider.value/100;
}
springConstantSlider.oninput = () => {
    springConstantSpan.innerHTML = springConstantSlider.value/100;
    springConstant = springConstantSlider.value/100;
}
trailSlider.oninput = () => {
    trailSpan.innerHTML = trailSlider.value/100;
    trail = trailSlider.value/100;
}

const c = canvas.getContext('2d');


var mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}

window.addEventListener("resize", () =>{
    init();
});

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Ball(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        c.beginPath()
        c.arc(this.x, this.y, radius, 0, Math.PI*2, false);
        c.fillStyle = "#" + this.color;
        c.fill();
    }

    this.update = function(){
        let target = {
            x: mouse.x,
            y: mouse.y
        }

        //keeps ball on screen
        if(target.y + this.radius > canvas.height)
            target.y = canvas.height - this.radius;
        if(target.y - this.radius < 0)
            target.y = this.radius;
        if(target.x + this.radius > canvas.width)
            target.x = canvas.width - this.radius;
        if(target.x - this.radius < 0)
            target.x =  this.radius;

        let force = {
            x: target.x - this.x,
            y: target.y - this.y
        }

        force.x *= springConstant;
        force.y *= springConstant;

        this.dx *= drag;
        this.dx += force.x;
        this.dy *= drag;
        this.dy += force.y;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var ball;

function init() {
    let divH = slidersDiv.offsetHeight;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - divH-10;

    ball = new Ball(canvas.width/2, canvas.height/2, 100, "0f0");
}

function animate(){
    requestAnimationFrame(animate);

    c.fillStyle = "rgba(255, 255, 255," + trail + ")";
    c.fillRect(0, 0, canvas.width, canvas.height);

    ball.update();
}

init();
animate();