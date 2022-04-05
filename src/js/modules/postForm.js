import validateEmail from "./validateEmail";
import validateName from "./validateName";
import validatePhone from "./validatePhone";

import validateForm from "./validateForm";

export default function postForm(form) {
    validateForm(form);
    const inputs = form.querySelectorAll('[data-input]');

    const inputsRequared = form.querySelectorAll('[required]');

    let flagArray;
    form.addEventListener("input", () => {
        flagArray = [];
        for (let i = 0; i < inputsRequared.length; i++) {
            if (inputsRequared[i].hasAttribute("valid")) {
                flagArray.push(true);
            } else {
                flagArray.push(false);
            }
        }
    });



    const message = {
        loading: "Отправка данных...",
        success: "Спасибо! Наш консультат всяжется с Вами в ближайшее время",
        error: "Ошибка отправки данных!",
        valid: "Заполните корректно обязательные поля!"
    }

    const postData = async (url, data) => {
        document.querySelector(".status-message").innerHTML = message.loading;
        let result = await fetch(url, {
            method: "POST",
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = "";
        });
        const errorMassages = form.querySelectorAll(".error-message");
        errorMassages.forEach(error => {
            error.remove();
        });
    };
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let statusMessage = document.createElement("div");
        statusMessage.classList.add("status-message");
        form.appendChild(statusMessage);

        const formData = new FormData(form);

        if (flagArray.every(item => item == true)) {
            postData('./server.php', formData)
                .then(result => {
                    console.log(result);
                    statusMessage.innerHTML = message.success;
                })
                .catch(() => {
                    statusMessage.innerHTML = message.error;
                })
                .finally(() => {

                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });

        } else {
            statusMessage.innerHTML = message.valid;
            statusMessage.style.color = "red";
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        }
    });

}
