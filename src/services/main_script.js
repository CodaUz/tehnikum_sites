const MOBILE_WIDTH = 800
const ID_COURSE = 9;
let POPUP_EVENT;


function listenPopups() {
    $('.openPopup').click(() => {
        openModalForm('.formBoxIndex')
    })

    $('.openProgramForm').click(() => {
        $('.footer__mainBox__formBox__readyBox').removeClass('active')
        $('div[data-form-id="Program"]').attr('data-program', 'true')
        $('div.sendForm[data-form-id="Program"]').text('Получить программу курса')
        $('p.footer__mainBox__formBox__text').html('программу можете скачать в<br> нашем telegram боте')
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
    phone = phone.replace(/[ -]/g, '')
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
        let redisValue = `${encryptName(name)}-${phone.replace(/\D/g, "")}-${status}-digital`
        const WEBINAR_ID = 158386

        fetch(
            `https://node.snimerovsky.xyz/log`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({site: 'digital', name,phone, redisKey, redisValue})
            }
        );

        if (is_redirect) {
            $(`.footer__mainBox__formBox__readyBox[data-form-id="${formId}2"]`).addClass('active')

            fetch(
                `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone}&webinar_id=${WEBINAR_ID}&course=digital&action=program${qs['r'] ? `&ref=${qs['r']}` : ''}`,
                {
                    method: "GET",
                }
            );

            $('#downloadProgram').attr('href', `https://t.me/TehnikumWebinarBot?start=${WEBINAR_ID}-send_smallchecklist${qs.r ? `-${qs.r}` : ''}KEY${redisKey}`)


        } else {
            $(`.footer__mainBox__formBox__readyBox[data-form-id="${formId}"]`).addClass('active')
            $(`.footer__formBox__discount[data-form-id="${formId}"]`).css('display', 'none')

            fetch(
                `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone}&action=course&course=digital${qs['r'] ? `&ref=${qs['r']}` : ''}`,
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

        if (days >= 0 && hours >= 0 && minutes >= 0) {
            $('.days').text(`${days}`)
            $('.hours').text(`${hours < 10 ? '0' : ''}${hours}`)
            $('.minutes').text(`${minutes < 10 ? '0' : ''}${minutes}`)
            $('.timer').text(`${days < 10 ? '0' : ''}${days}:${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`)
        } else {
            $('.discountCircle').css('display', 'none')
            $('.days').text('0')
            $('.hours').text('00')
            $('.minutes').text('00')
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
    const classes = ['section__speakerBox__speakers__speaker', 'footer__course__box']

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

function getMaxWidth() {
    const classes = ['footer__typeBox__type']

    for (let name_class of classes) {
        let width = 0

        $(`.${name_class}`).each(function () {
            $(this).css('width', ``)
        })

        $(`.${name_class}`).each(function () {
            width = $(this).outerWidth() > width ? $(this).outerWidth() : width
        })

        $(`.${name_class}`).each(function () {
            $(this).css('width', `${width}px`)
        })
    }
}

function listenProgram() {
    const classes = ['.section__programBox__box__program', '.section__weOftenAsked__questionBox__question']

    for (let className of classes) {
        for (let box of document.querySelectorAll(className)) {
            box.addEventListener('click', () => {
                let is_class = false
                if (box.classList.contains('active')) {
                    is_class = true
                }
                $(className).removeClass('active')
                if (is_class) {
                    box.classList.remove('active')
                } else {
                    box.classList.add('active')
                }
            })
        }
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

            let type_background = type.getAttribute('data-type-background')

            if (type_background === 'left') {
                $('.footer__typeBox__type[data-type-background="left"]').removeClass('right')
            }

            if (type_background === 'right') {
                $('.footer__typeBox__type[data-type-background="left"]').addClass('right')
            }

        })
    }
}

function listenCoursesSlider() {
    if ($(window).width() < MOBILE_WIDTH) {
        $('.footer__course__allBoxes').addClass('owl-carousel owl-theme')

        $('#courseSlider').owlCarousel({
            margin: 0,
            nav:false,
            dots: false,
            items: 1
        })
    }
}

async function initCourseData() {
    const first_date =  moment(`2021-10-05`, 'YYYY-MM-DD')
    const first_date_format = first_date.locale("ru").format('D MMMM')

    $('span.date').text(first_date_format)

    let eventTime= parseInt(new Date(first_date).getTime()/1000);
    let currentTime = parseInt(new Date().getTime()/1000);
    let diffTime = eventTime - currentTime;
    let duration = moment.duration(diffTime*1000, 'milliseconds');
    let days = parseInt(duration.days())

    let placesLeft = 50

    if (days <= 30) {
        placesLeft = 50
    }
    if (days <= 20) {
        placesLeft = 30
    }
    if (days <= 12) {
        placesLeft = 12
    }
    if (days <= 8) {
        placesLeft = 6
    }
    if (days <= 3) {
        placesLeft = 3
    }

    $('.placesLeft').text(placesLeft)
}

function listenSalaryImages() {
    for (let type of document.querySelectorAll('.section__salaryBox__salaryImg')) {
        type.addEventListener('click', () => {
            $('.section__salaryBox__salaryImg').removeClass('active')
            type.classList.add('active')
        })
    }
}

function lazyLoad() {
    let lazyImages = [].slice.call(document.querySelectorAll(".lazy-load"));
    let lazyBackgroundImages = [].slice.call(document.querySelectorAll(".background-lazy-load"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (
            entries,
            observer
        ) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        let lazyImage = entry.target;
                        if (lazyImage.src == "") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.add("loaded");
                            lazyImage.removeAttribute("data-src");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    }, 100)

                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });

        let lazyImageBackgroundObserver = new IntersectionObserver(function (
            entries,
            observer
        ) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        let lazyImage = entry.target;
                        if (lazyImage.getAttribute('data-src-background')) {
                            lazyImage.style.backgroundImage = `url("${lazyImage.getAttribute('data-src-background')}")`;

                            if ($(window).width() < MOBILE_WIDTH && lazyImage.getAttribute('data-src-background-mobile')) {
                                lazyImage.style.backgroundImage = `url("${lazyImage.getAttribute('data-src-background-mobile')}")`;
                                lazyImage.removeAttribute("data-src-background-mobile");
                            }

                            lazyImage.classList.add("loaded");
                            lazyImage.removeAttribute("data-src-background");
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    }, 100)
                }
            });
        });

        lazyBackgroundImages.forEach(function (lazyImage) {
            lazyImageBackgroundObserver.observe(lazyImage);
        });
    }
}

function listenPhoneInputs() {
    for (let input of document.querySelectorAll('input[data-type="phone"]')) {
        input.addEventListener('input', function (e) {
            if (!this.value.startsWith('+998')) {
                this.value = '+998'
            }
        })
    }
}

function initSliders() {
        $('#photoSlider').slick({
            slidesToShow: 2,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('#videoSlider').slick({
            slidesToShow: 2,
            dots: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })

        $('#speakerSlider').slick({
            slidesToShow: 2,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
}

function init() {
    initSliders()
    setCountDown()
    listenPopups()
    closePopupsOnBack()
    sendForm()
    listenProgram()
    closeFormWithCross()
    listenType()
    listenCoursesSlider()
    initCourseData()
    listenSalaryImages()
    getMaxHeight()
    getMaxWidth()
    lazyLoad()
    listenPhoneInputs()

    document.querySelector(".loader").classList.add("active");
    setTimeout(() => {
        document.querySelector("html").removeAttribute("style");
        document.querySelector(".loader").style.display = "none";
    }, 500);
}


init()