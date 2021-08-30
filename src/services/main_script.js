require('@babel/polyfill')

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

        fetch(
            `https://node.snimerovsky.xyz/log`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({site: 'webinar_course', name,phone})
            }
        );

        try {
            let res = await fetch(
                `https://api.tehnikum.school/amocrm/tilda_lead.php?course=smm-new&name_lead=Открытыйурок&Name=${name}&Phone=${phone}`,
                {
                    method: "GET",
                }
            );
            res = await res.json();
        } finally {
            window.location.replace("http://stackoverflow.com");
        }
    }
}

function sendForm() {
    for (let btn of document.querySelectorAll(".sendForm")) {
        btn.addEventListener("click", () => {
            return takeCourse(btn.getAttribute('data-form-id'))
        });
    }
}


function init() {
    sendForm()
}

$( window ).on( "load", function() {
    init()
});