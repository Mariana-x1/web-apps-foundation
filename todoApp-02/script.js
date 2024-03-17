const todoList = document.querySelector("#todo-list");

const todoForm = document.querySelector("#todo-form");
const newTodoInput = document.querySelector("#new-todo-input");

// Definiere den Anfangszustand der Anwendung
let todos = [
  { description: "learn HTML", done: false, id: 1 },
  { description: "learn JS", done: false, id: 2 },
  { description: "learn CSS", done: false, id: 3 },
];

// Load todos from Local Storage
function loadTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
}

// Save todos to Local Storage
function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listener for submitting new todo
todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  const todoText = newTodoInput.value.trim(); // Get the trimmed value from the input field
  // Check if the input field is not empty
  if (todoText !== "") {
    // Check if the todo description already exists in the list (case-insensitive)
    const isDuplicate = todos.some(
      (todo) => todo.description.toLowerCase() === todoText.toLowerCase()
    );
    if (!isDuplicate) {
      // Create a new todo object
      const newTodo = {
        description: todoText,
        done: false,
        //Generate unique ID for the new todo
        id: generateTodoId(),
      };

      // Add the new todo to the list of todos
      todos.push(newTodo);

      // Clear the input field
      newTodoInput.value = "";

      // Render the updated todo list
      saveTodosToLocalStorage();
      renderTodoList();
    } else {
      alert("Todo with this description already exists.");
    }
  }
});

// Funktion zum Rendern der Todo-Liste
function renderTodoList() {
  // Leere die Todo-Liste, um sie neu zu rendern
  todoList.innerText = "";

  // Gehe durch alle Todos im Anwendungsstatus und füge sie der Liste hinzu
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    // Add a checkbox for the done property
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done; // Set the checked state based on the todo's done property
    checkbox.addEventListener("change", function () {
      // Update the state of the corresponding todo when the checkbox is changed
      todo.done = checkbox.checked;
      saveTodosToLocalStorage(); // Save the updated todos to local storage
    });
    todoItem.appendChild(checkbox);
    //todoItem.textContent = todo.description;
    // Display the description of the todo
    const descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = todo.description;
    todoItem.appendChild(descriptionSpan);

    todoList.appendChild(todoItem);
  });
}
// Define a counter variable for generating IDs
let todoIdCounter = 1;
function generateTodoId() {
  return Date.now();
  saveTodosToLocalStorage();
}
loadTodosFromLocalStorage();
renderTodoList();
