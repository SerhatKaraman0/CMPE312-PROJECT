document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button-group button");

  // Add event listener to each button
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle the 'selected' class on the clicked button
      this.classList.toggle("selected");
    });
  });
});
