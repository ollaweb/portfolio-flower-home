export default function smoothScroll() {
    //Collecting all links that starts with #
    const allLinks = document.querySelectorAll("a[href*='#']");
    const animationDuration = 300;
    //Set amount of steps to do while animation duration lasts
    const steps = 60;

    allLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            //Pick "href" attribute from the link
            const linkHref = link.getAttribute("href");

            //Find HTML element by "href" attribute
            const linkInHtml = document.querySelector(linkHref);

            //Coordinate Y for each link (no matter what scrollY is)
            const linkYCoordinate = linkInHtml.getBoundingClientRect().top + window.scrollY;

            //Window Y position for up scroll 
            const positionY = window.scrollY;

            //Set interval (iterations for smooth scroll)
            const scroller = setInterval(() => {
                //how mush to scroll by 1 step when scrolling down
                const stepScroll = linkYCoordinate / steps;

                //if block we need scroll to is lower than link we just cliked on, then
                if (linkYCoordinate > window.scrollY) {
                    /*
                    if delta Y between link and element more
                    than scroll by 1 step and it's not he end of the pфge,
                    then do вщцт scroll by 1 step
                    */
                    if ((linkYCoordinate - window.scrollY > stepScroll) && (window.innerHeight + window.scrollY < document.body.scrollHeight)) {
                        window.scrollBy(0, stepScroll);
                    } else {
                        //else scroll strainght to the element and quit the interval
                        window.scrollTo(0, linkYCoordinate);
                        clearInterval(scroller);
                    }
                    //else if the block we need scrol to is above the link we just cliked, then
                } else {
                    //how mush to scroll by 1 step when scrolling up (not the same when scrolling down!)
                    const stepScrollUp = positionY / steps;

                    //if delta Y between windowY and link Y coordinate more than 1 step scroll, then
                    if (window.scrollY - linkYCoordinate > stepScrollUp) {
                        window.scrollBy(0, stepScrollUp * -1);
                    } else {
                        //else scroll strainght to the element and quit the interval
                        window.scrollTo(0, linkYCoordinate);
                        clearInterval(scroller);
                    }
                }
            }, animationDuration / steps);
        });
    });

}