document.addEventListener('DOMContentLoaded', function () {
    localStorage.clear(); // Clear local storage on page load

    const addToCartButtons = document.querySelectorAll('.addToCart');
    const cartTableBody = document.querySelector('#cart tbody');
    const totalPriceElement = document.getElementById('totalPrice');
    const resetCartButton = document.getElementById('resetCart');
    const alertContainer = document.getElementById('alert-container');
    const addToFavouritesButton = document.getElementById('addToFavourites');
    const applyFavouritesButton = document.getElementById('applyFavourites');

    let cart = [];

    function updateCartTable() {
        cartTableBody.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            const itemNameCell = document.createElement('td');
            const quantityCell = document.createElement('td');
            const priceCell = document.createElement('td');

            itemNameCell.textContent = item.name;
            quantityCell.textContent = item.quantity;
            priceCell.textContent = 'Rs. ' + (item.quantity * item.price).toFixed(2);

            row.appendChild(itemNameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);
            cartTableBody.appendChild(row);

            total += item.quantity * item.price;
        });

        totalPriceElement.textContent = 'Rs. ' + total.toFixed(2);
    }

    
    function showAlert() {
        alertContainer.style.display = 'block';
        setTimeout(() => {
            alertContainer.style.display = 'none';
        }, 3000);
    }

    function addToCart(event) {
        const itemElement = event.target.closest('.item');
        const itemName = itemElement.querySelector('.item-name').textContent;
        const itemPrice = parseFloat(itemElement.querySelector('.item-price').textContent.replace('Rs. ', ''));
        const itemQuantity = parseFloat(itemElement.querySelector('input[type="number"]').value);

        if (isNaN(itemQuantity) || itemQuantity <= 0) {
            alert('Please enter a valid quantity');
            return;
        }

        const existingItemIndex = cart.findIndex(item => item.name === itemName);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += itemQuantity;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
        }

        updateCartTable();
        showAlert();
    }

    function resetCart() {
        cart = [];
        updateCartTable();
    }

    function saveToFavourites() {
        localStorage.setItem('favourites', JSON.stringify(cart));
        alert('Cart saved to favourites');
    }

    function applyFavourites() {
        const favourites = JSON.parse(localStorage.getItem('favourites'));
        if (favourites && favourites.length > 0) {
            cart = favourites;
            updateCartTable();
            alert('Applying favourites to cart');
        } else {
            alert('No favourites found');
        }
    }

    document.getElementById('buyNow').addEventListener('click', function() {
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart before navigating
        window.location.href = 'order.html';
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    resetCartButton.addEventListener('click', resetCart);
    addToFavouritesButton.addEventListener('click', saveToFavourites);
    applyFavouritesButton.addEventListener('click', applyFavourites);
});
