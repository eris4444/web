document.addEventListener('DOMContentLoaded', function() {
    // تبدیل تاریخ میلادی به شمسی
    const toPersianDate = (date) => {
        const persianDate = new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
        return persianDate;
    };

    // نمایش تاریخ شمسی
    const dateElement = document.getElementById('date');
    const today = new Date();
    dateElement.textContent = toPersianDate(today);

    // تنظیم عکس روز
    const dailyImage = document.getElementById('daily-image');
    const imageName = images/${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.jpg;
    dailyImage.src = imageName;
});