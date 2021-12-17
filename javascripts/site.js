// This is where it all goes :)
window.onload = function() {
  setCopyrightContent();

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav > ul");
  hamburger.addEventListener("click", mobileMenu);
  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
	function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
	}
}

function setCopyrightContent() {
  var currentYear = new Date().getFullYear();
  var copyrightElement = document.getElementById('copyrightYear');
  copyrightElement.textContent = currentYear;
}

