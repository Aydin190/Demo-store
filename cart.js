let cart = JSON.parse(localStorage.getItem("cart")||[]);

function renderCart() {
    const box = document.getElementById("cartItem");
    const totalPrice = document.getElementById("total");
    box.innerHTML = "";
    let total = 0;


if(cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty</p>";
}

cart.forEach((item, i)=>{
    total += item.price*item.quantity;
    box.innerHTML+=`<div class="cartItem">

    <span>${item.name}x${item.quantity}</span>

    <div>
    <button onclick="changeQty(${i},-1)" class="qtyBtn">+</button>

    <button onclick="changeQty(${i},-1)" class="qtyBtn">-</button>
    </div>

`;

});

    totalPrice.innerText = total;

}




function changeQty(i, change) {
    cart[i].qty+=change;

    if(cart[i].qty <= 0) {
        cart.splice(i, 1)
    };

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
}



function clearCart() {
    if(confirm("Do you want to clear your entire cart?")) {
        cart = [];
        localStorage.removeItem("cart")
        renderCart();
    }
}



renderCart();