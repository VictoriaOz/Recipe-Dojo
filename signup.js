import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
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
      const app = initializeApp(firebaseConfig);

 const auth = getAuth();

  const signupForm = document.getElementById("user-form")
  console.log(signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
  
    const email = signupForm.email.value;
    const password = signupForm.password.value;
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Account created: ' ,user)
      sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Verify your email. To do this, check your email and click on the link.");
      });
      signupForm.reset();
      window.location.href = "userDashboard.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, ': ', errorMessage)
      // ..
    });

   
  
  })

  
}