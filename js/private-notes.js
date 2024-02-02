function displayUserNotes(user) {
  const userNotes = JSON.parse(localStorage.getItem("userNotes")) || {};
  const userSpecificNotes = userNotes[user.email] || [];

  const createNoteForm = document.getElementById("create-note-form");
  const userNotesContainer = document.getElementById("main");
  userNotesContainer.innerHTML = "";
  userNotesContainer.appendChild(createNoteForm);
  userSpecificNotes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.textContent = note;
    noteElement.classList.add("note");
    userNotesContainer.appendChild(noteElement);
  });
}

function createNote(event) {
  event.preventDefault();

  const noteInput = document.getElementById("note");

  const noteElement = document.createElement("div");
  noteElement.textContent = noteInput.value;
  noteElement.classList.add("note");

  const user = JSON.parse(localStorage.getItem("user"));
  const userNotes = JSON.parse(localStorage.getItem("userNotes")) || {};
  userNotes[user.email] = userNotes[user.email] || [];
  userNotes[user.email].push(noteInput.value);
  localStorage.setItem("userNotes", JSON.stringify(userNotes));

  noteInput.value = "";

  displayUserNotes(user);
}

document.addEventListener("DOMContentLoaded", () => {
  checkLoggedInUser();
});

function checkLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navbar = document.getElementById("navbar");
  if (user) {
    showNotesContainer(user);
    navbar.style.display = "block";
    displayUserNotes(user);
  } else {
    document.getElementById("login-form").style.display = "block";
    navbar.style.display = "none";
  }
}

function login() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const users = [
    { name: "Sava", email: "sava@gmail.com", password: "krosnja123" },
    { name: "Toni", email: "toni@gmail.com", password: "mojmaliponi" },
  ];

  const user = users.find(
    (u) => u.email === emailInput.value && u.password === passwordInput.value
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    showNotesContainer(user);
  } else {
    alert("Invalid email or password");
  }
}

function showNotesContainer(user) {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("notes-container").style.display = "flex";
  document.getElementById("user-name").innerText = user.name;
  document.getElementById("navbar").style.display = "block";
  displayUserNotes(user);
}

function logout() {
  localStorage.removeItem("user");
  document.getElementById("notes-container").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("navbar").style.display = "none";
}
