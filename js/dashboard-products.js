



import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { doc, addDoc, collection, getFirestore,getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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
const products = document.getElementById("dashboard-products")

const getProducts = async () => {
    products.innerHTML = ""
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        let data = doc.data()
        
        products.innerHTML += `
       <tr class="border-b border-[var(--border)] ">
                        <td class="p-3 flex items-center gap-2">
                            <img src="${data.imgUrl}" class="w-13 h-13 rounded-full" alt="${data.name}" />
                            ${data.name}
                        </td>
                        <td class="p-3">Dec 19, 2023</td>
                        <td class="p-3">PDH88801</td>
                        <td class="p-3">$${data.price}</td>
                        <td class="p-3">88</td>
                        <td class="p-3 text-2xl">⋮</td>
                    </tr>`
    });
}

getProducts()