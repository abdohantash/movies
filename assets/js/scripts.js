$(window).on("scroll", function () {
  if ($(window).scrollTop() > 0) {
    $(".header-box").addClass("scroll-header");
  } else {
    $(".header-box").removeClass("scroll-header");
  }
});

$(document).ready(function () {
  $(".btn-search").on("click", function () {
    $(".search-box").addClass("active");
  });

  $(".close-search").on("click", function () {
    $(".search-box").removeClass("active");
  });
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

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var swiper_logos = new Swiper(".swiper-logos", {
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper_poster = new Swiper(".swiper-poster", {
  speed: 600,
  parallax: true,
  loop: true,
  thumbs: {
    swiper: swiper_logos,
  },
  on: {
    slideChange: function (e) {
      var activeSlide = this.slides[this.activeIndex];
      console.log(activeSlide);

      handleSlideChange(activeSlide);
    },
    init: function () {
      handleSlideChange();
    },
  },
});

function handleSlideChange(paren_activeSlide) {
  const loadIframeElements = document.querySelectorAll(".load-iframe");
  loadIframeElements.forEach((element) => {
    const iframe = element.querySelector("iframe");
    if (iframe) {
      iframe.remove();
    }
    element.classList.remove("video-loaded");
  });

  const activeSlide = paren_activeSlide.querySelector(".load-iframe");
  if (activeSlide) {
    const videoId = activeSlide.getAttribute("data-yt-id");

    const iframeElement = document.createElement("iframe");
    iframeElement.id = "existing-iframe";
    iframeElement.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&disablekb=1`;
    iframeElement.allow = "autoplay; encrypted-media";
    iframeElement.allowFullscreen = true;

    activeSlide.appendChild(iframeElement);

    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player("existing-iframe", {
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
      }
    }

    setTimeout(() => {
      activeSlide.classList.add("video-loaded");
    }, 5000);
  }
}
