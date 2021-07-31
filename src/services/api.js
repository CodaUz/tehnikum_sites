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

async function renderAboutCourse(data) {
  console.log("data", data);
  let start = `${data.date.split("-")[2]} ${
    months[parseInt(data.date.split("-")[1])]
  }`;
  document.getElementById("start").textContent = start;
  document.getElementById("duration").textContent = data.duration;
  document.getElementById("description").textContent = data.description;
  document.getElementById("format").textContent = data.format;
  document.getElementById("difficulty").textContent = data.difficulty;
  document.getElementById("price_ochno").textContent = `${numberWithSpaces(
    data.price
  )} сум`;
  document.getElementById("price_remote").textContent = `${numberWithSpaces(
    data.price_remotely
  )} сум`;
  document.getElementById(
    "avatar_course"
  ).src = `https://admin.tehnikum.school/admin/${data.imageurl}`;
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
    for (let item in res.rows) {
      if (ID_COURSE === res.rows[item].id) {
        renderAboutCourse(res.rows[item]);
      }
      if (item < 3) {
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
                          src="https://admin.tehnikum.school/admin/${img}"
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

  res = await fetch("https://api.tehnikum.school/feedback.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  console.log(res);
  const idsFeedbacks = [
    "threeSliderOne",
    "threeSliderTwo",
    "threeSliderThree",
    "threeSliderFour",
  ];
  if (res.success) {
    for (let item in res.rows) {
      if (item < 4) {
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
                  <div class="videoBox" onclick="playPause(this)" style="margin-top:0">
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

  res = await fetch("https://api.tehnikum.school/teacher.php", {
    method: "POST",
    body: formData,
  });
  res = await res.json();
  console.log(res);
  if (res.success) {
    for (let item in res.rows) {
      if ([7, 6, 19].includes(res.rows[item].id)) {
        let imgType = "-l";
        if (window.matchMedia("(max-width: 2000px)").matches) {
          imgType = "-m";
        }
        let img = res.rows[item].imageurl.split(".");
        img[0] = img[0] + imgType;
        img = img.join(".");
        let blockLeft = document.createElement("div");
        blockLeft.classList.add("blueBlockAuthors");
        blockLeft.classList.add("blueBlockAuthorsImg");
        blockLeft.innerHTML = `
                <img data-src='https://admin.tehnikum.school/admin/${img}'  alt="dmitriy" class="half lazy-image" />
                <img
                  data-src='https://admin.tehnikum.school/admin/${img}'
                  alt="dmitriy"
                  class="fullHide lazy-image"
                  style="display: none"
                />
              `;
        let blockRight = document.createElement("div");
        blockRight.classList.add("blueBlockAuthors");
        blockRight.classList.add("blueBlockAuthorsText");
        blockRight.style.borderRight = "3px solid #000";
        blockRight.innerHTML = `
              <h2>${res.rows[item].name} ${res.rows[item].surname}</h2>
             <p style="display: block">
                ${res.rows[item].description}
              </p>
                <span><a href="${res.rows[item].fb}">Facebook&nbsp;</a></span>
                <span><a href="${res.rows[item].inst}">Instagram</a></span>
            `;
        document.querySelector("#authorsBox").appendChild(blockLeft);
        document.querySelector("#authorsBox").appendChild(blockRight);
        if (item == 1) {
          let block = document.createElement("div");
          block.classList.add("blueBlockAuthors");
          block.innerHTML = `
                <img data-src="images/cross.png" alt="" class="full lazy-image" />
              `;
          document.querySelector("#authorsBox").appendChild(block);
          block = document.createElement("div");
          block.style.borderRight = "3px solid #000";
          block.classList.add("blueBlockAuthors");
          document.querySelector("#authorsBox").appendChild(block);
        }
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

getReadyApi();
