export default function validateEmail(emailInput, wrongSymbolMessage, rightSymbolMessage, notValid, valid) {

    function onEmailInput(e) {
        let emailInput = e.target;
        if (/[^a-zA-Z0-9_.+-@]/ig.test(emailInput.value)) {
            emailInput.dispatchEvent(wrongSymbolMessage);
            emailInput.value = emailInput.value.replace(/[^a-zA-Z0-9_.+-@]/ig, "");
        } else {
            emailInput.dispatchEvent(rightSymbolMessage);
            if (/^[a-z][a-zA-Z0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g.test(emailInput.value) && emailInput.value !== "") {
                emailInput.setAttribute("valid", "valid");
            } else {
                emailInput.removeAttribute("valid");
            }
        }

    }

    function onEmailChange(e) {
        let emailInput = e.target;
        if (/^[a-z][a-zA-Z0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g.test(emailInput.value) && emailInput.value !== "") {
            emailInput.dispatchEvent(valid);
        } else {
            emailInput.dispatchEvent(notValid);
        }
    }

    emailInput.addEventListener("input", onEmailInput);
    emailInput.addEventListener("change", onEmailChange);
}