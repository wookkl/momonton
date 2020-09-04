const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  clock = document.querySelector(".js-clock"),
  greetToDoForm = document.querySelector(".js-toDoForm"),
  greetToDoList = document.querySelector(".js-toDoList");
const USER_LS = "currentUser",
  SHOWING_ON = "showing";
SHOWING_ON_FLEX = "showing-flex";
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
function askForName() {
  form.classList.add(SHOWING_ON_FLEX);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  greetToDoList.classList.add(SHOWING_ON_FLEX);
  greetToDoForm.classList.add(SHOWING_ON_FLEX);
  form.classList.remove(SHOWING_ON_FLEX);
  greeting.classList.add(SHOWING_ON);
  clock.classList.add(SHOWING_ON);
  greeting.innerText = `Hello, ${text}.`;
}
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
}
init();
