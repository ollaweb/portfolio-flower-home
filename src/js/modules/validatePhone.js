export default function validatePhone(phoneInput, wrongSymbolMessage, rightSymbolMessage, notValid, valid) {

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
            phoneInput.dispatchEvent(wrongSymbolMessage);
            return phoneInput.value = "";

        }


        function showMaskAgain() {
            if (inputNumbersValue[0] == "8") {
                phoneInput.value = inputNumbersValue[0] + " (" +
                    inputNumbersValue.slice(1, 4) + ") " +
                    inputNumbersValue.slice(4, 7) + "-" +
                    inputNumbersValue.slice(7, 9) + "-" +
                    inputNumbersValue.slice(9, 11);
            } else if (inputNumbersValue[0] == "7") {
                phoneInput.value = "+" + inputNumbersValue[0] + " (" +
                    inputNumbersValue.slice(1, 4) + ") " +
                    inputNumbersValue.slice(4, 7) + "-" +
                    inputNumbersValue.slice(7, 9) + "-" +
                    inputNumbersValue.slice(9, 11);
            } else {
                phoneInput.value = "+" + inputNumbersValue;
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
                if (phoneInput.value[0] == "7") {
                    if (cursorPosition == 2) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 1;
                    }
                    if (cursorPosition == 3) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 2;
                    }
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
                } else if (phoneInput.value[0] == 8) {
                    if (cursorPosition == 1) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition;
                    }
                    if (cursorPosition == 2) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 1;
                    }
                    if (cursorPosition >= 3 && cursorPosition <= 6) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 2;
                    }
                    if (cursorPosition == 7) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 3;
                    }
                    if (cursorPosition > 7 && cursorPosition <= 11) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 4;
                    }
                    if (cursorPosition > 11 && cursorPosition <= 14) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 5;
                    }
                    if (cursorPosition > 14 && cursorPosition < 17) {
                        phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 6;
                    }
                }
                else {
                    phoneInput.selectionStart = phoneInput.selectionEnd = cursorPosition - 1;
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
        phoneInput.value = formatedInputValue;
        phoneInput.dispatchEvent(rightSymbolMessage);

        //When it's 11-16 of numbers in phone value, then number is valid
        if (inputNumbersValue.length >= 11 && inputNumbersValue.length <= 16) {
            phoneInput.setAttribute("valid", "valid");
        } else {
            phoneInput.removeAttribute("valid");
        }

        return
    }

    function onPhoneChange(e) {
        let phoneInput = e.target;
        let inputNumbersValue = getInputNumbersValue(phoneInput);
        //When it's 11-16 of numbers in phone value, then number is valid
        if (inputNumbersValue.length >= 11 && inputNumbersValue.length <= 16) {
            phoneInput.dispatchEvent(valid);
        } else {
            phoneInput.dispatchEvent(notValid);
        }
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

    function onPhoneChangePlaceholder(e) {
        let phoneInput = e.target;
        phoneInput.setAttribute("placeholder", "7 (___) ___-__-__  / 8 (___) ___-__-__")
    }

    function onPhoneDefaultPlaceholder(e) {
        let phoneInput = e.target;
        phoneInput.setAttribute("placeholder", "Телефон")
    }

    phoneInput.addEventListener("input", onPhoneInput);
    phoneInput.addEventListener("change", onPhoneChange);
    phoneInput.addEventListener("keydown", onPhoneDelete);
    phoneInput.addEventListener("paste", onPhonePaste);
    phoneInput.addEventListener("focus", onPhoneChangePlaceholder);
    phoneInput.addEventListener("blur", onPhoneDefaultPlaceholder);
}