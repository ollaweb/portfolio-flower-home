import validateAndSendForm from "./modules/form";
import useBurger from "./modules/burger";
"use strict"

window.addEventListener("DOMContentLoaded", () => {
    validateAndSendForm();
    useBurger();
});