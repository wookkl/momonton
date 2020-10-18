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

function deleteFinishedTodo(todo) {
  const btn = todo;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinishedTodos = finishedToDos.filter(function (todo) {
    return todo.id !== parseInt(li.id, 10);
  });
  finishedToDos = cleanFinishedTodos;
  saveToDos(FINISHED_LS, finishedToDos);

}

function rePendingTodo(event) {
  deleteFinishedTodo(event.target);
  paintPendingTodo(event.target.parentNode.firstChild.innerText);
}

function handleDeleteFinishedToDo(event) {
  deleteFinishedTodo(event.target);
}

function paintFinishedToDo(text) {
  const li = document.createElement("li");
  const rePendingBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finishedToDos.length + 1;
  rePendingBtn.innerHTML = "🔙";
  rePendingBtn.addEventListener("click", rePendingTodo);
  delBtn.innerHTML = "X";
  delBtn.addEventListener("click", handleDeleteFinishedToDo);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(rePendingBtn);
  li.appendChild(delBtn);
  li.id = newId;
  finishedList.append(li);

  const toDoObj = {
    text: text,
    id: newId,
  };

  finishedToDos.push(toDoObj);
  saveToDos(FINISHED_LS, finishedToDos);
}

function finishedTodo(event) {
  deletePendingToDo(event.target);
  paintFinishedToDo(event.target.parentNode.firstChild.innerText);
}


function deletePendingToDo(todo) {
  const btn = todo;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanToDos = pendingToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingToDos = cleanToDos;
  saveToDos(PENDING_LS, pendingToDos);
}

function handleDeletePendingToDo(event) {
  deletePendingToDo(event.target);
}

function paintPendingTodo(text) {
  const li = document.createElement("li");
  const finishedBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = pendingToDos.length + 1;
  finishedBtn.innerHTML = "V";
  finishedBtn.addEventListener("click", finishedTodo);
  delBtn.innerHTML = "X";
  delBtn.addEventListener("click", handleDeletePendingToDo);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(finishedBtn);
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

function loadToDos(status) {
  const loadedToDos = localStorage.getItem(status);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      if (status === PENDING_LS) {
        paintPendingTodo(toDo.text);
        toDoForm.classList.remove();
      }
      else {
        paintFinishedToDo(toDo.text);
        toDoForm.classList.remove();
      }
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPendingTodo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos(PENDING_LS);
  loadToDos(FINISHED_LS);

  toDoForm.addEventListener("submit", handleSubmit);
}

init();
