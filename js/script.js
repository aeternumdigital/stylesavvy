document.addEventListener('DOMContentLoaded', bootstrapInit);

function bootstrapInit() {
    // badge
    const badge = document.querySelector('.cart__badge');
    const currentCartStore = localStorage.getItem('cart');

    if (badge && currentCartStore) {
        const currentCart = JSON.parse(currentCartStore);
        const totalCartCount = currentCart.reduce((acc, item) => {
            acc = acc + item.count;
            return acc;
        }, 0);

        badge.innerHTML = totalCartCount;
    }

    const emails = document.querySelectorAll('.email-text');

    if (emails) {
        emails.forEach((email) => {
            email.innerText = 'info@' + location.hostname;
        });
    }

    const swipers = document.querySelectorAll('.swiper');

    if (swipers) {
        swipers.forEach(function (swiper) {
            let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
            new Swiper(swiper, config);
        });
    }
}
