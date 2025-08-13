



import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { doc,deleteDoc, addDoc, collection, getFirestore,getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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



const products = document.getElementById("Products")
const addProduct = document.getElementById("add-product")


if (addProduct) {
    addProduct.addEventListener("click", async () => {
        let name = document.getElementById("pname").value
        let price = document.getElementById("pprice").value
        let description = document.getElementById("pdes").value
        let imgUrl = document.getElementById("pimg").value
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name, price, description, imgUrl
            });
            console.log("prodcut added to firestore: ", docRef.id);
            setTimeout(() => {
                window.location.href = "/dashboard.html"
            }, 2000)
        } catch (e) {
            console.error("Error adding product: ", e);
        }

    })
}


const getProducts = async () => {
    products.innerHTML = ""
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        let data = doc.data()
        
        products.innerHTML += `
       <div class="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-md overflow-hidden">
                <img src="${data.imgUrl}" alt="${data.name}"
                    class="w-full h-48 object-contain">
                <div class="p-4">
                    <h2 class="text-xl font-bold mb-1">${data.name}</h2>
                    <p class="text-lg font-semibold text-blue-600 mb-2">$${data.price}</p>
                    
                   ${data.description ? `<p class="text-sm opacity-80 mb-4">${data.description}</p>` : ""}
                    <div class="flex gap-3">
                        <button class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded cursor-pointer">Edit</button>
                        <button class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded cursor-pointer" onclick="delProduct('${doc.id}')">Delete</button>
                    </div>
                </div>
            </div>`
    });
}
getProducts()




const delProduct = async (id) => {
    console.log(id);
    const confirmDelete = confirm("Do you want to delete this product?");
    if (confirmDelete) {
        console.log("User confirmed deletion, ID:", id);
        await deleteDoc(doc(db, "products", id));
        getProducts();
    } else {
        console.log("User canceled deletion");
    }
}


window.delProduct = delProduct