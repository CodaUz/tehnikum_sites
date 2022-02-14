function listenPopups() {
    $('.openPopup').click(() => {
        openModalForm('.formBoxIndex')
    })

    $('.openProgramForm').click(() => {
        $('.footer__mainBox__formBox__readyBox').removeClass('active')
        $('div[data-form-id="Program"]').attr('data-program', 'true')
        $('div.sendForm[data-form-id="Program"]').text('Получить программу курса')
        $('p.footer__mainBox__formBox__text').text('Сразу после заполнения данных вы перейдете в Telegram, где сможете посмотреть всю программу')
        $('p.titleName').text('Программа курса')
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
    console.log('test')
    let name = document.querySelector(`input[name="name${formId}"]`).value;
    let phone = document.querySelector(`input[name="phone${formId}"]`).value;
    let query = window.location.search.substring(1);
    let qs = parse_query_string(query);

    console.log(name, phone)
    if (name && phone) {
        document.querySelector(`input[name="name${formId}"]`).value = "";
        document.querySelector(`input[name="phone${formId}"]`).value = "";
        for (let item of document.querySelectorAll(".input")) {
            item.classList.remove("active");
        }
        const COURSE = 'web_design'

        let redisKey = Math.floor(Math.random()*900000000) + 100000000;
        let redisValue = `${encryptName(name)}-${phone.replace(/\D/g, "")}-${status}-${COURSE}`
        const WEBINAR_ID = 817339


        if (is_redirect) {
            fetch(
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

            fetch(
                `https://tg-api.tehnikum.school/amo_crm/v1/create_lead?name=${name}&phone=${phone.replace(/[ -]/g, '')}&course=${COURSE}&action=program${qs['r'] ? `&ref=${qs['r']}` : ''}`,
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
}

init()
