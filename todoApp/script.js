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

// Call the displayTodos function to initially display the todos
displayTodos();
