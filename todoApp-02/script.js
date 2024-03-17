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
    /*  Generate a unique ID for the new todo - auch kann mann mit ternary Opperator
    const newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;*/

    // Create a new todo object
    const newTodo = {
      description: todoText,
      done: false,
      //Generate unique ID for the new todo
      id: generateId(), // newTodo (das kommt vom ternary operator)//Math.floor(Math.random() * 999999999 * Date.now()),
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

function generateId() {
  // Check if todos array is not empty
  if (todos.length > 0) {
    // If not empty, return ID of the last todo incremented by 1
    return todos[todos.length - 1].id + 1;
  } else {
    // If empty, return 1 as the default ID
    return 1;
  }
}
renderTodoList();
