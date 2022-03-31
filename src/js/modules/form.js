export default function postForm() {
    const form = document.getElementById("form");
    const inputs = document.querySelectorAll("input");

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
