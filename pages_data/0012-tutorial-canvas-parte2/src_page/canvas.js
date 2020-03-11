
canvas = document.querySelector("canvas");

canvas.width = document.getElementById("canvas_div").clientWidth;
canvas.height = 400;

c = canvas.getContext('2d');

// c.fillStyle='#ff0000';
// c.fillRect(100,80,150,200);
// c.fillStyle='rgba(0,255,0,0.5)';
// c.fillRect(200,100,500,100);
// c.fillRect(200,400,350,100);

// //line
// c.beginPath();
// c.moveTo(50,450);
// c.lineTo(700,50);
// c.lineTo(500,300);
// c.lineTo(700,300);
// c.strokeStyle = "#ff0000"
// c.stroke();
// //c.fill()


// for (let i=0; i<10; i++) {
//     let x = Math.random() * canvas.width;
//     let y = Math.random() * canvas.height;
//     //circle
//     c.beginPath();
//     c.strokeStyle = "#0000ff";
//     c.arc(x,y,Math.random()*100,0, Math.PI *2);
//     c.fillStyle = "rgba(0,0,255,0.4";
//     c.stroke();
//     c.fill()
// }

colors = ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"];
colors_rgba = ["rgba(230, 57, 70, 0.5)", "rgba(241, 250, 238, 0.5)", "rgba(168, 218, 220, 0.5)", "rgba(69, 123, 157, 0.5)", "rgba(29, 53, 87, 0.5)"];

class Circle {
    constructor() {
        this.radius = Math.random() * 100;
        this.x = Math.random() * (canvas.width - this.radius*2)+this.radius;
        this.y = Math.random() * (canvas.height - this.radius*2)+this.radius;
        this.velx = Math.random()*16 - 8;
        this.vely = Math.random()*16 - 8;
        this.color = colors_rgba[Math.floor(Math.random()*colors.length)]
        
    };

    update () {
        this.x += this.velx;
        this.y += this.vely;

        if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
            this.velx = -this.velx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius <= 0) {
            this.vely = -this.vely;
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, Math.PI *2);
        c.fillStyle = this.color;
        c.stroke();
        c.fill()
    }
}

circles = []

for (let i=0; i<canvas.width/8; i++) {
    circles.push(new Circle())
}



function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas. height);
    
    for (let i=0; i<canvas.width/8; i++) {
        circles[i].draw();
        circles[i].update();   
    }

}

animate()





