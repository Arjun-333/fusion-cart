document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Add animation on focus to input fields
  usernameInput.addEventListener("focus", function () {
    this.parentElement.style.borderColor = "#ff7e5f";
  });

  usernameInput.addEventListener("blur", function () {
    this.parentElement.style.borderColor = "#ddd";
  });

  passwordInput.addEventListener("focus", function () {
    this.parentElement.style.borderColor = "#ff7e5f";
  });

  passwordInput.addEventListener("blur", function () {
    this.parentElement.style.borderColor = "#ddd";
  });

  // Form submission
  const form = document.querySelector(".login-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate fields before submitting (Basic validation)
    if (usernameInput.value === "" || passwordInput.value === "") {
      alert("Please fill in both fields!");
    } else {
      // You can make an API call here to log the user in, or simply submit the form
      alert("Logged in successfully!");
      // form.submit(); // Uncomment this to submit the form normally
    }
  });
});
