let loginBtn = document.querySelectorAll("#login-btn")[0]
const sbtn = document.getElementById("signup-btn")
const lbtn = document.getElementById("login-btn")
const google = document.getElementById('google')
const logOut = document.getElementById("logout-btn");


// ADMIN LOGIN START

// EMAIL: 
const AdminEmail = "abdullah@gmail.com"
// PASS:
const AdminPass = "Abdullah"

// ADMIN LOGIN END

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);



if (sbtn) {
    sbtn.addEventListener("click", async () => {
        let email = document.getElementById("signup-email").value
        let password = document.getElementById("signup-password").value



        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                email = ""
                password = ""

                sbtn.innerHTML = `
    ⏳ Redirecting
    <span class="loading-dots">
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </span>
  `
                setTimeout(() => {
                    location.href = "/signin.html"

                }, 3000)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });

    })
}

// if (lbtn) {
//     lbtn.addEventListener("click", async () => {
//         let email = document.getElementById("login-email").value
//         let password = document.getElementById("login-password").value

//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Get role from Firestore
//             const userDocRef = doc(db, "users", user.uid);
//             const userDoc = await getDoc(userDocRef);

//             if (userDoc.exists()) {
//                 const userData = userDoc.data();

//                 if (userData.role === "admin") {
//                     location.href = "/dashboard.html";
//                     console.log("admin",userData.role);

//                 } else {
//                     location.href = "/index.html";
//                     console.log("user",userData.role);
//                 }
//             } else {
//                 console.log("No role found, sending to index");
//                 location.href = "/index.html";
//             }

//         } catch (error) {
//             console.error(error.code, error.message);
//         }


//     })
// }




if (lbtn) {
    lbtn.addEventListener("click", async () => {
        let email = document.getElementById("login-email").value
        let password = document.getElementById("login-password").value


        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.email);

                loginBtn.innerHTML = `
                 ⏳ Redirecting
                    <span class="loading-dots">
                    <span class="dot">.</span>
                    <span class="dot">.</span>
                    <span class="dot">.</span>
                    </span>`
                console.log(user.email == AdminEmail);

                if (user.email == AdminEmail) {
                    console.log("Redirecting to Admin Dashboard");
                    setTimeout(() => {
                        location.href = "dashboard.html"

                    }, 3000)

                }
                else {
                    console.log("Redirecting to Home");
                    setTimeout(() => {
                        location.href = "index.html"

                    }, 3000)
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

            });

    })
}



if (google) {
    google.addEventListener("click", () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                loginBtn.innerHTML = `
    ⏳ Redirecting
    <span class="loading-dots">
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </span>
`
                setTimeout(() => {
                    location.href = "/index.html"

                }, 3000)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(errorCode, errorMessage);

            });

    })
}

document.addEventListener("DOMContentLoaded", () => {
    updateAuth();

    // Attach logout handler ONCE, since button is already in HTML
    if (logOut) {
        logOut.addEventListener("click", handleLogout);
    }
});

function updateAuth() {
    const authBtns = document.getElementById("auth-btns");
    const cartBtn = document.getElementById("cart-btn");
    const promoBar = document.getElementById("promo-bar");
    const logoutBtn = document.getElementById("logout-btn");

    onAuthStateChanged(auth, (user) => {
        console.log(user);

        if (user) {
            // User is logged in

            authBtns.style.display = "none";
            cartBtn.style.display = "block";
            promoBar.style.display = "none";
            logoutBtn.style.display = "inline-block"; // show logout
        } else {
            // User is logged out
            authBtns.style.display = "flex";
            cartBtn.style.display = "none";
            promoBar.style.display = "block";
            logoutBtn.style.display = "none"; // hide logout
        }
    });
}

function handleLogout() {
    console.log("Logging out...");
    signOut(auth)
        .then(() => {
            updateAuth(); // recheck UI
        })
        .catch((error) => {
            console.error("Logout failed", error);
        });
}


