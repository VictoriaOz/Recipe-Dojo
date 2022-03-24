import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

window.onload = function() {

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

  //get auth
  const auth = getAuth();
//show that user is logged in
const user = auth.currentUser;

onAuthStateChanged(auth, (user)=> {
  console.log("User status changed: ", user);
})

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
//add ingredients
document.getElementById("addIng").onclick  = function() {

    var node = document.createElement("Li");
    var text = document.getElementById("ing").value; 
    var textnode=document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("ingList").appendChild(node);
    document.getElementById("ing").value = " "; 
}
//add directions
document.getElementById("addDir").onclick  = function() {
    
    var node = document.createElement("Li");
    var text = document.getElementById("dir").value; 
    var textnode=document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("dirList").appendChild(node);
    document.getElementById("dir").value = " "; 
}

//remove ingredient
document.getElementById("removeIng").addEventListener('click', () => {
    var ing = document.getElementById("ingList");
    var items = document.querySelectorAll("#ingList li");
    ing.removeChild(items[0]);
  })

//remove step
  document.getElementById("removeDir").addEventListener('click', () => {
   var ing = document.getElementById("dirList");
   var items = document.querySelectorAll("#dirList li");
   ing.removeChild(items[0]);
 })

//grab input from form and add to recipe card -- save to database
const db = getFirestore();
const collectionRef = collection(db, 'Recipes');

const addRecipe = document.getElementById("recipe");
addRecipe.addEventListener('submit', (e) => {
    e.preventDefault();
    var ingList = document.getElementById('ingList').getElementsByTagName('li');
    var dirList = document.getElementById('dirList').getElementsByTagName('li');
    var ingredientList = [];
    var directionList = [];

    for(var i=0;i < ingList.length; i++) {
        var arrValue = ingList[i].innerHTML;
        console.log(arrValue);
        ingredientList.push(arrValue);
    }

    for(var j=0;j < dirList.length; j++) {
        var arrValue2 = dirList[j].innerHTML;
        console.log(arrValue2);
        directionList.push(arrValue2);
    }

    addDoc(collectionRef, {
        Directions: directionList,
        Ingredients: ingredientList, 
        RecipeName: document.getElementById("nameOfRecipe").value,
        Reference: document.getElementById("Reference").value,
        NumberOfIngredients: document.getElementById("numIngredients").value,
        CookingTime: document.getElementById("cookingTime").value
    })

    alert("Recipe has been added.");
    document.getElementById("nameOfRecipe").value = '';
    document.getElementById("Reference").value = '';
    document.getElementById("numIngredients").value = '';
    document.getElementById("cookingTime").value = '';
    document.getElementById('ingList').value = '';
    document.getElementById('dirList').value = '';

})


}


    