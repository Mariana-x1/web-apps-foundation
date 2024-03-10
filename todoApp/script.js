// Define the initial todo list
let todos = [
  { id: 1, description: "learn HTML", done: false },
  { id: 2, description: "learn JS", done: false },
  { id: 3, description: "learn CSS", done: false },
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

// Function to display todos
function displayTodos(filter = "All") {
  // Get the element where we'll display the todos
  const todoList = document.querySelector("#todo-list");

  // Clear the existing content
  todoList.innerText = "";
  //todoList.addEventListener("submit", updateTodo); ////////////////////////////**************** */

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
    checkbox.id = "todo-" + todo.id;
    // Set the checked status based on the todo's done property
    checkbox.checked = todo.done;
    checkbox.todoObj = todo;

    //jedes Element braucht ein label mit for-Atribute (dieses zeigt auf die ID des input-Elements)
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    li.append(checkbox, label);
    todoList.append(li);

    // Create an input field for editing the description
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = todo.description;
    inputField.setAttribute("readonly", true); // Set as readonly initially

    // Create an edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editTodoDescription(inputField);
      // editTodoDescription(inputField); // Call the function to enable editing
      // inputField.removeAttribute("readonly"); // Remove readonly attribute to enable editing
      displayTodos(filter);
      // saveTodosToLocalStorage();
      console.log(editButton);
    });

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener(
      "click",
      function () {
        const newDescription = inputField.value;
        saveTodoChanges(todo.id, newDescription);
        // Save the edited text
        //// todo.description = newText;
        // inputField.setAttribute("readonly", true);
        // displayTodos(filter); // Update the display after editing
        //saveTodosToLocalStorage();
        console.log(saveButton);
      },

      // Set an event listener to update the todo's done property when the checkbox is toggled
      checkbox.addEventListener("change", function () {
        todo.done = this.checked;
        if (this.checked) {
          // Wenn die Checkbox überprüft ist, fügen Sie die Klasse 'done' hinzu, um den Text durchzustreichen
          // li.classList.add(".done");
          //li.style.textDecoration = "line-through";
        } else {
          // Wenn die Checkbox nicht überprüft ist, entfernen Sie die Klasse 'done'
          // li.classList.remove("done");
          //li.style.textDecoration = "none";
        }
        displayTodos(filter); // Update the display after todo is toggled
        saveTodosToLocalStorage();
      })
    );

    // const editButton = document.createElement("button2");
    // editButton.textContent = "Edit";
    // editButton.addEventListener("click", function () {
    //   editTodo(todo.id);
    //   console.log(editButton);
    // });
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
    li.appendChild(editButton);
    li.appendChild(saveButton);
    // Append the list item to the todo list element
    todoList.appendChild(li);
  });
}

// Event listener for form submission
const todoForm = document.querySelector("#todo-form");
todoForm.addEventListener("submit", addTodo);

// Function to add a new todo
function addTodo(event) {
  event.preventDefault();
  // Get the input field for the todo
  const todoInput = document.querySelector("#todo-input");
  // const todoForm = document.querySelector("#todo-form");
  // Get the trimmed value of the input field (trim trailing spaces)
  const todoText = todoInput.value.trim();
  // Check if the input field is not empty
  if (todoText !== "") {
    // Check for duplicate todos (case-insensitive)
    const isDuplicate = todos.some(
      (todo) => todo.description.toLowerCase() === todoText.toLowerCase()
    );

    if (!isDuplicate) {
      // Create a new todo object with the input text and default 'done' status
      const newTodo = {
        id: generateId(), //Math.floor(Math.random() * 999999999 * Date.now()), // konnen auch id so generieren.
        description: todoText,
        done: false,
      };
      // Add the new todo to the todos array
      todos.push(newTodo);
      // Update the display to reflect the changes
      displayTodos();
      // Clear the input field after adding the todo
      todoInput.value = "";
      // Save todos to Local Storage
      saveTodosToLocalStorage();
    } else {
      // Inform the user that the todo is a duplicate
      alert("Todo already exists!");
    }
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

function updateTodo(event) {
  const updateTodo = event.target.todoObj;
  updateTodo.done = !updateTodo.done;
  console.dir(updateTodo);
}

function saveTodoChanges(todoId, newDescription) {
  // Find the todo in the todos array based on its ID
  const todoToUpdate = todos.find((todo) => todo.id === todoId);
  if (todoToUpdate) {
    // Update the description of the todo
    todoToUpdate.description = newDescription;
    // Save todos to Local Storage
    // Update the display
    displayTodos();
  } else {
    console.error("Todo not found!");
  }
  saveTodosToLocalStorage();
}
function editTodoDescription(inputField) {
  inputField.removeAttribute("readonly"); // Remove readonly attribute to enable editing
}
// Function to delete a todo by ID
function deleteTodo(todoId) {
  // Filter out the todo with the specified ID and update the todos array
  todos = todos.filter((todo) => todo.id !== todoId);
  // Update the display to reflect the changes
  displayTodos();

  // Save todos to Local Storage
  saveTodosToLocalStorage();
}

// Event listener for the filter radio buttons
document.querySelectorAll('input[name="filter"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    // Pass the selected filter value to displayTodos function
    displayTodos(this.value);
  });
});

// Event listener for the "Remove All Todos" button
const removedoneButton = document.querySelector("#remove-all-btn");
removedoneButton.addEventListener("click", removedoneTodos);

// Function to remove all todos
function removedoneTodos() {
  // Filter out the done todos and update the todos array
  todos = todos.filter((todo) => !todo.done);
  // Update the display to reflect the changes
  // todos = []; // Clear the all todos array
  displayTodos(); // Update the display
  // Save todos to Local Storage
  saveTodosToLocalStorage();
}

// Load todos from Local Storage when the page is loaded
loadTodosFromLocalStorage();
// Call the displayTodos function to initially display the todos
displayTodos();
