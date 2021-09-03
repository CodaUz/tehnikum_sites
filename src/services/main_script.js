require('@babel/polyfill')

function deleteError(elem) {
    elem.parentElement.classList.remove("error");
}

function activeInput(elem) {
    if (!elem.parentElement.classList.contains("active")) {
        elem.parentElement.classList.add("active");
    }
    return false;
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
    document.querySelector(formName).classList.remove("activeAnimate");
    document.querySelector(".grayBack").classList.remove("activeAnimate");
    setTimeout(() => {
        document.querySelector(formName).classList.remove("active");
        document.querySelector(".grayBack").classList.remove("active");
    }, 200);
}

function initInputEvents() {
    for (let item of document.querySelectorAll(".input")) {
        item.addEventListener("click", () => {
            if (!item.children[1].value.length > 0) {
                item.classList.add("active");
            }
        });
        item.addEventListener("input", (el) => {
            deleteError(el.target)
            activeInput(el.target)
        });
        $(item).on("focusout", () => {
            if (!item.children[1].value.length > 0) {
                item.classList.remove("active");
            }
        });
    }
}

function openRequisite() {
    document.querySelector('#openRequisite').addEventListener('click', () => {
        openModalForm('#formRequisite')
    })
}

function closeForm() {
    for (let btn of document.querySelectorAll(".close")) {
        btn.addEventListener('click', () => {
            closeModalForm(`#${btn.getAttribute('data-id')}`)
        })
    }
}

function scrollToForm() {
    document.querySelector('.scrollToForm').addEventListener('click', () => {
        document.querySelector('#formContact').scrollIntoView({behavior: "smooth"});
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

async function takeCourse(formId) {
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

        let res = await fetch(
            `https://api.tehnikum.school/amocrm/?name=${name}&phone=${phone}&type=course&course=python-games${qs['r'] ? `&ref=${qs['r']}` : ''}`,
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
                body: JSON.stringify({site: 'kids_python_games', name,phone})
            }
        );

        
    }
}

function sendForm() {
    for (let btn of document.querySelectorAll(".sendForm")) {
        btn.addEventListener("click", () => {
            return takeCourse(btn.getAttribute('data-form-id'))
        });
    }
}

function playPause(e) {
    if (e.paused) {
        e.play();
    } else e.pause();
}

function listenVideo() {
    let myVideo = document.getElementById("videoMain");
    myVideo.addEventListener('click', (e) => playPause(e.target))
}

function init() {
    sendForm()
    closeForm()
    openRequisite()
    initInputEvents()
    scrollToForm()
    listenVideo()
}

init()