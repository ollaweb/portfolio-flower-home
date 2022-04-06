export default function useArrowUp() {
    const arrowBlock = document.querySelector(".arrow-up");

    window.addEventListener("scroll", () => {
        /*
        When scroll reaches some point, arrowUp arrear.
        When it goes back to the top of the page, arrowUp dissapear
        */
        if (window.pageYOffset >= 1600 && window.innerWidth > 992) {
            arrowBlock.classList.add("_active");
        } else if (window.pageYOffset >= 1050 && window.innerWidth <= 992) {
            arrowBlock.classList.add("_active");
        } else {
            arrowBlock.classList.remove("_active");
        }
    });
}