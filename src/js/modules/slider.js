import $ from "jquery";
import slick from "slick-carousel";
$(".slider__items_flowers").slick({
    // arrows: true,
    dots: true,
    speed: 250,
    slidesToShow: 1,
    touchThreshold: 20,
    touchMove: false,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 992,
            settings: {
                speed: 350,
                slidesToShow: 3,
                draggable: false,
            }
        }

    ]
});
$(".slider__items_feedback").slick({
    dots: true,
    speed: 250,
    touchThreshold: 20,
    touchMove: false,
    adaptiveHeight: true,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                speed: 350,
                draggable: false,
            }
        }

    ]
});