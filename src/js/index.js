import postForm from "./modules/form";
import validatePhone from "./modules/validatePhone";
import useBurger from "./modules/burger";
import useArrowUp from "./modules/arrowUp";
import smoothScroll from "./modules/scroll";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    useBurger();
    useArrowUp();
    smoothScroll();
    validatePhone();
    postForm();
});