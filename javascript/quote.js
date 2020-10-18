const quote = document.querySelector(".js-quote");
const QUOTE_NUMBER = 1643;

function paintQuote(q) {
  const span = document.createElement("span");
  quote.innerHTML = `"${q.text}" - ${q.author}`;
  quote.appendChild(span);
}

function genRandom() {
  const number = Math.floor(Math.random() * QUOTE_NUMBER);
  return number;
}

function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      paintQuote(data[genRandom()]);
    });
}

function init() {
  getQuote();
}

init();
