const ID_COURSE = 9;
const MAX_LENGTH = 182;
let FORMAT = 0;
let PRICE = 0;

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

getSoonerCourse([{ name: "SMM-специалист", date: "2021-01-30" }]);

function playPause(e) {
  e.children[0].classList.toggle("active");
  e.children[1].classList.add("active");
  if (e.children[2].paused) {
    e.children[2].play();
  } else e.children[2].pause();
}
function showActive(e) {
  e.parentNode.children[0].classList.remove("active");
}

function deleteError(elem) {
  elem.parentElement.classList.remove("error");
}

function getBoxClicked(elem, attribute) {
  for (let el of document.querySelectorAll(`div[${attribute}]`)) {
    el.classList.remove("active");
  }
  document
    .querySelector(`div[${attribute}="${elem.getAttribute(`${attribute}`)}"]`)
    .classList.add("active");
}

function goToBuyCourse() {
  closeModalForm("#buyInInstallments", "#buyInInstallmentsBack");
  setTimeout(() => {
    openModalForm("#takeCourse", "#takeCourseBack");
  }, 200);
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

// form modal

function openModalForm(formBox, grayBack, price = -1, format = 0) {
  FORMAT = format;
  document.querySelector(`${formBox}`).classList.add("active");
  document.querySelector(`${grayBack}`).classList.add("active");
  if (price !== -1) {
    PRICE = price;
  }
  setTimeout(() => {
    document.querySelector(`${grayBack}`).classList.add("activeAnimate");
    document.querySelector(`${formBox}`).classList.add("activeAnimate");
  }, 0);
}

function closeModalForm(formBox, grayBack) {
  document.querySelector(`${formBox}`).classList.remove("activeAnimate");
  document.querySelector(`${grayBack}`).classList.remove("activeAnimate");
  setTimeout(() => {
    document.querySelector(`${grayBack}`).classList.remove("active");
    document.querySelector(`${formBox}`).classList.remove("active");
  }, 200);
}

const controller = new ScrollMagic.Controller();

let triggerHook = 0.2;
if (window.matchMedia("(max-width: 770px)").matches) {
  triggerHook = 0.1;
}
if (window.matchMedia("(max-width: 500px)").matches) {
  triggerHook = 0.1;
}

new ScrollMagic.Scene({
  triggerElement: ".firstBox",
  triggerHook,
})
  .on("enter", () => {
    document.querySelector(".intensives").classList.remove("initialX");
    document.querySelector(".intensives").classList.add("animateX");
    document.querySelector(".lentaLessons").classList.remove("initialX");
    document.querySelector(".lentaLessons").classList.add("animateX");
  })
  .on("leave", () => {
    document.querySelector(".intensives").classList.add("initialX");
    document.querySelector(".intensives").classList.remove("animateX");
    document.querySelector(".lentaLessons").classList.add("initialX");
    document.querySelector(".lentaLessons").classList.remove("animateX");
  })
  .addTo(controller);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let triggerHookTop = ((85 / screen.height) * 100) / 100;

new Slider({
  basicSliders: ["one", "main"],
  emojiSliders: ["main"],
  indicatorsForClick: ["#sliderOneIndicator", "#sliderMainIndicator"],
  indicatorsScrollable: [false, false],
  triggerHookTop,
  controller,
}).init();

triggerHookTop = ((47 / screen.height) * 100) / 100;

new Slider({
  basicSliders: ["three"],
  emojiSliders: [],
  indicatorsForClick: ["#sliderThreeIndicator"],
  indicatorsScrollable: [false],
  triggerHookTop,
  controller,
}).init();

function openBox(event) {
  for (let block of document.querySelectorAll(".boxFull.active")) {
    if (
      block.getAttribute("data-number") != event.getAttribute("data-number")
    ) {
      block.classList.remove("active");

      setTimeout(() => {
        block.children[1].style.display = "none";
      }, 0);
    }
  }
  setTimeout(() => {
    if (!event.classList.contains("active")) {
      event.children[1].style.display = "block";
      setTimeout(() => {
        event.classList.add("active");
      }, 0);
    } else {
      event.classList.remove("active");

      setTimeout(() => {
        event.children[1].style.display = "none";
      }, 200);
    }
  }, document.querySelectorAll(".boxFull.active").length * 100);
}

async function takeCourse() {
  let name = document.querySelector('input[name="name"]').value;
  let phone = document.querySelector('input[name="phone"]').value;
  // let promocode = document.querySelector('input[name="promocode"]').value;

  if (name && phone) {
    closeModalForm("#takeCourse", "#takeCourseBack");
    openModalForm(".formBoxTakeCourseFinal", "#takeCourseFinalBack");
    document.querySelector('input[name="name"]').value = "";
    document.querySelector('input[name="phone"]').value = "";
    // document.querySelector('input[name="promocode"]').value = "";
    for (let item of document.querySelectorAll(".input")) {
      item.classList.remove("active");
    }

    let res = await fetch(
      `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone}&type=course&course=smm&summ=${PRICE}${
        FORMAT !== 0 ? "&format=" + FORMAT : ""
      }`,
      {
        method: "GET",
      }
    );
    res = await res.json();
    fetch(
      `https://node.snimerovsky.xyz/log`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({site: 'smm', name,phone})
      }
    );

    if (res.result == 0) {
      let i = 0;
      for (let item of document.querySelectorAll(".input")) {
        item.classList.add("error");
        if (i === 0) {
          item.style.marginTop = "20px";
          let errorText = document.createElement("div");
          errorText.classList.add("errorText");
          errorText.style.top = "-28px";
          errorText.textContent = "Произошла ошибка при отправке вашей заявки";
          item.appendChild(errorText);
        }
        i += 1;
      }
    }
  }
}

for (let item of document.querySelectorAll(".input")) {
  item.addEventListener("click", () => {
    if (!item.children[1].value.length > 0) {
      item.classList.add("active");
    }
  });
  $(item).on("focusout", () => {
    if (!item.children[1].value.length > 0) {
      item.classList.remove("active");
    }
  });
}
