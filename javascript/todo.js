const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  lists = document.querySelectorAll(".js-toDoList");
const pendingList = lists[0];
const finishedList = lists[1];
const PENDING_LS = "pending",
  FINISHED_LS = "finished";

let pendingToDos = [],
  finishedToDos = [];

function saveToDos(status, toDos) {
  localStorage.setItem(status, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanToDos = pendingToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingToDos = cleanToDos;
  saveToDos();
}

function paintPendingTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pendingToDos.length + 1;
  delBtn.innerHTML = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  pendingList.append(li);

  const toDoObj = {
    text: text,
    id: newId,
  };

  pendingToDos.push(toDoObj);
  saveToDos(PENDING_LS, pendingToDos);
}

function loadPendingToDos() {
  const loadedToDos = localStorage.getItem(PENDING_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintPendingTodo(toDo.text);
      toDoForm.classList.remove();
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadPendingToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
