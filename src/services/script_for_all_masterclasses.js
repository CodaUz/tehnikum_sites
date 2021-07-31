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
      document.querySelector(".intensives").classList.add("initialX");
      document.querySelector(".masterclasses").classList.add("initialX");
    }, 200);
    setTimeout(() => {
      document.querySelector("html").removeAttribute("style");
      document.querySelector(".loader").style.display = "none";
    }, 500);
  }, 3000);
});

const controller = new ScrollMagic.Controller();

let triggerHook = 0.1;
if (window.matchMedia("(max-width: 780px)").matches) {
  triggerHook = 0.1;
}
if (window.matchMedia("(max-width: 500px)").matches) {
  triggerHook = 0.1;
}

new ScrollMagic.Scene({
  triggerElement: ".firstBox",
  triggerHook,
})
  .on("enter", () => {
    document.querySelector(".intensives").classList.remove("initialX");
    document.querySelector(".intensives").classList.add("animateX");
    document.querySelector(".masterclasses").classList.remove("initialX");
    document.querySelector(".masterclasses").classList.add("animateX");
  })
  .on("leave", () => {
    document.querySelector(".intensives").classList.add("initialX");
    document.querySelector(".intensives").classList.remove("animateX");
    document.querySelector(".masterclasses").classList.add("initialX");
    document.querySelector(".masterclasses").classList.remove("animateX");
  })
  .addTo(controller);

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

function getComputedTranslateY(obj) {
  if (!window.getComputedStyle) return;
  var style = getComputedStyle(obj),
    transform = style.transform || style.webkitTransform || style.mozTransform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(", ")[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(", ")[5]) : 0;
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

const monthNames = {
  1: "Январь",
  2: "Февраль",
  3: "Март",
  4: "Апрель",
  5: "Май",
  6: "Июнь",
  7: "Июль",
  8: "Август",
  9: "Сентябрь",
  10: "Октябрь",
  11: "Ноябрь",
  12: "Декабрь",
};

async function getTeacher(id) {
  const formData = new FormData();

  formData.append("action", "get");
  formData.append("token", "123");
  formData.append("masterclass", `${id}`);

  let res = await fetch("https://api.tehnikum.school/masterclass.teacher.php", {
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
  return result;
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
  console.log(res);

  const monthsRes = {};
  for (let item of res.rows) {
    let date = new Date(`${item.date}`);
    if (monthsRes[date.getMonth() + 1] === undefined) {
      monthsRes[date.getMonth() + 1] = [];
    }
    if (monthsRes[date.getMonth() + 1][date.getDate()] === undefined) {
      monthsRes[date.getMonth() + 1][date.getDate()] = [];
    }
    monthsRes[date.getMonth() + 1][date.getDate()].push(item);
  }
  console.log(monthsRes);

  for (let item in monthsRes) {
    let monthBox = document.createElement("div");
    monthBox.classList.add("intensiveMonthBox");
    monthBox.innerHTML = `<h3 class="title">${monthNames[item]}</h3>`;
    let monthSubBox = document.createElement("div");
    monthSubBox.classList.add("intensiveBoxScroll");
    for (let day in monthsRes[item]) {
      for (let itemBox in monthsRes[item][day]) {
        console.log(monthsRes[item][day][itemBox]);
        let teachers = await getTeacher(monthsRes[item][day][itemBox].id);
        let block = document.createElement("div");
        block.classList.add("intensiveBox");
        let imgType = "-l";
        if (window.matchMedia("(max-width: 1200px)").matches) {
          imgType = "-m";
        }
        let img = monthsRes[item][day][itemBox].imageurl.split(".");
        img[0] = img[0] + imgType;
        img = img.join(".");
        block.innerHTML = `
                <div class="indicateLine"></div>
                <div class="rolledUp">
                  <div>
                    <p>${day}</p>
                    <p>${months[item]}</p>
                  </div>
                  <p>${monthsRes[item][day][itemBox].name}</p>
                </div>
                <div class="dateBox">
                  <h2>${day}</h2>
                  <p>${months[item]}</p>
                </div>
                <div class="imgBox">
                  <img data-src="https://admin.tehnikum.school/admin/${img}" alt="intensive" class="lazy-image" />
                </div>
                <div class="infoBox">
                  <h2>${monthsRes[item][day][itemBox].name}</h2>
                  <div class="authorsBoxInside" style="display: none">
                    ${teachers
                      .map((t) => {
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
                  <p style="white-space: pre-line;margin-top:-15px">
                    ${monthsRes[item][day][itemBox].description}
                  </p>
                  <a href="masterclass.html?id=${
                    monthsRes[item][day][itemBox].id
                  }">
                  <div class="yellowBtn btnBottomCourse" onclick="yaCounter69008998.reachGoal('Подробнее'); return true;">
                    Подробнее
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
                </div>
                <div class="authorsBox">
                  ${teachers
                    .map((t) => {
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
            `;
        monthSubBox.appendChild(block);
      }
    }
    monthBox.appendChild(monthSubBox);
    document.querySelector(".intensivesBox").appendChild(monthBox);
  }

  return new Promise((res, rej) => res(true));
}
function verticalAnimation() {
  // vertical scroll animation
  let flipPath;

  let blocks = document.querySelectorAll(".intensiveMonthBox");
  if (window.matchMedia("(min-width: 850px)").matches) {
    if (blocks.length > 0) {
      let bodyRect = document.body.getBoundingClientRect(),
        elemRect = blocks[0].children[1].children[0].children[0].getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top;
      let triggerElementSlider = parseFloat(
        (offset * 100) / window.innerHeight / 100
      );
      if (window.matchMedia("(max-width: 850px)").matches) {
        triggerElementSlider = parseFloat(
          (offset * 20) / window.innerHeight / 100
        );
      }

      let marginBottomHeight = 0;
      let zIndex = 0;
      let maxHeight = 0;
      for (let block of blocks) {
        const children_len = block.children[1].children.length;

        if (children_len > 0) {
          for (let child = 0; child < children_len; child++) {
            if (block.children[1].children[child].offsetHeight > maxHeight) {
              maxHeight = block.children[1].children[child].offsetHeight;
            }
          }
        }
      }
      for (let block of blocks) {
        const children_len = block.children[1].children.length;

        let heightBottom;
        if (window.matchMedia("(min-width: 850px)").matches) {
          heightBottom = block.children[1].children[0].clientHeight * 0.8;
        } else {
          heightBottom = block.children[1].children[0].clientHeight;
        }
        if (children_len > 0) {
          let forChild = 0;
          for (let child = 0; child < children_len; child++) {
            block.children[1].children[child].style.zIndex = zIndex;
          }
          for (let child = 0; child < children_len; child++) {
            console.log('maxHeight', maxHeight)
            block.children[1].children[child].style.height = `${maxHeight}px`;
          }
          for (let child = 1; child < children_len; child++) {
            let height = block.children[1].children[child - 1].clientHeight;
            let time = 300;
            let triggerElement;
            let offset;
            if (window.matchMedia("(min-width: 850px)").matches) {
              flipPath = {
                values: [{ x: 0, y: `${-80 * (child !== 0 ? child : 1)}%` }],
              };
              triggerElement = block.children[1].children[forChild].children[0];
              offset = 0;
            } else {
              flipPath = {
                values: [{ x: 0, y: `${-80}%` }],
              };
              time = 300;
              block.children[1].children[
                forChild
              ].children[0].style.bottom = `${50}%`;
              triggerElement = block.children[1].children[forChild].children[0];
              offset = 0;
            }

            mobileOffset = time;
            let tween = new TimelineLite();
            tween.add(
              TweenLite.to(block.children[1].children[child], 1, {
                bezier: flipPath,
                ease: Power1.easeInOut,
              })
            );
            new ScrollMagic.Scene({
              triggerElement,
              duration: time,
              offset,
              triggerHook: triggerElementSlider,
            })
              .setTween(tween)
              .on("end", () => {
                block.children[1].children[child - 1].classList.add("inactive");
                block.children[1].children[child - 1].classList.add(
                  "inactiveBig"
                );
              })
              .on("start", () => {
                if (window.matchMedia("(max-width: 850px)").matches) {
                  if (child === children_len - 1) {
                    block.children[1].children[
                      child
                    ].style.marginBottom = `${-120}%`;
                  } else {
                    block.children[1].children[
                      child
                    ].style.marginBottom = `${-70}%`;
                  }
                }
              })
              .on("progress", () => {
                block.children[1].children[child - 1].classList.remove(
                  "inactive"
                );
                block.children[1].children[child - 1].classList.remove(
                  "inactiveBig"
                );
              })
              // .addIndicators()
              .addTo(controller);
            forChild += 1;
          }
        }
        let heigtHalf = heightBottom * (children_len - 1);
        if (window.matchMedia("(min-width: 850px)").matches) {
          block.style.maxHeight = `${block.offsetHeight - heigtHalf}px`;
        }
        zIndex += 1;
      }
    }
  }
}
async function getReadyApi() {
  let isReady = await getDataAPI();
  if (isReady) {
    verticalAnimation();
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
