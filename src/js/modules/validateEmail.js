export default function validateEmail(emailInputs) {

    function onEmailInput(e) {
        let emailInput = e.target;
        if (/[a-z*\.*-*_*0-9]@[a-z]\.[a-z]/g.test(emailInput) && emailInput !== "") {
            emailInput.classList.remove("invalid");
            console.log("Right");
        } else {
            emailInput.classList.add("invalid");
            console.log("Wrong");
        }
    }

    emailInputs.forEach(email => {
        email.addEventListener("input", onEmailInput);
    });
}