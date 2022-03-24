import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged, deleteUser } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';

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
          const email = user.email;
        document.getElementById('email').innerHTML= email;

          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          console.log("user is signed out");
        }
      });

      const save = document.getElementById("account-form")
        save.addEventListener('submit', (e) => {
          e.preventDefault()
         window.location.href = "userDashboard.html";
        })
    
        const resetPW = document.getElementById("change-password");
        
        resetPW.addEventListener('click', () => {
          console.log("It works");
          window.location.href="changePassword.html";     
    })
    
    //Delete account
    const deleteAcct = document.getElementById("delete-account");
    deleteAcct.addEventListener('click', (e) => {
      const user = auth.currentUser;
      confirm("Do you want to delete your account, this cannot be undone.");
      deleteUser(user).then(() => {
        // User deleted.
        console.log("Account has been deleted.");
        alert("Account has been deleted");
        window.location.href="index.html";
      }).catch((error) => {
        console.log(error.message);
      });
      
    })

  }
