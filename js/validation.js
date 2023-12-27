document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const nameInput = document.getElementById("name");
  const lastNameInput = document.getElementById("last_name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const repeatPasswordInput = document.getElementById("repeat_password");

  form.addEventListener("submit", function (event) {
    let hasError = false;

    if (!isValidName(nameInput.value)) {
      showError(nameInput, "First name requirements");
      hasError = true;
    } else {
      hideError(nameInput);
    }

    if (!isValidName(lastNameInput.value)) {
      showError(lastNameInput, "Last name requirements");
      hasError = true;
    } else {
      hideError(lastNameInput);
    }

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Email requirements");
      hasError = true;
    } else {
      hideError(emailInput);
    }

    if (!isValidPassword(passwordInput.value)) {
      showError(passwordInput, "Password requirements");
      hasError = true;
    } else {
      hideError(passwordInput);
    }

    if (passwordInput.value !== repeatPasswordInput.value) {
      showError(repeatPasswordInput, "Repeat password requirements ");
      hasError = true;
    } else {
      hideError(repeatPasswordInput);
    }

    if (!hasError) {
      alert("Success");
    } else {
      event.preventDefault(); // Prevent form submission if there are errors
    }
  });

  function isValidName(name) {
    const nameRegex = /^[A-Za-z]{2,30}$/;
    return nameRegex.test(name);
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    input.classList.add("error");
  }

  function hideError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = "";
    input.classList.remove("error");
  }
});
