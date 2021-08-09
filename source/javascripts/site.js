// This is where it all goes :)
window.onload = function() {
  setCopyrightContent();
}


function setCopyrightContent() {
  var currentYear = new Date().getFullYear();
  var copyrightElement = document.getElementById('copyrightYear');
  copyrightElement.textContent = currentYear;
}
