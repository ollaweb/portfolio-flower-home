export default function validateEmail(emailInput, wrongSymbolMessage, rightSymbolMessage, notValid, valid) {

    function onEmailInput(e) {
        let emailInput = e.target;
        if (/[а-яёА-ЯЁ\s]/ig.test(emailInput.value)) {
            emailInput.dispatchEvent(wrongSymbolMessage);
            emailInput.value = emailInput.value.replace(/[а-яёА-ЯЁ\s]/ig, "");
        } else {
            emailInput.dispatchEvent(rightSymbolMessage);
            if (/^[a-z][a-zA-Z0-9_.+-]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g.test(emailInput.value) && emailInput.value !== "") {
                emailInput.dispatchEvent(valid);
            } else {
                emailInput.dispatchEvent(notValid);
            }
        }

    }

    emailInput.addEventListener("input", onEmailInput);
}