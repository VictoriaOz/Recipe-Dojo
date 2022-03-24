import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

window.onload = function() {

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

    const app = initializeApp(firebaseConfig);

    const auth = getAuth();
    const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log("User status changed: ", user);
          // ...
        } else {
          // User is signed out
          console.log("user is signed out");
        }
      });
      const changePW = document.getElementById('update-pw');

      changePW.addEventListener('submit', (e) => {
        const user = auth.currentUser;
        const email = document.getElementById('email').value;
        
        e.preventDefault();
        console.log("Button clicked");
        sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("password reset email sent.");
        })
        .catch((error) => {
          console.log(error.message);
         });
      })

}
