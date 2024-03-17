import text from "./text.js";

const textArea = document.querySelector(".text-box");
const logBtn = document.querySelector(".log-btn");
const logArea = document.querySelector(".log");
const sence = document.querySelector(".sence");
const shakeText = document.querySelectorAll(".shake");

let currentText = 1;
let textLog = [];
let shakeStart = false;

function pageInit() {
  let textList = textInit();
  textList += `<button class="btn main-btn">
        <img src="src/img/主線UI/btn_sen_normal.png" alt="" data-next="${text[currentText].next}"/>
        <p data-next="${text[currentText].next}">${text[currentText].btn}</p>
    </button>`;
  textArea.innerHTML = textList;
  const paragraph = document.querySelectorAll(".text");
  paragraph.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 1000 * i);
  });
  mainBtnShow(paragraph.length);
  logInit();
}
function eventPageInit(num) {
  let textList = textInit();
  text[currentText].hint.forEach((el) => {
    textList += el;
  });
  textArea.innerHTML = textList;
  const paragraph = document.querySelectorAll(".text");
  paragraph.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, 1000 * i);
  });
  switch (num) {
    case "2":
      page2init();
      text[currentText].pureText.forEach((el) => {
        textLog.push(el);
      });
      break;
    case "3":
      page3init();
      text[currentText].pureText.forEach((el) => {
        textLog.push(el);
      });
      break;
    case "l_5":
    case "m_5":
    case "r_5":
      page5init();
      mainBtnShow(1);
      break;
  }
}
function textInit() {
  let textList = "";
  text[currentText].paragraphs.forEach((el) => {
    textList += `<p class="text">${el}</p>`;
    textLog.push(el);
  });
  return textList;
}
function mainBtnShow(delay) {
  const mainBtn = document.querySelectorAll(".main-btn");
  mainBtn.forEach((el) => {
    setTimeout(() => {
      el.classList.add("text-show");
    }, 1000 * delay);
  });
}
function logInit() {
  let logList = "";
  textLog.forEach((el) => {
    logList += `<p>${el}</p>`;
  });
  logArea.innerHTML = logList;
}

function page2init() {
  sence.setAttribute("src", "src/img/EP3/3-2-1.png");
  const hint = document.querySelectorAll(".hint");
  hint.forEach((el) => {
    el.addEventListener("click", (e) => {
      const show = document.querySelector(
        `.${e.target.getAttribute("data-show")}`
      );
      show.classList.add("show");
      sence.setAttribute("src", "src/img/EP3/3-2-2.png");
      if (e.target.getAttribute("data-show") == "sea") {
        mainBtnShow(1);
        sence.setAttribute("src", "src/img/EP3/3-2-3.png");
      }
    });
  });
}
function page3init() {
  sence.setAttribute("src", "src/img/EP3/3-3.png");
  const hint = document.querySelector(".hint");
  hint.addEventListener("click", () => {
    const blood = document.querySelector(".blood");
    blood.classList.add("blood-show");
    shakeStart = true;
    const animation = () => {
      if (shakeStart) {
        shakeText.forEach((char) => {
          char.style.transform = `translate(${getRandomNum()}px, ${getRandomNum()}px)`;
        });
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
    blood.addEventListener("click", () => {
      sence.setAttribute("src", "src/img/EP3/3-3-1.png");
      blood.classList.remove("blood-show");
      shakeStart = false;
      document.querySelector(".mainbtn-group").classList.add("text-show");
    });
  });
}
function page5init() {
  sence.setAttribute("src", "src/img/EP3/3-5.png");
  text[currentText].pureText.forEach((el) => {
    textLog.push(el);
  });
  const hint = document.querySelectorAll(".hint");
  hint.forEach((el) => {
    el.addEventListener("click", (e) => {
      const show = document.querySelector(
        `.${e.target.getAttribute("data-show")}`
      );
      show.classList.add("show");
    });
  });
}
pageInit();

textArea.addEventListener("click", (e) => {
  if (e.target.getAttribute("data-next")) {
    logInit();
    currentText = e.target.getAttribute("data-next");
    console.log(currentText);
    if (text[currentText].hasEvent) {
      eventPageInit(currentText);
    } else {
      pageInit();
    }
  }
});
logBtn.addEventListener("click", () => {
  logArea.classList.add("show");
});
logArea.addEventListener("click", () => {
  logArea.classList.remove("show");
});
window.addEventListener("load", (e) => {
  if (window.innerHeight <= 640) {
    document.querySelector("main").classList.add("small-main");
  }
});
window.addEventListener("resize", (e) => {
  if (window.innerHeight <= 640) {
    document.querySelector("main").classList.add("small-main");
  } else {
    document.querySelector("main").classList.remove("small-main");
  }
});

function getRandomNum() {
  let num = Math.ceil(Math.random() * 5) - 3;
  return num;
}
