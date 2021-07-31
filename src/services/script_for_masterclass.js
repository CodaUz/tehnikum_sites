document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("active");

    setTimeout(() => {
      document.querySelector("html").removeAttribute("style");
      document.querySelector(".loader").style.display = "none";
    }, 500);
  }, 3000);
});

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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

let PRICE = 0;

function deleteError(elem) {
  elem.parentElement.classList.remove("error");
}

// video

function playPause(e) {
  e.children[0].classList.toggle("active");
  if (e.children[1].paused) {
    e.children[1].play();
  } else e.children[1].pause();
}
function showActive(e) {
  e.parentNode.children[0].classList.remove("active");
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

// Slider

const controller = new ScrollMagic.Controller();

let triggerHookTop = ((77 / screen.height) * 100) / 100;

new Slider({
  basicSliders: ["two"],
  emojiSliders: [],
  indicatorsForClick: ["#sliderTwoIndicator"],
  indicatorsScrollable: [false],
  triggerHookTop,
  controller,
}).init();

// API

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

let query = window.location.search.substring(1);
let qs = parse_query_string(query);

async function getTeacher(id) {
  const formData = new FormData();

  formData.append("action", "get");
  formData.append("token", "123");
  formData.append("openlesson", `${id}`);

  let res = await fetch("https://api.tehnikum.school/openlesson.teacher.php", {
    method: "POST",
    body: formData,
  });

  res = await res.json();
  let result = [];

  if (res.success) {
    const formDataTeacher = new FormData();

    formDataTeacher.append("action", "list");
    formDataTeacher.append("token", "123");

    let res_teachers = await fetch("https://api.tehnikum.school/teacher.php", {
      method: "POST",
      body: formDataTeacher,
    });
    res_teachers = await res_teachers.json();

    if (res_teachers.success) {
      for (let item of res.rows) {
        for (let teacher of res_teachers.rows) {
          if (teacher.id == item.teacher) {
            result.push(teacher);
          }
        }
      }
    }
  }
  return result;
}

const months = {
  1: "Января",
  2: "Февраля",
  3: "Марта",
  4: "Апреля",
  5: "Мая",
  6: "Июня",
  7: "Июля",
  8: "Августа",
  9: "Сентября",
  10: "Октября",
  11: "Ноября",
  12: "Декабря",
};

async function getMasterclassAPI(id) {
  const formData = new FormData();

  formData.append("action", "list");
  formData.append("token", "123");

  let res = await fetch("https://api.tehnikum.school/masterclass.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();

  let masterclass = undefined;

  if (res.success) {
    for (let item of res.rows) {
      if (item.id == id) {
        masterclass = item;
      }
    }
  }

  if (masterclass !== undefined) {
    let teachers = await getTeacher(id);
    let authorsBox = document.createElement("div");
    authorsBox.classList.add("authorsBox");
    authorsBox.classList.add("authorsBoxFirst");
    authorsBox.innerHTML = `
          ${teachers
            .map((t) => {
              return `
                      <div class="info">
                        <img
                          src="https://admin.tehnikum.school/admin/${t.imageurl}"
                          alt="avatar"
                          style="width: 50px"
                        />
                        <div>
                          <div class="name">${t.name}</div>
                          <div class="surname">${t.surname}</div>
                        </div>
                      </div>
                      `;
            })
            .join("")}
        `;
    document.querySelector(".firstBoxMasterclass").appendChild(authorsBox);

    let categoryBox = document.createElement("h1");
    categoryBox.classList.add("titleMasterclass");
    categoryBox.textContent = masterclass.name;
    document.querySelector(".firstBoxMasterclass").appendChild(categoryBox);
    console.log(masterclass);

    let centerBox = document.createElement("div");
    centerBox.classList.add("centerBox");
    centerBox.innerHTML = `
            <div class="leftBox">
              <div class="videoBox">
                <div class="imgBox">
                  <img src="https://admin.tehnikum.school/admin/${
                    masterclass.imageurl
                  }" alt="" />
                </div>
              </div>
            </div>
            <div class="rightBox">
              <div>
                <p class="descriptionFirst">
                  ${masterclass.fulldescription}
            </p>
                
              </div>
              <div class="authorsBox">
                ${teachers
                  .map((t) => {
                    return `
                      <div class="info">
                        <img
                          src="https://admin.tehnikum.school/admin/${t.imageurl}"
                          alt="avatar"
                          style="width: 50px"
                        />
                        <div>
                          <div class="name">${t.name}</div>
                          <div class="surname">${t.surname}</div>
                        </div>
                      </div>
                      `;
                  })
                  .join("")}
              </div>
            </div>
          `;
    PRICE = parseFloat(masterclass.price);
    document.querySelector(".firstBoxMasterclass").appendChild(centerBox);
    let bottomBox = document.createElement("div");
    bottomBox.classList.add("bottomBox");
    bottomBox.innerHTML = `
            <div class="dateBox">
          <div class="dateBoxFlex">
            <h2>${new Date(`${masterclass.date}`).getDate()}</h2>
            <p>${months[new Date(`${masterclass.date}`).getMonth() + 1]}</p>
          </div>
          <div class="price priceInside" style="display: none">${numberWithSpaces(
            parseInt(masterclass.price)
          )} сум</div>
        </div>
        <div class="rightBox">
          <div class="price">${numberWithSpaces(
            parseInt(masterclass.price)
          )} сум</div>
          <div class="yellowBtn btnBottomCourse" onclick="openModalForm('#formBox');yaCounter69008998.reachGoal('Записаться на мастеркласс'); return true;">
            Записаться на мастеркласс
            <svg
              width="40"
              height="20"
              style="margin-left: 15px"
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.188 0.281006L15.78 1.72001L20.063 6.00001H0V8.00001H20.063L15.781 12.281L17.188 13.719L23.905 7.00001L17.188 0.281006Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
          `;
    document.querySelector(".firstBoxMasterclass").appendChild(bottomBox);
  }

  const formDataCourse = new FormData();

  formDataCourse.append("action", "list");
  formDataCourse.append("token", "123");

  res = await fetch("https://api.tehnikum.school/course.php", {
    method: "POST",
    body: formDataCourse,
  });

  res = await res.json();
  if (res.success) {
    getSoonerCourse(res.rows);
  }
}

if (qs.id !== void 0) {
  getMasterclassAPI(qs.id);
}

async function getDataAPI() {
  const formData = new FormData();

  formData.append("action", "list");
  formData.append("token", "123");

  let res = await fetch("https://api.tehnikum.school/masterclass.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  const idsMasterclasses = ["twoSliderOne", "twoSliderTwo", "twoSliderThree"];
  if (res.success) {
    for (let item in res.rows) {
      if (item < 3) {
        let teachers = await getTeacher(res.rows[item].id, "masterclass");
        document.querySelector(`#${idsMasterclasses[item]}`).innerHTML = `
                <div>
                  <div class="authorsBox">
                ${teachers
                  .map((t) => {
                    let img = t.imageurl_circle.split(".");
                    img[0] = img[0] + "-s";
                    img = img.join(".");
                    return `
                      <div class="info">
                        <img
                          data-src="https://admin.tehnikum.school/admin/${img}"
                          alt="avatar"
                          style="width: 50px"
                          class="lazy-image"
                        />
                        <div>
                          <div class="name">${t.name}</div>
                          <div class="surname">${t.surname}</div>
                        </div>
                      </div>
                      `;
                  })
                  .join("")}
                </div>
                <h2 class="titleSlider">${res.rows[item].name}</h2>
                <div class="sliderDescription">
                  ${res.rows[item].description}
                </div>
              </div>
              <div>
                <div class="bottomInfoBox">
                  <span class="bottomInfoBoxFirst">${new Date(
                    res.rows[item].date
                  ).getDate()} ${months[
          new Date(res.rows[item].date).getMonth() + 1
        ].toLowerCase()}</span>
                    <span>${res.rows[item].difficulty}</span>
                    <span>${res.rows[item].format}</span>
                    <span style="color: white">${
                      res.rows[item].difficulty
                    }</span>
                </div>
                <a href="masterclass.html?id=${res.rows[item].id}">
                <div class="yellowBtn">
                  <p class="initialYellowBtn" onclick="yaCounter69008998.reachGoal('Записаться на мастеркласс'); return true;">Записаться на мастер-класс</p>
                  <p class="mobileYellowBtn" onclick="yaCounter69008998.reachGoal('Записаться на мастеркласс'); return true;" style="display: none">Записаться</p>
                  <svg
                    width="40"
                    height="20"
                    style="margin-left: 15px"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.188 0.281006L15.78 1.72001L20.063 6.00001H0V8.00001H20.063L15.781 12.281L17.188 13.719L23.905 7.00001L17.188 0.281006Z"
                      fill="black"
                    />
                  </svg>
                </div>
                </a>
                <div class="bottomSliderIcon">
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 24 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.188 0.281006L15.78 1.72001L20.063 6.00001H0V8.00001H20.063L15.781 12.281L17.188 13.719L23.905 7.00001L17.188 0.281006Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              `;
      }
    }
  }

  return new Promise((resolve, reject) => resolve(true));
}

async function getReadyApi() {
  let isReady = await getDataAPI();
  if (isReady) {
    function lazyLoad() {
      var lazyImages = [].slice.call(document.querySelectorAll(".lazy-image"));

      if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (
          entries,
          observer
        ) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              if (lazyImage.src == "") {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.add("loaded");
                lazyImage.removeAttribute("data-src");
                lazyImageObserver.unobserve(lazyImage);
              }
            }
          });
        });

        lazyImages.forEach(function (lazyImage) {
          lazyImageObserver.observe(lazyImage);
        });
      }
    }

    lazyLoad();
    window.addEventListener("scroll", _.throttle(lazyLoad, 16));
    window.addEventListener("resize", _.throttle(lazyLoad, 16));
  }
}

async function takeCourse() {
  const formData = new FormData();

  let name = document.querySelector('input[name="name"]').value;
  let phone = document.querySelector('input[name="phone"]').value;

  let res = await fetch(
    `https://api.tehnikum.school/amocrm/?token=123&name=${name}&phone=${phone}&type=masterclass&summ=${PRICE}`,
    {
      method: "GET",
    }
  );
  res = await res.json();
  if (res.result == 0) {
    let i = 0;
    for (let item of document.querySelectorAll(".input")) {
      item.classList.add("error");
      if (i === 0) {
        item.style.marginTop = "20px";
        let errorText = document.createElement("div");
        errorText.classList.add("errorText");
        errorText.style.top = "-28px";
        errorText.textContent = "Произошла ошибка при отправке вашей заявки";
        item.appendChild(errorText);
      }
      i += 1;
    }
  } else {
    closeModalForm(".formBox");
    document.querySelector('input[name="name"]').value = "";
    document.querySelector('input[name="phone"]').value = "";
    for (let item of document.querySelectorAll(".input")) {
      item.classList.remove("active");
    }
  }
  console.log(res);
}

for (let item of document.querySelectorAll(".input")) {
  item.addEventListener("click", () => {
    console.log(item.children[1].value.length);
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

setTimeout(() => {
  getReadyApi();
}, 2000);

function openMobileMap(idElem) {
  if (window.matchMedia("(max-width: 900px)").matches) {
    setYandexMaps("mapMobile");
    openModalForm(idElem);
  }
}
