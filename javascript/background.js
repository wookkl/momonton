const body = document.querySelector("body");
const IMG_NUMBER = 5;
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `https://source.unsplash.com/random/1600x900`;
  image.classList.add("bgImage");
  body.appendChild(image);
}
function init() {
  paintImage();
}
init();
