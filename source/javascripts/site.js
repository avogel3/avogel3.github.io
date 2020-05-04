// This is where it all goes :)
window.onload = function() {
  setCopyrightContent()
}


function setCopyrightContent() {
  var currentYear = new Date().getFullYear();
  var copyrightElement = document.getElementById('copyright');
  copyrightElement.textContent = "© 2018-" + currentYear + " Andrew Vogel"
}