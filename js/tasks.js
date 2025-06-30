let tasks = [];

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  tasks = saved ? JSON.parse(saved) : [];
  return tasks;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let task = document.getElementById("task-input");
  if (!task) return;
  const text = task.value.trim();

  const taskObject = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(taskObject);
  task.value = " ";
  saveTasks();
  renderTasks();
  updateCount();
}

function completeTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = !task.completed;
    console.log(task);
    saveTasks();
    renderTasks();
    updateCount();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id != id);
  renderTasks();
  updateCount();
  saveTasks();
}

const addTaskBtn = document.getElementById("add-task-btn");
if (addTaskBtn) {
  addTaskBtn.addEventListener("click", addTask);
}

function createTaskElement(task) {
  const div = document.createElement("div");
  div.className = `task-item ${task.completed ? "completed" : ""}`;
  div.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                ${
                  !task.completed
                    ? `<button class="complete-btn" onclick="completeTask(${task.id})">
                    <i class="bx bx-check"></i>
                  </button>`
                    : ""
                }

                  <button class="delete-btn" onclick="deleteTask(${task.id})">
                    <i class="bx bx-trash"></i>
                  </button>
                </div>

  `;
  return div;
}

function renderTasks() {
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    if (!task.completed) {
      todoList.appendChild(taskElement);
    } else {
      doneList.appendChild(taskElement);
    }
  });
}

function updateCount() {
  const todoCount = document.getElementById("todo-count");
  const doneCount = document.getElementById("done-count");

  const incompleteTasks = tasks.filter((task) => !task.completed).length;
  const completeTasks = tasks.filter((task) => task.completed).length;

  todoCount.textContent = incompleteTasks;
  doneCount.textContent = completeTasks;
  //   let pending = tasks.filter((task)=>)

  updateDashboardCounts(incompleteTasks, completeTasks, 9);
}

function updateDashboardCounts(current, completed, pending) {
  const cards = document.querySelectorAll(".status-cards .cards p");

  cards[0].textContent = completed;
  cards[1].textContent = current;
  cards[2].textContent = pending;
}

function initTasks() {
  loadTasks();
  renderTasks();
  updateCount();
}

document.addEventListener("DOMContentLoaded", initTasks);
