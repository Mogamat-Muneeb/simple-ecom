let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  {
    id: "product1",
    name: "Product 1",
    price: 20.0,
    image: "https://i.postimg.cc/GmWbrC7f/431724-2676-427134-2-600x.jpg",
  },
  {
    id: "product2",
    name: "Product 2",
    price: 30.0,
    image: "https://i.postimg.cc/GmWbrC7f/431724-2676-427134-2-600x.jpg",
  },
  {
    id: "product3",
    name: "Product 3",
    price: 40.0,
    image: "https://i.postimg.cc/GmWbrC7f/431724-2676-427134-2-600x.jpg",
  },
  {
    id: "product4",
    name: "Product 4",
    price: 30.0,
    image: "https://i.postimg.cc/GmWbrC7f/431724-2676-427134-2-600x.jpg",
  },
  {
    id: "product5",
    name: "Product 5",
    price: 30.0,
    image: "https://i.postimg.cc/GmWbrC7f/431724-2676-427134-2-600x.jpg",
  },
];

function addToCart(id, name, price, image) {
  cart.push({ id, name, price, image });
  updateCart();
  saveCartToLocalStorage();
}

function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const cartCountElement = document.getElementById("cart-count");

  if (cartItemsElement && cartTotalElement && cartCountElement) {
    // Clear the existing content
    cartItemsElement.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      // Cart is empty, display a message
      const emptyCartMessage = document.createElement("p");
      emptyCartMessage.textContent = "Your cart is empty. Continue shopping!";
      cartItemsElement.appendChild(emptyCartMessage);
    } else {
      cart.forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.className = "cart-item";

        const itemText = `
         <img src="${item.image}" alt="${item.name}"> ${
          item.name
        } - R${item.price.toFixed(2)}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Cart";
        removeButton.onclick = () => removeItemFromCart(index);

        listItem.innerHTML = `${itemText} `;
        listItem.appendChild(removeButton);

        cartItemsElement.appendChild(listItem);
        total += item.price;
      });
    }

    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cart.length;
  }
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCartToLocalStorage();
}
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout() {
  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
}

function renderProducts() {
  const productListElement = document.getElementById("product-list");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <p>${product.name}</p>
      <p>R${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.id}', '${product.name}', ${
      product.price
    }, '${product.image}' )">Add to Cart</button>
    `;

    productListElement.appendChild(productDiv);
  });
}

// Call renderProducts on the product list page
if (document.getElementById("product-list")) {
  renderProducts();
}

// Call updateCart on the cart page
if (document.getElementById("cart-items")) {
  updateCart();
}


function getCurrentYear() {
  return new Date().getFullYear();
}

// Update the content of the element with class "currentYear"
document.querySelector('.currentYear').textContent = getCurrentYear();