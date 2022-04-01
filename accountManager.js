import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged, deleteUser } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore, collection, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

    const firebaseConfig = {
        apiKey: "AIzaSyD6JwtvrWkoYn4fhU4frG6AMLSvBgX0Jtk",
        authDomain: "recipe-dojo.firebaseapp.com",
        databaseURL: "https://recipe-dojo-default-rtdb.firebaseio.com",
        projectId: "recipe-dojo",
        storageBucket: "recipe-dojo.appspot.com",
        messagingSenderId: "652490416558",
        appId: "1:652490416558:web:9bff18c1e63a85e80be83f",
      };

    initializeApp(firebaseConfig);

    const auth = getAuth();
    const db = getFirestore();
    const collectionRef = collection(db, 'User');

    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User status changed: ", user);
          const email = user.email;
        document.getElementById('email').innerHTML= email;
          // ...
        } else {
          // User is signed out
          console.log("user is signed out");
        }

         //Delete account
    const deleteAcct = document.getElementById("delete-account");
    deleteAcct.addEventListener('click', (e) => {
      confirm("Do you want to delete your account, this cannot be undone.");
      const docRef = doc(collectionRef, user.uid)
      deleteDoc(docRef);
      deleteUser(user).then(() => { 
        console.log("Account has been deleted.");
        alert("Account has been deleted");
        window.location.href="index.html";
      }).catch((error) => {
        console.log(error.message);
      });
      
    })
      });

      const save = document.getElementById("account-form")
        save.addEventListener('submit', (e) => {
          e.preventDefault()
         window.location.href = "userDashboard.html";
        })
    
        const resetPW = document.getElementById("change-password");
        
        resetPW.addEventListener('click', () => {
          window.location.href="changePassword.html";     
    })
    
   
