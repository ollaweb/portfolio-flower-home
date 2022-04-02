import validateEmail from "./validateEmail";
import validateName from "./validateName";
import validatePhone from "./validatePhone";

export default function postForm(form) {
    const nameInputs = form.querySelectorAll("input[name='name']");
    validateName(nameInputs);
    const phoneInputs = form.querySelectorAll("input[type='tel']");
    validatePhone(phoneInputs);
    const emailInputs = form.querySelectorAll("input[type='email']");
    validateEmail(emailInputs);

    const inputsRequared = form.querySelectorAll('[required]');
    const inputs = form.querySelectorAll("input");
    const submitButton = form.querySelector("button[type='submit']");

    form.addEventListener("change", () => {
        submitButton.removeAttribute("disabled");
        inputsRequared.forEach(input => {
            if (input.classList.contains("invalid")) {
                submitButton.setAttribute("disabled", "disabled");
            }
        });
    });

    // for (let i = 0; i < inputsRequared.length; i++) {
    //     if (inputsRequared[i].classList.contains("invalid")) {
    //         submitButton.setAttribute("disabled", "disabled");
    //         break;
    //     } else {
    //         submitButton.removeAttribute("disabled");
    //     }
    // }


    const message = {
        loading: "Отправка данных...",
        success: "Спасибо! Наш консультат всяжется с Вами в ближайшее время",
        error: "Ошибка отправки данных!"
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
            input.classList.add("invalid");
            submitButton.setAttribute("disabled", "disabled");
        });
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let statusMessage = document.createElement("div");
        statusMessage.classList.add("status-message");
        form.appendChild(statusMessage);

        const formData = new FormData(form);
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
    });
}
