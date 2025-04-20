let signupUserName = document.querySelectorAll("#signup-name")[0];
let signupEmail = document.querySelectorAll("#signup-email")[0];
let signupPassword = document.querySelectorAll("#signup-password")[0];
let terms = document.querySelectorAll("#terms")[0];
let errorMsg = document.querySelectorAll("#signup-error-msg")[0];
let signUpBtn = document.querySelectorAll("#signup-btn")[0]


let userArr = JSON.parse(localStorage.getItem("users")) || []
function signUp() {
    let user = {};
    user.name = signupUserName.value.toLowerCase();
    user.email = signupEmail.value.toLowerCase();
    user.password = signupPassword.value.toLowerCase();
    let emailExist = userArr.some(check => check.email == user.email)
    if (emailExist) {
        setTimeout(() => {
            errorMsg.innerHTML = ""
        }, 3000);
        errorMsg.innerHTML = "Oops! This email is already registered"
        return
    }
    if (!user.email.includes("@")) {
        setTimeout(() => {
            errorMsg.innerHTML = ""
        }, 3000)
        errorMsg.innerHTML = "⚠️ Please include an '@' in your email"
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
        location.href = "/src/signin.html"

    }, 2000)
}

let loginEmail = document.querySelectorAll("#login-email")[0]
let loginPassword = document.querySelectorAll("#login-password")[0]
let signinErrorMsg = document.querySelectorAll("#signin-error-msg")[0]
let loginBtn = document.querySelectorAll("#login-btn")[0]

function logIn() {

    let usersData = JSON.parse(localStorage.getItem("users"))
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
    setTimeout(() => {
        location.href = "/src/index.htm"

    }, 2000)
    console.log(usersData)

}



