require("@babel/polyfill");

console.log('running python...')

const ID_COURSE = -1;
const MAX_LENGTH = 182;
let FORMAT = 0;

let POPUP_EVENT;
let PRICE = 0;
let FORMAT_STUDY = 'offline';

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

async function takeCourse(formId) {
  let name = document.querySelector(`input[name="name${formId}"]`).value;
  let phone = document.querySelector(`input[name="phone${formId}"]`).value;
  let query = window.location.search.substring(1);
  let qs = parse_query_string(query);
  let phoneForCheck = phone.replace(/\D/g, "")
  // let promocode = document.querySelector('input[name="promocode"]').value;

  if (!name) {
    $(`.blueBoxSignUp__inputBox__error${formId}`).text('*Введите имя')
  } else if (!phone || !phoneForCheck.startsWith("998") || phoneForCheck.length !== 12) {
    $(`.blueBoxSignUp__inputBox__error${formId}`).text('*Неверный номер телефона')
  } else {
    $(`.blueBoxSignUp__inputBox__error${formId}`).text('')
  }

  if (name && phone && phoneForCheck.startsWith("998") && phoneForCheck.length === 12) {
    document.querySelector(`input[name="name${formId}"]`).value = "";
    document.querySelector(`input[name="phone${formId}"]`).value = "";
    // document.querySelector('input[name="promocode"]').value = "";
    for (let item of document.querySelectorAll(".input")) {
      item.classList.remove("active");
    }
    let redisKey = Math.floor(Math.random()*9000000) + 1000000;
    let redisValue = `${encryptName(name)}-${phone.replace(/\D/g, "")}-${status}-tg`

    await fetch(
      `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone.replace(/[ -]/g, '')}&action=bl-reg&course=tg${qs.r ? `&ref=${qs.r}` : ''}`,
      {
        method: "GET",
      }
    );
    await fetch(
      `https://node.snimerovsky.xyz/log`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({site: 'python', name,phone, redisKey, redisValue})
      }
    );

    if (window.history.pushState) {
      await window.history.pushState({}, null, `/python/thank-you/?key=${redisKey}${qs.r ? `&r=${qs.r}` : ''}`);
    }

    setThanks()
  }
}

function encryptName(name) {
  return "ENCRYPT"+[...name].map(str => str.charCodeAt()).join("S")
}

function setThanks() {
  document.body.innerHTML = `
    <div class="thanksBox">
      <img src="/images/Laptop.svg" class="thanksBox__img" />
      <h1 class="thanksBox__title">Отлично! Осталось выбрать дату бесплатного урока</h1>
    </div>
  `

  let query = window.location.search.substring(1);
  let qs = parse_query_string(query);

  let a_element = document.createElement('a')
  a_element.setAttribute('href', `https://t.me/TehnikumWebinarBot?start=21-webinarpool${qs.r ?  `-${qs.r}` : ''}${qs.key ? `KEY${qs.key}` : ''}`)
  a_element.setAttribute('class', 'thanksBox__btn btn btn__blue thanks')
  a_element.setAttribute('target', '_blank')
  a_element.textContent = 'Выбрать'
  a_element.addEventListener('click', () => {
    yaCounter69008998.reachGoal('Переход в бот БУ тг');
  })
  document.querySelector('.thanksBox').appendChild(a_element)
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

for (let btn of document.querySelectorAll(".blueBoxSignUp__inputBox__sendBtn")) {
  btn.addEventListener('click', () => {
    let formId = btn.getAttribute('data-id')
    // let status = document.querySelector(`.blueBoxSignUp${formId}`).getAttribute('data-status')
    takeCourse(formId)
    yaCounter69008998.reachGoal('Запись на БУ тг');
  })
}

function openMobileMap(idElem) {
  if (!window.matchMedia("(min-width: 900px)").matches) {
    openModalForm(idElem, "#formBoxMapBack");
  }
}

let triggerHookTop;
let controller;


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

let MAX_COURSE_LENGTH = 6;

let whatYouGetBoxes = document.querySelectorAll(`.whatYouGetBox__textBox__box`)

for (let boxIndex=1; boxIndex <= whatYouGetBoxes.length; boxIndex++) {
  if (boxIndex > MAX_COURSE_LENGTH) {
    whatYouGetBoxes[boxIndex-1].classList.add('hidden')

    document.querySelector('.whatYouGetBox__showMoreBox').classList.remove('hidden')
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
  try {
    document.querySelector('.popupBox__box__btn').addEventListener('click', listener)
  } catch (e) {

  }
  document.querySelector(`${formBox}`).classList.add("active");
  document.querySelector(`${grayBack}`).classList.add("active");

  POPUP_EVENT = listener;

  setTimeout(() => {
    document.querySelector(`${grayBack}`).classList.add("activeAnimate");
    document.querySelector(`${formBox}`).classList.add("activeAnimate");
  }, 0);
}

let listenerForShowBox = function () {
  let element = document.querySelector('.showMoreBox')
  element.classList.remove('showMoreBox')
  element.classList.add('lessMoreBox')
  let allBoxes = document.querySelectorAll(`.whatYouGetBox__textBox__box`)
  for (let i=1; i <= allBoxes.length; i++) {
    if (allBoxes[i-1].classList.contains('hidden')) {
      (function(textBoxIndex) {
        setTimeout(function() { 
            allBoxes[textBoxIndex-1].style.display = 'block'
          
          setTimeout(() => { allBoxes[textBoxIndex-1].style.opacity = '100%' }, 10);
        }, i * 10);
      })(i);
    }
  }
  element.removeEventListener('click', listenerForShowBox, false);
  getEventForShowMoreBox()
}

let listenerForLessBox = function () {
  let element = document.querySelector('.lessMoreBox')
  element.classList.add('showMoreBox')
  element.classList.remove('lessMoreBox')

  let allBoxes = document.querySelectorAll(`.whatYouGetBox__textBox__box`)
  for (let i=1; i <= allBoxes.length; i++) {
    if (allBoxes[i-1].classList.contains('hidden')) {
      (function(textBoxIndex) {
        setTimeout(function() { 
            allBoxes[textBoxIndex-1].style.opacity = '0'
          
          setTimeout(() => { allBoxes[textBoxIndex-1].style.display = 'none' }, 10);
        }, i * 10);
      })(i);
    }
  }

  element.removeEventListener('click', listenerForLessBox, false);
  getEventForShowMoreBox()
}

function getEventForShowMoreBox() {
  let showMoreBox = document.querySelector('.showMoreBox')
  let lessMoreBox = document.querySelector('.lessMoreBox')

  if (showMoreBox) {
    showMoreBox.addEventListener('click', listenerForShowBox, false)
  } 

  if (lessMoreBox) {
    lessMoreBox.addEventListener('click', listenerForLessBox, false)
  }

}

getEventForShowMoreBox()

function initEventListeners() {
  $('.menuSpan').on('click', () => {
    openMenu()
  })
  $('.close').on('click', () => {
    closeMenu()
  })
}

initEventListeners()

function getReviewsVideos() {
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
}

getReviewsVideos()