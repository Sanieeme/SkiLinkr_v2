// Display the sign-up modal
function displaySignupModal() {
  document.getElementById('signupModal').style.display = 'block';
}

// Close the sign-up modal
function closeSignupModal() {
  document.getElementById('signupModal').style.display = 'none';
}

// Display the login modal
function displayLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}

// Close the login modal
function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

// Close the modals when clicking outside of them
window.onclick = function(event) {
  if (event.target == document.getElementById('signupModal')) {
    document.getElementById('signupModal').style.display = 'none';
  } else if (event.target == document.getElementById('loginModal')) {
    document.getElementById('loginModal').style.display = 'none';
  }
}
