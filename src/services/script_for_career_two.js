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
    blocks[i].style.display = "block";
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

  const NUM_OF_REPLIES_NO_VIDEO = 3;
  let num_replies_no_video = 0;

  if (res.success) {
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
                  <img data-src="https://admin.tehnikum.school/admin/${img}" alt="avatar" style="width: 50px" class="lazy-image" />
            <div>
              <div class="name">${item.name}</div>
              <div class="smallNameTitle">${item.position}</div>
            </div>
                </div>
              </div>
              <p class="desctiption">
                ${item.text}
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
      ".careerRepliesBox",
      NUM_OF_REPLIES_NO_VIDEO,
      NUM_OF_REPLIES_NO_VIDEO
    );
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
    for (let btn of document.querySelectorAll(".btnToYandex")) {
      btn.addEventListener("click", () => {
        yaCounter69008998.reachGoal(btn.textContent.trim());
        return true;
      });
    }
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
