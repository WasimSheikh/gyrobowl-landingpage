// Set the launch date
const launchDate = new Date('November 1, 2025 00:00:00').getTime();

// Update countdown every second
const timer = setInterval(() => {
    // Get current date and time
    const now = new Date().getTime();
    
    // Find the time remaining
    const timeRemaining = launchDate - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update the DOM
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    // If launch date is reached
    if (timeRemaining < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = '<h2>We are now open!</h2>';
    }
}, 1000);

// Handle notification form submission
document.getElementById('notify-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert('Thank you for your interest! We will notify you when we launch.');
    this.reset();
}); 