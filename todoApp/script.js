// Define the initial todo list
let todos = [
  { id: 1, description: "learn HTML", done: false },
  { id: 2, description: "learn JS", done: false },
  { id: 3, description: "learn CSS", done: false },
];

// Function to display todos
function displayTodos(filter = "All") {
  // Get the element where we'll display the todos
  const todoList = document.querySelector("#todo-list");

  // Clear the existing content
  todoList.innerText = "";

  // Filter todos based on the selected filter
  let filteredTodos;
  if (filter === "Open") {
    filteredTodos = todos.filter((todo) => !todo.done);
  } else if (filter === "Done") {
    filteredTodos = todos.filter((todo) => todo.done);
  } else {
    filteredTodos = todos;
  }
  console.log(filteredTodos);

  // Iterate through each todo item
  filteredTodos.forEach((todo) => {
    // Create a list item element
    const li = document.createElement("li");

    // Create a checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // Set the checked status based on the todo's done property
    checkbox.checked = todo.done;
    checkbox.id = "todo-" + todo.id;
    //jedes Element braucht ein label mit for-Atribute (dieses zeigt auf die ID des input-Elements)
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    li.append(checkbox, label);
    todoList.append(li);

    // Set an event listener to update the todo's done property when the checkbox is toggled
    checkbox.addEventListener("change", function () {
      todo.done = this.checked;
      displayTodos(filter); // Update the display after todo is toggled
    });

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    // Add event listener to the delete button
    deleteButton.addEventListener("click", function () {
      deleteTodo(todo.id);
      console.log(deleteButton);
    });

    // Set the text content of the list item to the todo text
    li.textContent = todo.description;
    li.prepend(checkbox); // Prepend the checkbox to the list item
    li.appendChild(deleteButton);
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
// Function to delete a todo by ID
function deleteTodo(todoId) {
  // Filter out the todo with the specified ID and update the todos array
  todos = todos.filter((todo) => todo.id !== todoId);
  // Update the display to reflect the changes
  displayTodos();
  // Nachdem das Todo gelöscht wurde, speichern Sie den Zustand im Local Storage
}

// Event listener for the filter radio buttons
document.querySelectorAll('input[name="filter"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    // Pass the selected filter value to displayTodos function
    displayTodos(this.value);
  });
});

// Function to remove all todos
function removeAllTodos() {
  todos = []; // Clear the todos array
  displayTodos(); // Update the display
}

// Call the displayTodos function to initially display the todos
displayTodos();
