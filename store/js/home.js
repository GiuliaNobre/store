document.addEventListener("DOMContentLoaded", () => {
  const productInput = document.querySelector(".Product");
  const amountInput = document.querySelector(".Amount");
  const taxValueInput = document.querySelector(".Tax-value");
  const unitPriceInput = document.querySelector(".Unit-price");
  const addButton = document.querySelector(".btn-add");
  const table = document.querySelector("table");
  const taxInput = document.querySelector(".tax");
  const totalInput = document.querySelector(".Total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    table.innerHTML = `
            <tr>
                <th>Product</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        `;
    let totalTax = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.unit}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.amount}</td>
                <td>$${(item.price * item.amount).toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">X</button></td>
            `;
      table.appendChild(row);
      totalTax += item.tax;
      totalPrice += item.price * item.amount;
    });

    taxInput.value = `$${totalTax.toFixed(2)}`;
    totalInput.value = `$${totalPrice.toFixed(2)}`;

    localStorage.setItem("cart", JSON.stringify(cart));

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        cart.splice(e.target.dataset.index, 1);
        updateCart();
      });
    });
  }

  addButton.addEventListener("click", () => {
    const product = productInput.value.trim();
    const amount = parseInt(amountInput.value, 10);
    const price = parseFloat(unitPriceInput.value.replace("$", "")) || 0;
    const tax = price * 0.1;

    if (!product || isNaN(amount) || amount <= 0) {
      alert("Please enter valid product details.");
      return;
    }

    taxValueInput.value = `$${tax.toFixed(2)}`;

    cart.push({ product, unit: 1, price, amount, tax });
    updateCart();

    productInput.value = "";
    amountInput.value = "";
    unitPriceInput.value = "$0.00";
  });

  updateCart();
});
