// Define the initial todo list
let todos = [
  { id: 1, description: "learn HTML", done: false },
  { id: 2, description: "learn JS", done: false },
  { id: 3, description: "learn CSS", done: false },
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
      id: generateId(),
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

// Function to generate unique ID for todos
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

// Call the displayTodos function to initially display the todos
displayTodos();
