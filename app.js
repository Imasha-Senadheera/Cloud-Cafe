// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc as firestoreDoc, deleteDoc, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Select HTML elements using their IDs
const form = document.querySelector('#add-cafe-form');
const cafeList = document.querySelector('#cafe-list');

// Firebase configuration for your web app
const firebaseConfig = {
    apiKey: "AIzaSyDf2qsr8DWxZ1303A6nokPx8pGxZQAilCc",
    authDomain: "cloud-cafe-a6279.firebaseapp.com",
    projectId: "cloud-cafe-a6279",
    storageBucket: "cloud-cafe-a6279.appspot.com",
    messagingSenderId: "365172338485",
    appId: "1:365172338485:web:763e1150f7af64a29a667c",
    measurementId: "G-MPM512PZHY"
};

// Initialize Firebase app and get a Firestore instance
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to load cafes from Firestore, sort them alphabetically, and render them on the page
async function loadCafes() {
  // Clear the existing cafeList content
  cafeList.innerHTML = '';

  // Query Firestore for all documents in the 'cafes' collection, ordered by the 'name' field
  const querySnapshot = await getDocs(query(collection(db, 'cafes'), orderBy('name')));

  // Function to render a single cafe document
  function renderCafe(doc) {
    // Create HTML elements for the cafe details
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    // Set data-id attribute with the document ID
    li.setAttribute('data-id', doc.id);

    // Set text content based on data from the document
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    // Append elements to the li element
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    // Append the li element to the cafeList
    cafeList.appendChild(li);

    // Add click event listener for delete functionality
    cross.addEventListener('click', async (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
    
      // Use firestoreDoc instead of doc to avoid conflicts
      await deleteDoc(firestoreDoc(db, 'cafes', id));
      li.remove();
    });
  }

  // Iterate over each document and render it using the renderCafe function
  querySnapshot.forEach(doc => {
    renderCafe(doc);
  });
}

// Load cafes when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  loadCafes();
});

// Add submit event listener to the form for adding new cafes
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Add a new document to the 'cafes' collection with data from the form
  await addDoc(collection(db, 'cafes'), {
    name: form.name.value,
    city: form.city.value
  });

  // Clear form inputs and reload cafes to update the list
  form.name.value = '';
  form.city.value = '';
  loadCafes();
});
