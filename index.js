import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://fir-frontend-911ss-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEL = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")
const shoppingListEL = document.getElementById("shopping-list")

addButtonEL.addEventListener("click", function() {
    let inputValue = inputFieldEL.value
    
    push (shoppingListInDB, inputValue)
    clearInputFieldEL()
})

onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEL()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEL(currentItem)
        }    
    } else {
        shoppingListEL.innerHTML = "No items here... yet"
    } 
})

function  clearShoppingListEL(){
    shoppingListEL.innerHTML = ""
}

function clearInputFieldEL(){
    inputFieldEL.value = ""
}

function appendItemToShoppingListEL(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEL = document.createElement("li")

    newEL.classList.add("item")
    newEL.textContent = itemValue

    newEL.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEL.append(newEL)
}