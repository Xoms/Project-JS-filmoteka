
const userInputField = document.querySelector(".input-search");
const errorMessage = document.querySelector(".error-message");

let query;

userInputField.addEventListener("change", ()=>{  
    let userInput = userInputField.value;  

    const validInputRegex = /^[a-zA-Z0-9а-яА-Я\s]+$/;
    if(userInput.match(validInputRegex)) {
    
      query = userInput; 
    } 
    else {
    errorMessage.classList.remove("hidden")
    
      userInputField.value = ""
     
    }
       })
    
    
    
    
    
   