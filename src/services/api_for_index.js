// API

const MAX_LENGTH = 182;

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

function changeTextWithSelect(select, elemName) {
  for (let el of document.querySelectorAll(`${elemName}`)) {
    console.log(el);
    try {
      el.innerHTML = document.querySelector(`${select}>div.active`).textContent;
    } catch (e) {}
  }
}

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

  let res = await fetch("https://api.tehnikum.school/course.php", {
    method: "POST",
    body: formData,
  });

  res = await res.json();
  console.log(res);
  const idsCourses = ["mainSliderOne", "mainSliderTwo", "mainSliderThree"];
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
    for (let item of res.rows) {
      let block = document.createElement("div");
      block.classList.add("value");
      block.addEventListener("click", (e) => {
        chooseSelect(
          e.target,
          "selectValuesOne",
          "selectTextOne",
          "selectValuesBoxOne"
        );
        changeTextWithSelect("#selectValuesOne", ".courseNameTest");
      });

      block.textContent = item.name;
      document.querySelector("#selectValuesOne").appendChild(block);
    }
  }

  res = await fetch("https://api.tehnikum.school/feedback.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  console.log(res);
  const idsFeedbacks = ["threeSliderOne", "threeSliderTwo", "threeSliderThree"];
  if (res.success) {
    for (let item in res.rows) {
      if (item < 3) {
        if (res.rows[item].videourl) {
          let videoUrl =
            res.rows[item].videourl.split("v=")[1] !== undefined
              ? res.rows[item].videourl.split("v=")[1]
              : res.rows[item].videourl.split("/")[3];
          document.querySelector(`#${idsFeedbacks[item]}`).innerHTML = `
                  <div>
                  <div class="authorsBox">
                  <div class="info">
                    <img data-src="https://admin.tehnikum.school/admin/${
                      res.rows[item].imageurl
                    }" class="lazy-image" alt="avatar" style="width: 50px" />
                    <div>
                      <div class="nameDisplay">${res.rows[item].name}</div>
                      <div class="smallNameTitle">${
                        res.rows[item].position
                      }</div>
                    </div>
                  </div>
                  </div>
                  <div class="videoBox" onclick="playPause(this)">
                    <div class="videoBox" onclick="playPause(this)">
                      <iframe width="320" height="200"
                      data-src="https://www.youtube.com/embed/${videoUrl}" class="lazy-image">
                      </iframe>
                    </div>
                  </div>
                  <div class="sliderDescriptionVideo">
                    ${
                      res.rows[item].text.length <= MAX_LENGTH
                        ? res.rows[item].text
                        : res.rows[item].text.slice(0, MAX_LENGTH) + "..."
                    }
                  </div>
                </div>
                <div>
                  <div class="yellowBtn" onclick="yaCounter69008998.reachGoal('Все отзывы'); return true;">
                    Все отзывы
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
        } else {
          let imgType = "-l";
          if (window.matchMedia("(max-width: 2000px)").matches) {
            imgType = "-m";
          }
          let img = res.rows[item].imageurl.split(".");
          img[0] = img[0] + imgType;
          img = img.join(".");
          let imgAuthors = res.rows[item].imageurl.split(".");
          imgAuthors[0] = imgAuthors[0] + "-s";
          imgAuthors = imgAuthors.join(".");
          document.querySelector(`#${idsFeedbacks[item]}`).innerHTML = `
                  <div>
                  <div class="authorsBox">
                  <div class="info">
                    <img data-src="https://admin.tehnikum.school/admin/${imgAuthors}" class="lazy-image" alt="avatar" style="width: 50px" />
                    <div>
                      <div class="nameDisplay">${res.rows[item].name}</div>
                      <div class="smallNameTitle">${
                        res.rows[item].position
                      }</div>
                    </div>
                  </div>
                  </div>
                  <div class="videoBox">
                    <img data-src="https://admin.tehnikum.school/admin/${img}" class="videoBoxImg lazy-image" height="200" />
                  </div>
                  <div class="sliderDescriptionVideo">
                    ${
                      res.rows[item].text.length <= MAX_LENGTH
                        ? res.rows[item].text
                        : res.rows[item].text.slice(0, MAX_LENGTH) + "..."
                    }
                  </div>
                </div>
                <div>
                  <div class="yellowBtn" onclick="yaCounter69008998.reachGoal('Все отзывы'); return true;">
                    Все отзывы
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
  }
  res = await fetch("https://api.tehnikum.school/masterclass.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  console.log(res);
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
                  <p class="initialYellowBtn" onclick="yaCounter69008998.reachGoal('Записаться на мастер-класс'); return true;">Записаться на мастер-класс</p>
                  <p class="mobileYellowBtn" style="display: none" onclick="yaCounter69008998.reachGoal('Записаться на мастер-класс'); return true;">Записаться</p>
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

  console.log(res);
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

getReadyApi();
