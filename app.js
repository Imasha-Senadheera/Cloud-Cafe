// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDf2qsr8DWxZ1303A6nokPx8pGxZQAilCc",
    authDomain: "cloud-cafe-a6279.firebaseapp.com",
    projectId: "cloud-cafe-a6279",
    storageBucket: "cloud-cafe-a6279.appspot.com",
    messagingSenderId: "365172338485",
    appId: "1:365172338485:web:763e1150f7af64a29a667c",
    measurementId: "G-MPM512PZHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to load cafes
async function loadCafes() {
    const cafeList = document.querySelector('#cafe-list');

    // create element & render cafe
    function renderCafe(doc) {
        let li = document.createElement('li');
        let name = document.createElement('span');
        let city = document.createElement('span');

        li.setAttribute('data-id', doc.id);
        name.textContent = doc.data().name;
        city.textContent = doc.data().city;

        li.appendChild(name);
        li.appendChild(city);

        cafeList.appendChild(li);
    }

    // getting data
    const querySnapshot = await getDocs(collection(db, 'cafes'));
    querySnapshot.forEach(doc => {
        renderCafe(doc);
    });
}

// Call your function to load cafes after the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {
    // Ensure Firebase is initialized before calling loadCafes
    loadCafes();
});
