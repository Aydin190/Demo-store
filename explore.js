const productsData = [
  {id:1, name: "Shoes", price: 50.00, category: "Shoes", image: "https://static.ftshp.digital/img/p/1/3/1/7/6/1/0/1317610-full_product.jpg"},
  {id:2, name: "Clothing", price: 8.00, category: "Clothing", image: "https://t3.ftcdn.net/jpg/02/85/94/70/360_F_285947084_ePYjQpzCaQq6Vb2GEoYGZs8MNYkUhNqB.jpg"},
  {id:3, name: "Books", price: 5.00, category: "Books", image: "https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=1200"},
  {id:4, name: "Lego", price: 23.00, category: "Toys", image: "https://www.sam-turner.co.uk/cdn/shop/files/77248-3.webp?v=1743334219&width=1445"},
  {id:5, name: "Toys", price: 10.00, category: "Toys", image: "https://i.ebayimg.com/images/g/EIwAAOSwLiBjSQjl/s-l1200.jpg"},
  {id:6, name: "Kindle", price: 90.00, category: "Books", image: "https://media.johnlewiscontent.com/i/JohnLewis/112684172"},
  {id:7, name: "iPad", price: 375.00, category: "Devices", image: "https://dam.ee.co.uk/image/786263124743/image_mo8ktlach93qf2552f1eae9n16/-S1568x1568-FWEBP"},
  {id:8, name: "Smartwatch", price: 219.00, category: "Devices", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPt9vhfI6CkaUh9uJpugWs8rr0sydj_BDaOg&s"},
  {id:9, name: "Clock", price: 15.00, category: "Devices", image: "https://m.media-amazon.com/images/I/61Wl74HmvtL._AC_UF894,1000_QL80_.jpg"}
];
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  let params = new URLSearchParams(window.location.search);
  let category = params.get("category");
  
  document.getElementById("title").innerText =
    "More products in " + category;
  
  const box = document.getElementById("products");
  
  productsData.forEach(a=>{
    if(a.category === category){
      box.innerHTML += `
        <div class="product">
          <img src="${a.image}">
          <h3>${a.name}</h3>
          <p>£${a.price}</p>
  
          <button onclick="addToCart(${a.id})">Add to Cart</button>
          <span class="itemCount" id="count-${a.id}">0</span>
        </div>
      `;
    }
  });
  
  function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = productsData.find(a=>a.id===id);
    const existing = cart.find(a=>a.id===id);
  
    if(existing){
      existing.qty++;
    }else{
      cart.push({id:item.id,name:item.name,price:item.price,qty:1});
    }
  
    localStorage.setItem("cart",JSON.stringify(cart));
    updateItemCount(id);
    updateCartCount();
  }
  
  function updateItemCount(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(a=>a.id===id);
    document.getElementById("count-"+id).innerText = item ? item.qty : 0;
  }
  
  function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((s,i)=>s+i.qty,0);
    document.getElementById("cartCount").innerText = count;
  }
  
  productsData.forEach(p=>updateItemCount(a.id));
  updateCartCount();