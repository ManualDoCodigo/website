canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

c = canvas.getContext('2d');

//Rectangles
c.fillStyle='#ff0000';
c.fillRect(100,80,150,200);
c.fillStyle='rgba(0,255,0,0.5)';
c.fillRect(200,100,500,100);
c.fillRect(200,400,350,100);

//lines
c.beginPath();
c.moveTo(50,450);
c.lineTo(700,50);
c.lineTo(500,300);
c.lineTo(700,300);
c.strokeStyle = "#ff0000"
c.stroke();
c.fill()

for (let i=0; i<30; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;

    //circle
    c.beginPath();
    c.strokeStyle = "#0000ff";
    c.arc(x,y,Math.random()*100,0, Math.PI *2);
    c.fillStyle = "rgba(0,0,255,0.4";
    c.stroke();
    c.fill()
}
