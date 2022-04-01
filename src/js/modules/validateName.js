export default function validateName(nameInputs) {

    function onNameInput(e) {
        let nameInput = e.target;
        let inputSymbolsValue = nameInput.value.replace(/[^а-яёА-ЯЁ\s?]/ig, "");
        nameInput.value = inputSymbolsValue;
        if (inputSymbolsValue.length >= 2) {
            nameInput.classList.remove("invalid");
        } else {
            nameInput.classList.add("invalid");
        }
    }

    nameInputs.forEach(name => {
        name.addEventListener("input", onNameInput);
    });
}