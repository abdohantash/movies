var swiper_logos = new Swiper(".swiper-logos", {
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper_poster = new Swiper(".swiper-poster", {
  speed: 600,
  parallax: true,
  thumbs: {
    swiper: swiper_logos,
  },
});