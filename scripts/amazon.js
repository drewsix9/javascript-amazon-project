let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count} 
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-card" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

// Add the generated HTML to the products-grid
document.querySelector('.products-grid').innerHTML = productsHTML;

// Add the event listener to the add to cart button
document.querySelectorAll('.js-add-to-card').forEach((button, index) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const quantitySelectorElement = document.querySelectorAll('.product-quantity-container select')[index];
    const quantity = parseInt(quantitySelectorElement.value);

    let hasMatchingItem = false;

    // Check if the item is already in the cart
    cart.forEach((item) => {
      if (item.productId === productId) {
        hasMatchingItem = true;
        item.quantity += quantity;
        return;
      }
    });

    // If the item is not in the cart, add it
    if (!hasMatchingItem) {
      cart.push({
        productId, quantity
      });
    }

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })
    document.querySelector('.cart-quantity').textContent = cartQuantity;

    quantitySelectorElement.value = 1;
    console.log(cart);
  })
})