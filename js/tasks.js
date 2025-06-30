let tasks = [];

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
  renderTasks();
  updateCount();
}

function completeTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = !task.completed;
    console.log(task);
    renderTasks();
    updateCount();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id != id);
  renderTasks();
  updateCount();
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

document.addEventListener("DOMContentLoaded", function () {
  renderTasks();
});
