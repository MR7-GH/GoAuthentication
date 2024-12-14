document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data as JSON
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Send request to the server
        const response = await fetch('localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Check server response
        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                // Redirect to another page
                window.location.href = '/success-page';
            } else {
                // Show error message
                alert(result.message || 'Invalid input. Please try again.');
            }
        } else {
            alert('Server error. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to the server.');
    }
});