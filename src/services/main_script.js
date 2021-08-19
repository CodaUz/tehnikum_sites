require('@babel/polyfill')

const MOBILE_WIDTH = 800

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
        let id = $(this).data('id')
        let number = $(`.sliderBox__sliderDots[data-id="${id}"]>.active`).data('number')
        let all_numbers = $(`.sliderBox__sliderDots[data-id="${id}"]`).children().length

        number = (all_numbers-1) === number ? 0 : number+1

        $(`.sliderBox__sliderDots[data-id="${id}"]>.active`).removeClass('active')
        $(`.sliderBox__sliderDots[data-id="${id}"]>.sliderBox__sliderDots__dot[data-number="${number}"]`).addClass('active')

        moveSlider(id, number)
    })

    $('.sliderBox__prevSlide').click(function () {
        let id = $(this).data('id')
        let number = $(`.sliderBox__sliderDots[data-id="${id}"]>.active`).data('number')
        let all_numbers = $(`.sliderBox__sliderDots[data-id="${id}"]`).children().length

        number = number === 0 ? all_numbers-1 : number-1

        $(`.sliderBox__sliderDots[data-id="${id}"]>.active`).removeClass('active')
        $(`.sliderBox__sliderDots[data-id="${id}"]>.sliderBox__sliderDots__dot[data-number="${number}"]`).addClass('active')

        moveSlider(id, number)
    })
}

function moveSlider(id, number_dot) {
    $(`.sliderBox__slider[data-id="${id}"]`).children().each(function () {
        let number = number_dot * 100
        let multiple_value = $(window).width() <= MOBILE_WIDTH ? 20 : 100
        let number_px = number_dot * multiple_value
        $(this).css('transform', `translateX( calc(-${number}% - ${number_px}px))`)
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

async function takeCourse(formId, type_course='course') {
    const formData = new FormData();

    let name = document.querySelector(`input[name="name${formId}"]`).value;
    let phone = document.querySelector(`input[name="phone${formId}"]`).value;
    let query = window.location.search.substring(1);
    let qs = parse_query_string(query);

    if (name && phone) {
        document.querySelector(`input[name="name${formId}"]`).value = "";
        document.querySelector(`input[name="phone${formId}"]`).value = "";
        for (let item of document.querySelectorAll(".input")) {
            item.classList.remove("active");
        }

        $(`.footer__mainBox__formBox__readyBox[data-form-id="${formId}"]`).addClass('active')

        let res = await fetch(
            `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone}&type=${type_course}&course=context${qs['r'] ? `&ref=${qs['r']}` : ''}`,
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
                body: JSON.stringify({site: 'context', name,phone})
            }
        );
    }
}

function closeFormWithCross() {
    $('.footer__mainBox__formBox__readyBox__cross').click(function () {
        $(this).parent().removeClass('active')
    })
}

function sendForm() {
    for (let btn of document.querySelectorAll(".sendForm")) {
        btn.addEventListener("click", () => {
            return takeCourse(btn.getAttribute('data-form-id'))
        });
    }

    for (let btn of document.querySelectorAll(".sendProgramForm")) {
        btn.addEventListener("click", () => {
            return takeCourse(btn.getAttribute('data-form-id'), 'program')
        });
    }

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
    document.querySelector(".grayBack").classList.remove("activeAnimate");
    setTimeout(() => {
        document.querySelector(formName).classList.remove("activeAnimate");
        document.querySelector(formName).classList.remove("active");
        document.querySelector(".grayBack").classList.remove("active");
    }, 100);
}

function scrollToForm() {
    $('.scrollToForm').click(() => {
        document.querySelector('#formContact').scrollIntoView({behavior: "smooth"});
    })
}

function listenPopups() {
    $('.openPopup').click(() => {
        openModalForm('.formBoxIndex')
    })
}

function closePopupsOnBack() {
    $('.grayBack').click(function () {
        closeModalForm('.formBoxIndex')
    })
}

function init() {
    scrollToForm()
    closeFormWithCross()
    getMaxHeight()
    listenSliders()
    sendForm()
    closePopupsOnBack()
    listenPopups()

    $(window).on('resize', () => {
        getMaxHeight()
    });
}

$( window ).on( "load", function() {
    init()
});