// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");
const btnSair = document.getElementById("btn-sair");
let oldInputValue;


// Funções
const saveTodo = (text, done = 0, save = 1) => {
  const todo = document.createElement("div");
  todo.classList.add("todo", "mb-2", "p-2", "border");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("btn", "btn-success", "me-2");
  doneBtn.innerHTML = '<i class="fas fa-check"></i> Concluir';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-primary", "me-2");
  editBtn.innerHTML = '<i class="fas fa-edit"></i> Editar';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Excluir';
  todo.appendChild(deleteBtn);

  // Utilizando dados da localStorage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }

  todoList.appendChild(todo);

  todoInput.value = "";
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      // Utilizando dados da localStorage
      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    if (filterValue === "all") {
      todo.style.display = "flex";
    } else if (filterValue === "done" && todo.classList.contains("done")) {
      todo.style.display = "flex";
    } else if (filterValue === "todo" && !todo.classList.contains("done")) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest(".todo");
  let todoTitle;

  if (parentEl) {
    todoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("btn-success")) {
    parentEl.classList.toggle("done");
    updateTodoStatusLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("btn-danger")) {
    parentEl.remove();

    removeTodoLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("btn-primary")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
  const search = e.target.value;
  getSearchedTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchInput.dispatchEvent(new Event("keyup"));
});

filterSelect.addEventListener("change", (e) => {
  const filterValue = e.target.value;
  filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();
  const filteredTodos = todos.filter((todo) => todo.text != todoText);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();
  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();
  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );
  localStorage.setItem("todos", JSON.stringify(todos));
};


btnSair.addEventListener("click", () => {
  window.location.href = "../../index.html";
});

loadTodos();
