let NAME = "";
let GROUP_URL = "";
function openModalForm(
  formName,
  { setName = false, id = "", group_url = "" } = {}
) {
  if (setName) {
    GROUP_URL = group_url;
    NAME = document.querySelector(`h2[data-id="${id}"]`).textContent;
  }

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
      document.querySelector(".lentaLessons").classList.add("initialX");
    }, 200);
    setTimeout(() => {
      document.querySelector("html").removeAttribute("style");
      document.querySelector(".loader").style.display = "none";
    }, 500);
  }, 3000);
});

const controller = new ScrollMagic.Controller();

let triggerHook = 0.1;
if (window.matchMedia("(max-width: 700px)").matches) {
  triggerHook = 0.2;
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
    document.querySelector(".lentaLessons").classList.remove("initialX");
    document.querySelector(".lentaLessons").classList.add("animateX");
  })
  .on("leave", () => {
    document.querySelector(".intensives").classList.add("initialX");
    document.querySelector(".intensives").classList.remove("animateX");
    document.querySelector(".lentaLessons").classList.add("initialX");
    document.querySelector(".lentaLessons").classList.remove("animateX");
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

// API

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

function filterBoxes(event) {
  for (let item of document.querySelectorAll("div[data-type]")) {
    item.classList.remove("active");
  }
  event.classList.add("active");
  for (let item of document.querySelector(".lessonsBox").children) {
    item.style.display = "none";
  }
  for (let item of document.querySelector(".lessonsBox").children) {
    if (event.getAttribute("data-type") == "all") {
      item.style.display = "block";
    } else {
      if (
        event.getAttribute("data-type") == item.getAttribute("data-filter-type")
      ) {
        item.style.display = "block";
      }
    }
  }
}

async function getDataAPI() {
  const formData = new FormData();

  formData.append("action", "list");
  formData.append("token", "123");

  let res = await fetch("https://api.tehnikum.school/category.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();

  if (res.success) {
    for (let item of res.rows) {
      let block = document.createElement("div");
      block.classList.add("box");
      block.textContent = item.title;
      block.setAttribute("data-category-id", item.id);
      block.setAttribute("data-type", item.title);
      block.addEventListener("click", (e) => filterBoxes(e.target));
      document.querySelector(".selectBox").appendChild(block);
    }
  }

  res = await fetch("https://api.tehnikum.school/openlesson.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  if (res.success) {
    for (let item of res.rows) {
      let teachers = await getTeacher(item.id);
      let block = document.createElement("div");
      block.classList.add("box");
      block.classList.add("openLessonsBox");
      block.setAttribute(
        "data-filter-type",
        `${
          document.querySelector(`div[data-category-id='${item.category}']`)
            .textContent
        }`
      );
      // let imgType = "-l";
      let imgType = "";
      // if (window.matchMedia("(max-width: 1200px)").matches) {
      //   imgType = "-m";
      // }
      let img = item.imageurl.split(".");
      img[0] = img[0] + imgType;
      img = img.join(".");
      block.innerHTML = `
              <div class="authorsBox">
                  ${teachers
                    .map((t) => {
                      let imgAuthors = t.imageurl.split(".");
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
                <h2 class="title" data-id="${item.id}">${item.name}</h2>
                <div class="imgBox">
                  <img data-src="https://admin.tehnikum.school/admin/${img}" class="lazy-image" />
                  <div class="type">${
                    document.querySelector(
                      `div[data-category-id='${item.category}']`
                    ).textContent
                  }</div>
                </div>
                <p class="desctiption">
                 ${item.description}
        </p>
                <div class="yellowBtn btnBottomCourse" onclick="openModalForm('#formBox', {setName: true, id: ${
                  item.id
                }, group_url: '${
        item.group_url
      }'});yaCounter69008998.reachGoal('Записаться на открытый урок'); return true;">
                  <p>Записаться</p>
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
            `;
      document.querySelector(".lessonsBox").appendChild(block);
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

async function takeCourse() {
  const formData = new FormData();

  let name = document.querySelector('input[name="name"]').value;
  let phone = document.querySelector('input[name="phone"]').value;

  let res = await fetch(
    `https://api.tehnikum.school/amocrm/?&name=${name}&phone=${phone}&type=openlesson&summ=0.00&comments=${NAME}`,
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
    window.open(GROUP_URL, "_blank");
    closeModalForm("#formBox");
    document.querySelector('input[name="name"]').value = "";
    document.querySelector('input[name="phone"]').value = "";
    for (let item of document.querySelectorAll(".input")) {
      item.classList.remove("active");
    }
  }
}

for (let item of document.querySelectorAll(".input")) {
  item.addEventListener("click", () => {
    if (!item.children[1].value.length > 0) {
      item.classList.add("active");
    }
  });
  item.addEventListener("focusout", () => {
    if (!item.children[1].value.length > 0) {
      item.classList.remove("active");
    }
  });
}

function deleteError(elem) {
  elem.parentElement.classList.remove("error");
}

function activeInput(elem) {
  if (!elem.parentElement.classList.contains("active")) {
    elem.parentElement.classList.add("active");
  }
  return false;
}
