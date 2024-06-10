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


if (!window.YT) {
  var tag = $("<script></script>").attr("src", "https://www.youtube.com/iframe_api");
  var firstScriptTag = $("script").first();
  firstScriptTag.parent().prepend(tag);
}

var swiper_logos = new Swiper(".swiper-logos", {
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
});

var swiper_poster = new Swiper(".swiper-poster", {
  speed: 600,
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  thumbs: {
    swiper: swiper_logos,
  },
  on: {
    slideChange: function () {
      var activeSlide = this.slides[this.activeIndex];
      handleSlideChange(activeSlide);
    },
    init: function () {
      handleSlideChange(this.slides[this.activeIndex]);
    },
  },
});

function handleSlideChange(paren_activeSlide) {
  $(".load-iframe").each(function () {
    var element = $(this);
    var iframe = element.find("iframe");
    if (iframe.length) {
      iframe.remove();
    }
    element.removeClass("video-loaded");
  });

  var activeSlide = $(paren_activeSlide).find(".load-iframe");
  if (activeSlide.length) {
    var videoId = activeSlide.attr("data-yt-id");
    var iframeElement = $("<iframe></iframe>").attr({
      id: "existing-iframe",
      src: "https://www.youtube.com/embed/" + videoId + "?enablejsapi=1&rel=0&autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&disablekb=1",
      allow: "autoplay; encrypted-media",
      allowFullscreen: true
    });

    activeSlide.append(iframeElement);

    setTimeout(function () {
      activeSlide.addClass("video-loaded");

      if (window.YT && YT.Player) {
        var player = new YT.Player("existing-iframe", {
          events: {
            onReady: onPlayerReady,
            onStateChange: function (event) {
              onPlayerStateChange(event, swiper_poster);
            },
          },
        });
      }
    }, 8000);
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event, swiper) {
  if (event.data === YT.PlayerState.ENDED) {
    swiper.slideNext();
  }
}

window.onYouTubeIframeAPIReady = function() {
  if ($(".load-iframe.video-loaded").length) {
    handleSlideChange($(".load-iframe.video-loaded")[0]);
  }
};
