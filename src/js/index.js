import postForm from "./modules/postForm";
import useBurger from "./modules/burger";
import useArrowUp from "./modules/arrowUp";
import smoothScroll from "./modules/scroll";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    useBurger();
    useArrowUp();
    smoothScroll();
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        postForm(form);
    });

});