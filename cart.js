let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, name, price) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
}

function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartIcon.textContent = itemCount;
    }
}

function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (cartItemsElement) {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()} تومان</span>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})">حذف</button>
            `;
            cartItemsElement.appendChild(itemElement);

            total += item.price * item.quantity;
        });

        if (totalElement) {
            totalElement.textContent = total.toLocaleString() + ' تومان';
        }
    }
}

function sendToTelegram(message) {
    return new Promise((resolve, reject) => {
        const botToken = '6554434146:AAHNahL_2YGrlzmm-vvVwVikgf5mpheQoMk';
        const chatId = '5619969053';
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const data = {
            chat_id: chatId,
            text: message
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.ok) {
                resolve();
            } else {
                reject(new Error('پیام ارسال نشد'));
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

function checkInternetConnection() {
    return navigator.onLine;
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
    displayCart();

    const form = document.getElementById('customer-info-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!checkInternetConnection()) {
                alert('لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.');
                return;
            }

            const name = document.getElementById('customer-name').value;
            const phone = document.getElementById('customer-phone').value;
            const postcode = document.getElementById('customer-postcode').value;
            const address = document.getElementById('customer-address').value;

            let message = `سفارش جدید:\n\n`;
            message += `نام: ${name}\n`;
            message += `شماره تماس: ${phone}\n`;
            message += `کد پستی: ${postcode}\n`;
            message += `آدرس: ${address}\n\n`;
            message += `محصولات:\n`;

            cart.forEach(item => {
                message += `${item.name} - تعداد: ${item.quantity} - قیمت: ${item.price.toLocaleString()} تومان\n`;
            });

            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            message += `\nجمع کل: ${total.toLocaleString()} تومان`;

            try {
                await sendToTelegram(message);
                alert('سفارش شما با موفقیت ثبت شد. لطفاً منتظر تماس ما باشید.');
                cart = [];
                updateCart();
                form.reset();
            } catch (error) {
                console.error('خطا در ارسال پیام:', error);
                alert('متأسفانه در ثبت سفارش مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
            }
        });
    }
});