// This is where it all goes :)
window.onload = function() {
  setCopyrightContent();

  const navToggle = document.getElementById("navToggle");
  navToggle.addEventListener('click', toggleNav)
}

function setCopyrightContent() {
  var currentYear = new Date().getFullYear();
  var copyrightElement = document.getElementById('copyrightYear');
  copyrightElement.textContent = currentYear;
}

function toggleNav() {
  var navLinks = document.getElementById("navLinks");
  if (navLinks.style.display === "block") {
    navLinks.style.display = "none";
    return;
  }

  navLinks.style.display = "block";
}
