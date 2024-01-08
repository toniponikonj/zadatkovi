let tasks = [];
let editModal = null;

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskValue = taskInput.value.trim();

  if (taskValue !== "") {
    const task = {
      text: taskValue,
      date: new Date().toLocaleString(),
    };
    tasks.push(task);
    saveTasksToLocalStorage();
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

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const taskText = document.createElement("span");
    taskText.textContent = `${task.text}`;
    taskText.classList.add("task-text");
    taskInfo.appendChild(taskText);

    const taskDate = document.createElement("span");
    taskDate.textContent = `Created: ${task.date}`;
    taskDate.classList.add("task-date");
    taskInfo.appendChild(taskDate);

    taskDiv.appendChild(taskInfo);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = () => openEditModal(index);
    buttonsDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => openModal(index);
    buttonsDiv.appendChild(deleteButton);

    taskDiv.appendChild(buttonsDiv);

    tasksContainer.appendChild(taskDiv);
  });
}

function openEditModal(index) {
  if (editModal !== null) {
    closeModal(editModal);
    editModal = null;
  }

  const modal = document.getElementById("modal");
  modal.style.display = "block";
  editModal = modal;

  const taskInput = document.createElement("input");
  taskInput.value = tasks[index].text;
  modal.innerHTML = "";
  modal.appendChild(taskInput);

  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  updateButton.onclick = () => updateTask(index, taskInput.value);
  modal.appendChild(updateButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.onclick = () => closeModal(modal);
  modal.appendChild(cancelButton);

  const closeModalButton = document.createElement("span");
  closeModalButton.innerHTML = "&times;";
  closeModalButton.classList.add("todo-close");
  closeModalButton.onclick = () => closeModal(modal);
  modal.appendChild(closeModalButton);
}

function updateTask(index, newText) {
  tasks[index].text = newText;
  renderTasks();
  closeModal(editModal);
  editModal = null;
}

function openModal(index) {
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.innerHTML = "";
  deleteModal.style.display = "block";

  const confirmDeleteButton = document.createElement("button");
  confirmDeleteButton.textContent = "Confirm Delete";
  confirmDeleteButton.onclick = () => confirmDelete(index);
  deleteModal.appendChild(confirmDeleteButton);

  const closeModalButton = document.createElement("span");
  closeModalButton.innerHTML = "&times;";
  closeModalButton.classList.add("todo-close");
  closeModalButton.onclick = () => closeModal(deleteModal);
  deleteModal.appendChild(closeModalButton);
}

function confirmDelete(index) {
  tasks.splice(index, 1);
  renderTasks();
  closeModal(document.getElementById("deleteModal"));
}

function closeModal(modal) {
  modal.style.display = "none";
  modal.innerHTML = "";
}

document.getElementById("taskInput").addEventListener("input", function () {
  const addButton = document.getElementById("addButton");
  addButton.disabled = this.value.trim() === "";
});
