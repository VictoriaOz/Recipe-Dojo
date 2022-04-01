import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js';
import { getFirestore, collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js';

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
    measurementId: "G-X89XMV3J0F"
  };
  initializeApp(firebaseConfig);

  //get database
const db = getFirestore();
const auth = getAuth();

const logout = document.getElementById("log-out")
logout.addEventListener('click', () => {
  signOut(auth)
  .then(() => {
    console.log("the user has been signed out.")
    window.location.href = "index.html";
  })
  .catch((error) => {
    console.log(error.message)
  })
})

const manageAccount = document.getElementById("manage-account")
manageAccount.addEventListener('click', () => {
    window.location.href = "accountManager.html";
  })

  //display recipes
//get collection reference
const collectionRef = collection(db, 'User')
  onAuthStateChanged(auth, (user)=> {
    if (user) {
      console.log("user is signed in." + "\n" + user.uid)
    }
    else {
      console.log("user is not signed in.\n")
    }

    console.log("User status changed: ", user);
    document.getElementById("user").innerText = "User logged in: " + user.email;
    const uid = user.uid;
  
 //get a document reference and refer to the recipes collection
 const collectionRecipes = collection(doc(collectionRef, uid), 'Recipes');
  getDocs(collectionRecipes).then(snapshot => {
    snapshot.docs.forEach((recipe) => {
      
     let id = recipe.id;
     console.log(id);
      let nameOfRecipe = recipe.data().RecipeName;
      let numIngredients = recipe.data().NumberOfIngredients;
      let cookingTime = recipe.data().CookingTime;
      let reference = recipe.data().Reference;
      const button = document.createElement('button');
      button.innerText = nameOfRecipe;
      button.value = nameOfRecipe;
      document.getElementById('recipe-icons').appendChild(button);
      button.addEventListener('click', () => {
        document.getElementById("recipe-card").style.visibility = 'visible';
        document.getElementById("ingList").innerHTML = "";
        document.getElementById("dirList").innerHTML = "";
        //use this to display recipe card
    document.getElementById("RecipeName").innerHTML = nameOfRecipe;
    document.getElementById("items").innerHTML = "# of ingreidents: " + numIngredients;
    document.getElementById("time").innerHTML = "Cooking/Prep time: " + cookingTime;
    document.getElementById("reference").innerHTML = "Reference: " + reference;
    
    //get ingredient list
    let ingList = recipe.data().Ingredients;
   for (let i = 0; i < ingList.length; i++) {
      document.getElementById("ingList").innerHTML += "<li>" + ingList[i] + "</li>";
   }
  
    //get directions
    let dirList = recipe.data().Directions;
    for(let j = 0; j < dirList.length; j++) {
      document.getElementById("dirList").innerHTML += "<li>" + dirList[j] + "</li><br>";
    }
    
    const remove = document.getElementById("delete"); //refresh page when clicked -- fix this bug
    remove.addEventListener('click', (e) => {
      e.preventDefault();
      deleteRecipe(id);
    })

    const change = document.getElementById("edit");
    change.addEventListener('click', (e) => {
      editRecipe(id);
    })

    document.getElementById("share").addEventListener('click', () => {
      document.getElementById("share-form").style.visibility = 'visible';
      shareRecipe(id);
    })

    document.getElementById("Close").addEventListener('click', () => {
      document.getElementById("recipe-card").style.visibility = 'hidden';
    })

  })
})
   
  }).catch((error) => {
    console.log(error.message);
  }) 


  function deleteRecipe(id) {
    const docRef = doc(collectionRecipes, id);
    confirm("Do you want to delete this recipe, this cannot be undone.");
     deleteDoc(docRef)
      alert("Recipe has been deleted");
  }

  
  function editRecipe(id) { 
    document.getElementById("edit-recipe").style.visibility = 'visible';
    getDoc(doc(collectionRecipes, id)).then(snap => {

     document.getElementById("nameOfRecipe").value = snap.data().RecipeName;
     document.getElementById("numIngredients").value = snap.data().NumberOfIngredients;
     document.getElementById("cookingTime").value = snap.data().CookingTime;
     document.getElementById("Reference").value = snap.data().Reference;
     let ingList = snap.data().Ingredients;
     let dirList = snap.data().Directions;
     for (let i = 0; i < ingList.length; i++) {
      document.getElementById("ingredList").innerHTML += "<li>" + ingList[i] + "</li><br>";
     }

     for (let j = 0; j < dirList.length; j++) {
     document.getElementById("fixDir").innerHTML += "<li>" + dirList[j] + "</li><br>";
     }

     document.getElementById("removeIng").addEventListener('click', () => {
       var ing = document.getElementById("ingredList");
       var items = document.querySelectorAll("#ingredList li");
       ing.removeChild(items[0]);
     })

     document.getElementById("removeDir").addEventListener('click', () => {
      var ing = document.getElementById("fixDir");
      var items = document.querySelectorAll("#fixDir li");
      ing.removeChild(items[0]);
    })

    document.getElementById("addIng").addEventListener('click', () => {
      var node = document.createElement("Li");
    var text = document.getElementById("ING").value; 
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    console.log(node);
    document.getElementById("ingredList").appendChild(node);
    document.getElementById("ing").value = " "; 
    })

    document.getElementById("addDir").addEventListener('click', () => {
      var node = document.createElement("Li");
    var text = document.getElementById("dir").value; 
    var textnode=document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("fixDir").appendChild(node);
    document.getElementById("dir").value = " "; 
    }) 
    })  

    document.getElementById("update").addEventListener('click', (e) => {
      e.preventDefault();
      var ingredList = document.getElementById('ingredList').getElementsByTagName('li');
      var fixDir = document.getElementById('fixDir').getElementsByTagName('li');
      let directionList = [];
      let ingredientList = [];
     
      for (let i = 0; i < ingredList.length; i++) {
        var arrValue = ingredList[i].innerHTML;
        ingredientList.push(arrValue);
      }
  
      for (let j = 0; j < fixDir.length; j++) {
        var arrValue = fixDir[j].innerHTML;
        directionList.push(arrValue);
      }

      updateDoc(doc(collectionRecipes, id), {
        Directions: directionList,
        Ingredients: ingredientList, 
        RecipeName: document.getElementById("nameOfRecipe").value,
        Reference: document.getElementById("Reference").value,
        NumberOfIngredients: document.getElementById("numIngredients").value,
        CookingTime: document.getElementById("cookingTime").value
      })
    
    })
  }

  
  function shareRecipe(id) {
      var recipeName;
      var numIngredients;
      var cookingTime;
      let ingredList = [];
      let directList = [];
      var ref;
     getDoc(doc(collectionRecipes, id)).then(snap => {
      console.log(snap.data().RecipeName);
      recipeName = snap.data().RecipeName;
      numIngredients = snap.data().NumberOfIngredients;
      cookingTime = snap.data().CookingTime;
      let ingList =  snap.data().Ingredients;
      var dirList = snap.data().Directions;
      ref = snap.data().Reference;
      
    
      for(let i = 0; i < ingList.length; i++) {
        ingredList.push(ingList[i] + "\n");
      }

      for(let j = 0; j < dirList.length; j++) {
        directList.push((j+1) +". " + dirList[j] + "\n\n");
      }
    });

      document.getElementById("shareEmail").addEventListener('click', (e) => {
        e.preventDefault();
        var email = document.getElementById("recieverEmail").value;
      
        var message = recipeName + "\nNumber of ingredients: " + numIngredients + "\n Cooking time: " + cookingTime + "\n\nIngredients" + "\n" +
         ingredList + "\n\nDirections" + "\n" + directList + "\nReference: " + ref + "\n\nShared with Recipe Dojo";
         console.log(message);
        var subject = "Check out this recipe!";
        document.location.href = "mailto:" + encodeURIComponent(email) 
        + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
        document.getElementById("recieverEmail").value = " ";
      

    })
}


document.getElementById("close").addEventListener('click', () => {
  document.getElementById("share-form").style.visibility = 'hidden';
})

})

document.getElementById("search-button").addEventListener('click', (e) => {
  e.preventDefault();
  let items = document.getElementById("recipe-icons").children;
  console.log(items.length);
  let content = document.getElementById("search-bar").value;
  let filter = content.toUpperCase();

  for(let i = 0; i < items.length; i++) {
    let value = items[i].value.toUpperCase()
    if (!value.includes(filter)) {
      items[i].style.display = "none";
    }
    else{
      items[i].style.display = "";
    }
  }
 
})


