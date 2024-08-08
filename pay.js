document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector('#cart tbody');
    const totalPriceElement = document.getElementById('totalPrice');
    const payButton = document.getElementById('payButton');
    const checkoutForm = document.getElementById('checkoutForm');

    function updateOrderTable(cart) {
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

    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart && cart.length > 0) {
        updateOrderTable(cart);
    } else {
        cartTableBody.innerHTML = '<tr><td colspan="3">No items in cart</td></tr>';
        totalPriceElement.textContent = 'Rs. 0.00';
    }

    function validateForm() {
        const inputs = checkoutForm.querySelectorAll('input[required]');
        for (let input of inputs) {
            if (!input.value.trim()) {
                return false;
            }
        }
        return true;
    }

    payButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (cart && cart.length > 0) {
            if (validateForm()) {
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + 7); // Assuming delivery is in 7 days
                const formattedDeliveryDate = deliveryDate.toDateString();

                alert('Thank you for your purchase! Your items will be delivered on ' + formattedDeliveryDate + '.');
            } else {
                alert('Please fill out all required fields.');
            }
        } else {
            alert('Your cart is empty. Please add items to your cart before proceeding to payment.');
        }
    });
});