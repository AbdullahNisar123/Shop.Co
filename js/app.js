let signupUserName = document.querySelectorAll("#signup-name")[0];
let signupEmail = document.querySelectorAll("#signup-email")[0];
let signupPassword = document.querySelectorAll("#signup-password")[0];
let terms = document.querySelectorAll("#terms")[0];
let errorMsg = document.querySelectorAll("#signup-error-msg")[0];
let signUpBtn = document.querySelectorAll("#signup-btn")[0]
let loginEmail = document.querySelectorAll("#login-email")[0]
let loginPassword = document.querySelectorAll("#login-password")[0]
let signinErrorMsg = document.querySelectorAll("#signin-error-msg")[0]

let productsContainer = document.querySelectorAll("#products-container")
let cartContainer = document.querySelectorAll("#cart-container")[0]
let cartSummaryContainer = document.querySelectorAll("#cart-summary")[0]





// products for localStorage start
let products = [
  {
    id: crypto.randomUUID(),
    name: "T-shirt with Tape Details",
    price: 120,
    imgUrl: "/assets/images/products/image-7.png"
  },
  {
    id: crypto.randomUUID(),
    name: "SKINNY FIT JEANS",
    price: 260,
    discountPercent: 20,
    imgUrl: "/assets/images/products/image-5.png"
  },
  {
    id: crypto.randomUUID(),
    name: "CHECKERED SHIRT",
    price: 180,
    imgUrl: "/assets/images/products/image-9.png"
  }
  , {
    id: crypto.randomUUID(),
    name: "SLEEVE STRIPED T-SHIRT",
    price: 160,
    discountPercent: 30,
    imgUrl: "/assets/images/products/image-10.png"
  }
]
// products for localStorage end



// set products to localstorage
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}




// products array from localstorage
let ProductsArr = JSON.parse(localStorage.getItem("products"))



// users array from localstorage
let userArr = JSON.parse(localStorage.getItem("users")) || []



// cart array from localstorage 
let CartArr = JSON.parse(localStorage.getItem("CartArray")) || []



// cart summary from localstorage 
let Summary = JSON.parse(localStorage.getItem("cartSummary")) || {}



// signup function
function signUp() {
  let user = {};
  user.name = signupUserName.value.toLowerCase();
  user.email = signupEmail.value.toLowerCase();
  user.password = signupPassword.value.toLowerCase();
  let emailExist = userArr.some(check => check.email == user.email)
  if (user.name == "") {
    showError(errorMsg, "Please Enter Your Name.")
    return
  }
  if (emailExist) {
    showError(errorMsg, "Oops! This email is already registered.")
    return
  }
  if (!user.email.includes("@")) {
    showError(errorMsg, "⚠️ Please include an '@' in your email.")
    return
  }
  if (user.password.length <= 8) {
    showError(errorMsg, "🔒 Password must be at least 8 characters long")
    return

  }
  if (!terms.checked) {
    showError(errorMsg, "❗ Acceptance of Terms is required.")
    return
  }


  userArr.push(user)
  localStorage.setItem("users", JSON.stringify(userArr))


  signupUserName.value = ""
  signupEmail.value = ""
  signupPassword.value = ""
  terms.checked = false

  signUpBtn.innerHTML = `
    ⏳ Redirecting
    <span class="loading-dots">
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </span>
  `
  setTimeout(() => {
    location.href = "/signin.html"

  }, 2000)
}



// login function
function logIn() {

  let usersData = JSON.parse(localStorage.getItem("users")) || []
  let emailExist = usersData.some(check => check.email === loginEmail.value.toLowerCase())
  let passwordExist = usersData.some(check => check.password === loginPassword.value.toLowerCase())
  if (!emailExist) {
    showError(signinErrorMsg, "⚠️ Email not registered.")
    return
  }
  if (!passwordExist) {
    showError(signinErrorMsg, "❌ Wrong password. Try again.")
    return
  }


  loginBtn.innerHTML = `
    ⏳ Redirecting
    <span class="loading-dots">
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </span>
  `
  localStorage.setItem("isLoggedIn", "true");

  setTimeout(() => {
    location.href = "/index.htm"

  }, 2000)

}



// logout function
function logout(Ele) {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    Ele.children[0].innerHTML = `
    <span class="spinner"></span> 
    logOut
  `
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn"),
        location.reload();
    }, 2000)

  }
}



// to reder the products on DOM
// function ProductList(products) {
//   for (let i = 0; i < productsContainer.length; i++) {
//     let content = "";
//     for (let j = 0; j < products.length; j++) {
//       content += makeProductCart(products[j]);
//     }
//     productsContainer[i].innerHTML = content;
//   }
// }

// ProductList(ProductsArr)




// // UI of products cart
// function makeProductCart(Product) {

//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';


//   return `
//     <div class="group relative flex-shrink-0 w-[200px] md:w-auto ${!isLoggedIn ? 'filter blur-sm' : ''}">
//               <div
//                 class="relative w-[200px] h-[200px] md:w-3xs md:h-64 rounded-2xl overflow-hidden"
//               >
//                 <!-- Background Image -->
//                 <div
//                   class="w-full h-full bg-[#F0EEED]  bg-contain bg-center transition-all duration-300 group-hover:brightness-75"
//                   style="background-image: url('${Product.imgUrl}')"
//                   ></div>

//                 <div
//                   class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40"
//                 ></div>

//                 <button
//                 onclick="addToCart('${Product.id}')"
//                   class="btn absolute inset-0 m-auto w-fit h-fit px-12 md:px-10 py-3 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm cursor-pointer border border-white/10 hover:bg-transparent hover:text-white"
//                 >
//                   <p class="btn-text uppercase" >Add to cart</p>
//                 </button>
//                 <button
//                   class="group capitalize px-12 md:px-20 py-3 rounded-2xl md:rounded-3xl text-sm md:text-base border border-black/10 hover:bg-black hover:text-white transition w-full md:w-fit cursor-pointer"
//                 >
//                   <p
//                     class="group-active:scale-95 transition-transform duration-100"
//                   >
//                     View All
//                   </p>
//                 </button>
//               </div>

//               <div class="flex flex-col gap-2 mt-3">
//                 <h2 class="[font-family:arial] text-base md:text-xl font-bold">
//                  ${Product.name}
//                 </h2>
//                 <div class="flex gap-2 items-center">
//                   <div>⭐⭐⭐⭐</div>
//                   <p class="opacity-80 text-sm md:text-base">4/5</p>
//                 </div>
//                 <div class="flex gap-1.5 md:gap-2.5 items-center flex-wrap">
//                   <p class="[font-family:arial] text-lg md:text-2xl font-bold">
//                     $${Product.discountPercent
//       ? Product.price * (1 - Product.discountPercent / 100)
//       : Product.price
//     }
//                   </p>
//                   ${Product.discountPercent ? `
//                     <p class="[font-family:arial] text-lg md:text-2xl font-bold line-through opacity-40">
//                     $${Product.price}
//                   </p>
//                   `: ""
//     }
//                   ${Product.discountPercent ? `
//                   <div class="bg-red-700/10 px-2 md:px-3 py-1 rounded-full">
//                     <p class="text-[#FF3333] text-sm">-${Product.discountPercent}%</p>
//                   </div>
//                   `: ""
//     }
//                 </div>
//                 <button
//                 onclick="addToCart('${Product.id}')"
//                   class="md:hidden block m-auto w-fit h-fit px-8  py-3 bg-black text-white rounded-full  transition-opacity duration-300 font-medium text-sm cursor-pointer border border-white/10 hover:bg-transparent hover:text-white"
//                 >
//                   <p class=" uppercase" >Add to cart</p>
//                 </button>
//               </div>
//             </div>
//     `
// }


// to reder the cart products on DOM
// function cartProductList(cartProducts) {

//   if (!cartProducts.length > 0) {
//     cartContainer.innerHTML = `
//     <div class="flex justify-center flex-col gap-5 items-center py-5">
//               <div class="w-65">
//                 <img src="/assets/images/empty-cart.png" alt="empty cart">
//               </div>
//               <div class="flex flex-col items-center gap-3">
//                 <h2 class="[font-family:arial] font-bold text-3xl">
//                   Your cart is empty
//                 </h2>
//                 <p class="text-[20px] text-black/60 text-center">
//                   Looks like you have not added anything to your cart. Go ahead
//                   & explore top categories
//                 </p>
//               </div>
//             </div>
//     `
//     return
//   }
//   cartContainer.innerHTML = ""
//   for (let i = 0; i < cartProducts.length; i++) {
//     cartContainer.innerHTML += makeCartProduct(cartProducts[i])
//   }
// }
// cartProductList(CartArr)


// UI of cart products 
// function makeCartProduct(cartProduct) {
//   const { imgUrl, name, price, quantity, id } = cartProduct
//   return `
//             <div class="flex gap-3 md:py-6 py-0 border-t border-black/10 w-full ">
//               <div
//                 class="w-[124px] h-[124px] bg-[#F0EEED] bg-center bg-contain bg-no-repeat rounded-[8px]"
//                 style="
//                   background-image: url('${imgUrl}');
//                 "
//               ></div>

//               <div class="flex flex-col md:gap-2 w-full">
//                 <div class="flex justify-between w-full sm:gap">
//                   <div class="">
//                     <h2
//                       class="[font-family:arial] font-bold md:text-[20px] text-[16px]"
//                     >
//                       ${name}
//                     </h2>
//                     <p class="capitalize text-[14px]">
//                       size: <span class="text-black/60">large</span>
//                     </p>
//                     <p class="capitalize text-[14px]">
//                       color: <span class="text-black/60">white</span>
//                     </p>
//                   </div>
//                   <div class="cursor-pointer" onclick="removeFromCart('${id}')">
//                     <img
//                       src="/assets/images/delete-icon.png"
//                       alt="delete icon"
//                     />
//                   </div>
//                 </div>
//                 <div class="flex justify-between items-center">
//                   <h3
//                     class="[font-family:arial] font-bold md:text-[24px] text-[20px]"
//                   >
//                     $${price * quantity}
//                   </h3>

//                   <div
//                     class="bg-[#F0F0F0] px-5 py-3 rounded-[60px] [font-family:arial] font-bold text-[20px] flex justify-between items-center w-[124px]"
//                   >
//                     <p class="h-fit cursor-pointer" onclick="qantityDecrement('${id}')">-</p>
//                     <p class="text-[14px] h-fit cursor-pointer">${quantity}</p>
//                     <p class="h-fit cursor-pointer" onclick="qantityIncrement('${id}')">+</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//   `
// }


// save cart summary like (total,fee,discount,etc..) in localstorage
// function cartSummary(CartArr) {
//   let total = 0
//   let discountPercent = 0;
//   let discountedPrice = 0
//   for (let i = 0; i < CartArr.length; i++) {
//     total += CartArr[i].price * CartArr[i].quantity
//     if (CartArr[i].discountPercent !== undefined) {
//       discountPercent += CartArr[i].discountPercent
//       discountedPrice += Math.abs((total * (1 - discountPercent / 100)) - total)
//     }
//   }
//   const summary = {
//     total: total,
//     discountPercent: discountPercent,
//     discountedPrice: discountedPrice,
//     fee: 15   // Fixed delivery fee
//   };

//   localStorage.setItem("cartSummary", JSON.stringify(summary));
//   return summary;

// }



// UI of cart products summary
// function makeSummary() {
//   if (!CartArr.length > 0) {
//     cartSummaryContainer.innerHTML = `
//     <h3 class="capitalize [font-family:arial] font-bold text-[24px]">
//               order summary
//             </h3>
//             <div class="flex flex-col gap-5">
//               <div class="flex flex-col gap-5 pb-5 border-b border-black/10">
//                 <div class="flex justify-between w-full capitalize">
//                   <p class="[font-family:arial] text-black/60 text-[20px]">
//                     subtotal
//                   </p>
//                   <p
//                     class="[font-family:arial] text-black font-bold text-[20px]"
//                   >
//                     $0
//                   </p>
//                 </div>
//                 <div class="flex justify-between w-full capitalize">
//                   <p class="[font-family:arial] text-black/60 text-[20px]">
//                     Discount (0%)
//                   </p>
//                   <p
//                     class="[font-family:arial] text-[#FF3333] font-bold text-[20px]"
//                   >
//                     $0
//                   </p>
//                 </div>
//                 <div class="flex justify-between w-full capitalize">
//                   <p class="[font-family:arial] text-black/60 text-[20px]">
//                     Delivery Fee
//                   </p>
//                   <p
//                     class="[font-family:arial] text-black font-bold text-[20px]"
//                   >
//                     $0
//                   </p>
//                 </div>
//               </div>
//               <div class="flex justify-between w-full capitalize">
//                 <p class="[font-family:arial] text-black/60 text-[20px]">
//                   Total
//                 </p>
//                 <p class="[font-family:arial] text-black font-bold text-[24px]">
//                   $0
//                 </p>
//               </div>
//             </div>
//             <div class="flex gap-3">
//               <div
//                 class="px-4 py-3 bg-[#F0F0F0] flex gap-3 rounded-[60px] items-center w-full"
//               >
//                 <img
//                   src="/assets/images/promo-code.png"
//                   alt="promo-code"
//                   class="opacity-60"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Add promo code"
//                   class="text-black/60 outline-none"
//                 />
//               </div>
//               <div
//                 class="group cursor-pointer w-fit rounded-[60px] bg-black px-8 py-3 capitalize text-white"
//               >
//                 <p
//                   class="text-white group-active:scale-85 transition-transform duration-100"
//                 >
//                   apply
//                 </p>
//               </div>
//             </div>
//             <div
//               class="group cursor-pointer w-full py-5 bg-black rounded-[60px] flex justify-center items-center gap-3"
//             >
//               <p
//                 class="text-white group-active:scale-85 transition-transform duration-100"
//               >
//                 Go to Checkout
//               </p>
//               <span
//                 class="iconify text-white text-[14px] h-fit"
//                 data-icon="formkit:arrowright"
//               ></span>
//             </div>
//     `
//     return;
//   }
//   cartSummaryContainer.innerHTML = `
//   <h3 class="capitalize [font-family:arial] font-bold text-[24px]">
//               order summary
//             </h3>
//             <div class="flex flex-col gap-5">
//               <div class="flex flex-col gap-5 pb-5 border-b border-black/10">
//                 <div class="flex justify-between w-full capitalize">
//                   <p class="[font-family:arial] text-black/60 text-[20px]">
//                     subtotal
//                   </p>
//                   <p
//                     class="[font-family:arial] text-black font-bold text-[20px]"
//                   >
//                     $${Summary.total.toFixed(2)}
//                   </p>
//                 </div>
//                 <div class="flex justify-between w-full capitalize">
//                   <p class="[font-family:arial] text-black/60 text-[20px]">
//                     Discount (-${Summary.discountPercent}%)
//                   </p>
//                   <p
//                     class="[font-family:arial] text-[#FF3333] font-bold text-[20px]"
//                   >
//                     -$${Summary.discountedPrice.toFixed(2)}
//                   </p>
//                 </div>
//                 <div class="flex justify-between w-full capitalize">
//                   <p class="[font-family:arial] text-black/60 text-[20px]">
//                     Delivery Fee
//                   </p>
//                   <p
//                     class="[font-family:arial] text-black font-bold text-[20px]"
//                   >
//                     $${Summary.fee.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div class="flex justify-between w-full capitalize">
//                 <p class="[font-family:arial] text-black/60 text-[20px]">
//                   Total
//                 </p>
//                 <p class="[font-family:arial] text-black font-bold text-[24px]">
//                   $${((Summary.total + Summary.fee) - Summary.discountedPrice).toFixed(2)}
//                 </p>
//               </div>
//             </div>
//             <div class="flex gap-3">
//               <div
//                 class="px-4 py-3 bg-[#F0F0F0] flex gap-3 rounded-[60px] items-center w-full"
//               >
//                 <img
//                   src="/assets/images/promo-code.png"
//                   alt="promo-code"
//                   class="opacity-60"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Add promo code"
//                   class="text-black/60 outline-none"
//                 />
//               </div>
//               <div
//                 class="group cursor-pointer w-fit rounded-[60px] bg-black px-8 py-3 capitalize text-white"
//               >
//                 <p class="text-white group-active:scale-85 transition-transform duration-100"> apply</p>
//               </div>
//             </div>
//             <div class="group cursor-pointer w-full py-5 bg-black rounded-[60px] flex justify-center items-center gap-3">
//               <p class="text-white group-active:scale-85 transition-transform duration-100">Go to Checkout</p>
//                 <span
//                   class="iconify text-white text-[14px] h-fit "
//                   data-icon="formkit:arrowright"
//                 ></span>
//             </div>
//   `
// }
// makeSummary()



// add to cart fuction store prodcuts in cart array
// function addToCart(id) {
//   const product = ProductsArr.find(item => item.id === id);
//   const alreadyInCart = CartArr.some(item => item.id == id)

//   if (!product) {
//     alert(`Product ${id} not found!`);
//     return;
//   }


//   // add quantity when product already in cart
//   if (alreadyInCart) {
//     CartArr = CartArr.map(item => item.id == id
//       ? { ...item, quantity: (item.quantity || 1) + 1 }
//       : item
//     )
//   }
//   // push new product to cart array
//   else {
//     if (product) {
//       CartArr.push({ ...product, quantity: 1 });
//     }
//   }


//   localStorage.setItem("CartArray", JSON.stringify(CartArr))
//   updateCartCount()
//   Summary = cartSummary(CartArr);
//   makeSummary()

// }


// remove product from cart aand update cart product list also cart summary
// function removeFromCart(id) {
//   CartArr = CartArr.filter(item => item.id !== id)
//   localStorage.setItem("CartArray", JSON.stringify(CartArr))
//   updateCartCount()
//   cartProductList(CartArr)
//   Summary = cartSummary(CartArr);
//   makeSummary()
// }


// to increment qantity of cart product and update ui
// function qantityIncrement(id) {
//   CartArr.map(item => item.id == id
//     ? { ...item, quantity: item.quantity++ }
//     : item
//   )
//   localStorage.setItem("CartArray", JSON.stringify(CartArr))
//   updateCartCount()
//   cartProductList(CartArr)
//   Summary = cartSummary(CartArr);
//   makeSummary()
// }


// to decrement qantity of cart product and update ui
// function qantityDecrement(id) {
//   CartArr.map(item => item.id == id && item.quantity > 1
//     ? { ...item, quantity: item.quantity-- }
//     : item
//   )
//   localStorage.setItem("CartArray", JSON.stringify(CartArr))
//   updateCartCount()
//   cartProductList(CartArr)
//   Summary = cartSummary(CartArr);
//   makeSummary()
// }

// update cart count 
// function updateCartCount() {
//   let cartCount = document.getElementById("cart-count")
//   let cart = JSON.parse(localStorage.getItem("CartArray")) || []

//   if (cart.length > 0) {
//     cartCount.style.display = "flex"
//     console.log("count number", cart.length)
//   }

//   if (cart.length < 1) {
//     cartCount.style.display = "hidden"
//   }


//   let count = cart.length
//   if (cartCount) {
//     cartCount.textContent = count;
//   }
//   console.log("Cart updated. Count:", count);
// }

// function for error msg
// function showError(element, message) {
//   element.innerHTML = message;
//   setTimeout(() => {
//     element.innerHTML = "";
//   }, 3000);
// }

// updateCartCount()
























// logic with firebase




import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { doc, getDoc,getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDHqpo5_tNtwivTKxdHHpI-Q9EmzmZuYoM",
  authDomain: "shop-co-92853.firebaseapp.com",
  projectId: "shop-co-92853",
  storageBucket: "shop-co-92853.firebasestorage.app",
  messagingSenderId: "257305868809",
  appId: "1:257305868809:web:f0543045da2ab6c65a96d8",
  measurementId: "G-558RVKX3P6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const readData = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {

    productsContainer.forEach(container => {
      container.innerHTML += `<div class="group relative flex-shrink-0 w-[200px] md:w-auto">
              <div
                class="relative w-[200px] h-[200px] md:w-3xs md:h-64 rounded-2xl overflow-hidden"
              >
                <!-- Background Image -->
                <div
                  class="w-full h-full bg-[#F0EEED]  bg-contain bg-center transition-all duration-300 group-hover:brightness-75"
                  style="background-image: url('${doc.data().imgUrl}')"
                  ></div>

                <div
                  class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40"
                ></div>

                <button
                onclick="addToCart('${doc.data().id}')"
                  class="btn absolute inset-0 m-auto w-fit h-fit px-12 md:px-10 py-3 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm cursor-pointer border border-white/10 hover:bg-transparent hover:text-white"
                >
                  <p class="btn-text uppercase" >Add to cart</p>
                </button>
                <button
                  class="group capitalize px-12 md:px-20 py-3 rounded-2xl md:rounded-3xl text-sm md:text-base border border-black/10 hover:bg-black hover:text-white transition w-full md:w-fit cursor-pointer"
                >
                  <p
                    class="group-active:scale-95 transition-transform duration-100"
                  >
                    View All
                  </p>
                </button>
              </div>

              <div class="flex flex-col gap-2 mt-3">
                <h2 class="[font-family:arial] text-base md:text-xl font-bold">
                 ${doc.data().name}
                </h2>
                <div class="flex gap-2 items-center">
                  <div>⭐⭐⭐⭐</div>
                  <p class="opacity-80 text-sm md:text-base">4/5</p>
                </div>
                <div class="flex gap-1.5 md:gap-2.5 items-center flex-wrap">
                  <p class="[font-family:arial] text-lg md:text-2xl font-bold">
                    $${doc.data().discountPercent
          ? doc.data().price * (1 - doc.data().discountPercent / 100)
          : doc.data().price
        }
                  </p>
                  ${doc.data().discountPercent ? `
                    <p class="[font-family:arial] text-lg md:text-2xl font-bold line-through opacity-40">
                    $${doc.data().price}
                  </p>
                  `: ""
        }
                  ${doc.data().discountPercent ? `
                  <div class="bg-red-700/10 px-2 md:px-3 py-1 rounded-full">
                    <p class="text-[#FF3333] text-sm">-${doc.data().discountPercent}%</p>
                  </div>
                  `: ""
        }
                </div>
                <button
                onclick="addToCart('${doc.data().id}')"
                  class="md:hidden block m-auto w-fit h-fit px-8  py-3 bg-black text-white rounded-full  transition-opacity duration-300 font-medium text-sm cursor-pointer border border-white/10 hover:bg-transparent hover:text-white"
                >
                  <p class=" uppercase" >Add to cart</p>
                </button>
              </div>
            </div>`
    })

  });
}

readData()