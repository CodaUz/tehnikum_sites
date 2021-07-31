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
      document.querySelector(".one").classList.add("initialX");
    }, 200);
    setTimeout(() => {
      document.querySelector("html").removeAttribute("style");
      document.querySelector(".loader").style.display = "none";
    }, 500);
  }, 3000);
});

const controller = new ScrollMagic.Controller();

let triggerHook;
if (window.matchMedia("(max-width: 500px)").matches) {
  triggerHook = 0.1;
} else {
  triggerHook = 0.2;
}

new ScrollMagic.Scene({
  triggerElement: ".firstBoxScroll",
  triggerHook,
})
  .on("enter", () => {
    document.querySelector(".one").classList.remove("initialX");
    document.querySelector(".one").classList.add("animateX");
  })
  .on("leave", () => {
    document.querySelector(".one").classList.add("initialX");
    document.querySelector(".one").classList.remove("animateX");
  })
  .addTo(controller);

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

// API

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

async function getTeacher(id) {
  const formData = new FormData();

  formData.append("action", "get");
  formData.append("token", "123");
  formData.append("course", `${id}`);

  let res = await fetch("https://api.tehnikum.school/course.teacher.php", {
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

  let res = await fetch("https://api.tehnikum.school/course.php", {
    method: "POST",
    body: formData,
  });

  res = await res.json();
  console.log(res.rows);

  if (res.success) {
    getSoonerCourse(res.rows);

    for (let item of res.rows) {
      let a_href = document.createElement("a");
      a_href.setAttribute("href", item.pagelink);
      let teachers = await getTeacher(item.id);

      let img = item.imageurl.split(".");
      img[0] = img[0] + "-m";
      img = img.join(".");
      a_href.innerHTML = `
              <div class="courseBox" id="${
                item.pos === 1 ? "firstCourse" : ""
              }">
              <div class="left">
                <div class="top">
                  <div class="authorsBox">
                    ${teachers
                      .map((t) => {
                        console.log(t);
                        let imgAuthors = t.imageurl_circle.split(".");
                        imgAuthors[0] = imgAuthors[0] + "-s";
                        imgAuthors = imgAuthors.join(".");
                        return `
                      <div class="info">
                        <img
                          data-src="https://admin.tehnikum.school/admin/${imgAuthors}"
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
                  <h2 class="title">${item.name}</h2>
                  <p class="text">
                    ${item.description}
                  </p>
                </div>
                <div class="bottomLeft">
                  <p>Старт</p>
                  <h3>${new Date(item.date).getDate()} ${
        months[new Date(item.date).getMonth() + 1]
      }</h3>
                  <h3>${item.time}</h3>
                </div>
                <div class="bottomRight">
                  <p>Длительность</p>
                  <h3>${item.duration}</h3>
                  <h3>${item.days}</h3>
                  <p>${item.duration_hours ? `1 урок <h3>${item.duration_hours}</h3>` : ''}</p>
                </div>
              </div>
              <div class="right">
                <div class="top">
                  <img style="max-width: 213px" data-src="https://admin.tehnikum.school/admin/${img}" class="lazy-image" />
                </div>
                <div class="bottomLeft">
                  <p>Формат</p>
                  <h3>${item.format}</h3>
                </div>
                <div class="bottomRight">
                  <p>Сложность</p>
                  <h3>${item.difficulty}</h3>
                </div>
              </div>
              <div class="yellowBtn btnBottomCourse btnToYandex" onclick="yaCounter69008998.reachGoal('Подробнее о курсе'); return true;">
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
            </div>
            `;
      document.querySelector(".allCoursesBox").appendChild(a_href);
    }
  }

  return new Promise((res, rej) => res(true));
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
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.add("loaded");
              lazyImage.removeAttribute("data-src");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });

        lazyImages.forEach(function (lazyImage) {
          lazyImageObserver.observe(lazyImage);
        });
      }
    }

    lazyLoad();
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
