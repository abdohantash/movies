var swiper_logos = new Swiper(".swiper-logos", {
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper_poster = new Swiper(".swiper-poster", {
  spaceBetween: 10,
  thumbs: {
    swiper: swiper_logos,
  },
});