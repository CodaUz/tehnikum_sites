require("@babel/polyfill");
const moment = require('moment')
const axios = require('axios')

const ID_COURSE = 10;
let FORMAT = 0;

let PRICE = 0;
let FORMAT_STUDY = 'offline';

let POPUP_EVENT;
let takeCourseParams = {}

let query = window.location.search.substring(1);
let qs = parse_query_string(query);

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function deleteError(elem) {
  elem.parentElement.classList.remove("error");
}

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

function openBox(event) {
  for (let block of document.querySelectorAll(".boxFull.active")) {
    if (
      block.getAttribute("data-number") != event.getAttribute("data-number")
    ) {
      block.classList.remove("active");

      setTimeout(() => {
        block.children[1].removeAttribute("style");
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
        event.children[1].removeAttribute("style");
      }, 200);
    }
  }, document.querySelectorAll(".boxFull.active").length * 100);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function takeCourse(isTelegam=false) {
  console.log('take course')

  if (takeCourseParams['name'] && takeCourseParams['phone']) {
    closeModalForm('.popupBox', '.grayBack');
    for (let item of document.querySelectorAll("input")) {
      item.value = ""
    }
    for (let item of document.querySelectorAll(".input")) {
      item.classList.remove("active");
    }

    let redisKey = Math.floor(Math.random()*900000000) + 100000000;
    let redisValue = `${encryptName(takeCourseParams['name'])}-${takeCourseParams['phone'].replace(/\D/g, "")}-${status}-smm-new`
    const WEBINAR_ID = 450983

    takeCourseParams['webinar_id'] = WEBINAR_ID
    takeCourseParams['phone'] = takeCourseParams['phone'].replace(/[ -]/g, '')

    await fetch(
        `https://node.snimerovsky.xyz/log`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({site: 'smm_spec',
            name: takeCourseParams['name'],
            phone: takeCourseParams['phone'],
            redisKey,
            redisValue})
        }
    );

    await fetch(
        `https://api.tehnikum.school/amocrm/?`+ new URLSearchParams(takeCourseParams)
    );

    let a= document.createElement('a');

    if (!isTelegam) {
      a.href= `https://tehnikum.school/smm0/thank-you?KEY=${redisKey}${qs.r ? `&r=${qs.r}` : ''}`;
    } else {
      let query = window.location.search.substring(1);
      let qs = parse_query_string(query);
      a.href= `https://tehnikum.school/smm0/thank-you?t=true&KEY=${redisKey}${qs.r ? `&r=${qs.r}` : ''}`;
    }

    setTimeout(() => {
      a.click();
    }, 50)
  }
}

function encryptName(name) {
  return "ENCRYPT"+[...name].map(str => str.charCodeAt()).join("S")
}

function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
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




for (let item of document.querySelectorAll(".activeBtn")) {
  item.addEventListener("click", () => {
    let formid = item.getAttribute('data-formId')

    for (let btn of document.querySelectorAll(`.activeBtn${capitalizeFirstLetter(formid)}`)) {
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
      }
      if (btn.getAttribute('data-active')==item.getAttribute('data-active')) {
        btn.classList.add("active");
        document.querySelector(`.blueBoxSignUp${capitalizeFirstLetter(formid)}`).setAttribute('data-status', item.getAttribute('data-active'))
      }
    }
  });
}

function activeInput(elem) {
    if (!elem.parentElement.classList.contains("active")) {
        elem.parentElement.classList.add("active");
    }
    return false;
}

for (let item of document.querySelectorAll(".input")) {
    item.addEventListener("click", () => {
        if (!item.children[1].value.length > 0) {
            item.classList.add("active");
        }
    });
  item.addEventListener("input", (e) => {
    activeInput(e.target)
  });
    $(item).on("focusout", () => {
        if (!item.children[1].value.length > 0) {
            item.classList.remove("active");
        }
    });
}

function setAppearanceAnimation () {
  if (window.matchMedia("(min-width: 901px)").matches) {
    for (let item of document.querySelectorAll(".greenBox__appearanceBox__box__text")) {
      item.addEventListener("mouseenter", () => {

        item.parentElement.children[0].style.display = 'grid'

        setTimeout(() => {
          item.parentElement.children[0].style.opacity = '100%'
        }, 1)
      })
      item.addEventListener("mouseleave", () => {
        item.parentElement.children[0].style.opacity = '0%'

        setTimeout(() => {
          item.parentElement.children[0].style.display = 'none'
        }, 301)
      })
    }
  }

  if (window.matchMedia("(min-width: 801px)").matches) {
    for (let item of document.querySelectorAll(".replyBox__studentsBox__box__hover")) {
      item.addEventListener("mouseenter", () => {
        item.children[1].style.display = 'grid'

        setTimeout(() => {
          item.children[1].style.opacity = '100%'
        }, 1)
      })
      item.addEventListener("mouseleave", () => {
        item.children[1].style.opacity = '0%'


        setTimeout(() => {
          item.children[1].style.display = 'none'

          if (item.children[1].children[2]) {
            if (item.children[1].children[2].classList.contains('readLess')) {
              item.children[1].children[0].style.display = 'block'
              item.children[1].children[1].style.display = 'none'
              item.children[1].children[2].textContent = 'Читать больше...'
              item.children[1].children[2].classList.remove('readLess')
              item.children[1].children[2].classList.add('readMore')
            }
          }
        }, 301)
      })
    }
  }
}

setAppearanceAnimation()

function initSliders() {
  for (let elem of document.querySelectorAll(
    'div[data-type="sliderSwitcher"]'
  )) {
    const GARBAGE_ELEMENTS = 0;
    const SLIDER_ID = `slider${elem.getAttribute("id")}`;

    let sliders = document.getElementById(SLIDER_ID).children;
    let countSliders = sliders.length - GARBAGE_ELEMENTS;
    if (countSliders > 1) {
    for (let i = 0; i < countSliders; i++) {
      let switcher = document.createElement("div");
      switcher.classList.add("switchersBox__switchBox");
      if (i === 0) {
        switcher.classList.add("active");
      }
      switcher.setAttribute("data-index", i);
      elem.append(switcher);

      switcher.addEventListener("click", () =>
        switchSlider(
          document.getElementById(elem.getAttribute("id")).children,
          i,
          SLIDER_ID,
          elem.getAttribute("id")
        )
      );
    }

    document
      .getElementById(`nextSlider${elem.getAttribute("id")}`)
      .addEventListener("click", () =>
        setNextSlider(elem, SLIDER_ID, elem.getAttribute("id"))
      );

    document
      .getElementById(`prevSlider${elem.getAttribute("id")}`)
      .addEventListener("click", () =>
        setPrevSlider(elem, SLIDER_ID, elem.getAttribute("id"))
      );
    }
  }

  for (let elem of document.querySelectorAll(
      'div.switchersBoxAuto'
  )) {
    const GARBAGE_ELEMENTS = 0;
    const SLIDER_ID = `slider${elem.getAttribute("id")}`;
    const TIMEOUT = +elem.getAttribute("data-timeout") || 5000

    let sliders = document.getElementById(SLIDER_ID).children;
    let countSliders = sliders.length - GARBAGE_ELEMENTS;
    if (countSliders > 1) {
      for (let i = 0; i < countSliders; i++) {
        let switcher = document.createElement("div");
        switcher.classList.add("switchersBox__switchBox");
        if (i === 0) {
          switcher.classList.add("active");
        }
        switcher.setAttribute("data-index", i);
        elem.append(switcher);
      }

      setInterval(() => {
        setNextSlider(elem, SLIDER_ID, elem.getAttribute("id"))
      }, TIMEOUT)
    }
  }
}

initSliders();

function setNextSlider(switcher, sliderId, switchId) {
  let index = 0;
  for (let switcherOne of switcher.children) {
    if (switcherOne.classList.contains("active")) {
      index = parseInt(switcherOne.getAttribute("data-index"));
      if (index + 1 < switcher.children.length) {
        index += 1;
      } else {
        index = 0;
      }
    }
  }
  switchSlider(switcher.children, index, sliderId, switchId);
}

function setPrevSlider(switcher, sliderId, switchId) {
  let index = 0;
  for (let switcherOne of switcher.children) {
    if (switcherOne.classList.contains("active")) {
      index = parseInt(switcherOne.getAttribute("data-index"));
      console.log(index);
      if (index == 0) {
        index = switcher.children.length - 1;
      } else {
        index -= 1;
      }
    }
  }
  switchSlider(switcher.children, index, sliderId, switchId);
}

function switchSlider(switchers, index, sliderId, switchId) {
  for (let switcherOne of switchers) {
    switcherOne.classList.remove("active");
    if (index == switcherOne.getAttribute("data-index")) {
      switcherOne.classList.add("active");
      document.getElementById(
        sliderId
      ).style = `transition: all .8s ease-in-out 0s; transform: translate3d(${
        index * document.getElementById(sliderId).clientWidth * -1
      }px, 0px, 0px);`;
    }
  }
}

function openPopUp(formBox, grayBack, text, btnText, listener) {
  if (text) {
    document.querySelector('.popupBox__box__title').textContent = text
  }
  if (btnText) {
    document.querySelector('.popupBox__box__btn').textContent = btnText
  }
  if (POPUP_EVENT) {
    document.querySelector('.popupBox__box__btn').removeEventListener('click', POPUP_EVENT)
  }
  document.querySelector('.popupBox__box__btn').addEventListener('click', listener)
  document.querySelector(`${formBox}`).classList.add("active");
  document.querySelector(`${grayBack}`).classList.add("active");

  POPUP_EVENT = listener;

  setTimeout(() => {
    document.querySelector(`${grayBack}`).classList.add("activeAnimate");
    document.querySelector(`${formBox}`).classList.add("activeAnimate");
  }, 0);
}

// event listeners

document.querySelector('.grayBack').addEventListener('click', () => {
  closeModalForm('.popupBox', '.grayBack')
})

for (let btn of document.querySelectorAll('.signUp')) {
  btn.addEventListener('click', () => {
    openPopUp('.popupBox', '.grayBack',
        'Отправьте свои данные и мы свяжемся с вами в ближайшее время. Обычно это происходит за 20 минут',
        'Записаться', () => {
          takeCourseParams = {
            name: document.querySelector('input[name="name"]').value,
            phone: document.querySelector('input[name="phone"]').value,
            action: 'program',
            course: 'smm-new',
          }
          if (qs.r) takeCourseParams['ref'] = qs.r
          takeCourse()
        })
  })
}

for (let btn of document.querySelectorAll('.getProgram')) {
  btn.addEventListener('click', () => {
    openPopUp('.popupBox', '.grayBack',
        'Сразу после заполнения данных вы перейдете в Telegram, \n' +
        'где сможете посмотреть всю программу, а также \n' +
        'получить бесплатную  консультацию',
        'Получить программу', () => {
          takeCourseParams = {
            name: document.querySelector('input[name="name"]').value,
            phone: document.querySelector('input[name="phone"]').value,
            action: 'program',
            course: 'smm-new',
          }
          if (qs.r) takeCourseParams['ref'] = qs.r
          takeCourse(true)
        })
  })
}

for (let btn of document.querySelectorAll('.signUpWithForm')) {
  btn.addEventListener('click', () => {
    takeCourseParams = {
      name: document.querySelector('#inputFormName').value,
      phone: document.querySelector('#inputFormPhone').value,
      action: 'program',
      course: 'smm-new',
    }
    if (qs.r) takeCourseParams['ref'] = qs.r
    takeCourse()
  })
}

for (let btn of document.querySelectorAll('.readMore')) {
  btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.classList.contains('readMore')) {
      e.target.parentElement.children[0].style.display = 'none'
      e.target.parentElement.children[1].style.display = 'block'

      e.target.textContent = ''
      e.target.classList.remove('readMore')
      e.target.classList.add('readLess')
    }
  })
}

for (let btn of document.querySelectorAll('.getVideo')) {
  btn.addEventListener('click', (e) => {
    e.preventDefault()

    document.querySelector('.popupBoxVideo').children[1].children[0].innerHTML = `
      <iframe width="100%" height="300"
              src="https://www.youtube.com/embed/${e.target.getAttribute('data-link')}">
      </iframe>
    `

    openPopUp('.popupBoxVideo', '.grayBackVideo')
  })
}

document.querySelector('.grayBackVideo').addEventListener('click', (e) => {
  closeModalForm('.popupBoxVideo', '.grayBackVideo')
  e.target.parentElement.children[1].children[0].innerHTML = ''
})

document.querySelector('.getRequisites').addEventListener('click', (e) => {
  openModalForm('#formRequisite', '#formBoxRequisiteBack')
})

document.querySelector('.formBoxRequisiteClose').addEventListener('click', (e) => {
  closeModalForm('#formRequisite', '#formBoxRequisiteBack')
})

async function initCourseData() {
  let res = await axios.get('https://api.tehnikum.uz/course.php', {
    params: {
      action: 'get',
      token: '123',
      id: ID_COURSE
    }
  })
  res = res['data']['row']
  const [first_start_date, first_start_month] = moment(`${res['date']}`, 'YYYY-MM-DD').locale("ru").format('D MMMM').split(' ')
  const [first_end_date, first_end_month] = moment(`${res['end_date']}`, 'YYYY-MM-DD').locale("ru").format('D MMMM').split(' ')

  if (window.matchMedia("(min-width: 800px)").matches) {
    $('h2.secondBox__rightBox__top__numberBox').text(`${first_start_date} - ${first_end_date}`)
    $('.start_month').text(first_start_month)
    $('.end_month').text(first_end_month)
  } else {
    $('h2.secondBox__rightBox__top__numberBox').html(`<span>${first_start_date} ${first_start_month} - ${first_end_date} ${first_end_month}</span>`)
    $('.secondBox__rightBox__top__numberBox').css('width', `${$('.secondBox').width()}px`)
    $('.secondBox__rightBox__top__numberBox').css('height', '35px')
    $('.secondBox__rightBox__top__numberBox').textfill({});
  }

}

initCourseData()

// yandex maps

setTimeout(() => {
  let script = document.createElement("script");
  script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=b517fdfa-55e3-449a-8bf3-b6541a113e3&lang=ru_RU";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
  setTimeout(() => {
    ymaps.ready(init);
    function init() {
      var myMap;
      if (window.matchMedia("(min-width: 900px)").matches) {
        myMap = new ymaps.Map("map", {
          center: [41.303027, 69.267644],
          zoom: 15,
        });
      } else {
        myMap = new ymaps.Map("mapMobile", {
          center: [41.303027, 69.267644],
          zoom: 15,
        });
      }
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
  }, 1500);
}, 1500);