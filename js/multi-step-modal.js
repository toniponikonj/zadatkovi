document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "block";
});

var steps = document.querySelectorAll(".step");
var currentStep = 0;

function showStep(stepNumber) {
  steps.forEach((step) => step.classList.remove("show"));
  steps[stepNumber].classList.add("show");
  currentStep = stepNumber;
}

document.querySelectorAll(".next").forEach((btn) => {
  btn.addEventListener("click", function () {
    showStep(currentStep + 1);
  });
});

document.querySelectorAll(".previous").forEach((btn) => {
  btn.addEventListener("click", function () {
    showStep(currentStep - 1);
  });
});

document.querySelector(".finish").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "none";
});

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "none";
});

showStep(0);
