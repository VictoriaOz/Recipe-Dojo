import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore, collection, doc, setDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

//initialize firebase and create a firebase object
console.log("I can see the firebase object");

const firebaseConfig = {
    apiKey: "AIzaSyD6JwtvrWkoYn4fhU4frG6AMLSvBgX0Jtk",
    authDomain: "recipe-dojo.firebaseapp.com",
    databaseURL: "https://recipe-dojo-default-rtdb.firebaseio.com",
    projectId: "recipe-dojo",
    storageBucket: "recipe-dojo.appspot.com",
    messagingSenderId: "652490416558",
    appId: "1:652490416558:web:9bff18c1e63a85e80be83f",
  }; 
  // Initialize Firebase
  initializeApp(firebaseConfig);

 const auth = getAuth();
 const db = getFirestore();
 const collectionRef = collection(db, 'User');

  const signupForm = document.getElementById("user-form")

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //get values from form
    const email = signupForm.email.value;
    const password = signupForm.password.value;
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential)
      const user = userCredential.user;
      setDoc(doc(collectionRef, user.uid), {email: user.email});
      const userDoc = doc(collectionRef, user.uid)
      addDoc(collection(userDoc, 'Recipes'), {
        RecipeName: "Stuffed Bell Peppers",
        CookingTime: "1 Hour",
        NumberOfIngredients: "6",
        Ingredients: ["6 bell peppers of your choice", "1 lb of ground beef", "1 bag of frozen hashbrowns (16 oz)", "2 cups of shredded cheddar cheese (optional)",
	                    "3/4 cup of salsa", "salt"],
        Directions: ["Preheat the oven to 375 degrees fahrenheit, cut off the top of the bell peppers and remove the seeds.",
	                  "In a pot, blanch the bell peppers on medium-high heat until al-dente. This takes around 15 minutes.",
	                  "Brown the ground beef with some salt on medium-high heat. Once the meat has been browned, add the hashbrowns and salsa, and turn the heat down to medium heat until the hashbrowns are hot.",
	                  "In a 9x13 pan, line the peppers and fill them with the meat filling. Then add cheese on top and place in the oven for 20 minutes.",
	                  "Remove from oven and allow to cool for about 10 minutes before serving."],
        Reference: "Victoria Ozment, creator of Recipe Dojo -- I am sharing one of my recipes with you just for signing up!"
      })
     
      sendEmailVerification(auth.currentUser)
      alert("Reload the website and login with your new account!")
      signupForm.reset(); 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, ': ', errorMessage)
    });
  });

  