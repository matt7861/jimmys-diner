import products from "./data.js";

const content = document.querySelector(".content");
const items = document.getElementById("items");
const orderWrapper = document.getElementById("order-wrapper");
const price = document.getElementById("price");
const paymentForm = document.getElementById("payment-form");
const completeBtn = document.getElementById("complete-btn");
const paymentPopup = document.getElementById("payment-popup");
const order = document.querySelector(".order");

const orderItems = [];
let totalPrice = 0;
let orderCompleted = false;

// check if add button or remove button has been clicked
content.addEventListener("click", function (e) {
  e.preventDefault();
  if (orderCompleted) return;

  if (e.target.dataset.index) {
    updateOrder(e.target.dataset.index);
  } else if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  }
});

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  paymentPopup.style.display = "none";

  const formData = new FormData(paymentForm);
  const userName = formData.get("name");

  order.innerHTML = `<h2 class="completed-message">Thanks, ${userName}! Your order is on its way.</h2>`;
  orderCompleted = true;
});

completeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (orderItems.length > 0) {
    paymentPopup.style.display = "block";
  }
});

// add item to selected items array and update price
function updateOrder(index) {
  orderItems.push(products[index]);
  orderWrapper.innerHTML = outputOrder();

  totalPrice += products[index].price;
  price.innerHTML = `$${totalPrice}`;
}

// remove item from selected items array and update price
function removeItem(index) {
  const rowIndex = parseInt(index);
  totalPrice -= orderItems[rowIndex].price;
  price.innerHTML = `$${totalPrice}`;

  orderItems.splice(rowIndex, 1);
  orderWrapper.innerHTML = outputOrder();
}

// output selected order items
function outputOrder() {
  return orderItems
    .map((order, i) => {
      return `
        <div class="order-row">
            <div class="order-title">
                <h2>${order.name}</h2>
                <a href="#" class="remove" data-remove="${i}">remove</a>
            </div>
            <p>$${order.price}</p>
        </div>
        `;
    })
    .join("");
}

// Output content from data.js as html
const productsHtml = products
  .map((product, index) => {
    return `
        <div class="item">
        <img class="food-icon" src="images/${product.image}" alt="${product.alt}">
        <div class="item-info">
            <h2>${product.name}</h2>
            <p class="description">${product.ingredients}</p>
            <p class="price">$${product.price}</p>
        </div>
        <img class="add-btn" src="images/add-btn.png" alt="add btn" data-index="${index}">
        </div>
    `;
  })
  .join("");

items.innerHTML = productsHtml;
