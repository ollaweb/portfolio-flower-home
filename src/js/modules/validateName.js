export default function validateName(nameInput, wrongSymbolMessage, rightSymbolMessage, notValid, valid) {
    function onNameInput(e) {
        let nameInput = e.target;
        if (/[^а-яёА-ЯЁ\s?]/ig.test(nameInput.value)) {
            nameInput.value = nameInput.value.replace(/[^а-яёА-ЯЁ\s?]/ig, "");
            nameInput.dispatchEvent(wrongSymbolMessage);
        } else {
            nameInput.dispatchEvent(rightSymbolMessage);
            if (nameInput.value.length < 2) {
                nameInput.removeAttribute("valid");
            } else {
                nameInput.setAttribute("valid", "valid");

            }
        }
    }

    function onNameChange(e) {
        let nameInput = e.target;
        if (nameInput.value.length < 2) {
            nameInput.dispatchEvent(notValid);
        } else {
            nameInput.dispatchEvent(valid);

        }
    }

    nameInput.addEventListener("input", onNameInput);
    nameInput.addEventListener("change", onNameChange);



}