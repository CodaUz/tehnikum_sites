function listenPopups() {
    $('.openPopup').click(() => {
        openModalForm('.formBoxIndex')
    })

    $('.openProgramForm').click(() => {
        $('.footer__mainBox__formBox__readyBox').removeClass('active')
        $('div[data-form-id="Program"]').attr('data-program', 'true')
        $('div.sendForm[data-form-id="Program"]').text('Записаться')
        $('p.footer__mainBox__formBox__text').text('')
        $('p.titleName').text('ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ЛЕКЦИЮ')
        openModalForm('.formBoxIndex')
    })

    $('.openForm').click(() => {
        $('.footer__mainBox__formBox__readyBox').removeClass('active')
        $('div[data-form-id="Program"]').attr('data-program', '')
        $('p.footer__mainBox__formBox__text').text('')
        $('div.sendForm[data-form-id="Program"]').text('Записаться на курс')
        $('p.titleName').text('оставь заявку')
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
        document.querySelector(`input[name="phone${formId}"]`).value = "";
        for (let item of document.querySelectorAll(".input")) {
            item.classList.remove("active");
        }
        const COURSE = 'web-design'

        let redisKey = Math.floor(Math.random()*900000000) + 100000000;
        let redisValue = `${encryptName(name)}-${phone.replace(/\D/g, "")}-${status}-${COURSE}`
        const WEBINAR_ID = +$('.footer__mainBox__formBox__datesBox__gridBox__box.active').data('id')
        const WEBINAR_NAME = $('.footer__mainBox__formBox__datesBox__gridBox__box.active').data('name')


        if (is_redirect && WEBINAR_ID) {
            closeModalForm('.formBoxIndex')


            await fetch(
                `https://node.snimerovsky.xyz/log`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({site: COURSE, name,phone, redisKey, redisValue})
                }
            );

            await fetch(
                `https://tg-api.tehnikum.school/amo_crm/v1/create_lead?name=${name}&phone=${phone.replace(/[ -]/g, '')}&webinarpool_webinarname=${WEBINAR_NAME}&course=${COURSE}&action=bl-reg${qs['r'] ? `&ref=${qs['r']}` : ''}`,
                {
                    method: "GET",
                }
            );

            let a= document.createElement('a');

            a.href= `https://t.me/TehnikumWebinarBot?start=${WEBINAR_ID}-send_smallchecklist${qs.r ?  `-${qs.r}` : ''}KEY${redisKey}`;
            setTimeout(() => {
                a.click();
            }, 500)
        } else {
            $(`.footer__mainBox__formBox__readyBox[data-form-id="${formId}"]`).addClass('active')
            $(`.footer__formBox__discount[data-form-id="${formId}"]`).css('display', 'none')

            fetch(
                `https://node.snimerovsky.xyz/log`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({site: COURSE, name,phone})
                }
            );

            fetch(
                `https://tg-api.tehnikum.school/amo_crm/v1/create_lead?name=${name}&phone=${phone}&action=course&course=${COURSE}${qs.r ?  `-${qs.r}` : ''}`,
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

async function initWebinarDates() {
    try {
        const COURSE = 'web-design'
        let webinars = await fetch('https://api-webinar.tehnikum.school/api/get_webinars')
        webinars = await webinars.json()
        webinars = webinars.filter(v => moment(v['data_start']) && moment(v['data_start']) >= moment() && v['course'] === COURSE)
        webinars = webinars.map(v => {
            return {
                ...v,
                time_start: new Date(moment(v['data_start'])).getTime(),
                date_start_text: moment(v['data_start']).locale("ru").format('D MMMM'),
                date_start_time: moment(v['data_start']).locale("ru").format('HH:mm')
            }
        })
        webinars.sort((a,b) => (a.time_start < b.time_start) ? -1 : ((b.time_start < a.time_start) ? 1 : 0))
        let index = 0

        if (webinars.length === 0) {
            $('.footer__mainBox__formBox__datesBox').remove()
        }

        for (let webinar of webinars) {
            $('.footer__mainBox__formBox__datesBox__gridBox').append(`
                <div class="footer__mainBox__formBox__datesBox__gridBox__box ${index === 0 ? 'active' : ''}" data-id="${webinar['id_webinar']}" data-name="${webinar['date_start_text']} ${webinar['date_start_time']}">
                    <p>${webinar['date_start_text']}<br> ${webinar['date_start_time']}</p>
                </div>
            `)
            index += 1
        }

        $('.footer__mainBox__formBox__datesBox__gridBox__box').on('click', function () {
            $('.footer__mainBox__formBox__datesBox__gridBox__box').addClass('notActive')

            $(this).removeClass('notActive')
            $(this).addClass('active')
        })

    } catch (e) {
        console.log('error initWebinarDates', e.message)
    }
}

function setCountDown() {
    if (!localStorage.getItem('time_left_web_design')) {
        localStorage.setItem('time_left_web_design', parseInt(new Date(moment().add("days", 2)).getTime()/1000))
    }

    let eventTime= parseInt(localStorage.getItem('time_left_web_design'));
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
            $('.days').text(`${days < 10 ? '0' : ''}${days}`)
            $('.hours').text(`${hours < 10 ? '0' : ''}${hours}`)
            $('.minutes').text(`${minutes < 10 ? '0' : ''}${minutes}`)
        }
    }, interval);

}

function init() {
    setCountDown()
    listenPopups()
    closePopupsOnBack()
    sendForm()
    initWebinarDates()
}

init()
