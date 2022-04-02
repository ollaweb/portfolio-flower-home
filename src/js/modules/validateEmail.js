export default function validateEmail(emailInputs) {

    function onEmailInput(e) {
        let emailInput = e.target;
        if (/^[a-zA-Z_.+-]+[0-9]*[a-zA-Z_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g.test(emailInput.value) && emailInput.value !== "") {
            emailInput.classList.remove("invalid");
        } else {
            emailInput.classList.add("invalid");
        }
    }

    emailInputs.forEach(email => {
        email.addEventListener("input", onEmailInput);
    });
}