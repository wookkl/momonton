const wiseSaying = document.querySelector(".js-wiseSaying");
const WISESAYING_NUMBER = 3;
const wiseSayings = [
  `“Keep smiling, because life is a beautiful thing and there's so much to smile about."`,
  `"No pain No gain."`,
  `"Knowledge in youth is wisdom in age."`,
];
function paintWiseSaying(wiseSayingNumber) {
  const span = document.createElement("span");
  span.innerText = wiseSayings[wiseSayingNumber];
  wiseSaying.appendChild(span);
}
function genRandom() {
  const number = Math.floor(Math.random() * WISESAYING_NUMBER);
  return number;
}
function init() {
  const randomNumber = genRandom();
  paintWiseSaying(randomNumber);
}

init();
