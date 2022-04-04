import validateName from "./validateName";
import validatePhone from "./validatePhone";
import validateEmail from "./validateEmail";

export default function validateForm(form) {
    const allFields = form.querySelectorAll("[data-input]");

    let wrongSymbolMessage = new CustomEvent("wrongSymbolMessage");
    let rightSymbolMessage = new CustomEvent("rightSymbolMessage");
    let notValid = new CustomEvent("notValid", { bubbles: true });
    let valid = new CustomEvent("valid", { bubbles: true });

    function removeErrorMessage(field) {
        if (field.parentElement.querySelector(".error-message")) {
            field.parentElement.querySelector(".error-message").remove();
        }
    }

    function showErrorMessage(field, message) {
        removeErrorMessage(field);
        let errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.innerHTML = message;
        field.after(errorMessage);
    }

    function listenCustomEvents(field, wrongSymbolMessage, notValidMessage) {
        field.addEventListener("wrongSymbolMessage", () => showErrorMessage(field, wrongSymbolMessage));
        field.addEventListener("rightSymbolMessage", () => removeErrorMessage(field));
        if (field.hasAttribute("required")) {
            field.addEventListener("notValid", () => showErrorMessage(field, notValidMessage));
            field.addEventListener("valid", () => removeErrorMessage(field));
        }
    }

    allFields.forEach((field, index) => {
        if (field.hasAttribute("data-input-name")) {
            validateName(field, wrongSymbolMessage, rightSymbolMessage, notValid, valid);
            listenCustomEvents(field, "Вводите только русские буквы", "Введите не менее 2х символов");
        } else if (field.hasAttribute("data-input-phone")) {
            validatePhone(field, wrongSymbolMessage, rightSymbolMessage, notValid, valid);
            listenCustomEvents(field, "Вводите только цифры", "Введите не менее 11 цифр");
        } else if (field.hasAttribute("data-input-email")) {
            validateEmail(field, wrongSymbolMessage, rightSymbolMessage, notValid, valid);
            listenCustomEvents(field, "Вводите только латинские буквы, цифры или специальные символы", "Введите корректный адрес вида example@example.ru");
        }
    });

}