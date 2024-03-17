const todoList = document.querySelector("#todo-list");

const todoForm = document.querySelector("#todo-form");
const newTodoInput = document.querySelector("#new-todo-input");

// Definiere den Anfangszustand der Anwendung
let todos = [
  { description: "learn HTML", done: false, id: 1 },
  { description: "learn JS", done: false, id: 2 },
  { description: "learn CSS", done: false, id: 3 },
];

// Event listener for submitting new todo
todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  const todoText = newTodoInput.value.trim(); // Get the trimmed value from the input field
  // Check if the input field is not empty
  if (todoText !== "") {
    // Create a new todo object
    const newTodo = {
      description: todoText,
      done: false,
      id: todos.length + 1, // Generate unique ID for the new todo
    };

    // Add the new todo to the list of todos
    todos.push(newTodo);

    // Clear the input field
    newTodoInput.value = "";

    // Render the updated todo list
    renderTodoList();
  }
});

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
