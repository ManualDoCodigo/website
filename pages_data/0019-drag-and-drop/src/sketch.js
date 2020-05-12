var container;
var canvas;

/* This is the P5 setup function */
function setup() {
  canvas = createCanvas(400,400);
  canvas.parent('canvas_div')
  background(0);

  //this line handles the Canvas drop
  canvas.drop(loadImgCanvas)

  //The lines below handle the <p> container drops
  container = select("#imgcontainer");

  container.dragOver(() => {
    container.style("background-color", "#888")
  });

  container.dragLeave(() => {
    container.style("background-color", "#fff");
  });

  container.drop(load_img, clear_container);
}

/* Handle the Canvas drops
 * Differently from the paragraph drop (<img>), here we need
 * the image data, so we first download the image then show
 * it inside the Canvas, using a callback.
 * In the paragraph case we are creating an <img> tag, so the
 * browser will download the image, but here we need to download
 * it ourselves to show it in the canvas.
*/
function loadImgCanvas(file) {
  loadImage(file.data, (img) => {
    resizeCanvas(500,img.height*500/img.width);
    image(img,0,0, width, height);
    createP(file.name);
  });  
}

/* Handle the paragraph drops 
 * The "file" variable is not the binary images.
 * It only contains the image information, like the 
 * address, name, etc.
*/
function load_img(file) {
  p = createP(file.name + " " + file.size);
  p.parent('canvas_div');
  
  //The "createImg" is a P5 function that creates a "img" DOM
  //element. We could do it using raw javascript, but it's
  //cleaner with P5.
  var img = createImg(file.data, file.name);
  img.size(200,200);
  img.parent('canvas_div');
}

/* When the image is dropped we need this function to change
 * the color, because there is no "leave" in this case.
*/
function clear_container() {
  container.style("background-color", "#fff");
}
