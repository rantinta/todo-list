// Globals
const todoList = document.getElementById("todo-list");
let todos = [];
let users = [];

// Atach events
document.addEventListener("DOMContentLoaded", initApp);

// Basic logic
function getUserName(userId) {
  const user = users.find((u) => u.id === userId);
  return user.name;
}

function printTodo({ userId, id, title, completed }) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = id;
  li.innerHTML = `<span> ${title} <i>by</i> <b>${getUserName(
    userId
  )}</b></span>`;

  const status = document.createElement("input");
  status.type = "checkbox";
  status.checked = completed;

  const close = document.createElement("span");
  close.innerHTML = "&times";
  close.className = "close";

  li.prepend(status);
  li.append(close);

  todoList.prepend(li);
}

// Event logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;
    todos.forEach((todo) => {
      printTodo(todo);
    });
  });
}

// Async logic
async function getAllUsers() {
  const responce = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await responce.json();
  return data;
}

async function getAllTodos() {
  const responce = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await responce.json();
  return data;
}
