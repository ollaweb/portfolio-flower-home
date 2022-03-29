export default function useArrowUp() {
    const arrowBlock = document.querySelector(".arrow-up");
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 1600 && window.innerWidth > 992) {
            arrowBlock.classList.add("_active");
        } else if (window.scrollY >= 1200 && window.innerWidth <= 992) {
            arrowBlock.classList.add("_active");
        } else {
            arrowBlock.classList.remove("_active");
        }
    });
}