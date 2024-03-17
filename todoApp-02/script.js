const todoList = document.querySelector("#todo-list");

// Definiere den Anfangszustand der Anwendung
let todos = [
  { description: "learn HTML", done: false, id: 1 },
  { description: "learn JS", done: false, id: 2 },
  { description: "learn CSS", done: false, id: 3 },
];

// Funktion zum Rendern der Todo-Liste
function renderTodoList() {
  // Leere die Todo-Liste, um sie neu zu rendern
  todoList.innerText = "";

  // Gehe durch alle Todos im Anwendungsstatus und füge sie der Liste hinzu
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.textContent = todo.description;
    todoList.appendChild(todoItem);
  });
}

renderTodoList();
