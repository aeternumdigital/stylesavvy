document.addEventListener('DOMContentLoaded', renderCartItems);

function renderCartItems() {
    const cartList = document.querySelector('.cart__items');
    const currentCartStore = localStorage.getItem('cart');
    const currentCart = currentCartStore ? JSON.parse(currentCartStore) : null;

    if (currentCart && currentCart.length) {
        for (const cartItem of currentCart) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart__item';

            const itemDescDiv = document.createElement('div');
            itemDescDiv.className = 'cart__item_desc';
            itemDescDiv.innerHTML = `${cartItem.name}`;
            itemDiv.appendChild(itemDescDiv);

            const itemCountDiv = document.createElement('div');
            itemCountDiv.className = 'cart__item_count';
            itemCountDiv.innerHTML = `${cartItem.count}`;
            itemDiv.appendChild(itemCountDiv);

            const itemRemoveDiv = document.createElement('div');
            itemRemoveDiv.className = 'cart__item_remove';

            const itemRemoveButton = document.createElement('button');
            itemRemoveButton.innerText = 'X';

            itemRemoveButton.addEventListener('click', () => {
                removeCartItem(cartItem);
            });

            itemRemoveDiv.appendChild(itemRemoveButton);

            itemDiv.appendChild(itemRemoveDiv);

            // append cart item elem
            cartList.appendChild(itemDiv);
        }
    }
}

function removeCartItem(item) {
    const currentCartStore = localStorage.getItem('cart');
    const currentCart = JSON.parse(currentCartStore);

    const thisItemInCart = currentCart.find((i) => i.id === item.id);

    // badge
    const badge = document.querySelector('.cart__badge');
    badge.innerHTML = Number(badge.innerHTML) - 1;

    if (thisItemInCart.count > 1) {
        const updatedCount = thisItemInCart.count - 1;
        const updatedItemCount = { ...thisItemInCart, count: updatedCount };
        const updatedCart = currentCart.map((i) => (i.id === item.id ? updatedItemCount : i));

        // update count
        const itemCountDiv = document.querySelector('.cart__item_count');
        itemCountDiv.innerHTML = `${updatedCount}`;

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
        const updatetCart = currentCart.map((i) => (i.id === item.id ? null : i)).filter((i) => i);

        localStorage.setItem('cart', JSON.stringify(updatetCart));
    }

    // remove rendered cart
    document.querySelector('.cart__items').innerHTML = '';

    // render new cart
    renderCartItems();
}
