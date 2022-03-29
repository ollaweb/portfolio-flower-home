export default function useBurger() {
    const body = document.querySelector("body");
    const burger = document.querySelector(".burger");
    const burgerItems = document.querySelector(".burger__items");
    const menuAside = document.querySelector(".menu");


    function burgerSwitch() {
        if (window.innerWidth < 992) {
            menuAside.classList.toggle("_opened");
            burgerItems.classList.toggle("_opened");
            body.classList.toggle("_lock");
        }

    }

    burger.addEventListener("click", (e) => {
        console.log(e.target)
        burgerSwitch();
    });


    const menuItemsLink = document.querySelectorAll(".menu__item");

    menuItemsLink.forEach(item => {
        const link = item.querySelector("a");
        link.addEventListener("click", (e) => {
            e.stopPropagation();
            burgerSwitch();

        });
    });
}