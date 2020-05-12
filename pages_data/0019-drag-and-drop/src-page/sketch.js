var container;
var canvas;

function setup() {
  canvas = createCanvas(400,400);
  canvas.parent('canvas_div')
  background(0);

  canvas.drop(loadImgCanvas)

  container = select("#imgcontainer");

  container.dragOver(() => {
    container.style("background-color", "#888")
  });

  container.dragLeave(() => {
    container.style("background-color", "#fff");
  });

  container.drop(load_img, clear_container);
}

function loadImgCanvas(file) {
  loadImage(file.data, (img) => {
    resizeCanvas(500,img.height*500/img.width);
    image(img,0,0, width, height);
    createP(file.name);
  });  
}

function load_img(file) {
  p = createP(file.name + " " + file.size);
  p.parent('canvas_div');
  var img = createImg(file.data, file.name);
  img.size(200,200);
  img.parent('canvas_div');
}

function clear_container() {
  container.style("background-color", "#fff");
}
