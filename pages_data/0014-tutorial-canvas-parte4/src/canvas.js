
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

addEventListener('click', (event) => {
    for (var i=0; i<500; i++) {
        balls[i].explode();
    }
})

addEventListener('resize', (event) => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

function random(m,n) {
    return Math.random() * (n-m) + m;
}

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
colors_rgba = ["rgba(230, 57, 70, 0.5)", "rgba(241, 250, 238, 0.5)", "rgba(168, 218, 220, 0.5)", 
"rgba(69, 123, 157, 0.5)", "rgba(29, 53, 87, 0.5)", "rgba(231, 229, 67, 0.5)"];


class Ball {
    constructor(x,y,r,dx,dy) {      
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;  
        this.grav = 1;
        this.color = colors_rgba[Math.floor(random(0,6))];
    };

    explode() {
        this.dx += random(-8,8);

        let inc = random(0,30)

        if (this.dy >= 0) {
            this.dy += random(0,30);
        }
        else {
            this.dy -= random(0,30);
        }
    }

    update () {
        this.y += this.dy
        this.x += this.dx

        if (this.y + this.r > innerHeight) {
            this.dy = -this.dy * 0.9;
            this.dx = this.dx * 0.9;
            this.y = innerHeight - this.r;
        }

        this.dy += this.grav;

        if (this.x + this.r > innerWidth || this.x -this.r < 0) {
            this.dx = -this.dx;
        }
    }

    draw() {
        circle(this.x, this.y, this.r, "black", this.color)
    }
}

let balls = [];

function init() {
    //init world
    for (var i=0; i<500; i++) {
        let r = random(10,50);
        let x = random(r,innerWidth-r);
        let y = random(0, innerHeight);
        let dx = random(-8,8);
        
        balls.push(new Ball(x, y, r,dx,1));
    }

}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas. height);
    
    //Update and draw objects  
    for (var i=0; i<500; i++) {
        balls[i].draw()
        balls[i].update()
    }
    

}

init();
animate();





