export default function validatePhone() {
    const phoneInputs = document.querySelectorAll("input[type='tel']");

    function getInputNumbersValue(input) {
        return input.value.replace(/\D/g, "");
    }

    function onPhoneInput(e) {
        let phoneInput = e.target;
        let inputNumbersValue = getInputNumbersValue(phoneInput);
        let formatedInputValue = "";
        let selectionStart = phoneInput.selectionStart;

        //If trying to tape symbols will be blank input
        if (!inputNumbersValue) {
            return phoneInput.value = "";
        }

        function showMaskAgain() {
            if (inputNumbersValue[0] == "8") {
                phoneInput.value = inputNumbersValue[0] + " (" +
                    inputNumbersValue.slice(1, 4) + ") " +
                    inputNumbersValue.slice(4, 7) + "-" +
                    inputNumbersValue.slice(7, 9) + "-" +
                    inputNumbersValue.slice(9, 11);
            } else {
                phoneInput.value = "+" + inputNumbersValue[0] + " (" +
                    inputNumbersValue.slice(1, 4) + ") " +
                    inputNumbersValue.slice(4, 7) + "-" +
                    inputNumbersValue.slice(7, 9) + "-" +
                    inputNumbersValue.slice(9, 11);
            }
        }

        //If cursor is in the middle to change numbers, that will be allowed
        if (phoneInput.value.length !== selectionStart) {
            /*
            if we try to add symbol in the middle it wont't be allowed
            and mask will be broken
            */

            if (e.data && /\D/g.test(e.data)) {
                //Track position of cursor when we fried to enter not a number and broke the mask
                let cursorPosition = phoneInput.value.indexOf(e.data);
                //If we try to enter not number the mask will be broken
                phoneInput.value = inputNumbersValue;
                //But the cursor position will be at the same place
                if (cursorPosition >= 4 && cursorPosition <= 7) {
                    phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 3;
                }
                if (cursorPosition == 8) {
                    phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 4;
                }
                if (cursorPosition > 8 && cursorPosition <= 12) {
                    phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 5;
                }
                if (cursorPosition > 12 && cursorPosition <= 15) {
                    phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 6;
                }
                if (cursorPosition > 15 && cursorPosition < 18) {
                    phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 7;
                }
            }
            /*
           When the total amount of numbers will be 11 again after correction,
           then mask wjll appear again
           */
            if (inputNumbersValue.length == 11) {
                showMaskAgain();
            }
            return
        }

        if (["7", "8", "9"].includes(inputNumbersValue[0])) {
            //mobile phone from Russia
            if (inputNumbersValue[0] == "9") {
                inputNumbersValue = "7" + inputNumbersValue;
            }
            let firstSymbol;
            if (inputNumbersValue[0] == "8") {
                firstSymbol = "8";
            } else {
                firstSymbol = "+7";
            }
            formatedInputValue = firstSymbol + " ";
            if (inputNumbersValue.length > 1) {
                //For St.Petersburg numbers. If we're tapping like 812, will be 8 (812)
                if (inputNumbersValue[0] == "8" && inputNumbersValue[1] == "1") {
                    formatedInputValue += "(8" + inputNumbersValue.substring(1, 4);
                } else {
                    formatedInputValue += "(" + inputNumbersValue.substring(1, 4);
                }
            }
            if (inputNumbersValue.length > 4) {
                formatedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length > 7) {
                formatedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length > 9) {
                formatedInputValue += "-" + inputNumbersValue.substring(9, 11);
            }
        } else {
            //other phone
            formatedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }
        return phoneInput.value = formatedInputValue;
    }

    function onPhoneDelete(e) {
        //Delete first symbol
        if (e.keyCode == "8" && getInputNumbersValue(e.target).length == 1) {
            e.target.value = "";
        }
    }

    function onPhonePaste(e) {
        let pasted = e.clipboardData || window.clipboardData;
        let phoneInput = e.target;
        let inputNumbersValue = getInputNumbersValue(phoneInput);
        if (pasted) {
            let pastedText = pasted.getData("text");
            if (/\D/g.test(pastedText)) {
                phoneInput.value = inputNumbersValue;
            }
        }
    }

    phoneInputs.forEach(input => {
        input.addEventListener("input", onPhoneInput);
        input.addEventListener("keydown", onPhoneDelete);
        input.addEventListener("paste", onPhonePaste);
    });
}