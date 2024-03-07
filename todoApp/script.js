// Define the initial todo list
let todos = [
  { description: "learn HTML", done: false },
  { description: "learn JS", done: false },
  { description: "learn CSS", done: false },
];

// Function to display todos
function displayTodos() {
  // Get the element where we'll display the todos
  const todoList = document.querySelector("#todo-list");

  // Clear the existing content
  todoList.innerText = "";

  // Iterate through each todo item
  todos.forEach((todo) => {
    // Create a list item element
    const li = document.createElement("li");

    // Set the text content of the list item to the todo text
    li.textContent = todo.description;

    // Append the list item to the todo list element
    todoList.appendChild(li);
  });
}

// Function to add a new todo
function addTodo() {
  // Get the input field for the todo
  const todoInput = document.querySelector("#todo-input");
  // Get the trimmed value of the input field (trim trailing spaces)
  const todoText = todoInput.value.trim();
  // Check if the input field is not empty
  if (todoText !== "") {
    // Create a new todo object with the input text and default 'done' status
    const newTodo = {
      description: todoText,
      done: false,
    };
    // Add the new todo to the todos array
    todos.push(newTodo);
    // Update the display to reflect the changes
    displayTodos();
    // Clear the input field after adding the todo
    todoInput.value = "";
  }
}

// Call the displayTodos function to initially display the todos
displayTodos();
