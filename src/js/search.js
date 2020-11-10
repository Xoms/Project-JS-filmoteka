
import refs from "./refs.js"
let query;

refs.userInputField.addEventListener("change", ()=>{  
     let userInput = refs.userInputField.value;  

    const validInputRegex = /^[a-zA-Z0-9а-яА-Я\s]+$/;
    if(userInput.match(validInputRegex)) {
    
      query = userInput; 
    } 
    else {
    refs.errorMessage.classList.remove("hidden")
    
      refs.userInputField.value = ""
     
    }
       })
