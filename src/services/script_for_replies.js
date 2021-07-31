// load animation image

if (window.matchMedia("(min-width: 800px)").matches) {
  let okImg = document.createElement("img");
  okImg.src = "images/ok.gif";
  okImg.alt = "ok";
  okImg.classList.add("centerImg");
  okImg.classList.add("hide");
  okImg.id = "okImg";
  document.querySelector(".sliderBox-one").prepend(okImg);
  let peaceImg = document.createElement("img");
  peaceImg.src = "images/peace.gif";
  peaceImg.alt = "peace";
  peaceImg.classList.add("centerImg");
  peaceImg.classList.add("hide");
  peaceImg.id = "peaceImg";
  document.querySelector(".sliderBox-one").prepend(peaceImg);
  let coolImg = document.createElement("img");
  coolImg.src = "images/cool.gif";
  coolImg.alt = "cool";
  coolImg.classList.add("centerImg");
  coolImg.classList.add("show");
  coolImg.id = "coolImg";
  document.querySelector(".sliderBox-one").prepend(coolImg);
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

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".loader").classList.add("active");

    setTimeout(() => {
      document.querySelector(".twoCarrer").classList.add("initialX");
    }, 200);
    setTimeout(() => {
      document.querySelector("html").removeAttribute("style");
      document.querySelector(".loader").style.display = "none";
    }, 500);
  }, 3000);
});

const controller = new ScrollMagic.Controller();

let triggerHook = 0.3;
if (window.matchMedia("(max-width: 700px)").matches) {
  triggerHook = 0.2;
}
if (window.matchMedia("(max-width: 500px)").matches) {
  triggerHook = 0;
}

new ScrollMagic.Scene({
  triggerElement: ".firstBox",
  triggerHook,
})
  .on("enter", () => {
    document.querySelector(".twoCarrer").classList.remove("initialX");
    document.querySelector(".twoCarrer").classList.add("animateX");
  })
  .on("leave", () => {
    document.querySelector(".twoCarrer").classList.add("initialX");
    document.querySelector(".twoCarrer").classList.remove("animateX");
  })
  .addTo(controller);

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

function checkForMore(classElem, num, add) {
  try {
    document.querySelector(`${classElem}>.blueBtn`).remove();
  } catch (e) {}

  let blocks = document.querySelectorAll(`${classElem}>.careerRepliesBox__box`);
  for (let item of blocks) {
    item.style.display = "none";
  }
  for (let i = 0; i < num; i++) {
    console.log(blocks);
    try {
      blocks[i].style.display = "block";
    } catch (e) {}
  }
  if (num < blocks.length) {
    console.log("append");
    let btn = document.createElement("div");
    btn.classList.add("blueBtn");
    btn.textContent = "Показать еще";
    btn.addEventListener("click", () =>
      checkForMore(classElem, num + add, add)
    );

    document.querySelector(`${classElem}`).appendChild(btn);
  }
}

function showMore(elem) {
  let text = elem.parentNode.getAttribute("data-text");
  elem.parentNode.removeAttribute("data-text");
  elem.parentNode.innerHTML = text;
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

async function getTeacher(id, type) {
  const formData = new FormData();

  formData.append("action", "get");
  formData.append("token", "123");
  formData.append(`${type}`, `${id}`);

  let res = await fetch(`https://api.tehnikum.school/${type}.teacher.php`, {
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

async function getDataAPI() {
  const formData = new FormData();

  formData.append("action", "list");
  formData.append("token", "123");

  let res = await fetch("https://api.tehnikum.school/feedback.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  console.log(res);

  const NUM_OF_REPLIES = 3;
  let num_replies = 0;
  if (res.success) {
    for (let item of res.rows) {
      if (item.videourl) {
        let videoUrl =
          item.videourl.split("v=")[1] !== undefined
            ? item.videourl.split("v=")[1]
            : item.videourl.split("/")[3];
        num_replies += 1;
        let block = document.createElement("div");
        block.classList.add("careerRepliesBox__box");
        block.classList.add("careerRepliesBox__replies");
        let img = item.imageurl.split(".");
        img[0] = img[0] + "-s";
        img = img.join(".");
        block.innerHTML = `
              <div class="authorsBox">
          <div class="info">
            <img src="https://admin.tehnikum.school/admin/${img}" alt="avatar" style="width: 50px" />
            <div>
              <div class="name">${item.name}</div>
              <div class="smallNameTitle">${item.position}</div>
            </div>
          </div>
        </div>
        <div class="imgBox imgBoxCareer">
          <div class="videoBox" onclick="playPause(this)">
            <iframe width="100%" height="300"
            data-src="https://www.youtube.com/embed/${videoUrl}" class="lazy-image">
            </iframe>
          </div>
        </div>
        <p class="desctiption">
          ${item.text}
        </p>
            `;
        if (num_replies % NUM_OF_REPLIES === 0) {
          block.style.borderRight = "3px solid #000";
        }
        document.querySelector(".careerRepliesBox").appendChild(block);
      }
    }
    checkForMore("#careerRepliesBox", NUM_OF_REPLIES, NUM_OF_REPLIES);
    const NUM_OF_REPLIES_NO_VIDEO = 3;
    let num_replies_no_video = 0;
    for (let item of res.rows) {
      if (!item.videourl) {
        num_replies_no_video += 1;
        let block = document.createElement("div");
        block.classList.add("careerRepliesBox__box");
        let img = item.imageurl.split(".");
        img[0] = img[0] + "-s";
        img = img.join(".");
        block.innerHTML = `
                <div class="authorsBox">
                <div class="info">
                  <img src="https://admin.tehnikum.school/admin/${img}" alt="avatar" style="width: 50px" />
            <div>
              <div class="name">${item.name}</div>
              <div class="smallNameTitle">${item.position}</div>
            </div>
                </div>
              </div>
              <p class="desctiption" data-text='${item.text}'>
                ${
                  item.text.length <= 150
                    ? item.text
                    : item.text.slice(0, 150) +
                      "<span class='more' onclick='showMore(this)'>Ещё...<span>"
                }
              </p>
              `;
        if (!window.matchMedia("(max-width: 1000px)").matches) {
          if (num_replies_no_video % NUM_OF_REPLIES_NO_VIDEO === 0) {
            block.style.borderRight = "3px solid #000";
          }
        }

        document.querySelector("#othersReplies").appendChild(block);
      }
    }

    checkForMore(
      "#othersReplies",
      NUM_OF_REPLIES_NO_VIDEO,
      NUM_OF_REPLIES_NO_VIDEO
    );
  }

  res = await fetch("https://api.tehnikum.school/course.php", {
    method: "POST",
    body: formData,
  });

  res = await res.json();
  const idsCourses = ["oneSliderOne", "oneSliderTwo", "oneSliderThree"];
  if (res.success) {
    getSoonerCourse(res.rows);
    for (let item in res.rows) {
      if (item < 3) {
        console.log(res.rows[item].id);
        let teachers = await getTeacher(res.rows[item].id, "course");
        console.log(teachers);
        document.querySelector(`#${idsCourses[item]}`).innerHTML = `
                <div class="mobileSliderOneClickRight" style="display: none"></div>
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
                          class="lazy-image"
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
                    <span>${res.rows[item].duration}</span>
                    <span>${res.rows[item].format}</span>
                    <span>${res.rows[item].difficulty}</span>
                  </div>
                  <a href="${res.rows[item].pagelink}">
                  <div class="yellowBtn" onclick="yaCounter69008998.reachGoal('Подробнее о курсе'); return true;">
                    Подробнее о курсе
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

    // slider

    let triggerHookTop = ((85 / screen.height) * 100) / 100;

    new Slider({
      basicSliders: ["one"],
      emojiSliders: ["one"],
      indicatorsForClick: ["#sliderOneIndicator"],
      indicatorsScrollable: [false],
      triggerHookTop,
      controller,
    }).init();
  }
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
