//NOROFF,9-9/21,"SIMPLE FORM VALIDATION", JAVASCRIPT, NOROFF

const contactForm = document.querySelector("#contactForm");
const name = document.querySelector("#name");
const errorName = document.querySelector("#errorName");
const subject = document.querySelector("#subject");
const errorSubject = document.querySelector("#errorSubject");
const email = document.querySelector("#email");
const errorEmail = document.querySelector("#errorEmail");
const text = document.querySelector("#text");
const errorText = document.querySelector("#errorText");
const submitForm = document.querySelector(".success")



function contactFormValidation() {
    let formIsValid = true;
    event.preventDefault()

    if(checkLength(name.value, 4) === true) {
        errorName.style.display = "none";
    }
    else {
        errorName.style.display = "block";
        formIsValid = false;
    }

    if(checkLength(subject.value, 15) === true) {
        errorSubject.style.display = "none";
    }
    else {
        errorSubject.style.display = "block";
        formIsValid = false;
    }

    if(checkLength(text.value, 24) === true){
        errorText.style.display = "none";
    }
    else {
        errorText.style.display = "block";
        formIsValid = false;
    }

    if(emailValidation(email.value)) {
        errorEmail.style.display = "none";
    }
    else {
        errorEmail.style.display = "block";
        formIsValid = false;
    }

    if (formIsValid === true) {
        submitForm.innerHTML = "<h4>Thank you for contacting us. We will be with you shortly.</h4>";
  }


        
    
}


function emailValidation(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatch = regEx.test(email);
    return patternMatch;
  }


function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    }
    else {
        return false;
    }
}

contactForm.addEventListener("submit", contactFormValidation);