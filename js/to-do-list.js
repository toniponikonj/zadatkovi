let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue !== "") {
    tasks.push(taskValue);
    renderTasks();
    taskInput.value = "";
    document.getElementById("addButton").disabled = true;
  }
}

function renderTasks() {
  const tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => openModal(index);

    taskDiv.appendChild(taskText);
    taskDiv.appendChild(deleteButton);
    tasksContainer.appendChild(taskDiv);
  });
}

function openModal(index) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const deleteTask = () => {
    tasks.splice(index, 1);
    renderTasks();
    closeModal();
  };

  document.getElementById("modal").onclick = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };

  document.deleteTask = deleteTask;
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

document.getElementById("taskInput").addEventListener("input", function () {
  const addButton = document.getElementById("addButton");
  addButton.disabled = this.value.trim() === "";
});
