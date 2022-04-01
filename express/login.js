import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
window.onload = function() {
 
//initialize firebase and create a firebase object
console.log("I can see the firebase object");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6JwtvrWkoYn4fhU4frG6AMLSvBgX0Jtk",
    authDomain: "recipe-dojo.firebaseapp.com",
    databaseURL: "https://recipe-dojo-default-rtdb.firebaseio.com",
    projectId: "recipe-dojo",
    storageBucket: "recipe-dojo.appspot.com",
    messagingSenderId: "652490416558",
    appId: "1:652490416558:web:9bff18c1e63a85e80be83f",
    measurementId: "G-X89XMV3J0F"
  };
  
  // Initialize Firebase
    initializeApp(firebaseConfig);

const auth = getAuth();
//log in and out == login from login page and logout from the dashboard

const login = document.getElementById("login-form")
login.addEventListener('submit', (e) => {
  e.preventDefault()
  const userEmail = login.email.value
  const userPassword = login.password.value
  signInWithEmailAndPassword(auth, userEmail, userPassword)
  .then((userCred) => {
    console.log('User logged in: ', userCred.user)
    window.location.href = "userDashboard.html";
  })
  .catch((error) => {
    console.log(error.message)
  })
})
}