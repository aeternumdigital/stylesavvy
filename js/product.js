const id = location.search.split('?')[1];

const xhr = new XMLHttpRequest();

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        const productData = data.find((p) => p.id === Number(id)) || null;
        renderProduct(productData);
    }
};

xhr.open('GET', '/products.json', true);

xhr.send();

function renderProduct(product) {
  const leftContaner = document.querySelector('.left');

  // image
  const productImage = document.createElement('img');
  productImage.className = 'product__image';
  productImage.src = product.preview;
  leftContaner.appendChild(productImage);

  // name
  const productName = document.querySelector('.product__name');
  productName.innerHTML = product.name;

  // price
  const productPrice = document.querySelector('.product__price');
  productPrice.innerHTML = `${product.price}${product.currency}`;

  // description
  const productDesc = document.querySelector('.product__description');
  productDesc.innerHTML = product.description;

  // preview images
  const previewWrapper = document.querySelector('.product__preview_wrapper');

  product.photos.forEach((p) => {
      const previewImage = document.createElement('img');
      previewImage.className = 'product__preview';
      previewImage.src = p;

      previewImage.addEventListener('click', changePreviewImage);

      previewWrapper.appendChild(previewImage);
  });

  // cart button
  const cartButton = document.querySelector('.product__button');
  cartButton.addEventListener('click', () => addProductToCart(product));
}

function changePreviewImage(e) {
    const previewImage = document.querySelector('.product__image');
    previewImage.src = e.target.src;
}

function addProductToCart(product) {
    const currentCartStore = localStorage.getItem('cart');

    // badge
    const badge = document.querySelector('.cart__badge');
    badge.innerHTML = Number(badge.innerHTML) + 1;

    if (!currentCartStore) {
        localStorage.setItem(
            'cart',
            JSON.stringify([
                {
                    ...product,
                    count: 1,
                },
            ])
        );
    } else {
        const currentCart = JSON.parse(currentCartStore);

        // check is item uniq
        const thisItemInCart = currentCart.find((i) => i.id === product.id);

        if (thisItemInCart) {
            const updatedItemCount = {
                ...thisItemInCart,
                count: thisItemInCart.count + 1,
            };
            const updatedCart = currentCart.map((i) => (i.id === product.id ? updatedItemCount : i));

            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            currentCart.push({
                ...product,
                count: 1,
            });
            localStorage.setItem('cart', JSON.stringify(currentCart));
        }
    }
}
