export const lazyImage = function () {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          if (entry.target.hasAttribute("data-src")) {
            entry.target.setAttribute(
              "src",
              entry.target.getAttribute("data-src")
            );
            observer.unobserve(entry.target);
          }
        }
      });
    });
    document.querySelectorAll(".lazy-image").forEach((gameImg) => {
      if (
        gameImg.getAttribute("is-observed") != "true" &&
        gameImg.getAttribute("data-src") != null
      ) {
        gameImg.setAttribute("is-observed", "true");
        observer.observe(gameImg);
      }
    });
  } else {
    var imgList = document.querySelectorAll(".lazy-image");
    Array.prototype.forEach.call(imgList, function (image) {
      image.setAttribute("src", image.getAttribute("data-src"));
    });
  }
};
