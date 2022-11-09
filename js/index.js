"use strict";
let mainDiv = GetEl(null, ".nav__header"),
  arrNavDiv = GetElAll(mainDiv, "div"),
  arrLink = GetElAll(null, ".header__nav-link"),
  widthDoc,

  inviteDivCh = GetArrChildren(".inviteDate__content"),
  infoDivCh = GetArrChildren(".info__content"),
  programmDayDivCh = GetArrChildren(".programmDay__content"),
  mapDivCh = GetArrChildren(".map__content"),
  countdownDivCh = GetArrChildren(".countdown__content"),
  footerDivCh = GetArrChildren(".footer"),

  btn = GetEl(null, ".btn");

const SetProgrammDay = () => {
  widthDoc = document.documentElement.clientWidth;

  if (widthDoc <= 965) {

    let guests = document.querySelector("#guests");
    let ceremony = document.querySelector("#ceremony");
    let programmDayItems = document.querySelector(".programmDay__items");
    let programmDayItemsRight = document.querySelector(".programmDay__item-right");

    programmDayItems.prepend(guests);
    programmDayItemsRight.prepend(ceremony);

  }

};

SetProgrammDay();


function GetArrChildren(selector) {

  let parent = document.querySelector(selector),
    parentChildren = parent.childNodes;

  return parentChildren;
}

function GetEl(el, sel) {
  if (el === null) {

    let buf = document.querySelector(sel);
    return buf;

  } else {

    let buf = el.querySelector(sel);
    return buf;

  }
}

function GetElAll(el, sel) {
  if (el === null) {

    let buf = document.querySelectorAll(sel);
    return buf;

  } else {

    let buf = el.querySelectorAll(sel);
    return buf;

  }
}

const SetAnim = (arr) => {
  arr.forEach(item => {

    if (item.tagName != undefined) {

      item.classList.remove("hidenAnim");
      item.classList.add("showAnim");
    }

  });
};

const SetHide = (arr) => {
  arr.forEach(item => {

    if (item.tagName != undefined) {
      item.classList.add("hidenAnim");
    }

  });
};

const UpHeadTextMob = (div, link) => {

  for (let i = 0; i < arrNavDiv.length; i++) {
    arrNavDiv[i].classList.add("hide");
    arrLink[i].classList.add("header__nav-link");
    arrLink[i].classList.remove("styleHeaderNavMobile");
  }

  div.classList.remove("hide");
  div.classList.add("styleHeader");
  link.classList.remove("header__nav-link");
  link.classList.add("styleHeaderNavMobile");

};

const UpHeadTextDes = (link) => {

  for (let i = 0; i < arrNavDiv.length; i++) {
    arrLink[i].classList.remove("styleHeaderNavMobile");
  }

  link.classList.add("styleHeaderNavMobile");

};

const ChangeClasses = (el, classRem, classAdd) => {
  el.classList.remove(classRem);
  el.classList.add(classAdd);
};



SetHide(inviteDivCh);
SetHide(infoDivCh);
SetHide(programmDayDivCh);
SetHide(mapDivCh);
SetHide(countdownDivCh);
SetHide(footerDivCh);



window.addEventListener("DOMContentLoaded", () => {

  $("#tel").mask("7-(999)-999-99-99");

  SetAnim(inviteDivCh);

  widthDoc = document.documentElement.clientWidth;

  if (widthDoc < 950) {
    UpHeadTextMob(arrNavDiv[0], arrLink[0]);
  } else if (widthDoc > 950) {
    UpHeadTextDes(arrLink[0]);
  }


  $("#menu").on("click", "a", function (event) {

    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href

    var id = $(this).attr('href'),

      //узнаем высоту от начала страницы до блока на который ссылается якорь

      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс

    $('body, html').animate({ scrollTop: top }, 1500);

  });

});


const onScrollHeader = () => {

  const header = GetEl(null, '.header');

  let prevScroll = window.pageYOffset;
  let currentScroll;

  window.addEventListener('scroll', () => {

    currentScroll = window.pageYOffset;

    const headerHidden = () => header.classList.contains('header_hidden');

    // если прокручиваем страницу вниз и header не скрыт
    if (currentScroll > prevScroll && !headerHidden()) {
      header.classList.add('header_hidden');
    }

    // если прокручиваем страницу вверх и header скрыт
    if (currentScroll < prevScroll && headerHidden()) {
      header.classList.remove('header_hidden');
    }

    prevScroll = currentScroll;

  });

};

onScrollHeader();



const timer = (id, deadline) => {

  function CalcTime(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),

      days = Math.floor((t / (1000 * 60 * 60 * 24))),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      "total": t,
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    };

  }

  function GetZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function SetClock(selector, endTime) {
    const timer = GetEl(null, selector),
      days = GetEl(timer, "#days"),
      hours = GetEl(timer, "#hours"),
      minutes = GetEl(timer, "#minutes"),
      seconds = GetEl(timer, "#seconds"),
      timeInterval = setInterval(UpdateClock, 1000);

    UpdateClock();

    function UpdateClock() {
      const t = CalcTime(endTime);

      days.innerHTML = GetZero(t.days),
        hours.innerHTML = GetZero(t.hours),
        minutes.innerHTML = GetZero(t.minutes),
        seconds.innerHTML = GetZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  SetClock(id, deadline);
};

timer(".timer", "2022-04-30");


const HeaderUpdate = () => {

  function ChangeStyleMob(div, link, classAddDiv, classRem, classAdd) {
    div.classList.add(classAddDiv);

    link.classList.remove(classRem);
    link.classList.add(classAdd);
  }

  function ChangeStyleDes(div, link, classAddDiv, classRem, classAdd) {
    div.classList.remove(classAddDiv);

    link.classList.remove(classRem);
    link.classList.add(classAdd);
  }

  widthDoc = document.documentElement.clientWidth;

  window.addEventListener("resize", () => {
    widthDoc = document.documentElement.clientWidth;

    if (widthDoc < 950) {

      ChangeStyleMob(arrNavDiv[0], arrLink[0],
        "styleHeader", "header__nav-link", "styleHeaderNavMobile");

      for (let i = 1; i < arrNavDiv.length; i++) {

        ChangeStyleMob(arrNavDiv[i], arrLink[i],
          "hide", "header__nav-link", "styleHeaderNavMobile");

      }

    } else if (widthDoc > 950) {

      ChangeStyleDes(arrNavDiv[0], arrLink[0],
        "styleHeader", "styleHeaderNavMobile", "header__nav-link");

      for (let i = 0; i < arrNavDiv.length; i++) {

        ChangeStyleDes(arrNavDiv[i], arrLink[i],
          "hide", "styleHeaderNavMobile", "header__nav-link");

      }

    }

  });


  let scrollWindow;

  window.addEventListener("scroll", () => {
    scrollWindow = window.pageYOffset;

    // mobile
    if (widthDoc < 950) {

      if ($("#ex1").offset().top - document.documentElement.clientHeight < window.pageYOffset) {
        UpHeadTextMob(arrNavDiv[0], arrLink[0]);
      }

      if ($("#ex2").offset().top - document.documentElement.clientHeight < window.pageYOffset) {
        UpHeadTextMob(arrNavDiv[1], arrLink[1]);
        SetAnim(infoDivCh);
      }

      // programmDay
      if ($("#ex3").offset().top - document.documentElement.clientHeight < window.pageYOffset) {
        UpHeadTextMob(arrNavDiv[2], arrLink[2]);
        SetAnim(programmDayDivCh);
      }

      // inviteForm
      if ($("#ex4").offset().top - document.documentElement.clientHeight < window.pageYOffset) {
        UpHeadTextMob(arrNavDiv[3], arrLink[3]);
      }

      // map
      if ($("#ex5").offset().top - document.documentElement.clientHeight < window.pageYOffset) {
        UpHeadTextMob(arrNavDiv[4], arrLink[4]);
        SetAnim(mapDivCh);
      }

      // date
      if ($("#ex6").offset().top - document.documentElement.clientHeight < window.pageYOffset) {
        UpHeadTextMob(arrNavDiv[5], arrLink[5]);
        SetAnim(countdownDivCh);
      }

      // footer
      if ($("#ex7").offset().top - document.documentElement.clientHeight + 210 < window.pageYOffset) {
        UpHeadTextMob(arrNavDiv[6], arrLink[6]);
        SetAnim(footerDivCh);
      }

    }

    // desctop
    if (widthDoc >= 950) {

      if ($("#ex1").offset().top - document.documentElement.clientHeight < window.pageYOffset) {
        UpHeadTextDes(arrLink[0]);
      }

      if ($("#ex2").offset().top - document.documentElement.clientHeight + 100 < window.pageYOffset) {
        UpHeadTextDes(arrLink[1]);
        SetAnim(infoDivCh);
      }

      // programmDay
      if ($("#ex3").offset().top - document.documentElement.clientHeight + 100 < window.pageYOffset) {
        UpHeadTextDes(arrLink[2]);
        SetAnim(programmDayDivCh);
      }

      // inviteForm
      if ($("#ex4").offset().top - document.documentElement.clientHeight + 100 < window.pageYOffset) {
        UpHeadTextDes(arrLink[3]);
      }

      // map
      if ($("#ex5").offset().top - document.documentElement.clientHeight + 100 < window.pageYOffset) {
        UpHeadTextDes(arrLink[4]);
        SetAnim(mapDivCh);
      }

      // date
      if ($("#ex6").offset().top - document.documentElement.clientHeight + 100 < window.pageYOffset) {
        UpHeadTextDes(arrLink[5]);
        SetAnim(countdownDivCh);
      }

      // footer
      if ($("#ex7").offset().top - document.documentElement.clientHeight + 210 < window.pageYOffset) {
        UpHeadTextDes(arrLink[6]);
        SetAnim(footerDivCh);
      }

    }

  });

};

HeaderUpdate();



const SetBottomInp = (el) => {
  ChangeClasses(el, "inputDataPer", "inpExcretion");

  setTimeout(() => {
    ChangeClasses(el, "inpExcretion", "inputDataPer");
  }, 3000);
};

const scriptURL = 'https://script.google.com/macros/s/AKfycbzDcScx5rM00Tv6lcJj1jqEqSl0EGMp5WCI4gBz8cRTiQEMz7BHhjz9sX3FGxiavy6T/exec',
  form = document.forms['google-sheet'];

form.addEventListener('submit', e => {
  e.preventDefault();

  let inpName = GetEl(null, "#inpName"),
    inpFam = GetEl(null, "#inpFam");

  if (inpName.value === '' || inpFam.value === '') {

    if (inpName.value === '') {
      SetBottomInp(inpName);
    }

    if (inpFam.value === '') {
      SetBottomInp(inpFam);
    }

  } else {
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

});



btn.addEventListener("click", () => {

  widthDoc = document.documentElement.clientWidth;

  let inpName = GetEl(null, "#inpName"),
    inpFam = GetEl(null, "#inpFam");

  if (inpName.value === '' || inpFam.value === '') {

  } else if (widthDoc > 400) {

    ChangeClasses(btn, "btn", "btnAnMin");

    setTimeout(() => {
      ChangeClasses(btn, "btnAnMin", "btn");
    }, 700);

    setTimeout(() => {
      SetStylePost(btn);
    }, 800);

    setTimeout(() => {
      btn.disabled = true;
    }, 810);
  } else {
    ChangeClasses(btn, "btn", "btnAnMinMob");

    setTimeout(() => {
      ChangeClasses(btn, "btnAnMinMob", "btn");
    }, 700);

    setTimeout(() => {
      SetStylePost(btn);
    }, 800);

    setTimeout(() => {
      btn.disabled = true;
    }, 810);
  }

});


function SetStylePost(btn) {

  widthDoc = document.documentElement.clientWidth;

  if (widthDoc > 400) {
    ChangeClasses(btn, "btn", "btnPost");
    btn.textContent = "Отправлено";
  } else {
    ChangeClasses(btn, "btn", "btnPostMob");
    btn.textContent = "Отправлено";
  }

}