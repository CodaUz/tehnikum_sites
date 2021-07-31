// load animation image

if (window.matchMedia("(min-width: 800px)").matches) {
  let okImg = document.createElement("img");
  okImg.src = "images/ok.gif";
  okImg.alt = "ok";
  okImg.classList.add("centerImg");
  okImg.classList.add("hide");
  okImg.id = "okImg";
  document.querySelector(".sliderBox-one").prepend(okImg);
  let peaceImg = document.createElement("img");
  peaceImg.src = "images/peace.gif";
  peaceImg.alt = "peace";
  peaceImg.classList.add("centerImg");
  peaceImg.classList.add("hide");
  peaceImg.id = "peaceImg";
  document.querySelector(".sliderBox-one").prepend(peaceImg);
  let coolImg = document.createElement("img");
  coolImg.src = "images/cool.gif";
  coolImg.alt = "cool";
  coolImg.classList.add("centerImg");
  coolImg.classList.add("show");
  coolImg.id = "coolImg";
  document.querySelector(".sliderBox-one").prepend(coolImg);
}

function openModalForm(formName) {
  document.querySelector(formName).classList.add("active");
  document.querySelector(".grayBack").classList.add("active");
  setTimeout(() => {
    document.querySelector(formName).classList.add("activeAnimate");
    document.querySelector(".grayBack").classList.add("activeAnimate");
  }, 0);
}

function closeModalForm(formName) {
  document.querySelector(formName).classList.remove("activeAnimate");
  document.querySelector(".grayBack").classList.remove("activeAnimate");
  setTimeout(() => {
    document.querySelector(formName).classList.remove("active");
    document.querySelector(".grayBack").classList.remove("active");
  }, 200);
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("active");

    setTimeout(() => {
      document.querySelector(".twoCarrer").classList.add("initialX");
    }, 200);
    setTimeout(() => {
      document.querySelector("html").removeAttribute("style");
      document.querySelector(".loader").style.display = "none";
    }, 500);
  }, 3000);
});

const controller = new ScrollMagic.Controller();

let triggerHook = 0.1;
if (window.matchMedia("(max-width: 700px)").matches) {
  triggerHook = 0.2;
}
if (window.matchMedia("(max-width: 500px)").matches) {
  triggerHook = 0.1;
}

new ScrollMagic.Scene({
  triggerElement: ".firstBox",
  triggerHook,
})
  .on("enter", () => {
    document.querySelector(".twoCarrer").classList.remove("initialX");
    document.querySelector(".twoCarrer").classList.add("animateX");
  })
  .on("leave", () => {
    document.querySelector(".twoCarrer").classList.add("initialX");
    document.querySelector(".twoCarrer").classList.remove("animateX");
  })
  .addTo(controller);

// video

function playPause(e) {
  e.children[0].classList.toggle("active");
  if (e.children[1].paused) {
    e.children[1].play();
  } else e.children[1].pause();
}
function showActive(e) {
  e.parentNode.children[0].classList.remove("active");
}

// menu
function openMenu() {
  document.querySelector(".grayBack").classList.add("active");
  setTimeout(() => {
    document.querySelector(".grayBack").classList.add("activeAnimate");
  }, 0);
  document.querySelector(".mobileNav").classList.add("active");
  setTimeout(() => {
    document.querySelector(".mobileNav").classList.add("activeAnimate");
  }, 0);
}
function closeMenu() {
  document.querySelector(".grayBack").classList.remove("activeAnimate");
  document.querySelector(".mobileNav").classList.remove("activeAnimate");
  setTimeout(() => {
    document.querySelector(".grayBack").classList.remove("active");
  }, 200);
  setTimeout(() => {
    document.querySelector(".mobileNav").classList.remove("active");
  }, 200);
}

let triggerHookTop = ((85 / screen.height) * 100) / 100;

new Slider({
  basicSliders: ["main"],
  emojiSliders: ["main"],
  indicatorsForClick: ["#sliderOneIndicator"],
  indicatorsScrollable: [false],
  triggerHookTop,
  controller,
}).init();

function openMobileMap(idElem) {
  if (!window.matchMedia("(min-width: 900px)").matches) {
    openModalForm(idElem);
  }
}

(function (m, e, t, r, i, k, a) {
  m[i] =
    m[i] ||
    function () {
      (m[i].a = m[i].a || []).push(arguments);
    };
  m[i].l = 1 * new Date();
  (k = e.createElement(t)),
    (a = e.getElementsByTagName(t)[0]),
    (k.async = 1),
    (k.src = r),
    a.parentNode.insertBefore(k, a);
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(69008998, "init", {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true,
});
