// Function to sanitize user input by escaping special characters
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;")
                .replace(/&/g, "&amp;");
}

// Add event listener to form submission
document.getElementById('secureForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the values from the form
    const firstName = sanitizeInput(document.getElementById('firstName').value.trim());
    const lastName = sanitizeInput(document.getElementById('lastName').value.trim());
    const email = sanitizeInput(document.getElementById('email').value.trim());
    const phone = sanitizeInput(document.getElementById('phone').value.trim());
    const password = sanitizeInput(document.getElementById('password').value);
    const confirmPassword = sanitizeInput(document.getElementById('confirmPassword').value);

    // Check for empty fields
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address.');
      return;
    }

    // Validate phone number (check for exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit number.');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Confirm submission
    alert('Form submitted successfully!');
});
