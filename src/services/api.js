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
  let start = `${data.date.split("-")[2]} ${
      months[parseInt(data.date.split("-")[1])]
  }`;
  document.getElementById("start").textContent = start;
  document.getElementById("duration").textContent = data.duration;
  document.getElementById("description").textContent = `${data.description}`;
  document.getElementById("format").textContent = data.format;
  document.getElementById("difficulty").textContent = data.difficulty;
  document.getElementById("price_ochno").textContent = `${numberWithSpaces(
      data.price
  )} сум`;
  document.getElementById("price_remote").textContent = `${numberWithSpaces(
      data.price_remotely
  )} сум`;
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

  const MAX_NUM_OF_REPLIES = 3;
  let num_replies = 0;
  if (res.success) {
    for (let item of res.rows) {
      if (item.videourl && num_replies < MAX_NUM_OF_REPLIES) {
        let videoUrl =
            item.videourl.split("v=")[1] !== undefined
                ? item.videourl.split("v=")[1]
                : item.videourl.split("/")[3];
        num_replies += 1;
        let block = document.createElement("div");
        block.classList.add("reviewBox__videoReplies__box");
        let img = item.imageurl.split(".");
        img[0] = img[0] + "-s";
        img = img.join(".");
        block.innerHTML = `
          <iframe width="100%" height="300"
          src="https://www.youtube.com/embed/${videoUrl}" class="lazy-image">
          </iframe>
            `;
        // document.querySelector(".reviewBox__videoReplies").appendChild(block);
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
