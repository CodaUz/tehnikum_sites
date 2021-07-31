// API

function checkForMore(classElem, num, add) {
  try {
    document.querySelector(`${classElem}>.blueBtn`).remove();
  } catch (e) {}

  let blocks = document.querySelectorAll(`${classElem}>.careerRepliesBox__box`);
  for (let item of blocks) {
    item.style.display = "none";
  }
  for (let i = 0; i < num; i++) {
    try {
      blocks[i].style.display = "block";
    } catch (e) {}
  }
  if (num < blocks.length) {
    console.log("append");
    let btn = document.createElement("div");
    btn.classList.add("blueBtn");
    btn.textContent = "Показать еще";
    btn.addEventListener("click", () => {
      checkForMore(classElem, num + add, add);
      yaCounter69008998.reachGoal("Показать еще");
      return true;
    });

    document.querySelector(`${classElem}`).appendChild(btn);
  }
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
            <img data-src="https://admin.tehnikum.school/admin/${img}" alt="avatar" style="width: 50px" class="lazy-image" />
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
    checkForMore(".careerRepliesBox", NUM_OF_REPLIES, NUM_OF_REPLIES);
  }

  res = await fetch("https://api.tehnikum.school/course.php", {
    method: "POST",
    body: formData,
  });

  res = await res.json();
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
  }
}

getReadyApi();
