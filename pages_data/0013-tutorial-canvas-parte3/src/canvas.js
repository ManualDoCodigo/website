
canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

c = canvas.getContext('2d');

mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener('resize', (event) => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

function text(text, x, y, color) {
    c.fillStyle=color;
    c.fillText(text, x, y);
}

function line(x1,y1, x2, y2, color="red") {
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle=color;    
    c.stroke();
}

function circle(x,y, radius, color="red", fill="blue") {
    c.beginPath();
    c.strokeStyle = color;
    c.arc(x,y,radius,0,Math.PI *2);
    c.fillStyle=fill;
    c.stroke();
    c.fill()
}

colors = ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"];

class Object {
    constructor() {        
    };

    update () {
    }

    draw() {
    }
}

function init() {
    //init world

}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas. height);
    
    //Update and draw objects    
    circle(mouse.x, mouse.y, 100, "black", "rgba(0,0,255,0.5")
    circle(mouse.x+100, mouse.y, 100, "black", "rgba(0,255,255,0.5")
    text("www.manualdocodigo.com.br", mouse.x,mouse.y, "black")

}

init();
animate();





