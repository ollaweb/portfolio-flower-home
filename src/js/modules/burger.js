export default function useBurger() {
    const burger = document.querySelector(".burger");
    const burgerStrips = document.querySelector(".burger__items");
    const menu = document.querySelector(".menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuItemLinks = document.querySelectorAll(".menu__item a");

    function openBurgerMenu() {
        burgerStrips.classList.add("_opened");
        menu.classList.add("_opened");
        document.body.style.overflow = "hidden";
        menuOverlay.classList.add("menu-overlay_opened");
    }
    function closeBurgerMenu() {
        burgerStrips.classList.remove("_opened");
        menu.classList.remove("_opened");
        document.body.style.overflow = "";
        menuOverlay.classList.remove("menu-overlay_opened");
    }
    function closeByClickOnOverlay() {
        menuOverlay.addEventListener("click", (event) => {
            event.stopPropagation();
            if (event.target === menuOverlay) {
                closeBurgerMenu();
            }
        });
    }
    function closeByClickOnMenuItem() {
        menu.addEventListener("click", (event) => {
            event.stopPropagation();
            menuItemLinks.forEach(item => {
                if ((event.target === item)) {
                    closeBurgerMenu();
                }
            });

        });
    }
    function clickOnBurger() {
        burger.addEventListener("click", (event) => {
            event.stopPropagation();
            if (!burgerStrips.classList.contains("_opened")) {
                openBurgerMenu();
                closeByClickOnOverlay();
                closeByClickOnMenuItem();
            } else {
                closeBurgerMenu();
            }
        });
    }
    clickOnBurger();
}