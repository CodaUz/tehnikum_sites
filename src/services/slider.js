class Slider {
  constructor({
    basicSliders,
    emojiSliders,
    triggerHookTop,
    controller,
    indicatorsForClick,
    indicatorsScrollable,
    numberOfSliders = 4,
    duration = 600,
  }) {
    this.basicSliders = basicSliders;
    this.emojiSliders = emojiSliders;
    this.triggerHookTop = triggerHookTop;
    this.numberOfSliders = numberOfSliders;
    this.duration = duration;
    this.controller = controller;
    this.indicatorsForClick = indicatorsForClick;
    this.indicatorsScrollable = indicatorsScrollable;
    this.pos = {};
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  init = () => {
    this.makeBasicSliders();
    this.makeMobileSlider();
  };

  makeBasicSliders = () => {
    if (!window.matchMedia("(max-width: 800px)").matches) {
      this.listenClick();
      for (let item of this.basicSliders) {
        let isEmoji = false;
        if (this.emojiSliders.includes(item)) {
          isEmoji = true;
        }
        this.listenOneBasicSlider({ item, isEmoji });
        this.listenTwoBasicSlider({ item, offset: 600, isEmoji });
        this.listenThreeBasicSlider({
          item,
          offset: 1200,
          isEmoji,
        });
        if (this.numberOfSliders === 4) {
          this.listenFourBasicSlider({
            item,
            offset: 1800,
            isEmoji,
          });
        }
      }
    }
  };

  listenClick() {
    for (
      let indicator = 0;
      indicator < this.indicatorsForClick.length;
      indicator++
    ) {
      let array =
        this.numberOfSliders === 4
          ? ["One", "Two", "Three", "Four"]
          : ["One", "Two", "Three"];
      let sliders = array.map(
        (v) => `#${this.basicSliders[indicator]}Slider${v}`
      );
      this.clickOnSliders(
        this.indicatorsForClick[indicator],
        this.duration,
        sliders,
        this.indicatorsScrollable[indicator]
      );
    }
  }

  listenOneBasicSlider = ({
    item,
    duration = this.duration,
    offset = 0,
    isEmoji = false,
  }) => {
    new ScrollMagic.Scene({
      triggerElement: `#sliderBox${this.capitalizeFirstLetter(item)}`,
      duration: duration,
      triggerHook: this.triggerHookTop,
      offset: offset,
    })
      .setPin(`#sliderBox${this.capitalizeFirstLetter(item)}`)
      .on("enter", function (e) {
        document.querySelector(`#${item}SliderOne`).classList.add("active");
        if (isEmoji) {
          document.querySelector("#coolImg").classList.add("show");
          document.querySelector("#coolImg").classList.remove("hide");
          document.querySelector("#peaceImg").classList.remove("show");
          document.querySelector("#peaceImg").classList.add("hide");
        }
      })
      .addTo(this.controller);
  };

  listenTwoBasicSlider = ({
    item,
    duration = this.duration,
    offset = 0,
    isEmoji = false,
  }) => {
    new ScrollMagic.Scene({
      triggerElement: `#sliderBox${this.capitalizeFirstLetter(item)}`,
      duration: duration,
      triggerHook: this.triggerHookTop,
      offset: offset,
    })
      .setPin(`#sliderBox${this.capitalizeFirstLetter(item)}`)
      .on("enter", function (e) {
        document.querySelector(`#${item}SliderOne`).classList.remove("active");
        if (isEmoji) {
          document.querySelector("#coolImg").classList.remove("show");
          document.querySelector("#coolImg").classList.add("hide");
          document.querySelector("#peaceImg").classList.add("show");
          document.querySelector("#peaceImg").classList.remove("hide");
          document.querySelector("#okImg").classList.remove("show");
          document.querySelector("#okImg").classList.add("hide");
        }
      })
      .setClassToggle(`#${item}SliderTwo`, "active")
      .addTo(this.controller);
  };

  listenThreeBasicSlider = ({
    item,
    duration = this.duration,
    offset = 0,
    isEmoji = false,
  }) => {
    new ScrollMagic.Scene({
      triggerElement: `#sliderBox${this.capitalizeFirstLetter(item)}`,
      duration: duration,
      triggerHook: this.triggerHookTop,
      offset: offset,
    })
      .setPin(`#sliderBox${this.capitalizeFirstLetter(item)}`)
      .on("enter", (e) => {
        if (this.numberOfSliders === 4) {
          document
            .querySelector(`#${item}SliderFour`)
            .classList.remove("active");
        }
        if (isEmoji) {
          document.querySelector("#peaceImg").classList.remove("show");
          document.querySelector("#peaceImg").classList.add("hide");
          document.querySelector("#okImg").classList.add("show");
          document.querySelector("#okImg").classList.remove("hide");
        }
      })
      .setClassToggle(`#${item}SliderThree`, "active")
      .addTo(this.controller);
  };

  listenFourBasicSlider = ({
    item,
    duration = this.duration,
    offset = 0,
    isEmoji = false,
  }) => {
    new ScrollMagic.Scene({
      triggerElement: `#sliderBox${this.capitalizeFirstLetter(item)}`,
      duration: duration,
      triggerHook: this.triggerHookTop,
      offset: offset,
    })
      .setPin(`#sliderBox${this.capitalizeFirstLetter(item)}`)
      .setClassToggle(`#${item}SliderFour`, "active")
      .on("enter", function (e) {
        if (isEmoji) {
          document.querySelector("#okImg").classList.remove("show");
          document.querySelector("#okImg").classList.add("hide");
        }
      })
      .on("leave", function (e) {
        document.querySelector(`#${item}SliderFour`).classList.add("active");
      })
      .addTo(this.controller);
  };

  clickOnSliders(element, offset, array_of_sliders, is_scrollable = false) {
    console.log(element);
    let elem = document.querySelector(element);
    for (let i = 0; i < array_of_sliders.length; i++) {
      document
        .querySelector(array_of_sliders[i])
        .addEventListener("click", () => {
          let new_offset = 0;
          elem.scrollIntoView({ block: "start" });
          if (is_scrollable) {
            for (let slider = 0; slider < array_of_sliders.length; slider++) {
              if (
                document
                  .querySelector(array_of_sliders[slider])
                  .classList.contains("active")
              ) {
                new_offset = offset * slider;
                break;
              }
            }
          }
          window.scrollTo({
            top: window.scrollY - new_offset + offset * i,
          });
        });
    }
  }

  makeMobileSlider = () => {
    this.listenPrevSliderMobile();
    this.listenCenterSliderMobile();
    this.listenNextSliderMobile();
  };

  listenPrevSliderMobile = () => {
    let prevSliders = document.getElementsByClassName("prevSlider");
    for (let prevSliderItem of prevSliders) {
      $(prevSliderItem).on("touchend click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (prevSliderItem.getAttribute("data-maxSlider") === null) {
          this.sliderPrev(prevSliderItem);
        } else {
          this.sliderPrev(
            prevSliderItem,
            parseInt(prevSliderItem.getAttribute("data-maxSlider"))
          );
        }
      });
    }
  };

  listenCenterSliderMobile = () => {
    let centerSliders = document.getElementsByClassName("centerSlider");

    for (let centerSliderItem of centerSliders) {
      centerSliderItem.addEventListener("swiped-right", (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (centerSliderItem.getAttribute("data-maxSlider") === null) {
          this.sliderPrev(centerSliderItem);
        } else {
          this.sliderPrev(
            centerSliderItem,
            parseInt(centerSliderItem.getAttribute("data-maxSlider"))
          );
        }
      });
      centerSliderItem.addEventListener("swiped-left", (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (centerSliderItem.getAttribute("data-maxSlider") === null) {
          this.sliderNext(centerSliderItem);
        } else {
          this.sliderNext(
            centerSliderItem,
            parseInt(centerSliderItem.getAttribute("data-maxSlider"))
          );
        }
      });
    }
  };

  listenNextSliderMobile = () => {
    let nextSliders = document.getElementsByClassName("nextSlider");
    for (let nextSliderItem of nextSliders) {
      $(nextSliderItem).on("touchend click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (nextSliderItem.getAttribute("data-maxSlider") === null) {
          this.sliderNext(nextSliderItem);
        } else {
          this.sliderNext(
            nextSliderItem,
            parseInt(nextSliderItem.getAttribute("data-maxSlider"))
          );
        }
      });
    }
  };

  sliderNext = (e, maxSlider = 3) => {
    if (this.pos[`${e.getAttribute("data-id")}`] === void 0) {
      this.pos[`${e.getAttribute("data-id")}`] = 0;
    }
    if (this.pos[`${e.getAttribute("data-id")}`] === maxSlider) {
      this.pos[`${e.getAttribute("data-id")}`] = 0;
    } else {
      this.pos[`${e.getAttribute("data-id")}`] += 1;
    }
    this.setTransform(e.getAttribute("data-id"), maxSlider);
  };

  sliderPrev = (e, maxSlider = 3) => {
    if (this.pos[`${e.getAttribute("data-id")}`] === void 0) {
      this.pos[`${e.getAttribute("data-id")}`] = 0;
    }
    if (this.pos[`${e.getAttribute("data-id")}`] === 0) {
      this.pos[`${e.getAttribute("data-id")}`] = maxSlider;
    } else {
      this.pos[`${e.getAttribute("data-id")}`] = Math.max(
        this.pos[`${e.getAttribute("data-id")}`] - 1,
        0
      );
    }
    this.setTransform(e.getAttribute("data-id"), maxSlider);
  };

  setTransform = (_id, maxSlider) => {
    console.log('id', _id)
    let sliderMain = document.querySelector(`.sliderBox-${_id}`);
    console.log(`.sliderBox-${_id}`, sliderMain)
    sliderMain.style.transition = ".4s ease-in-out";
    setTimeout(() => {
      let positionCoefitient = 18.5
      document.querySelector(
        `#${_id}PrevSlider`
      ).style.transform = `translateX(${
        (this.pos[_id] * sliderMain.offsetWidth) / positionCoefitient
        }rem)`;
      document.querySelector(
        `#${_id}NextSlider`
      ).style.transform = `translateX(${
        (this.pos[_id] * sliderMain.offsetWidth) / positionCoefitient
        }rem)`;
      document.querySelector(
        `#${_id}CenterSlider`
      ).style.transform = `translateX(${
        (this.pos[_id] * sliderMain.offsetWidth) / positionCoefitient
        }rem)`;
      sliderMain.style.transform =
        "translate3d(" +
        (-this.pos[_id] * sliderMain.offsetWidth) / positionCoefitient +
        "rem,0,0)";
    }, 0);
  };
}
