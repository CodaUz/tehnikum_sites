let PRICE_NEW_COURSE = 0;
let COURSE = "";

function openBottomNews(elem) {
  document.querySelector(elem).classList.add("active");
}

function closeBottomNews(elem) {
  document.querySelector(elem).classList.remove("active");
}

function getSoonerCourse(all_courses) {
  if (window.matchMedia("(min-width: 800px)").matches) {
    let min_dt = null,
      min_dtObj = null;
    console.log("before", min_dtObj);
    all_courses.forEach(function (dt, index) {
      if (new Date(dt.date) >= new Date()) {
        if (min_dt === null) {
          min_dt = dt;
          min_dtObj = new Date(dt.date);
        } else {
          if (new Date(dt.date) < new Date(min_dtObj)) {
            min_dt = dt;
            min_dtObj = new Date(dt.date);
          }
        }
      }
    });
    if (typeof min_dt === "object" && min_dt !== null) {
      setSoonerCourse(min_dt);
    }
  }
}

function timeFormatDaysHoursMinutes(s) {
  var fm = [
    Math.floor(s / 60 / 60 / 24), // DAYS
    Math.floor(s / 60 / 60) % 24, // HOURS
    Math.floor(s / 60) % 60, // MINUTES
  ];
  return $.map(fm, function (v, i) {
    return (v < 10 ? "0" : "") + v;
  }).join(":");
}

function setSoonerCourse(course) {
  console.log(course);
  PRICE_NEW_COURSE = course.price;
  COURSE = course.name;
  openBottomNews(".bottomNewsAboutCourse");
  document.querySelector(
    ".bottomNewsAboutCourse>.courseTitle"
  ).innerHTML = `Курс "${course.name}"`;
  var t1 = new Date();
  var t2 = new Date(course.date);
  var dif = t2.getTime() - t1.getTime();
  var Seconds_from_T1_to_T2 = parseInt(dif / 1000);
  let isClose = false;

  setInterval(() => {
    if (Seconds_from_T1_to_T2 <= 0 && !isClose) {
      closeBottomNews(".bottomNewsAboutCourse");
      isClose = true;
    } else {
      let date = timeFormatDaysHoursMinutes(Seconds_from_T1_to_T2).split(":");
      let hours = date[0];
      let minutes = date[1];
      let seconds = date[2];
      document.getElementById("soonerCourseHour").innerHTML = hours;
      document.getElementById("soonerCourseMinute").innerHTML = minutes;
      document.getElementById("soonerCourseSeconds").innerHTML = seconds;
      Seconds_from_T1_to_T2 -= 1;
    }
  }, 1000);
}

async function takeSoonerCourse() {
  let name = document.querySelector("#soonerCourseName").value;
  let phone = document.querySelector("#soonerCoursePhone").value;

  let res = await fetch(
    `https://api.tehnikum.school/amocrm/?token=123&name=${name}&phone=${phone}&type=course&course=${COURSE}&summ=${PRICE_NEW_COURSE}`,
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
    document.querySelector("#soonerCourseName").value = "";
    document.querySelector("#soonerCoursePhone").value = "";
    for (let item of document.querySelectorAll(".input")) {
      item.classList.remove("active");
    }
  }
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
