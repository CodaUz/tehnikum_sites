require('@babel/polyfill')
const moment = require('moment')

const MOBILE_WIDTH = 800
let POPUP_EVENT;

function listenSliders() {
    $('.sliderBox__sliderDots').each(function () {
        const $sliderDots = $(this)
        let id = $(this).data('id')
        let n = 2

        if ($(window).width() <= MOBILE_WIDTH) {
            n = 1
        }

        let children_length = $(`.sliderBox__slider[data-id="${id}"]`).children().length
        let number_of_dots = (children_length+(children_length%n))/n
        if (children_length%n === 0 && $(window).width() > MOBILE_WIDTH) {
            number_of_dots += 1
        }

        for (let i=0; i < number_of_dots; i++)  {
            let $dot = $("<div>", {"data-number": i, "class": `sliderBox__sliderDots__dot ${i === 0 ? 'active' : ''}`});

            $dot.click(function () {
                const number_dot = parseInt($(this).data('number'))

                $sliderDots.children().each(function () {
                    $(this).removeClass('active')
                })

                $(this).addClass('active')

                moveSlider(id, number_dot)
            })

            $sliderDots.append($dot)
        }
    })

    $('.sliderBox__nextSlide').click(function () {
        moveSlider($(this).data('id'))
    })

    $('.sliderBox__prevSlide').click(function () {
        moveSlider($(this).data('id'), undefined, false)
    })

    for (let slider of document.querySelectorAll('.sliderBox__slider')) {
        slider.addEventListener("swiped-right", (event) => {
            event.stopPropagation();
            event.preventDefault();
            console.log('swipe right')
            moveSlider(slider.getAttribute('data-id'), undefined, false)
        });

        setInterval(() => {
            moveSlider(slider.getAttribute('data-id'), undefined)
        }, 4000)

        slider.addEventListener("swiped-left", (event) => {
            event.stopPropagation();
            event.preventDefault();
            moveSlider(slider.getAttribute('data-id'), undefined)
        });
    }
}

function moveSlider(id, number_dot=undefined, is_next=true) {
    if (number_dot === undefined) {
        number_dot = $(`.sliderBox__sliderDots[data-id="${id}"]>.active`).data('number')
        let all_numbers = $(`.sliderBox__sliderDots[data-id="${id}"]`).children().length

        number_dot = is_next ? (all_numbers-1) === number_dot ? 0 : number_dot+1 : number_dot === 0 ? all_numbers-1 : number_dot-1

        $(`.sliderBox__sliderDots[data-id="${id}"]>.active`).removeClass('active')
        $(`.sliderBox__sliderDots[data-id="${id}"]>.sliderBox__sliderDots__dot[data-number="${number_dot}"]`).addClass('active')
    }

    $(`.sliderBox__slider[data-id="${id}"]`).children().each(function () {
        let number = number_dot * 100
        let multiple_value = 100
        let number_px = $(window).width() <= MOBILE_WIDTH ? 20 * number_dot : number_dot * multiple_value
        $(this).css('transform', `translateX( calc(-${number}% - ${number_px}px))`)
    })
}

function listenFeedbackSliders() {
    $('.section__feedbackBox__sliderDots').children().each(function () {
        const $sliderDot = $(this)

        $sliderDot.on('click', function () {
            moveFeedbackSlider(parseInt($sliderDot.data('index')))
        })
    })

    for (let slider of document.querySelectorAll('.section__feedbackBox__box')) {
        slider.addEventListener("swiped-right", (event) => {
            event.stopPropagation();
            event.preventDefault();
            moveFeedbackSlider(undefined, true, false)
        });

        slider.addEventListener("swiped-left", (event) => {
            event.stopPropagation();
            event.preventDefault();
            moveFeedbackSlider(undefined, true)
        });
    }
}

function moveFeedbackSlider(number, isSlide=false, isNext=true) {
    if (isSlide) {
        const maxIndex =  $('.section__feedbackBox__sliderDots').children().length - 1
        let index = parseInt($('.section__feedbackBox__sliderDots__dot.active').data('index'))

        index = isNext ? index + 1 : index - 1

        if (index < 0) {
            index = maxIndex
        } else if (index > maxIndex) {
            index = 0
        }

        number = index
    }
    const slideWidth = $('.section__feedbackBox').width()
    const addWidth = 15
    const translateX = (slideWidth*number) + (addWidth * number)
    $('.section__feedbackBox__sliderDots__dot').removeClass('active')
    $(`.section__feedbackBox__sliderDots__dot[data-index="${number}"]`).addClass('active')
    $('.section__feedbackBox__box').css('transform', `translateX( ${translateX > 0 ? translateX * -1 : 0}px)`)
}

function listenPopups() {
    $('.openPopup').click(() => {
        openModalForm('.formBoxIndex')
    })

    $('.openProgramForm').click(() => {
        $('.footer__mainBox__formBox__readyBox').removeClass('active')
        $('div[data-form-id="Program"]').attr('data-program', 'true')
        $('div.sendForm[data-form-id="Program"]').text('Получить программу курса')
        $('p.footer__mainBox__formBox__text').text('Сразу после заполнения данных вы перейдете в Telegram, где сможете посмотреть всю программу')
        $('p.titleName').text('сделай первый шаг')
        openModalForm('.formBoxIndex')
    })

    $('.openForm').click(() => {
        console.log('open form')
        $('.footer__mainBox__formBox__readyBox').removeClass('active')
        $('div[data-form-id="Program"]').attr('data-program', '')
        $('p.footer__mainBox__formBox__text').text('')
        $('div.sendForm[data-form-id="Program"]').text('Хочу учиться')
        $('p.titleName').text('РЕШАЙСЯ')
        openModalForm('.formBoxIndex')
    })
}

function openModalForm(formName) {
    document.querySelector(formName).classList.add("active");
    document.querySelector(`${formName}>.grayBack`).classList.add("active");
    setTimeout(() => {
        document.querySelector(formName).classList.add("activeAnimate");
        document.querySelector(`${formName}>.grayBack`).classList.add("activeAnimate");
    }, 0);
}

function closeModalForm(formName) {
    document.querySelector(`${formName}>.grayBack`).classList.remove("activeAnimate");
    setTimeout(() => {
        document.querySelector(formName).classList.remove("activeAnimate");
        document.querySelector(formName).classList.remove("active");
        document.querySelector(`${formName}>.grayBack`).classList.remove("active");
    }, 100);
}

function closePopupsOnBack() {
    $('.grayBack').click(function () {
        closeModalForm('.formBoxIndex')
    })
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

async function takeCourse(formId, is_redirect=false) {
    let name = document.querySelector(`input[name="name${formId}"]`).value;
    let phone = document.querySelector(`input[name="phone${formId}"]`).value;
    let query = window.location.search.substring(1);
    let qs = parse_query_string(query);

    if (name && phone) {
        document.querySelector(`input[name="name${formId}"]`).value = "";
        if (document.querySelector(`input[name="lastName${formId}"]`)) {
            document.querySelector(`input[name="lastName${formId}"]`).value = ''
        }
        document.querySelector(`input[name="phone${formId}"]`).value = "";
        for (let item of document.querySelectorAll(".input")) {
            item.classList.remove("active");
        }

        let redisKey = Math.floor(Math.random()*900000000) + 100000000;
        let redisValue = `${encryptName(name)}-${phone.replace(/\D/g, "")}-${status}`
        const WEBINAR_ID = 604904

        fetch(
            `https://node.snimerovsky.xyz/log`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({site: 'smm', name,phone, redisKey, redisValue})
            }
        );

        if (is_redirect) {
            $(`.footer__mainBox__formBox__readyBox[data-form-id="${formId}2"]`).addClass('active')

            fetch(
                `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone.replace(/[ -]/g, '')}&course=tg&action=program${qs['r'] ? `&ref=${qs['r']}` : ''}`,
                {
                    method: "GET",
                }
            );


        } else {
            $(`.footer__mainBox__formBox__readyBox[data-form-id="${formId}"]`).addClass('active')
            $(`.footer__formBox__discount[data-form-id="${formId}"]`).css('display', 'none')

            fetch(
                `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone}&type=course&course=tg${qs.r ?  `-${qs.r}` : ''}`,
                {
                    method: "GET",
                }
            );
        }
    }
}

function encryptName(name) {
    return "ENCRYPT"+[...name].map(str => str.charCodeAt()).join("S")
}

function sendForm() {
    for (let btn of document.querySelectorAll(".sendForm")) {
        btn.addEventListener("click", () => {
            if (btn.getAttribute('data-program') === 'true') {
                return takeCourse(btn.getAttribute('data-form-id'), true)
            }
            return takeCourse(btn.getAttribute('data-form-id'))
        });
    }
}

function setCountDown() {
    if (!localStorage.getItem('timeLeft')) {
        localStorage.setItem('timeLeft', parseInt(new Date(moment().add("days", 2)).getTime()/1000))
    }

    let eventTime= parseInt(localStorage.getItem('timeLeft'));
    let currentTime = parseInt(new Date().getTime()/1000);
    let diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime*1000, 'milliseconds');
    let interval = 1000;

    setInterval(function(){
        duration = moment.duration(duration - interval, 'milliseconds');
        let days = parseInt(duration.days())
        let hours = parseInt(duration.hours())
        let minutes = parseInt(duration.minutes())
        if (duration.seconds() > 0) {
            $('.timeDays').text(`${days < 10 ? '0' : ''}${days}`)
            $('.timeHours').text(`${hours < 10 ? '0' : ''}${hours}`)
            $('.timeMinutes').text(`${minutes < 10 ? '0' : ''}${minutes}`)
            $('.timer').text(`${days < 10 ? '0' : ''}${days}:${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`)
        }
    }, interval);

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

function getReviewsVideos() {
    for (let btn of document.querySelectorAll('.getVideo')) {
        btn.addEventListener('click', (e) => {
            // e.preventDefault()

            const link = btn.getAttribute('data-link')

            console.log('link', link)

            document.querySelector('.popupBoxVideo').children[1].children[0].innerHTML = `
      <iframe width="100%" height="300"
              src="https://www.youtube.com/embed/${btn.getAttribute('data-link')}">
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

function getMaxHeight() {
    const classes = ['sliderBox__slider__speakerBox']

    for (let name_class of classes) {
        let height = 0

        $(`.${name_class}`).each(function () {
            $(this).css('height', ``)
        })

        $(`.${name_class}`).each(function () {
            height = $(this).outerHeight() > height ? $(this).outerHeight() : height
        })

        $(`.${name_class}`).each(function () {
            $(this).css('height', `${height}px`)
        })
    }
}

function listenProgram() {
    for (let box of document.querySelectorAll('.section__programBox__box__program')) {
        box.addEventListener('click', () => {
            let is_class = false
            if (box.classList.contains('active')) {
                is_class = true
            }
            $('.section__programBox__box__program').removeClass('active')
            if (is_class) {
                box.classList.remove('active')
            } else {
                box.classList.add('active')
            }
        })
    }
}

function closeFormWithCross() {
    $('.footer__formBox__readyBox__cross').click(function () {
        $(this).parent().removeClass('active')
    })
}

function listenType() {
    for (let type of document.querySelectorAll('.footer__typeBox__type')) {
        type.addEventListener('click', () => {
            $('.footer__typeBox__type').removeClass('active')
            type.classList.add('active')
        })
    }
}

function init() {
    setCountDown()
    listenSliders()
    listenFeedbackSliders()
    listenPopups()
    closePopupsOnBack()
    sendForm()
    getReviewsVideos()
    getMaxHeight()
    listenProgram()
    closeFormWithCross()
    listenType()
}

$( window ).on( "load", function() {
    init()
});