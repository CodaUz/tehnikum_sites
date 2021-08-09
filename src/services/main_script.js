require("@babel/polyfill");

console.log('running...')

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

      event.children[1].removeAttribute("style");
    }
  }, document.querySelectorAll(".boxFull.active").length * 100);
}

// openBox init
$('.boxFull').each(function () {
  $(this).on('click', function () {
    openBox(this)
  });
})

// choose course box click listener
$('.infoBox__courseGridMobile__box__topBox').each(function () {
  $(this).on('click', function (event) {
    if (!event.target.classList.contains('infoBox__courseGridMobile__box__topBox')) {
      event = event.target.parentElement
    } else {
      event = event.target
    }



    event.parentElement.classList.toggle('active')

    if (event.parentElement.classList.contains('active')) {
      event.parentElement.children[1].style.display = 'block'
      event.children[1].style.transform = 'rotateZ(180deg)';
    } else {
      event.parentElement.children[1].style.display = 'none'
      event.children[1].style.transform = 'rotateZ(0deg)';
    }

    for (let box of document.querySelectorAll(".infoBox__courseGridMobile__box")) {
      if (parseInt(box.getAttribute('data-number')) !== parseInt(event.parentElement.getAttribute('data-number'))) {
        box.classList.remove('active')
        box.children[1].style.display = 'none'
        box.children[0].children[1].style.transform = 'rotateZ(0deg)';
      }
    }
  });
})

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function takeCourse(formId, status) {
  const formData = new FormData();

  let name = document.querySelector(`input[name="name${formId}"]`).value;
  let phone = document.querySelector(`input[name="phone${formId}"]`).value;
  let query = window.location.search.substring(1);
  let qs = parse_query_string(query);
  // let promocode = document.querySelector('input[name="promocode"]').value;

  if (name && phone) {
    document.querySelector(`input[name="name${formId}"]`).value = "";
    document.querySelector(`input[name="phone${formId}"]`).value = "";
    // document.querySelector('input[name="promocode"]').value = "";
    for (let item of document.querySelectorAll(".input")) {
      item.classList.remove("active");
    }
    let redisKey = Math.floor(Math.random()*900000000) + 100000000;
    let redisValue = `${encryptName(name)}-${phone.replace(/\D/g, "")}-${status}`

    if (window.history.pushState) {
      await window.history.pushState({}, null, `/smm_design/thank-you/?key=${redisKey}${qs.r ? `&r=${qs.r}` : ''}`);
    }

    setThanks()

    let res = await fetch(
        `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone}&type=course&course=smm-diz&status=${status}${qs.key ? `KEY${qs.key}` : ''}`,
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
          body: JSON.stringify({site: 'smm_design', name,phone, redisKey, redisValue})
        }
    );
  }
}

function encryptName(name) {
  return "ENCRYPT"+[...name].map(str => str.charCodeAt()).join("S")
}

function setThanks() {
  document.body.innerHTML = `
    <div class="thanksBox">
      <img src="./Lamp.svg" class="thanksBox__img" />
      <h1 class="thanksBox__title">Отлично! Осталось выбрать дату бесплатного урока</h1>
    </div>
  `

  let query = window.location.search.substring(1);
  let qs = parse_query_string(query);

  let a_element = document.createElement('a')
  a_element.setAttribute('href', `https://t.me/TehnikumWebinarBot?start=644448-longwebinar${qs.r ?  `-${qs.r}` : ''}${qs.key ? `KEY${qs.key}` : ''}`)
  a_element.setAttribute('class', 'thanksBox__btn btn btn__blue thanks')
  a_element.setAttribute('target', '_blank')
  a_element.textContent = 'Выбрать'
  a_element.addEventListener('click', () => {
    yaCounter69008998.reachGoal('Переход в бот БУ Сайт');
  })
  document.querySelector('.thanksBox').appendChild(a_element)
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
    let status = document.querySelector(`.blueBoxSignUp${formId}`).getAttribute('data-status')
    takeCourse(formId, status)
    yaCounter69008998.reachGoal('Запись на БУ Сайт');
  })
}

function openMobileMap(idElem) {
  if (!window.matchMedia("(min-width: 900px)").matches) {
    openModalForm(idElem, "#formBoxMapBack");
  }
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

// menu clicks

$('.menuSpan').on('click', function () {
  openMenu()
})

$('.close').on('click', function () {
  closeMenu()
})

function initializeBackgroundVideo() {
  let height = $('#backVideo').parent().outerHeight() + 'px';
  let width = $('#backVideo').parent().outerWidth() + 'px';
  $('#backVideo').css('height', height)
  $('#backVideo').css('width', width)

  if ($('#backVideo').children().attr('data-src')) {
    $('#backVideo').children().attr('src', $('#backVideo').children().data('src'))
    $('#backVideo').children().removeAttr('data-src')
    $('#backVideo').get(0).play()
  }
}

initializeBackgroundVideo()

window.addEventListener("resize", initializeBackgroundVideo);