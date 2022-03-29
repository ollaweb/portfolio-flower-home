import validateAndSendForm from "./modules/form";
import useBurger from "./modules/burger";
import useArrowUp from "./modules/arrowUp";
import smoothScroll from "./modules/scroll";
"use strict"

window.addEventListener("DOMContentLoaded", () => {
    validateAndSendForm();
    useBurger();
    useArrowUp();
    smoothScroll();
});