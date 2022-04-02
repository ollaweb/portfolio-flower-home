export default function smoothScroll() {
    //Collecting all links that starts with #
    const allLinks = document.querySelectorAll("a[href*='#']");
    const animationDuration = 500;
    //Set amount of steps to do while animation duration lasts
    const steps = 60;

    allLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            //Pick "href" attribute from the link
            const linkHref = link.getAttribute("href");

            //Find HTML element by "href" attribute
            const linkInHtml = document.querySelector(linkHref);

            //Coordinate Y for each link (no matter what pageYOffset is)
            const linkYCoordinate = linkInHtml.getBoundingClientRect().top + window.pageYOffset;

            //Window Y position when we pressed on the link 
            const positionY = window.pageYOffset;

            //Set interval (iterations for smooth scroll)
            const scroller = setInterval(() => {
                /*
                How mush to scroll by 1 step when scrolling down
                NOTE: This method adaptive.
                If link to press stands on the top of the page,
                then scroller will scroll slower than if it was on the bottom of the page.
                It's all because the distance to pass while scrolling when link at the top
                is less than when link is at the bottom
                */
                const stepScroll = (linkYCoordinate - positionY) / steps;
                //if block we need scroll to is lower than link we just cliked on, then
                if (linkYCoordinate > window.pageYOffset) {
                    /*
                    if delta Y between link and element more
                    than scroll by 1 step and it's not he end of the pфge,
                    then do down scroll by 1 step
                    */
                    if ((linkYCoordinate - window.pageYOffset > stepScroll) && (window.innerHeight + window.pageYOffset < document.body.scrollHeight)) {
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
                    if (window.pageYOffset - linkYCoordinate > stepScrollUp) {
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