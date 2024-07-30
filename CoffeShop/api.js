// Example using fetch API
fetch('http://localhost:5000/api/menu')
    .then(response => response.json())
    .then(data => {
        console.log('Menu:', data);
        // Update UI with the fetched data
    })
    .catch(error => console.error('Error fetching menu:', error));
