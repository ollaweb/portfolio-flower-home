export default function useArrowUp() {
    const arrowBlock = document.querySelector(".arrow-up");
    const arrowButtomPosition = window.getComputedStyle(arrowBlock).bottom;
    const arrowButtomPositionOnlyNumber = arrowButtomPosition.substring(0, arrowButtomPosition.length - 2);
    const footerBlock = document.getElementById("footer");
    const footerYCoorditane = footerBlock.getBoundingClientRect().top + window.pageYOffset;

    window.addEventListener("scroll", () => {
        /*
        If arrowUp's bottom side will be at footer's top side
        then change color to arrowUp to see this button more clearly
        when it appers uppon footer
        */
        if (window.pageYOffset + window.innerHeight - arrowButtomPositionOnlyNumber >= footerYCoorditane) {
            arrowBlock.classList.add("_footer");
        } else {
            arrowBlock.classList.remove("_footer");
        }
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