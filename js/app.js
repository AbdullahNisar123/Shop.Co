let signupUserName = document.querySelectorAll("#signup-name")[0];
let signupEmail = document.querySelectorAll("#signup-email")[0];
let signupPassword = document.querySelectorAll("#signup-password")[0];
let terms = document.querySelectorAll("#terms")[0];
let errorMsg = document.querySelectorAll("#signup-error-msg")[0];
let signUpBtn = document.querySelectorAll("#signup-btn")[0]
let loginEmail = document.querySelectorAll("#login-email")[0]
let loginPassword = document.querySelectorAll("#login-password")[0]
let signinErrorMsg = document.querySelectorAll("#signin-error-msg")[0]
let loginBtn = document.querySelectorAll("#login-btn")[0]
let productsContainer = document.querySelectorAll("#products-container")


let userArr = JSON.parse(localStorage.getItem("users")) || []



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
localStorage.setItem("products", JSON.stringify(products))





// products array from localstorage
let ProductsArr = JSON.parse(localStorage.getItem("products"))






// signup function
function signUp() {
  let user = {};
  user.name = signupUserName.value.toLowerCase();
  user.email = signupEmail.value.toLowerCase();
  user.password = signupPassword.value.toLowerCase();
  let emailExist = userArr.some(check => check.email == user.email)
  if (user.name == "") {
    setTimeout(() => {
      errorMsg.innerHTML = ""
    }, 3000);
    errorMsg.innerHTML = "Please Enter Your Name."
    return
  }
  if (emailExist) {
    setTimeout(() => {
      errorMsg.innerHTML = ""
    }, 3000);
    errorMsg.innerHTML = "Oops! This email is already registered."
    return
  }
  if (!user.email.includes("@")) {
    setTimeout(() => {
      errorMsg.innerHTML = ""
    }, 3000)
    errorMsg.innerHTML = "⚠️ Please include an '@' in your email."
    return
  }
  if (user.password.length <= 8) {
    setTimeout(() => {
      errorMsg.innerHTML = ""
    }, 3000)
    errorMsg.innerHTML = "🔒 Password must be at least 8 characters long."
    return
  }
  if (!terms.checked) {
    setTimeout(() => {
      errorMsg.innerHTML = ""
    }, 3000)
    errorMsg.innerHTML = "❗ Acceptance of Terms is required."
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
    setTimeout(() => {
      signinErrorMsg.innerHTML = ""
    }, 3000)
    signinErrorMsg.innerHTML = `⚠️ Email not registered.`
    return
  }
  if (!passwordExist) {
    setTimeout(() => {
      signinErrorMsg.innerHTML = ""
    }, 3000)
    signinErrorMsg.innerHTML = `❌ Wrong password. Try again.`
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
function logout(Ele){
  const confirmLogout = confirm("Are you sure you want to log out?");

  if(confirmLogout){
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



function ProductList(products) {
  for (let i = 0; i < productsContainer.length; i++) {
    for (let j = 0; j < products.length; j++) {
      let productCart = makeCart(products[j])
      productsContainer[i].innerHTML += productCart
    }
  }
}
ProductList(ProductsArr)

function makeCart(Product) {
  return `
    <div class="group relative flex-shrink-0 w-[200px] md:w-auto">
              <div
                class="relative w-[200px] h-[200px] md:w-3xs md:h-64 rounded-2xl overflow-hidden"
              >
                <!-- Background Image -->
                <div
                  class="w-full h-full bg-[#F0EEED]  bg-contain bg-center transition-all duration-300 group-hover:brightness-75"
                  style="background-image: url('${Product.imgUrl}')"
                  ></div>

                <div
                  class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/40"
                ></div>

                <button
                  class="btn absolute inset-0 m-auto w-fit h-fit px-12 md:px-10 py-3 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm cursor-pointer border border-white/10 hover:bg-transparent hover:text-white"
                >
                  <p class="btn-text capitalize">Quick View</p>
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
                 ${Product.name}
                </h2>
                <div class="flex gap-2 items-center">
                  <div>⭐⭐⭐⭐</div>
                  <p class="opacity-80 text-sm md:text-base">4/5</p>
                </div>
                <div class="flex gap-1.5 md:gap-2.5 items-center flex-wrap">
                  <p class="[font-family:arial] text-lg md:text-2xl font-bold">
                    $${Product.discountPercent
      ? Product.price * (1 - Product.discountPercent / 100)
      : Product.price
    }
                  </p>
                  ${Product.discountPercent ? `
                    <p class="[font-family:arial] text-lg md:text-2xl font-bold line-through opacity-40">
                    $${Product.price}
                  </p>
                  `: ""
    }
                  ${Product.discountPercent ? `
                  <div class="bg-red-700/10 px-2 md:px-3 py-1 rounded-full">
                    <p class="text-[#FF3333] text-sm">-${Product.discountPercent}%</p>
                  </div>
                  `: ""
    }
                </div>
              </div>
            </div>
    `
}

