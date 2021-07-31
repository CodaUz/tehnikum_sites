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

// form modal

document
  .querySelector("#openModal")
  .addEventListener("click", () => openModalForm(".formBoxIndex"));

function openModalForm(formName) {
  document.querySelector(formName).classList.add("active");
  document.querySelector(".grayBack").classList.add("active");
  setTimeout(() => {
    document.querySelector(formName).classList.add("activeAnimate");
    document.querySelector(".grayBack").classList.add("activeAnimate");
  }, 0);
}

function deleteError(elem) {
  elem.parentElement.classList.remove("error");
}

function activeInput(elem) {
  if (!elem.parentElement.classList.contains("active")) {
    elem.parentElement.classList.add("active");
  }
  return false;
}

function closeModalForm(formName) {
  document.querySelector(formName).classList.remove("activeAnimate");
  document.querySelector(".grayBack").classList.remove("activeAnimate");
  setTimeout(() => {
    document.querySelector(formName).classList.remove("active");
    document.querySelector(".grayBack").classList.remove("active");
  }, 200);
}

let myVideo = document.getElementById("videoMain");
let playBtn = document.getElementById("playBtn");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("active");

    setTimeout(() => {
      document.querySelector(".one").classList.add("initialX");
      document.querySelector(".two").classList.add("initialX");
      document.querySelector(".three").classList.add("initialX");
      document.querySelector(".oneMobile").classList.add("initialX");
      document.querySelector(".twoMobile").classList.add("initialX");
      document.querySelector(".threeMobile").classList.add("initialX");
    }, 200);
    setTimeout(() => {
      document.querySelector("html").removeAttribute("style");
      document.querySelector(".loader").style.display = "none";
    }, 500);
  }, 3000);

  document.getElementById("writeToTeacher").innerHTML = `
  Школа актуальных профессий TEHNIKUM приветствует.

  Сегодня содержать маркетинговое агентство в среднем стоит от 5,000,000 сум в месяц. Ваш сотрудник, <span id="name"> желает обучиться на курсе <span class="courseNameTest">, сэкономить вам время, деньги и нервы.

  Мы выпустили более 650 студентов за год и обучили более 4,000 людей на бесплатных программах.

  Мы поддерживаем инициативу вашего сотрудника пройти курс <span class="courseNameTest">, увеличить продажи в вашей компании и повлиять на ее рост.
    `;
});

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

let triggerHookTop = ((85 / screen.height) * 100) / 100;

const flipPath = {
  values: [{ x: 0, y: "-84%" }],
};

const tween = new TimelineLite();
tween.add(
  TweenLite.to(".innerRightBoxFlex", 1, {
    bezier: flipPath,
    ease: Power1.easeInOut,
  })
);

const controller = new ScrollMagic.Controller();

let triggerHookLeftVideo = 0.2;

if (window.matchMedia("(max-width: 1000px)").matches) {
  triggerHookLeftVideo = 0.2;
} else {
  triggerHookLeftVideo = 0.5;
}
if (window.matchMedia("(max-width: 700px)").matches) {
  triggerHookLeftVideo = 0.4;
}
if (window.matchMedia("(min-height: 1710px)").matches) {
  triggerHookLeftVideo = 0.2;
}
if (window.matchMedia("(min-height: 1030px)").matches) {
  triggerHookLeftVideo = 0.3;
}
new ScrollMagic.Scene({
  triggerElement: "#leftVideoBox",
  duration: 1000,
  triggerHook: triggerHookLeftVideo,
})
  .on("enter", () => {
    document.querySelector(".one").classList.remove("initialX");
    document.querySelector(".one").classList.add("animateX");
    document.querySelector(".two").classList.remove("initialX");
    document.querySelector(".two").classList.add("animateX");
    document.querySelector(".three").classList.remove("initialX");
    document.querySelector(".three").classList.add("animateX");
    document.querySelector(".oneMobile").classList.remove("initialX");
    document.querySelector(".oneMobile").classList.add("animateX");
    document.querySelector(".twoMobile").classList.remove("initialX");
    document.querySelector(".twoMobile").classList.add("animateX");
    document.querySelector(".threeMobile").classList.remove("initialX");
    document.querySelector(".threeMobile").classList.add("animateX");
  })
  .on("leave", () => {
    document.querySelector(".one").classList.add("initialX");
    document.querySelector(".one").classList.remove("animateX");
    document.querySelector(".two").classList.add("initialX");
    document.querySelector(".two").classList.remove("animateX");
    document.querySelector(".three").classList.add("initialX");
    document.querySelector(".three").classList.remove("animateX");
    document.querySelector(".oneMobile").classList.add("initialX");
    document.querySelector(".oneMobile").classList.remove("animateX");
    document.querySelector(".twoMobile").classList.add("initialX");
    document.querySelector(".twoMobile").classList.remove("animateX");
    document.querySelector(".threeMobile").classList.add("initialX");
    document.querySelector(".threeMobile").classList.remove("animateX");
  })
  .addTo(controller);

function getFunctions() {
  if (!window.matchMedia("(max-width: 800px)").matches) {
    // Blue Box animate

    const flipThreePath = {
      values: [{ x: 0, y: "-18vh" }],
    };

    const flipThreePathBlueBox = {
      values: [
        {
          x: 0,
          y: `-${document.querySelector(".blueBox").clientHeight}px`,
        },
      ],
    };

    document.querySelector(".sliderBox-two").style.marginTop = `-${
      document.querySelector(".blueBox").clientHeight
    }px`;

    const tweenThree = new TimelineLite();
    tweenThree.add(
      TweenLite.to(".blueBoxScroll", 1, {
        bezier: flipThreePathBlueBox,
        ease: Power1.easeInOut,
      })
    );

    new ScrollMagic.Scene({
      triggerElement: ".sliderBoxMain",
      duration: 2000,
      triggerHook: 1,
      offset: 3000,
    })
      .setTween(tweenThree)
      .addTo(controller);

    // Yellow Box animate
    const flipThreePathYellowBox = {
      values: [
        {
          x: 0,
          y: `-${document.querySelector(".yellowBox").clientHeight}px`,
        },
      ],
    };

    const tweenTwoThree = new TimelineLite();
    tweenTwoThree.add(
      TweenLite.to(".yellowBox", 1, {
        bezier: flipThreePathYellowBox,
        ease: Power1.easeInOut,
      })
    );

    document.querySelector(".sliderBox-three").style.marginTop = `-${
      document.querySelector(".yellowBox").clientHeight
    }px`;

    new ScrollMagic.Scene({
      triggerElement: "#sliderBoxTwo",
      duration: 2000,
      triggerHook: 1,
      offset: 3000,
    })
      .setTween(tweenTwoThree)
      .addTo(controller);

    // Authors Box animate

    const flipThreePathAuthors = {
      values: [
        {
          x: 0,
          y: `-${document.querySelector(".blueBoxAuthors").clientHeight}px`,
        },
      ],
    };

    document.querySelector(".blueAuthorsBottom").style.marginTop = `-${
      document.querySelector(".blueBoxAuthors").clientHeight
    }px`;

    const tweenThreeThree = new TimelineLite();
    tweenThreeThree.add(
      TweenLite.to(".blueBoxAuthors", 1, {
        bezier: flipThreePathAuthors,
        ease: Power1.easeInOut,
      })
    );

    new ScrollMagic.Scene({
      triggerElement: "#sliderBoxThree",
      duration: 1500,
      triggerHook: 1,
      offset: 2100,
    })
      .setTween(tweenThreeThree)
      .addTo(controller);
  } else {
    const flipPathBottomScrollBox = {
      values: [{ x: 0, y: "-3%" }],
    };
    const tweenSliderBoxOne = new TimelineLite();
    tweenSliderBoxOne.add(
      TweenLite.to(".bottomScrollBox", 1, {
        bezier: flipPathBottomScrollBox,
        ease: Power1.easeInOut,
      })
    );
    new ScrollMagic.Scene({
      triggerElement: ".leftVideoBox",
      duration: 1000,
      triggerHook: 1,
    })
      .setTween(tweenSliderBoxOne)
      .addTo(controller);

    const flipPathBottomScrollBoxBack = {
      values: [{ x: 0, y: "3%" }],
    };
    const tweenSliderBoxOneBack = new TimelineLite();
    tweenSliderBoxOneBack.add(
      TweenLite.to(".bottomScrollBox", 1, {
        bezier: flipPathBottomScrollBoxBack,
        ease: Power1.easeInOut,
      })
    );
    new ScrollMagic.Scene({
      triggerElement: ".leftVideoBox",
      duration: 5000,
      offset: 1000,
      triggerHook: 1,
    })
      .setTween(tweenSliderBoxOneBack)
      .addTo(controller);
  }

  // Sliders

  new Slider({
    basicSliders: ["main", "two", "three"],
    emojiSliders: ["main"],
    indicatorsForClick: [
      "#sliderOneIndicator",
      "#sliderBoxTwo",
      "#sliderBoxThree",
    ],
    indicatorsScrollable: [false, true, true],
    triggerHookTop,
    controller,
  }).init();
}

async function getAPI() {
  const formData = new FormData();

  formData.append("action", "list");
  formData.append("token", "123");

  let res = await fetch("https://api.tehnikum.school/teacher.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  console.log(res);
  if (res.success) {
    for (let item in res.rows) {
      let imgType = "-l";
      if (window.matchMedia("(max-width: 2000px)").matches) {
        imgType = "-m";
      }
      let img = res.rows[item].imageurl.split(".");
      img[0] = img[0] + imgType;
      img = img.join(".");
      let blockLeft = document.createElement("div");
      blockLeft.classList.add("blueBlockAuthors");
      blockLeft.classList.add("blueBlockAuthorsImg");
      blockLeft.innerHTML = `
                <img data-src='https://admin.tehnikum.school/admin/${img}' alt="dmitriy" class="half lazy-image" />
      <img
        data-src='https://admin.tehnikum.school/admin/${img}'
        alt="dmitriy"
        class="fullHide lazy-image"
        style="display: none"
      />
              `;
      let blockRight = document.createElement("div");
      blockRight.classList.add("blueBlockAuthors");
      blockRight.classList.add("blueBlockAuthorsText");
      blockRight.style.borderRight = "3px solid #000";
      blockRight.innerHTML = `
              <h4>${res.rows[item].name} ${res.rows[item].surname}
      </h4>
      <p style="display:block">
        ${res.rows[item].description}
      </p>

      <span><a href="${res.rows[item].fb}"><svg
        width="25"
        height="25"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M33 37H40V40H33V37Z" fill="black" />
        <path d="M0 37H7V40H0V37Z" fill="black" />
        <path d="M0 0H40V3H0V0Z" fill="black" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.45 40V24.51H32.65L33.428 18.474H27.448V14.62C27.448 12.872 27.934 11.68 30.442 11.68H33.638V6.28C32.0902 6.11529 30.5345 6.03517 28.978 6.04C24.37 6.04 21.216 8.854 21.216 14.02V18.474H16V24.51H21.214V40H2.208C0.988 40 0 39.012 0 37.792V2.208C0 0.988 0.988 0 2.208 0H37.792C39.012 0 40 0.988 40 2.208V37.792C40 39.012 39.012 40 37.792 40H27.45Z"
          fill="black"
        />
                  &nbsp;
                  </svg>
      </a>
      </span>
      <span><a href="${res.rows[item].inst}"><svg
        width="25"
        height="25"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H40V5H0V0Z" fill="black" />
        <path d="M0 36H40V40H0V36Z" fill="black" />
        <path
          d="M20 15.2375C20.9419 15.2379 21.8625 15.5175 22.6454 16.041C23.4284 16.5645 24.0385 17.3084 24.3987 18.1787C24.7589 19.049 24.853 20.0065 24.669 20.9302C24.485 21.8539 24.0313 22.7024 23.3652 23.3682C22.6991 24.0341 21.8505 24.4875 20.9267 24.6711C20.0029 24.8547 19.0454 24.7603 18.1753 24.3998C17.3051 24.0393 16.5614 23.4289 16.0382 22.6457C15.515 21.8626 15.2357 20.9419 15.2357 20C15.2367 18.7369 15.739 17.5258 16.6323 16.6328C17.5256 15.7398 18.7369 15.238 20 15.2375ZM8.86518 11.5768C9.10763 10.9624 9.47374 10.4043 9.94081 9.93724C10.4079 9.47017 10.9659 9.10406 11.5804 8.86161C13.4554 8.12143 17.9196 8.2875 20 8.2875C22.0804 8.2875 26.5402 8.11518 28.4205 8.86161C29.035 9.10406 29.593 9.47017 30.0601 9.93724C30.5272 10.4043 30.8933 10.9624 31.1357 11.5768C31.875 13.4518 31.7098 17.9205 31.7098 19.9991C31.7098 22.0777 31.875 26.5411 31.1321 28.4223C30.8897 29.0367 30.5236 29.5948 30.0565 30.0619C29.5894 30.5289 29.0314 30.8951 28.417 31.1375C26.542 31.8777 22.0777 31.7116 19.9964 31.7116C17.9152 31.7116 13.4571 31.8839 11.5768 31.1375C10.9624 30.8951 10.4043 30.5289 9.93724 30.0619C9.47017 29.5948 9.10406 29.0367 8.86161 28.4223C8.11607 26.5473 8.2875 22.0786 8.2875 20C8.2875 17.9214 8.11607 13.4589 8.86161 11.5777L8.86518 11.5768ZM20 27.3214C21.448 27.3214 22.8636 26.892 24.0676 26.0875C25.2716 25.2831 26.21 24.1396 26.7641 22.8018C27.3183 21.464 27.4632 19.9919 27.1807 18.5717C26.8982 17.1514 26.201 15.8469 25.177 14.823C24.1531 13.799 22.8486 13.1018 21.4283 12.8193C20.0081 12.5368 18.536 12.6817 17.1982 13.2359C15.8604 13.79 14.7169 14.7284 13.9125 15.9324C13.108 17.1364 12.6786 18.552 12.6786 20C12.6774 20.9618 12.866 21.9144 13.2335 22.8032C13.601 23.692 14.1403 24.4996 14.8203 25.1797C15.5004 25.8597 16.308 26.399 17.1968 26.7665C18.0856 27.134 19.0382 27.3226 20 27.3214ZM12.3768 14.0804C12.7148 14.0805 13.0453 13.9805 13.3265 13.7928C13.6076 13.6051 13.8268 13.3383 13.9563 13.026C14.0857 12.7138 14.1197 12.3701 14.0539 12.0386C13.988 11.707 13.8254 11.4024 13.5864 11.1633C13.3474 10.9243 13.0429 10.7614 12.7114 10.6954C12.3799 10.6294 12.0362 10.6632 11.7239 10.7925C11.4116 10.9218 11.1446 11.1409 10.9568 11.4219C10.769 11.703 10.6687 12.0334 10.6687 12.3714C10.6678 12.5959 10.7112 12.8184 10.7964 13.026C10.8816 13.2337 11.007 13.4225 11.1654 13.5816C11.3237 13.7407 11.512 13.867 11.7192 13.9532C11.9265 14.0394 12.1487 14.0838 12.3732 14.0839L12.3768 14.0804ZM4.28571 0H35.7143C36.8509 0 37.941 0.45153 38.7447 1.25526C39.5485 2.05898 40 3.14907 40 4.28571V35.7143C40 36.8509 39.5485 37.941 38.7447 38.7447C37.941 39.5485 36.8509 40 35.7143 40H4.28571C3.14907 40 2.05898 39.5485 1.25526 38.7447C0.451529 37.941 0 36.8509 0 35.7143V4.28571C0 3.14907 0.451529 2.05898 1.25526 1.25526C2.05898 0.45153 3.14907 0 4.28571 0ZM5.81429 25.8929C5.92946 28.1813 6.45178 30.2089 8.12232 31.875C9.79286 33.5411 11.8187 34.0741 14.1045 34.183C16.4625 34.3161 23.5321 34.3161 25.8902 34.183C28.1786 34.0679 30.1991 33.5446 31.8723 31.875C33.5455 30.2054 34.0714 28.1768 34.1804 25.8929C34.3134 23.5339 34.3134 16.4634 34.1804 14.1071C34.0652 11.8188 33.5491 9.79107 31.8723 8.125C30.1955 6.45893 28.1696 5.93214 25.8902 5.82321C23.5321 5.69018 16.4625 5.69018 14.1045 5.82321C11.8161 5.93839 9.78928 6.46161 8.12232 8.13125C6.45536 9.80089 5.92321 11.8295 5.81429 14.1179C5.68125 16.4679 5.68125 23.5321 5.81429 25.8929Z"
          fill="black"
        />

            `;
      document.querySelector("#authorsBox").appendChild(blockLeft);
      document.querySelector("#authorsBox").appendChild(blockRight);
      if (item == 0) {
        for (let i = 0; i < 2; i += 1) {
          let block = document.createElement("div");
          block.classList.add("blueBlockAuthors");
          block.innerHTML = `
                <img data-src="images/crossRight.png" alt="" class="full lazy-image" />
              `;
          document.querySelector("#authorsBox").appendChild(block);
        }
      }
    }
  }
  await getFunctions();
}

getAPI();

const scene = new ScrollMagic.Scene({
  triggerElement: ".leftVideoBox",
  duration: 1000,
  triggerHook: 1,
})
  .setTween(tween)
  .addTo(controller);

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

for (let item of document.querySelectorAll(".input")) {
  item.addEventListener("click", () => {
    console.log(item.children[1].value.length);
    if (!item.children[1].value.length > 0) {
      item.classList.add("active");
    }
  });
  item.addEventListener("focusout", () => {
    if (!item.children[1].value.length > 0) {
      item.classList.remove("active");
    }
  });
}
function chooseSelect(elem, idValues, idText, idMainSelectBox) {
  for (let item of document.querySelector(`#${idValues}`).children) {
    item.classList.remove("active");
  }
  elem.classList.add("active");
  document.querySelector(`#${idText}`).textContent = elem.textContent;
  document.querySelector(`#${idMainSelectBox}`).classList.remove("active");
}

function openSelect(id) {
  document.querySelector(`#${id}`).classList.toggle("active");
}

function changeText(elem, elemName) {
  for (let el of document.querySelectorAll(`${elemName}`)) {
    el.textContent = elem.value;
  }
}

function openMobileMap(idElem) {
  if (window.matchMedia("(max-width: 900px)").matches) {
    setYandexMaps("mapMobile");
    openModalForm(idElem);
  }
}

// yandex maps

if (window.matchMedia("(min-width: 900px)").matches) {
  setTimeout(() => {
    setYandexMaps("map");
  }, 1500);
}

function setYandexMaps(id) {
  let script = document.createElement("script");
  script.src =
    "https://api-maps.yandex.ru/2.1/?apikey=b517fdfa-55e3-449a-8bf3-b6541a113e3&lang=ru_RU";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
  setTimeout(() => {
    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map(`${id}`, {
        center: [41.303027, 69.267644],
        zoom: 15,
      });
      myMap.geoObjects.add(
        new ymaps.Placemark(
          [41.303027, 69.267644],
          {},
          {
            preset: "islands#greenDotIconWithCaption",
          }
        )
      );
    }
  }, 2000);
}
