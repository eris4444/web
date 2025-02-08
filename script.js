window.onload = function() {
    fetchContent();
};

function fetchContent() {
    fetch('content.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = `
                <h2>محتوای سایت</h2>
                <p>${data}</p>
            `;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = `
                <h2>خطا در بارگذاری محتوا</h2>
                <p>متاسفانه محتوای سایت بارگذاری نشد. لطفاً دوباره تلاش کنید.</p>
            `;
        });
}