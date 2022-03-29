import $ from "jquery";
import slick from "slick-carousel";
$(".slider__items_flowers").slick({
    arrows: true,
    dots: true,
    slidesToShow: 1,
    touchThreshold: 10,
    touchMove: false,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 576,
            settings: {
                arrows: true,
                touchThreshold: 10,
                touchMove: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                arrows: true,
                slidesToShow: 2,
                touchThreshold: 10,
                touchMove: false,
            }
        },
        {
            breakpoint: 992,
            settings: {
                arrows: true,
                slidesToShow: 3,
                draggable: false,
            }
        }

    ]
});
$(".slider__items_feedback").slick({
    dots: true,
    draggable: false,
    touchThreshold: 8,
    touchMove: false,
    adaptiveHeight: true,
});