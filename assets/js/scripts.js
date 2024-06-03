$(window).on('scroll', function() {
  if ($(window).scrollTop() > 0) {
      $('.header-box').addClass('scroll-header');
  } else {
      $('.header-box').removeClass('scroll-header');
  }
});

$(document).ready(function() {
  $('.btn-search').on('click', function() {
    $('.search-box').addClass('active');
  });

  $('.close-search').on('click', function() {
    $('.search-box').removeClass('active');
  });
});


var swiper_logos = new Swiper(".swiper-logos", {
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper_poster = new Swiper(".swiper-poster", {
  speed: 600,
  parallax: true,
  loop:true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  thumbs: {
    swiper: swiper_logos,
  },
});


var swiper_movies = new Swiper(".swiper-movies", {
  slidesPerView: "auto",
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var top_ten = new Swiper(".top_ten .swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});