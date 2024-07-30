// Get cart from local storage
const cart = JSON.parse(localStorage.getItem('cart')) || {}; 

// Fetch menu items (you may want to have a separate 'getCartItems' route on your backend)
fetch('/api/menu') // Replace with your actual endpoint
    .then(response => response.json())
    .then(menuItems => {
        // Update global menuItems variable
        window.menuItems = menuItems; // Make it available globally

        // Get cart items from local storage
        const cartItems = Object.keys(cart).map(itemId => {
            const item = menuItems.find(item => item.id === parseInt(itemId));
            return {
                ...item,
                quantity: cart[itemId].quantity
            };
        });

        displayCartItems(cartItems);
        updateTotal(); 
    })
    .catch(error => console.error('Error fetching menu items:', error));

function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}

function updateTotal() {
    let total = 0;
    for (const itemId in cart) {
        total += menuItems.find(item => item.id === parseInt(itemId)).price * cart[itemId].quantity;
    }
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

// Add event listener for "Place Order" button
const placeOrderButton = document.getElementById('place-order');
placeOrderButton.addEventListener('click', () => {
    // 1. Handle the order submission (e.g., send the cart data to your backend)
    const orderData = Object.keys(cart).map(itemId => ({
        id: itemId,
        quantity: cart[itemId].quantity
    }));
    fetch('/api/orders', { // Replace with your actual endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (response.ok) {
            // 2. Clear the cart in local storage
            localStorage.removeItem('cart');

            // 3. Redirect the user (e.g., to an order confirmation page)
            window.location.href = '/order-confirmation.html'; // Replace with your confirmation page
        } else {
            console.error('Error placing order:', response.statusText);
            // Handle error (e.g., display an error message)
        }
    })
    .catch(error => console.error('Error placing order:', error));
});